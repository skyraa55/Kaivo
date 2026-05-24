import { useEffect, useRef } from 'react'

export default function SplashIntro({ onComplete }) {
  const splashRef  = useRef(null)
  const logoRef    = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => {
      const el = splashRef.current
      if (!el) return
      el.style.transition = 'opacity 1.3s ease'
      el.style.opacity = '0'
      setTimeout(() => onComplete?.(), 1300)
    }, 2800)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        @keyframes splashRise {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashTag {
          from { color: rgba(255,255,255,0); }
          to   { color: rgba(255,255,255,0.8); }
        }
      `}</style>

      <div
        ref={splashRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#2F1C13',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <div
          ref={logoRef}
          style={{
            opacity: 0,
            transform: 'translateY(14px)',
            animation: 'splashRise 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s forwards',
          }}
        >
          <img
            src="/KAIVO_WHITE_transparent.png"
            alt="KAIVO"
            style={{ width: '140px', height: 'auto', display: 'block' }}
          />
        </div>

        <p
          ref={taglineRef}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: '18px',
            color: 'rgba(255,255,255,0)',
            margin: 0,
            animation: 'splashTag 0.9s ease 1.4s forwards',
          }}
        >
          Curiosity Meets Departure.
        </p>
      </div>
    </>
  )
}