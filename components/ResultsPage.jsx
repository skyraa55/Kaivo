"use client";
import { useState } from "react";

const FLIGHTS = [
  {
    id: 1,
    airline: "American Airlines",
    airlineLogo: "AA",
    logoColor: "#cc0000",
    tag: "RECOMMENDED",
    tagColor: "#1a3a35",
    departure: "08:35 PM",
    arrival: "11:38 PM",
    duration: "3H 3M",
    stops: "NONSTOP",
    fromCode: "MIA",
    toCode: "LGA",
    date: "JUN 12",
    price: 91,
    cabin: "ECONOMY",
  },
  {
    id: 2,
    airline: "American Airlines",
    airlineLogo: "AA",
    logoColor: "#cc0000",
    tag: "CHEAPEST",
    tagColor: "#1a6640",
    departure: "07:45 PM",
    arrival: "10:50 PM",
    duration: "3H 5M",
    stops: "NONSTOP",
    fromCode: "MIA",
    toCode: "LGA",
    date: "JUN 12",
    price: 91,
    cabin: "ECONOMY",
  },
  {
    id: 3,
    airline: "American Airlines",
    airlineLogo: "AA",
    logoColor: "#cc0000",
    tag: "BEST TIMING",
    tagColor: "#1a3a35",
    departure: "08:35 PM",
    arrival: "11:38 PM",
    duration: "3H 3M",
    stops: "NONSTOP",
    fromCode: "MIA",
    toCode: "LGA",
    date: "JUN 12",
    price: 303,
    cabin: "FIRST",
  },
];

const FLEXIBLE_DATES = [
  { day: "TUE", date: "Jun 10", tag: "CHEAPEST", price: 91 },
  { day: "WED", date: "Jun 11", tag: "CHEAPEST", price: 91 },
  { day: "THU", date: "Jun 12", tag: "CHEAPEST", price: 91 },
  { day: "FRI", date: "Jun 13", tag: "CHEAPEST", price: 91 },
  { day: "SAT", date: "Jun 14", tag: "CHEAPEST", price: 91 },
  { day: "SUN", date: "Jun 15", price: 124 },
  { day: "MON", date: "Jun 16", price: 118 },
];

const SIDEBAR_ICONS = [
  { active: true,  path: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" },
  { active: false, path: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" },
  { active: false, path: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" },
  { active: false, path: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" },
  { active: false, path: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" },
];

const PlaneIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

export default function ResultsPage() {
  const fromCode = "MIA";
  const toCode = "LGA";

  const [selectedFlight, setSelectedFlight] = useState(1);
  const [expandedFlight, setExpandedFlight] = useState(1);
  const [selectedDate, setSelectedDate] = useState(2);
  const [aiQuery, setAiQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDates, setShowDates] = useState(true);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f0f2f5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .font-syne { font-family: 'Syne', sans-serif; }
        .scrollable { overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.1) transparent; }
        .scrollable::-webkit-scrollbar { width: 4px; }
        .scrollable::-webkit-scrollbar-track { background: transparent; }
        .scrollable::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
        .ai-input { border: none; outline: none; background: transparent; font-size: 13px; flex: 1; color: #111827; font-family: 'DM Sans', sans-serif; width: 100%; min-width: 0; }
        .ai-input::placeholder { color: #aab0bc; }
        .flight-card { transition: border-color 0.2s, box-shadow 0.2s; }
        .date-chip { transition: transform 0.15s, box-shadow 0.15s; }
        .date-chip:hover { transform: scale(1.04); }
        .icon-btn { transition: background 0.15s, color 0.15s; }
        .book-btn { transition: background 0.2s, transform 0.15s; }
        .book-btn:hover { background: #2a5248 !important; transform: scale(1.02); }
        .sidebar-icon { transition: background 0.15s, color 0.15s; }
        .sidebar-icon:hover { background: rgba(255,255,255,0.08); color: #fff !important; }

        /* ── Layout ── */
        .app-shell {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        /* Sidebar — visible md+ */
        .sidebar {
          width: 64px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 0;
          gap: 8px;
          background: linear-gradient(180deg, #1a3a35 0%, #0f2420 100%);
          box-shadow: 2px 0 20px rgba(0,0,0,0.15);
          z-index: 20;
        }

        /* Main content column */
        .main-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }

        /* Top bar */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          flex-shrink: 0;
          gap: 12px;
          flex-wrap: wrap;
        }

        .topbar-route {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Scroll area */
        .content-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.1) transparent;
        }
        .content-scroll::-webkit-scrollbar { width: 4px; }
        .content-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }

        /* Flight card layout */
        .flight-card-inner {
          display: grid;
          grid-template-columns: 180px 1fr 120px;
          align-items: center;
          padding: 16px 20px;
          gap: 16px;
        }

        /* Bottom bar */
        .bottom-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          border-top: 1px solid rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .bottom-bar-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 200px;
        }

        .bottom-bar-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        /* ── Responsive breakpoints ── */

        /* Tablet: hide sidebar, collapse some elements */
        @media (max-width: 900px) {
          .sidebar { display: none; }
          .topbar { padding: 10px 16px; }
          .content-scroll { padding: 14px 16px; }
          .bottom-bar { padding: 10px 16px; }
        }

        /* Medium-small: adjust flight card grid */
        @media (max-width: 720px) {
          .flight-card-inner {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            gap: 10px 12px;
            padding: 14px 16px;
          }
          .flight-airline-col { grid-column: 1; grid-row: 1; }
          .flight-price-col   { grid-column: 2; grid-row: 1 / 3; align-self: center; }
          .flight-times-col   { grid-column: 1; grid-row: 2; }
          .cabin-badge { display: none; }
          .topbar-meta { display: none; }
        }

        /* Mobile: compact everything */
        @media (max-width: 480px) {
          .topbar { padding: 10px 12px; gap: 8px; }
          .content-scroll { padding: 10px 12px; gap: 10px; }
          .bottom-bar { padding: 10px 12px; gap: 8px; }
          .bottom-bar-action-label { display: none; }
          .new-search-label { display: none; }
          .flight-card-inner { padding: 12px; gap: 8px 10px; }
          .depart-time, .arrive-time { font-size: 20px !important; }
          .duration-text { font-size: 9px !important; }
          .price-amount { font-size: 18px !important; }
          .cheapest-price { font-size: 16px !important; }
        }

        /* Very small */
        @media (max-width: 360px) {
          .depart-time, .arrive-time { font-size: 17px !important; }
          .price-amount { font-size: 16px !important; }
        }

        /* Mobile nav bar at the bottom (replaces sidebar) */
        .mobile-nav {
          display: none;
        }
        @media (max-width: 900px) {
          .mobile-nav {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 8px 0 max(8px, env(safe-area-inset-bottom));
            background: linear-gradient(180deg, #1a3a35 0%, #0f2420 100%);
            flex-shrink: 0;
            position: relative;
            z-index: 10;
          }
          .app-shell { flex-direction: column; }
          .main-col { flex: 1; min-height: 0; }
        }
      `}</style>

      <div className="app-shell">

        {/* ── Desktop Sidebar ── */}
        <div className="sidebar">
          {/* Logo */}
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#c8f135", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <PlaneIcon size={18} color="#1a3a35" />
          </div>

          {SIDEBAR_ICONS.map((icon, i) => (
            <div
              key={i}
              className="sidebar-icon"
              style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, cursor: "pointer", color: icon.active ? "#c8f135" : "#9aa0ab" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={icon.path} /></svg>
            </div>
          ))}

          <div style={{ flex: 1 }} />

          {[
            "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z",
            "M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z",
          ].map((path, i) => (
            <div key={i} className="sidebar-icon" style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, cursor: "pointer", color: "#9aa0ab" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>
            </div>
          ))}

          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#c8f135", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a3a35">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        </div>

        {/* ── Main Column ── */}
        <div className="main-col">

          {/* Top Bar */}
          <div className="topbar">
            <div className="topbar-route">
              {/* Mobile logo */}
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1a3a35", display: "flex", alignItems: "center", justifyContent: "center" }} className="mobile-only">
                <PlaneIcon size={13} color="#c8f135" />
              </div>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#c8f135", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PlaneIcon size={13} color="#1a3a35" />
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#1a3a35" }}>{fromCode}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#9aa0ab">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#1a3a35" }}>{toCode}</span>
              <span className="topbar-meta" style={{ fontSize: 12, color: "#9aa0ab" }}>· Jun 12 · 1 traveler</span>
            </div>

            <div className="topbar-actions">
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 10, border: "1px solid rgba(26,58,53,0.15)", background: "rgba(26,58,53,0.06)", color: "#1a3a35", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" }}>
                ECONOMY
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a3a35"><path d="M7 10l5 5 5-5z" /></svg>
              </div>

              <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#9aa0ab", lineHeight: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>

              <button
                className="book-btn"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, fontSize: 11, fontWeight: 700, color: "white", background: "#1a3a35", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", whiteSpace: "nowrap" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                </svg>
                <span className="new-search-label">+ NEW SEARCH</span>
                <span style={{ display: "none" }} className="new-search-short">+</span>
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="content-scroll">

            {/* Flight Cards */}
            {FLIGHTS.map((flight) => {
              const isSelected = selectedFlight === flight.id;
              const isExpanded = expandedFlight === flight.id;

              return (
                <div
                  key={flight.id}
                  className="flight-card"
                  onClick={() => setSelectedFlight(flight.id)}
                  style={{
                    background: "white",
                    borderRadius: 18,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: isSelected ? "1.5px solid #1a3a35" : "1.5px solid rgba(0,0,0,0.05)",
                    boxShadow: isSelected ? "0 4px 20px rgba(26,58,53,0.10)" : "none",
                  }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = "rgba(26,58,53,0.2)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)"; e.currentTarget.style.boxShadow = "none"; } }}
                >
                  <div className="flight-card-inner">
                    {/* Airline */}
                    <div className="flight-airline-col" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: flight.logoColor, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>
                          {flight.airlineLogo}
                        </div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", lineHeight: 1.2 }}>{flight.airline}</div>
                          {flight.tag && (
                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.07em", background: `${flight.tagColor}15`, color: flight.tagColor, border: `1px solid ${flight.tagColor}30`, borderRadius: 4, padding: "1px 6px", display: "inline-block", marginTop: 2 }}>
                              · {flight.tag}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Times */}
                    <div className="flight-times-col" style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                      <div style={{ textAlign: "left", flexShrink: 0 }}>
                        <div className="font-syne depart-time" style={{ fontSize: 26, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{flight.departure}</div>
                        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#9aa0ab", marginTop: 2 }}>{flight.fromCode}</div>
                        <div style={{ fontSize: 11, color: "#9aa0ab" }}>{flight.date}</div>
                      </div>

                      <div style={{ flex: 1, textAlign: "center", minWidth: 0 }}>
                        <div className="duration-text" style={{ fontSize: 10, fontWeight: 500, color: "#9aa0ab", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                          {flight.duration} · {flight.stops}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "4px 0" }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9aa0ab", flexShrink: 0 }} />
                          <div style={{ flex: 1, height: 1, background: "#d1d5db", position: "relative" }}>
                            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                              <PlaneIcon size={12} color="#6b7280" />
                            </div>
                          </div>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9aa0ab", flexShrink: 0 }} />
                        </div>
                        <div className="cabin-badge" style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#9aa0ab" }}>{flight.cabin}</div>
                      </div>

                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div className="font-syne arrive-time" style={{ fontSize: 26, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{flight.arrival}</div>
                        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#9aa0ab", marginTop: 2 }}>{flight.toCode}</div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flight-price-col" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      {isSelected && (
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#c8f135", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="#1a3a35"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                        </div>
                      )}
                      <div className="font-syne price-amount" style={{ fontSize: 22, fontWeight: 800, color: "#1a3a35", lineHeight: 1 }}>${flight.price}</div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setExpandedFlight(isExpanded ? null : flight.id); }}
                        style={{ display: "flex", alignItems: "center", gap: 2, background: "transparent", border: "none", cursor: "pointer", color: "#9aa0ab", fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}
                      >
                        Details
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                          <path d="M7 10l5 5 5-5z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isExpanded && (
                    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 20px", background: "rgba(26,58,53,0.03)", borderTop: "1px solid rgba(0,0,0,0.05)", flexWrap: "wrap" }}>
                      {[
                        { icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", label: "Terminal B · Gate 22" },
                        { icon: "M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.53 15.52.01 12.35 0 9 0 6 3 6 6.65V7H2v13h20V7h-2zm-8 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z", label: "Carry-on included" },
                        { icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z", label: "Boeing 737-800" },
                        { icon: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z", label: "On-time 89%" },
                      ].map((chip, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#6b7280" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d={chip.icon} /></svg>
                          {chip.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Flexible Dates */}
            <div style={{ background: "white", borderRadius: 18, border: "1px solid rgba(0,0,0,0.05)", padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#9aa0ab", textTransform: "uppercase" }}>
                  Flexible Dates
                </div>
                <button
                  onClick={() => setShowDates(v => !v)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#9aa0ab", display: "flex", alignItems: "center", gap: 2, fontSize: 11 }}
                >
                  {showDates ? "Hide" : "Show"}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: showDates ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
              </div>

              {showDates && (
                <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                  {FLEXIBLE_DATES.map((d, i) => (
                    <div
                      key={i}
                      className="date-chip"
                      onClick={() => setSelectedDate(i)}
                      style={{
                        minWidth: 76,
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "10px 12px",
                        borderRadius: 12,
                        cursor: "pointer",
                        background: d.tag ? "rgba(200,241,53,0.12)" : "white",
                        border: `1.5px solid ${selectedDate === i ? "#1a3a35" : d.tag ? "#c8f135" : "rgba(0,0,0,0.08)"}`,
                        outline: selectedDate === i ? "2px solid #1a3a35" : "none",
                        outlineOffset: 2,
                      }}
                    >
                      {d.tag && (
                        <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.07em", background: "#c8f135", color: "#1a3a35", borderRadius: 4, padding: "1px 5px", marginBottom: 3 }}>
                          {d.tag}
                        </div>
                      )}
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#9aa0ab" }}>{d.day}</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#1a3a35", whiteSpace: "nowrap" }}>{d.date}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: d.tag ? "#1a6640" : "#6b7280", marginTop: 2 }}>${d.price}</div>
                    </div>
                  ))}

                  <div
                    style={{ minWidth: 76, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "10px 12px", borderRadius: 12, cursor: "pointer", background: "rgba(26,58,53,0.04)", border: "1.5px solid rgba(0,0,0,0.08)", color: "#9aa0ab", fontSize: 11 }}
                  >
                    +3 days
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="bottom-bar">
            {/* AI Input */}
            <div
              className="bottom-bar-left"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 12, border: "1.5px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.9)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#9aa0ab" style={{ flexShrink: 0 }}>
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              <input
                className="ai-input"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask anything..."
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#9aa0ab" style={{ flexShrink: 0 }}>
                <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
              </svg>
            </div>

            {/* Cheapest price */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span className="font-syne cheapest-price" style={{ fontSize: 18, fontWeight: 800, color: "#1a3a35" }}>$90.88</span>
              <span style={{ fontSize: 12, color: "#9aa0ab", whiteSpace: "nowrap" }} className="topbar-meta">American Airlines</span>
            </div>

            {/* Actions */}
            <div className="bottom-bar-right">
              {[
                { icon: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z", label: "Track" },
                { icon: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z", label: "Dates" },
                { icon: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z", label: "All flights" },
              ].map((btn, i) => (
                <button
                  key={i}
                  className="icon-btn"
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", background: "white", color: "#555e6b", fontFamily: "'DM Sans', sans-serif", fontSize: 12, cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a3a35"; e.currentTarget.style.color = "#1a3a35"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.color = "#555e6b"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={btn.icon} /></svg>
                  <span className="bottom-bar-action-label">{btn.label}</span>
                </button>
              ))}

              <button
                className="book-btn"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "white", background: "#1a3a35", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}
              >
                Book flight
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Bottom Nav (replaces sidebar on small screens) ── */}
        <div className="mobile-nav">
          {SIDEBAR_ICONS.map((icon, i) => (
            <div
              key={i}
              style={{ padding: "8px 16px", color: icon.active ? "#c8f135" : "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={icon.path} /></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}