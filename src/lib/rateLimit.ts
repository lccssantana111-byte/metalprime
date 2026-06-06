interface RateLimitEntry {
  count: number
  resetAt: number
}

// In-memory fallback store (used when Redis is not configured)
const memoryStore = new Map<string, RateLimitEntry>()

// Upstash Redis client (optional — only initialized when env vars are present)
let redisClient: {
  incr: (key: string) => Promise<number>
  expire: (key: string, seconds: number) => Promise<unknown>
} | null = null

async function getRedisClient() {
  if (redisClient) return redisClient
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { Redis } = await (eval('import("@upstash/redis")') as Promise<any>)
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    return redisClient
  } catch {
    return null
  }
}

async function rateLimitRedis(
  key: string,
  maxRequests: number,
  windowMs: number,
): Promise<{ allowed: boolean; remaining: number }> {
  const redis = await getRedisClient()
  if (!redis) return rateLimitMemory(key, maxRequests, windowMs)

  const redisKey = `rl:${key}`
  const windowSec = Math.ceil(windowMs / 1000)

  try {
    const count = await redis.incr(redisKey)
    if (count === 1) await redis.expire(redisKey, windowSec)
    const allowed = count <= maxRequests
    return { allowed, remaining: Math.max(0, maxRequests - count) }
  } catch {
    return rateLimitMemory(key, maxRequests, windowMs)
  }
}

function rateLimitMemory(
  key: string,
  maxRequests: number,
  windowMs: number,
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = memoryStore.get(key)

  if (!entry || now > entry.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count }
}

export async function rateLimit(
  key: string,
  maxRequests = 5,
  windowMs = 15 * 60 * 1000,
): Promise<{ allowed: boolean; remaining: number }> {
  return rateLimitRedis(key, maxRequests, windowMs)
}

export function getRateLimitKey(request: Request): string {
  // x-real-ip is set by Vercel's edge and cannot be spoofed by callers
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()

  return 'unknown'
}
