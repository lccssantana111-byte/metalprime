import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const { path, tag } = body as { path?: string; tag?: string }

  if (tag) {
    revalidateTag(tag, 'default')
    return NextResponse.json({ revalidated: true, tag })
  }

  if (path) {
    revalidatePath(path, 'page')
    return NextResponse.json({ revalidated: true, path })
  }

  revalidatePath('/portfolio', 'page')
  revalidatePath('/', 'page')
  return NextResponse.json({ revalidated: true, paths: ['/portfolio', '/'] })
}
