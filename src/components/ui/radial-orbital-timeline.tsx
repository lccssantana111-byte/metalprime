"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

const RADIUS = 180;
const SPEED = 0.003;
const CONTAINER = 520;

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [activeId, setActiveId] = useState<number | null>(timelineData[0]?.id ?? null);
  const angleRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(true);
  const nodeEls = useRef<Record<number, HTMLDivElement | null>>({});

  const activeItem = timelineData.find((i) => i.id === activeId) ?? null;

  const positionNodes = useCallback(() => {
    const total = timelineData.length;
    timelineData.forEach((item, index) => {
      const el = nodeEls.current[item.id];
      if (!el) return;
      const angle = (index / total) * Math.PI * 2 + angleRef.current;
      const x = RADIUS * Math.cos(angle);
      const y = RADIUS * Math.sin(angle);
      const depth = (Math.sin(angle) + 1) / 2;
      const scale = 0.9 + 0.1 * depth;
      const zIndex = Math.round(10 + 40 * depth);
      el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%)) scale(${scale})`;
      el.style.zIndex = String(zIndex);
    });
  }, [timelineData]);

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      if (autoRotateRef.current) {
        angleRef.current = (angleRef.current + SPEED * (delta / 16.67)) % (Math.PI * 2);
      }
      positionNodes();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [positionNodes]);

  const handleNodeClick = (id: number) => setActiveId(id);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem 3rem' }}>
      <div style={{ position: 'relative', width: `${CONTAINER}px`, height: `${CONTAINER}px`, flexShrink: 0 }}>

        {/* Orbit rings */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${RADIUS * 2 + 12}px`, height: `${RADIUS * 2 + 12}px`,
          borderRadius: '50%', border: '1px solid rgba(249,115,22,0.2)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${RADIUS * 2 + 52}px`, height: `${RADIUS * 2 + 52}px`,
          borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }} />

        {/* Center — orb when idle, info when active */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5, pointerEvents: 'none',
          width: '160px', height: '160px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Orb — fades out when active */}
          <div style={{
            position: 'absolute',
            opacity: activeItem ? 0 : 1,
            transition: 'opacity 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #fb923c 0%, #ea580c 55%, #9a3412 100%)',
              boxShadow: '0 0 0 1px rgba(249,115,22,0.5), 0 0 36px rgba(249,115,22,0.55), 0 0 72px rgba(249,115,22,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', width: '90px', height: '90px', borderRadius: '50%',
                border: '1px solid rgba(249,115,22,0.4)',
                animation: 'orb-ping 2.4s ease-out infinite',
              }} />
              <div style={{
                position: 'absolute', width: '110px', height: '110px', borderRadius: '50%',
                border: '1px solid rgba(249,115,22,0.2)',
                animation: 'orb-ping 2.4s ease-out infinite',
                animationDelay: '0.9s',
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                letterSpacing: '0.14em', color: 'white', fontWeight: 800,
                textTransform: 'uppercase', position: 'relative',
              }}>ART</span>
            </div>
          </div>

          {/* Detail — fades in when active */}
          <div style={{
            position: 'absolute',
            opacity: activeItem ? 1 : 0,
            transform: activeItem ? 'scale(1)' : 'scale(0.9)',
            transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
            textAlign: 'center',
            width: '160px',
          }}>
            <span style={{
              display: 'block',
              fontSize: '9px', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#f97316', fontWeight: 700, marginBottom: '8px',
            }}>
              {activeItem?.date}
            </span>
            <h3 style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontWeight: 900, fontSize: '1.35rem',
              textTransform: 'uppercase', lineHeight: 1.05,
              color: 'white', margin: '0 0 10px',
            }}>
              {activeItem?.title}
            </h3>
            <div style={{
              width: '28px', height: '2px', margin: '0 auto 10px',
              background: 'linear-gradient(to right, #f97316, rgba(249,115,22,0))',
              borderRadius: '2px',
            }} />
            <p style={{
              fontSize: '11px', color: 'rgba(203,213,225,0.82)',
              lineHeight: 1.7, margin: 0,
            }}>
              {activeItem?.content}
            </p>
          </div>
        </div>

        {/* Nodes */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 0, height: 0,
        }}>
          {timelineData.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                ref={(el) => { nodeEls.current[item.id] = el }}
                style={{
                  position: 'absolute', willChange: 'transform',
                  cursor: 'pointer', transform: 'translate(-50%, -50%)',
                }}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(item.id); }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isActive
                    ? 'linear-gradient(135deg, #f97316, #c2410c)'
                    : 'rgba(15,23,42,0.96)',
                  border: `2px solid ${isActive ? '#f97316' : 'rgba(255,255,255,0.22)'}`,
                  boxShadow: isActive
                    ? '0 0 0 6px rgba(249,115,22,0.15), 0 0 28px rgba(249,115,22,0.6)'
                    : '0 2px 16px rgba(0,0,0,0.6)',
                  transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontWeight: 800,
                    fontSize: '15px', lineHeight: 1,
                    color: isActive ? 'white' : 'rgba(255,255,255,0.75)',
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div style={{
                  position: 'absolute', top: '56px', left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '9px', fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  fontWeight: 700, whiteSpace: 'nowrap',
                  color: isActive ? '#f97316' : 'rgba(255,255,255,0.55)',
                  transition: 'color 0.3s',
                  textShadow: '0 1px 8px rgba(0,0,0,1)',
                }}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes orb-ping {
          0%   { transform: scale(1);   opacity: 1; }
          80%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
