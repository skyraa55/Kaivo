import { useEffect, useState } from 'react'
import Head from 'next/head'
import HomePage from '../components/HomePage'
import SplashIntro from '../components/SplashIntro'

const NAV_LINKS = ['About', 'Our Fleet', 'Advantages', 'Global']

function DiceNav({ navOpacity }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [prevIndex, setPrevIndex]       = useState(null)

  const handleEnter = (i) => {
    setPrevIndex(hoveredIndex)
    setHoveredIndex(i)
  }

  return (
    <nav className="nav" style={{ opacity: navOpacity, pointerEvents: navOpacity > 0.05 ? 'auto' : 'none' }}>
      <div className="nav-links">
        {NAV_LINKS.map((label, i) => {
          const isHovered = hoveredIndex === i
          const rollDown  = prevIndex !== null && prevIndex > i
          return (
            <div
              key={label}
              className="dice-nav-wrap"
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => {}}
              style={{ perspective: '400px', display: 'inline-block' }}
            >
              <div className={`dice-nav-inner${isHovered ? (rollDown ? ' dice-hovered-down' : ' dice-hovered-up') : ''}`}>
                <span className="dice-face dice-front">
                  <a href="#" className="nav-a" onClick={e => e.preventDefault()}>{label}</a>
                </span>
                <span className={`dice-face ${rollDown ? 'dice-bottom-face' : 'dice-top-face'}`}>
                  <a href="#" className="nav-a" onClick={e => e.preventDefault()}>{label}</a>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center' }}>
        <img src="/KAIVO_WHITE_transparent.png" alt="KAIVO" style={{ height:'24px', width:'auto', display:'block' }} />
      </div>

      <a href="mailto:info@kaivo.com" className="nav-email">info@kaivo.com</a>
    </nav>
  )
}

function BookFlightButton({ onClick }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 700)
    onClick()
  }

  return (
    <div
      className={`bfb-wrapper${hovered ? ' bfb-wrapper-hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Book the Flight"
    >
      <span className="bfb-shimmer" />
      <span className="bfb-text-pill">
        <span className="text-xs font-semibold">Book the Flight</span>
      </span>
      <span className={`bfb-circle${clicked ? ' bfb-circle-clicked' : ''}`}>
        <span className={`bfb-plane${hovered ? ' bfb-plane-hovered' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </span>
      </span>
    </div>
  )
}

function HomePageSheet({ open, onClose }) {
  return (
    <>
      <div
        className={`sheet-backdrop ${open ? 'sheet-backdrop-visible' : ''}`}
        onClick={onClose}
      />
      <button
        className={`sheet-close-btn ${open ? 'sheet-close-btn-visible' : ''}`}
        onClick={onClose}
        aria-label="Close"
      >
        <span className="sheet-close-x">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </span>
        <span className="sheet-close-label">Close</span>
      </button>
      <div className={`sheet-container ${open ? 'sheet-open' : ''}`}>
        <div className="sheet-inner">
          <HomePage />
        </div>
      </div>
    </>
  )
}

export default function Home() {
  const [scrollY, setScrollY]       = useState(0)
  const [splashDone, setSplashDone] = useState(false)
  const [heroReady, setHeroReady]   = useState(false)
  const [sheetOpen, setSheetOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!splashDone) return
    const t = setTimeout(() => setHeroReady(true), 200)
    return () => clearTimeout(t)
  }, [splashDone])

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sheetOpen])

  const videoScale  = 1 + Math.min(scrollY / 800, 1) * 2.5
  const heroOpacity = Math.max(0, 1 - scrollY / 280)
  const logoOpacity = scrollY > 0 ? Math.max(0, 1 - scrollY / 80) : 1
  const navOpacity  = Math.min(1, Math.max(0, (scrollY - 60) / 80))

  const textP       = Math.max(0, Math.min(1, (scrollY - 900) / 200))
  const textWeightP = Math.max(0, Math.min(1, (scrollY - 900) / 500))
  const textAlpha   = (0.3 + textWeightP * 0.7).toFixed(2)
  const textWeight  = Math.round(300 + textWeightP * 400)

  const fadeL = heroReady
    ? { animation: 'heroSlideLeft 1.1s cubic-bezier(0.16,1,0.3,1) 0s forwards', opacity: 0 }
    : { opacity: 0 }
  const fadeR = heroReady
    ? { animation: 'heroSlideRight 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s forwards', opacity: 0 }
    : { opacity: 0 }
  const fadeI = heroReady
    ? { animation: 'heroFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s forwards', opacity: 0 }
    : { opacity: 0 }

  return (
    <>
      {!splashDone && <SplashIntro onComplete={() => setSplashDone(true)} />}

      <Head>
        <title>KAIVO — Fly Different</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Montserrat:wght@200;300;400;500;600;700;900&display=swap" rel="stylesheet" />
        <style>{`
          *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
          html, body { background:#eef2ec; overflow-x:hidden; }
          ::-webkit-scrollbar { display:none; }
          html { scrollbar-width:none; }

          @keyframes heroSlideLeft  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
          @keyframes heroSlideRight { from{opacity:0;transform:translateX(32px)}  to{opacity:1;transform:translateX(0)} }
          @keyframes heroFadeUp     { from{opacity:0;transform:translateY(16px)}  to{opacity:1;transform:translateY(0)} }
          @keyframes scrollDot      { 0%,100%{top:5px;opacity:.7} 50%{top:16px;opacity:.2} }

          /* ── NAV ── */
          .nav {
            position:fixed; top:0; left:0; right:0; z-index:200;
            display:flex; align-items:center; justify-content:space-between;
            padding:0 52px; height:68px;
            background: transparent;
          }
          .nav-links { display:flex; gap:4px; align-items:center; }

          /* Hide nav links on small screens — show only logo + email */
          @media (max-width: 640px) {
            .nav {
              padding: 0 20px;
              height: 56px;
            }
            .nav-links {
              display: none;
            }
            .nav-email {
              font-size: 10px !important;
              letter-spacing: 0.2px !important;
            }
          }

          @media (min-width: 641px) and (max-width: 900px) {
            .nav {
              padding: 0 28px;
              height: 60px;
            }
            .nav-links {
              gap: 2px;
            }
          }

          /* ── DICE NAV ── */
          .dice-nav-wrap {
            perspective: 400px;
            display: inline-block;
            overflow: hidden;
            border-radius: 4px;
          }
          .dice-nav-inner {
            display: inline-block;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.42s cubic-bezier(0.16,1,0.3,1);
            height: 36px;
            vertical-align: middle;
          }
          .dice-nav-inner.dice-hovered-up   { transform: rotateX(-90deg); }
          .dice-nav-inner.dice-hovered-down { transform: rotateX(90deg);  }

          .dice-face {
            display: flex; align-items: center;
            padding: 0 16px; height: 36px;
            position: absolute; top: 0; left: 0; right: 0;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .dice-front {
            transform: translateZ(0px) rotateX(0deg);
            position: relative;
          }
          .dice-top-face    { transform: rotateX(90deg)  translateZ(18px); }
          .dice-bottom-face { transform: rotateX(-90deg) translateZ(18px); }

          .dice-nav-wrap:hover .dice-front,
          .dice-nav-wrap:hover .dice-top-face,
          .dice-nav-wrap:hover .dice-bottom-face {
            background: rgba(245,200,66,0.12);
            border: 1px solid rgba(245,200,66,0.22);
            border-radius: 4px;
          }

          .nav-a {
            font-family:'Montserrat',sans-serif; font-weight:700;
            font-size:12px; letter-spacing:0.4px; text-transform:capitalize;
            color:#ffffff; text-decoration:none;
            white-space: nowrap;
            transition: color .2s;
          }
          .dice-nav-wrap:hover .nav-a { color:#f5c842; }

          .nav-email {
            font-family:'Montserrat',sans-serif; font-weight:700;
            font-size:12px; letter-spacing:0.4px;
            color:rgba(255,255,255,0.85); text-decoration:none; transition:color .2s;
          }
          .nav-email:hover { color:#f5c842; }

          /* ── HERO TEXT ── */
          .hl-top {
            font-family:'Montserrat',sans-serif; font-weight:300;
            font-size:17px; letter-spacing:2px; text-transform:uppercase;
            color:rgba(255,255,255,0.9); line-height:2.1;
          }
          .hl-top strong { font-weight:700; font-size:20px; color:#ffffff; }
          .hl-bot {
            font-family:'Montserrat',sans-serif; font-weight:300;
            font-size:17px; letter-spacing:2px; text-transform:uppercase;
            color:rgba(255,255,255,0.9); line-height:2.1; text-align:right;
          }
          .hl-accent {
            font-family:'Montserrat',sans-serif; font-weight:800;
            font-size:22px; letter-spacing:1px; text-transform:uppercase;
            color:#f5c842; line-height:1.3; text-align:right;
          }
          .scroll-label {
            font-family:'Montserrat',sans-serif; font-weight:300;
            font-size:9px; letter-spacing:4px; text-transform:uppercase;
            color:rgba(255,255,255,0.4);
          }

          /* Hero text responsive */
          @media (max-width: 480px) {
            .hl-top {
              font-size: 11px;
              letter-spacing: 1.2px;
              line-height: 1.9;
            }
            .hl-top strong {
              font-size: 13px;
            }
            .hl-bot {
              font-size: 11px;
              letter-spacing: 1.2px;
              line-height: 1.9;
            }
            .hl-accent {
              font-size: 15px;
              letter-spacing: 0.8px;
            }
          }

          @media (min-width: 481px) and (max-width: 768px) {
            .hl-top {
              font-size: 13px;
              letter-spacing: 1.5px;
            }
            .hl-top strong {
              font-size: 15px;
            }
            .hl-bot {
              font-size: 13px;
              letter-spacing: 1.5px;
            }
            .hl-accent {
              font-size: 17px;
            }
          }

          /* ── HERO POSITION CLASSES ── */
          .hero-top-left {
            position: absolute;
            top: 52px;
            left: 52px;
          }
          .hero-bottom-right {
            position: absolute;
            bottom: 80px;
            right: 52px;
          }
          .hero-scroll-indicator {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          @media (max-width: 480px) {
            .hero-top-left {
              top: 72px;
              left: 20px;
            }
            .hero-bottom-right {
              bottom: 100px;
              right: 20px;
            }
            .hero-scroll-indicator {
              bottom: 56px;
            }
          }

          @media (min-width: 481px) and (max-width: 768px) {
            .hero-top-left {
              top: 72px;
              left: 28px;
            }
            .hero-bottom-right {
              bottom: 90px;
              right: 28px;
            }
          }

          /* ── CENTER LOGO ── */
          .hero-logo {
            width: 220px;
            height: auto;
          }

          @media (max-width: 480px) {
            .hero-logo {
              width: 130px;
            }
          }

          @media (min-width: 481px) and (max-width: 768px) {
            .hero-logo {
              width: 170px;
            }
          }

          /* ── TAGLINE SECTION ── */
          .tagline-wrap {
            padding: 0 52px;
            max-width: 100%;
            width: 100%;
          }

          @media (max-width: 480px) {
            .tagline-wrap {
              padding: 0 20px;
            }
          }

          @media (min-width: 481px) and (max-width: 768px) {
            .tagline-wrap {
              padding: 0 28px;
            }
          }

          /* ══════════════════════════════════════════════
             BOOK THE FLIGHT — BUTTON
          ══════════════════════════════════════════════ */

          @keyframes shimmerSweep {
            0%   { left: -120%; }
            100% { left: 130%; }
          }
          @keyframes planeFloat {
            0%,100% { transform: translateY(0px) rotate(-40deg); }
            50%      { transform: translateY(-3px) rotate(-40deg); }
          }
          @keyframes planeTakeoff {
            0%   { transform: translateX(0) translateY(0) rotate(-40deg); opacity:1; }
            50%  { transform: translateX(22px) translateY(-14px) rotate(-25deg); opacity:0; }
            51%  { transform: translateX(-18px) translateY(10px) rotate(-40deg); opacity:0; }
            100% { transform: translateX(0) translateY(0) rotate(-40deg); opacity:1; }
          }
          @keyframes ringExpand {
            0%   { transform:scale(1); opacity:0.7; }
            100% { transform:scale(2.2); opacity:0; }
          }
          @keyframes wrapperGlow {
            0%,100% { box-shadow: 0 6px 28px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12); }
            50%      { box-shadow: 0 10px 36px rgba(0,0,0,0.28), 0 4px 14px rgba(0,0,0,0.16); }
          }

          .bfb-wrapper {
            position: fixed;
            bottom: 36px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 150;
            display: flex;
            align-items: center;
            gap: 6px;
            background: rgba(255,255,255,0.18);
            border: 1px solid rgba(255,255,255,0.30);
            border-radius: 100px;
            padding: 5px 5px 5px 5px;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            animation: wrapperGlow 3.5s ease-in-out infinite;
            transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s;
            user-select: none;
          }
          .bfb-wrapper:hover {
            transform: translateX(-50%) translateY(-2px) scale(1.02);
            background: rgba(255,255,255,0.22);
          }
          .bfb-wrapper:active {
            transform: translateX(-50%) scale(0.97);
          }

          @media (max-width: 480px) {
            .bfb-wrapper {
              bottom: 24px;
            }
            .bfb-text-pill {
              padding: 8px 16px !important;
            }
            .bfb-circle {
              width: 38px !important;
              height: 38px !important;
            }
          }

          .bfb-shimmer {
            position: absolute;
            top: 0; bottom: 0;
            width: 50px;
            background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%);
            left: -120%;
            animation: shimmerSweep 3.4s ease-in-out infinite;
            pointer-events: none;
            border-radius: 100px;
            z-index: 2;
          }

          .bfb-text-pill {
            display: flex;
            align-items: center;
            background: rgba(255,255,255,0.92);
            border-radius: 100px;
            padding: 10px 22px;
            position: relative;
            z-index: 1;
          }
          .bfb-label-light {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 12px;
            letter-spacing: 0.04em;
            color: #1a1a1a;
          }
          .bfb-label-bold {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 12px;
            letter-spacing: 0.04em;
            color: #1a1a1a;
          }

          .bfb-circle {
            position: relative;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(255,255,255,0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1a1a1a;
            flex-shrink: 0;
            z-index: 1;
            transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s;
          }
          .bfb-wrapper:hover .bfb-circle {
            background: #ffffff;
            transform: scale(1.06);
          }
          .bfb-circle-clicked {
            animation: ringExpand 0.65s cubic-bezier(0.16,1,0.3,1) forwards !important;
          }

          .bfb-plane {
            display: flex;
            align-items: center;
            justify-content: center;
            animation: planeFloat 2.8s ease-in-out infinite;
          }
          .bfb-plane-hovered {
            animation: planeTakeoff 0.65s cubic-bezier(0.16,1,0.3,1) forwards !important;
          }

          /* ══════════════════════════════════════════════
             SHEET
          ══════════════════════════════════════════════ */

          .sheet-backdrop {
            position: fixed;
            inset: 0;
            z-index: 299;
            background: rgba(0,0,0,0);
            pointer-events: none;
            transition: background 0.5s ease;
            backdrop-filter: blur(0px);
          }
          .sheet-backdrop-visible {
            background: rgba(0,0,0,0.35);
            pointer-events: auto;
            backdrop-filter: blur(3px);
            transition: background 0.5s ease, backdrop-filter 0.5s ease;
          }

          .sheet-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            transform: translateY(100%);
            z-index: 300;
            width: 100%;
            height: 100vh;
            border-radius: 20px 20px 0 0;
            overflow: hidden;
            transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
            box-shadow: 0 -12px 80px rgba(0,0,0,0.32), 0 -2px 16px rgba(0,0,0,0.14);
            background: #eef2ec;
          }
          .sheet-open {
            transform: translateY(0);
          }

          .sheet-close-btn {
            position: fixed;
            top: 20px;
            right: 24px;
            z-index: 310;
            display: flex;
            align-items: center;
            gap: 7px;
            padding: 9px 16px 9px 12px;
            border-radius: 100px;
            border: none;
            background: rgba(14,28,25,0.82);
            backdrop-filter: blur(16px);
            cursor: pointer;
            color: #fff;
            font-family: 'Montserrat', sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            box-shadow: 0 4px 20px rgba(0,0,0,0.25);
            opacity: 0;
            transform: translateY(-16px);
            pointer-events: none;
            transition:
              opacity 0.38s cubic-bezier(0.16,1,0.3,1) 0.18s,
              transform 0.42s cubic-bezier(0.16,1,0.3,1) 0.18s,
              background 0.2s;
          }
          .sheet-close-btn-visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }
          .sheet-close-btn:hover {
            background: rgba(14,28,25,0.96);
          }
          .sheet-close-x {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: rgba(255,255,255,0.12);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s, transform 0.25s;
          }
          .sheet-close-btn:hover .sheet-close-x {
            background: rgba(255,255,255,0.22);
            transform: rotate(90deg);
          }
          .sheet-close-label { line-height: 1; }

          @media (max-width: 480px) {
            .sheet-close-btn {
              top: 12px;
              right: 12px;
              font-size: 10px;
              padding: 7px 12px 7px 10px;
            }
            .sheet-close-label {
              display: none;
            }
          }

          .sheet-inner {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
          }
          .sheet-inner > div {
            width: 100% !important;
            min-height: 100vh;
          }
        `}</style>
      </Head>

      {/* ── FIXED VIDEO BACKGROUND ── */}
      <div style={{ position:'fixed', inset:0, zIndex:0, background:'#060a14', overflow:'hidden' }}>
        <div style={{
          position:'absolute', inset:0,
          transform:`scale(${videoScale})`,
          transformOrigin:'center center',
          willChange:'transform',
          transition:'transform 0.04s linear',
        }}>
          <video autoPlay muted loop playsInline preload="auto"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:1 }}>
            <source src="/magnific_video.mp4" type="video/mp4" />
          </video>
          <img src="/window-masked.png" alt="" aria-hidden="true"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:2, pointerEvents:'none' }} />
        </div>

        {/* Vignette */}
        <div style={{
          position:'absolute', inset:0, zIndex:5, pointerEvents:'none',
          background:`
            radial-gradient(ellipse 65% 65% at 50% 50%, transparent 30%, rgba(0,0,0,0.28) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 65%, rgba(0,0,0,0.6) 100%),
            linear-gradient(to right,  rgba(0,0,0,0.28) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.28) 100%)
          `,
        }} />

        {/* Center logo */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          zIndex:9, pointerEvents:'none',
          opacity:logoOpacity, transition:'opacity 0.08s linear',
        }}>
          <img src="/KAIVO_WHITE_transparent.png" alt="KAIVO" className="hero-logo" />
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <DiceNav navOpacity={navOpacity} />

      {/* ── SCROLLABLE CONTENT ── */}
      <div style={{ position:'relative', zIndex:10 }}>

        {/* Hero screen */}
        <div style={{ height:'100vh', position:'relative' }}>
          <div style={{ opacity:heroOpacity, transition:'opacity 0.08s' }}>

            {/* TOP LEFT */}
            <div className="hero-top-left" style={fadeL}>
              <p className="hl-top">
                <strong>AI-Powered</strong><br />
                Conversational<br />
                Travel Booking<br />
                Agent
              </p>
            </div>

            {/* BOTTOM RIGHT */}
            <div className="hero-bottom-right" style={fadeR}>
              <p className="hl-bot">Delegate &amp; Approve:</p>
              <p className="hl-bot" style={{ marginTop:'4px' }}>Book a Flight in</p>
              <p className="hl-accent">60 Seconds</p>
            </div>

            {/* SCROLL INDICATOR */}
            <div className="hero-scroll-indicator" style={fadeI}>
              <p className="scroll-label">Scroll to explore</p>
              <div style={{ position:'relative', width:'20px', height:'30px' }}>
                <div style={{ width:'20px', height:'30px', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'10px' }} />
                <div style={{
                  width:'3px', height:'6px', background:'rgba(255,255,255,0.7)',
                  borderRadius:'2px', position:'absolute', left:'50%', transform:'translateX(-50%)',
                  animation:'scrollDot 1.6s ease infinite',
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ height:'800px' }} />

        {/* TAGLINE */}
        <div
          className="tagline-wrap"
          style={{
            opacity: textP,
            transform: `translateY(${(1-textP)*60}px)`,
            transition: 'none',
          }}
        >
          <p style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontStyle:'italic',
            fontSize:'clamp(26px, 4.8vw, 72px)',
            fontWeight: textWeight,
            lineHeight: 1.22,
            letterSpacing:'-0.015em',
            color:`rgba(255,255,255,${textAlpha})`,
            transition:'color 0.08s, font-weight 0.08s',
            width:'100%',
          }}>
            Kaivo transforms complex travel planning into one seamless conversation. No endless comparisons. No overwhelming choices. Just intelligent travel designed around how people actually dream, explore, and move through the world.
          </p>
        </div>

        <div style={{ height:'600px' }} />
      </div>

      {/* ── BOOK THE FLIGHT BUTTON ── */}
      <BookFlightButton onClick={() => setSheetOpen(true)} />

      {/* ── HOMEPAGE SLIDE-UP SHEET ── */}
      <HomePageSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  )
}