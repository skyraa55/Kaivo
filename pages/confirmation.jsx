"use client";

import { useState, useEffect } from "react";

/* ── Read search params — client-side only, guarded with isMounted ── */
function useSearchQuery() {
  const [params, setParams] = useState({
    from: "", to: "", date: "", travelers: "", cabin: "",
  });

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setParams({
      from:      sp.get("from")      || sp.get("fromCode") || "",
      to:        sp.get("to")        || sp.get("toCode")   || "",
      date:      sp.get("date")      || "",
      travelers: sp.get("travelers") || "",
      cabin:     sp.get("cabin")     || "",
    });
  }, []);

  return params;
}

/* ══════════════════════════════════════════
   SHARED DATA / CONFIG
══════════════════════════════════════════ */
const DEFAULT_BOOKING = {
  passenger:     "Alex Abramovic",
  email:         "alex.abramovic@yahoo.com",
  payment:       "KAIVO Card •••• 7890",
  ticketCode:    "FLT-QMXYXN",
  airline:       "American Airlines",
  from:          "MIA",
  to:            "New York",
  toCode:        "LGA",
  totalPaid:     "$90.88",
  paymentAmount: "$146.88",
  destination:   "New York",
  status:        "Confirmed",
  date:          "Jun 12",
  travelers:     "1 traveler",
  cabin:         "ECONOMY",
};

/* ══════════════════════════════════════════
   MICRO ICONS
══════════════════════════════════════════ */
function IconCheck({ size = 12, color = "#10b981" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconPlane({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

function IconPerson({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#9ca3af">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function IconMail({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#9ca3af">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function IconCard({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#9ca3af">
      <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
    </svg>
  );
}

function IconCal({ size = 18, color = "#6b7280" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  );
}

function IconShare({ size = 18, color = "#6b7280" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

function IconReceipt({ size = 18, color = "#6b7280" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z" />
    </svg>
  );
}

function IconTrack({ size = 18, color = "#6b7280" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}

function IconSettings({ size = 18, color = "#9ca3af" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </svg>
  );
}

function IconLogout({ size = 18, color = "#9ca3af" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

function IconStar({ size = 16, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════ */
const SIDEBAR_NAV = [
  { path: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z", active: false },
  { path: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z", active: true },
  { path: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z", active: false },
  { path: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z", active: false },
  { path: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z", active: false },
];

function Sidebar() {
  return (
    <div
      className="conf-sidebar"
      style={{
        width: 52,
        flexShrink: 0,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 14,
        paddingBottom: 16,
        gap: 4,
        zIndex: 10,
        borderRight: "1px solid #f0f0f0",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        /* KEY FIX: sidebar must fill the full height of its flex parent */
        alignSelf: "stretch",
      }}
    >
      {/* Logo */}
      <div style={{
        width: 34, height: 34, borderRadius: "50%", background: "#1a3a35",
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
        flexShrink: 0,
      }}>
        <IconPlane size={15} color="#c8f135" />
      </div>

      {SIDEBAR_NAV.map((ic, i) => (
        <div key={i} style={{
          width: 36, height: 36, borderRadius: 10, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: ic.active ? "#f0f7f4" : "transparent",
          color: ic.active ? "#1a3a35" : "#c0c6ce",
          transition: "all 0.15s",
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d={ic.path} />
          </svg>
        </div>
      ))}

      <div style={{ flex: 1 }} />

      <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
        <IconSettings size={18} color="#c0c6ce" />
      </div>
      <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
        <IconLogout size={18} color="#c0c6ce" />
      </div>
      <div style={{
        width: 34, height: 34, borderRadius: "50%", background: "#1a3a35",
        display: "flex", alignItems: "center", justifyContent: "center", marginTop: 4,
        flexShrink: 0,
      }}>
        <IconStar size={15} color="#c8f135" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TOP NAV BAR
══════════════════════════════════════════ */
function TopNav({ booking }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "9px 20px",
      background: "rgba(255,255,255,0.82)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      flexShrink: 0,
      flexWrap: "wrap",
      gap: 8,
      minHeight: 50,
    }}>
      {/* Left: avatar + route breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "linear-gradient(135deg,#1a3a35,#2a5248)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#c8f135" }}>k</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#9ca3af", fontSize: 13, flexWrap: "wrap" }}>
          {booking.from && (
            <>
              <span style={{ fontWeight: 700, color: "#1a3a35", fontSize: 13 }}>{booking.from}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#9ca3af">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
              <span style={{ fontWeight: 700, color: "#1a3a35", fontSize: 13 }}>{booking.to}</span>
              <span style={{ color: "#d1d5db" }}>·</span>
            </>
          )}
          <span style={{ color: "#6b7280" }}>Flexible dates</span>
          <span style={{ color: "#d1d5db" }}>·</span>
          <span style={{ color: "#6b7280" }}>{booking.travelers}</span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="conf-topnav-extras" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          border: "1px solid #e5e7eb", borderRadius: 999, padding: "5px 14px",
          fontSize: 12, fontWeight: 600, color: "#374151", background: "#fff",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
        }}>
          {booking.cabin}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#374151"><path d="M7 10l5 5 5-5z" /></svg>
        </div>
        <button style={{
          width: 30, height: 30, border: "1px solid #e5e7eb", borderRadius: "50%",
          background: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#9ca3af">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
        <button style={{
          display: "flex", alignItems: "center", gap: 5, padding: "6px 14px",
          border: "1px solid #e5e7eb", borderRadius: 999, background: "#fff",
          fontSize: 12, fontWeight: 600, color: "#374151", cursor: "pointer",
        }}>
          <span style={{ fontSize: 14 }}>+</span> NEW SEARCH
        </button>
        <button style={{
          width: 30, height: 30, borderRadius: "50%",
          background: "transparent", border: "1px solid #e5e7eb",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#9ca3af">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SECTION 1 — KAIVO IS EXECUTING
══════════════════════════════════════════ */
function ExecutingSection({ booking }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, width: "100%", maxWidth: 540 }}>
      {/* 9:13 PM */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "#c9cdd4", marginBottom: 6, textAlign: "center" }}>9:13 PM</div>
        <div style={S.pill}>
          <IconCheck size={12} color="#10b981" />
          <span style={S.pillText}>Traveler confirmed</span>
        </div>
      </div>

      {/* AI bubble */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 14 }}>
        <div style={S.aiAvatar}>
          <IconPlane size={12} color="#1a3a35" />
        </div>
        <div style={S.aiBubble}>
          A few things before I finalize your booking.
        </div>
      </div>

      {/* 9:15 PM */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "#c9cdd4", marginBottom: 6, textAlign: "center" }}>9:15 PM</div>
        <div style={S.pill}>
          <IconCheck size={12} color="#10b981" />
          <span style={S.pillText}>Extras reviewed</span>
        </div>
      </div>

      {/* AI bubble */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 14 }}>
        <div style={S.aiAvatar}>
          <IconPlane size={12} color="#1a3a35" />
        </div>
        <div style={S.aiBubble}>
          Everything's ready. Authorize Kaivo to complete the booking.
        </div>
      </div>

      {/* 9:15 PM */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "#c9cdd4", marginBottom: 6, textAlign: "center" }}>9:15 PM</div>
        <div style={S.pill}>
          <IconCheck size={12} color="#10b981" />
          <span style={S.pillText}>Payment approved  {booking.paymentAmount}</span>
        </div>
      </div>

      {/* Executing card */}
      <div style={S.execCard}>
        <div style={S.execHeader}>
          <span style={S.execTitle}>KAIVO IS EXECUTING</span>
          <span style={S.execCount}>8/8</span>
        </div>
        <div style={S.execRow}>
          <IconCheck size={13} color="#10b981" />
          <span style={{ ...S.execText, color: "#9ca3af" }}>Adding trip to My Flights</span>
        </div>
        <div style={S.execRow}>
          <span style={{
            width: 9, height: 9, borderRadius: "50%",
            background: "#111", display: "inline-block", flexShrink: 0,
          }} />
          <span style={{ ...S.execText, fontWeight: 600 }}>Booking confirmed</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   NYC HERO IMAGE
══════════════════════════════════════════ */
function NycHero({ destination }) {
  return (
    <div style={{
      height: 88,
      background: "linear-gradient(135deg,#0f1e2b 0%,#1a2f3f 40%,#1a3a35 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 50,
        background: "rgba(0,0,0,0.25)",
        clipPath: "polygon(0 60%,3% 40%,6% 45%,9% 20%,11% 25%,14% 10%,16% 15%,18% 5%,20% 15%,22% 8%,25% 20%,28% 15%,30% 30%,33% 25%,36% 35%,40% 20%,42% 28%,45% 15%,48% 25%,52% 10%,54% 20%,57% 12%,60% 22%,62% 18%,65% 30%,68% 22%,70% 35%,73% 28%,76% 38%,80% 30%,82% 42%,85% 35%,88% 45%,91% 38%,94% 48%,97% 40%,100% 50%,100% 100%,0 100%)",
      }} />
      <div style={{ position: "absolute", bottom: 12, left: 16 }}>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 2 }}>TRIP TO</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>{destination}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   BOTTOM ACTION STRIP
══════════════════════════════════════════ */
function BottomActionStrip() {
  const actions = [
    { icon: <IconCal size={20} />, label: "Calendar" },
    { icon: <IconShare size={20} />, label: "Share" },
    { icon: <IconReceipt size={20} />, label: "Receipt" },
    { icon: <IconTrack size={20} />, label: "Track" },
  ];
  return (
    <div style={{
      display: "flex", justifyContent: "space-around",
      padding: "12px 0 14px",
      borderTop: "1px solid #f3f4f6",
    }}>
      {actions.map((a) => (
        <button key={a.label} style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          background: "none", border: "none", cursor: "pointer",
          color: "#6b7280",
        }}>
          {a.icon}
          <span style={{ fontSize: 10, color: "#9ca3af" }}>{a.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   SECTION 2 — RECEIPT CARD
══════════════════════════════════════════ */
function ReceiptSection({ booking }) {
  return (
    <div style={{ width: "100%", maxWidth: 540 }}>
      <div style={S.receiptCard}>

        {/* PASSENGER */}
        <div style={S.receiptRow}>
          <div style={S.receiptIconWrap}><IconPerson size={14} /></div>
          <div>
            <div style={S.receiptLabel}>PASSENGER</div>
            <div style={S.receiptValue}>{booking.passenger}</div>
          </div>
        </div>

        {/* CONFIRMATION */}
        <div style={S.receiptRow}>
          <div style={S.receiptIconWrap}><IconMail size={14} /></div>
          <div>
            <div style={S.receiptLabel}>CONFIRMATION</div>
            <div style={S.receiptValue}>{booking.email}</div>
          </div>
        </div>

        {/* PAYMENT */}
        <div style={{ ...S.receiptRow, borderBottom: "1px solid #f3f4f6", paddingBottom: 14 }}>
          <div style={S.receiptIconWrap}><IconCard size={14} /></div>
          <div>
            <div style={S.receiptLabel}>PAYMENT</div>
            <div style={S.receiptValue}>{booking.payment}</div>
          </div>
        </div>

        {/* E-ticket row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px 2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconCheck size={12} color="#10b981" />
            <span style={{ fontSize: 11, color: "#6b7280" }}>E-ticket issued · emailed</span>
          </div>
          <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.04em" }}>{booking.ticketCode}</span>
        </div>
        <div style={{ fontSize: 10, color: "#9ca3af", padding: "0 16px 10px" }}>
          Boarding pass available after airline check-in.
        </div>

        <NycHero destination={booking.destination} />

        {/* Flight row */}
        <div style={{ padding: "12px 16px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 14, height: 14, borderRadius: "50%", background: "#10b981",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <IconCheck size={9} color="#fff" />
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: 5, background: "#fee2e2",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <IconPlane size={12} color="#dc2626" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{booking.airline}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                fontSize: 10, fontWeight: 600, color: "#059669",
                background: "#ecfdf5", padding: "2px 8px", borderRadius: 99,
              }}>{booking.status}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#9ca3af">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", paddingLeft: 44, marginTop: 2, paddingBottom: 10 }}>
            {booking.from} → {booking.to}
          </div>
        </div>

        {/* Total */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 16px", borderTop: "1px solid #f3f4f6",
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em" }}>TOTAL PAID</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#111" }}>{booking.totalPaid}</span>
        </div>

        <div style={{ padding: "0 16px 16px" }}>
          <button style={{
            width: "100%", padding: "13px", borderRadius: 999,
            background: "#134e4a", color: "#fff", border: "none",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>
            View trip
          </button>
        </div>

        <BottomActionStrip />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SECTION 3 — CONFIRMED
══════════════════════════════════════════ */
function ConfirmedSection({ booking }) {
  return (
    <div style={{ width: "100%", maxWidth: 540, display: "flex", flexDirection: "column", gap: 12 }}>

      <div style={S.receiptCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px 2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconCheck size={12} color="#10b981" />
            <span style={{ fontSize: 11, color: "#6b7280" }}>E-ticket issued · emailed</span>
          </div>
          <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600 }}>{booking.ticketCode}</span>
        </div>
        <div style={{ fontSize: 10, color: "#9ca3af", padding: "0 16px 10px" }}>
          Boarding pass available after airline check-in.
        </div>

        <NycHero destination={booking.destination} />

        <div style={{ padding: "12px 16px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 14, height: 14, borderRadius: "50%", background: "#10b981",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <IconCheck size={9} color="#fff" />
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: 5, background: "#fee2e2",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <IconPlane size={12} color="#dc2626" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{booking.airline}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                fontSize: 10, fontWeight: 600, color: "#059669",
                background: "#ecfdf5", padding: "2px 8px", borderRadius: 99,
              }}>{booking.status}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#9ca3af">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", paddingLeft: 44, marginTop: 2, paddingBottom: 10 }}>
            {booking.from} → {booking.to}
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 16px", borderTop: "1px solid #f3f4f6",
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em" }}>TOTAL PAID</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#111" }}>{booking.totalPaid}</span>
        </div>

        <div style={{ padding: "0 16px 16px" }}>
          <button style={{
            width: "100%", padding: "13px", borderRadius: 999,
            background: "#134e4a", color: "#fff", border: "none",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>
            View trip
          </button>
        </div>

        <BottomActionStrip />
      </div>

      {/* AI confirmation bubble */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={S.aiAvatar}>
          <IconPlane size={12} color="#1a3a35" />
        </div>
        <div style={{
          background: "#fff",
          border: "1px solid #e9ebee",
          borderRadius: "4px 16px 16px 16px",
          padding: "12px 16px",
          fontSize: 14,
          color: "#374151",
          lineHeight: 1.5,
          flex: 1,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          Your trip to {booking.destination} is confirmed. I'll notify you when check-in becomes available.
        </div>
      </div>
      <div style={{ fontSize: 11, color: "#c9cdd4", marginLeft: 42, marginTop: -4 }}>9:15 PM</div>

      {/* Action pills */}
      <div className="conf-pill-row" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginLeft: 42 }}>
        {[
          { label: "Add to calendar" },
          { label: "Share trip", prefix: "⬆" },
          { label: "Download receipt" },
          { label: "Track check-in" },
        ].map((p) => (
          <button key={p.label} style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "7px 14px", borderRadius: 999,
            border: "1px solid #e5e7eb", background: "#fff",
            fontSize: 12, fontWeight: 500, color: "#374151",
            cursor: "pointer", whiteSpace: "nowrap",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}>
            {p.prefix && <span style={{ fontSize: 11 }}>{p.prefix}</span>}
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   BOTTOM INPUT BAR
══════════════════════════════════════════ */
function BottomInputBar() {
  const [val, setVal] = useState("");
  return (
    <div style={{
      background: "rgba(255,255,255,0.96)",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      padding: "10px 20px 10px",
      backdropFilter: "blur(12px)",
      flexShrink: 0,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: 999,
        padding: "8px 14px",
        maxWidth: 700,
        margin: "0 auto",
      }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#9ca3af">
            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V6H9v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S6 2.79 6 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
          </svg>
        </button>
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Ask anything..."
          style={{
            flex: 1, border: "none", background: "transparent", outline: "none",
            fontSize: 14, color: "#374151",
          }}
        />
        <button style={{
          width: 28, height: 28, borderRadius: "50%",
          background: val ? "#1a3a35" : "#d1d5db",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
          </svg>
        </button>
      </div>
      <div className="conf-topnav-extras" style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 6, fontSize: 10, color: "#d1d5db" }}>
        <span>⌘K command</span><span>·</span>
        <span>⌘↵ send</span><span>·</span>
        <span>Paste images</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SHARED STYLES
══════════════════════════════════════════ */
const S = {
  pill: {
    display: "inline-flex", alignItems: "center", gap: 7,
    background: "#fff", border: "1px solid #e9ebee",
    borderRadius: 999, padding: "6px 14px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  pillText: { fontSize: 12, color: "#6b7280" },

  aiAvatar: {
    width: 28, height: 28, borderRadius: "50%",
    background: "linear-gradient(135deg,#1a3a35,#2a5248)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },

  aiBubble: {
    background: "#fff",
    border: "1px solid #e9ebee",
    borderRadius: "4px 16px 16px 16px",
    padding: "12px 16px",
    fontSize: 14,
    color: "#374151",
    lineHeight: 1.5,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    flex: 1,
  },

  execCard: {
    background: "#fff",
    border: "1px solid #e9ebee",
    borderRadius: 14,
    padding: "14px 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  execHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 10,
  },
  execTitle: { fontSize: 10, fontWeight: 700, color: "#374151", letterSpacing: "0.07em" },
  execCount: { fontSize: 11, color: "#9ca3af" },
  execRow: { display: "flex", alignItems: "center", gap: 9, padding: "4px 0" },
  execText: { fontSize: 13, color: "#374151" },

  receiptCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  receiptRow: {
    display: "flex", alignItems: "flex-start", gap: 12,
    padding: "13px 16px",
    borderBottom: "1px solid #f9fafb",
  },
  receiptIconWrap: {
    width: 28, height: 28, borderRadius: "50%",
    background: "#f3f4f6",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, marginTop: 1,
  },
  receiptLabel: { fontSize: 9, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", marginBottom: 2 },
  receiptValue: { fontSize: 14, fontWeight: 600, color: "#111827" },
};

/* ══════════════════════════════════════════
   GLOBAL STYLES  (injected once, client-side only)
   FIX: Using dangerouslySetInnerHTML with suppressHydrationWarning
   avoids the server/client HTML mismatch caused by HTML-encoding
   of "<" inside <style> text content.
══════════════════════════════════════════ */
const GLOBAL_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  .conf-scroll::-webkit-scrollbar { width: 4px; }
  .conf-scroll::-webkit-scrollbar-track { background: transparent; }
  .conf-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
  button:focus { outline: none; }

  @media (max-width: 640px) {
    .conf-sidebar { display: none !important; }
    .conf-main { padding: 12px !important; }
    .conf-topnav-extras { display: none !important; }
  }
  @media (max-width: 480px) {
    .conf-pill-row { gap: 6px !important; }
    .conf-pill-row button { font-size: 11px !important; padding: 6px 10px !important; }
  }
`;

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function Confirmation({ bookingData }) {
  // useSearchQuery reads window.location — safe because it only runs after mount (useEffect)
  const query = useSearchQuery();

  const booking = {
    ...DEFAULT_BOOKING,
    ...bookingData,
    ...(query.from      && { from: query.from }),
    ...(query.to        && { to: query.to, destination: query.to }),
    ...(query.date      && { date: query.date }),
    ...(query.travelers && { travelers: query.travelers }),
    ...(query.cabin     && { cabin: query.cabin.toUpperCase() }),
  };

  return (
    /*
     * Root wrapper:
     *   - position: fixed + inset: 0  →  fills the full viewport on every device
     *   - overflow: hidden            →  prevents double scrollbars
     *   - display: flex               →  sidebar + main side by side
     */
    <div style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif",
      background: "linear-gradient(135deg,#eef2f7 0%,#f4f6fb 50%,#edf2f7 100%)",
      overflow: "hidden",
    }}>
      {/*
       * FIX for hydration error:
       * dangerouslySetInnerHTML bypasses React's text-node reconciliation,
       * so the server and client never disagree about "<" vs "&lt;" inside
       * the style string.  suppressHydrationWarning is an extra safety net.
       */}
      <style
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }}
      />

      {/* Sidebar — alignSelf: stretch makes it fill the full height automatically */}
      <Sidebar />

      {/* Right column: topnav + scrollable content + input bar */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: 0,
      }}>
        <TopNav booking={booking} />

        {/* Scrollable chat area */}
        <div
          className="conf-scroll"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: "28px 20px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          <ExecutingSection booking={booking} />

          <div style={{ width: "100%", maxWidth: 540, height: 1, background: "rgba(0,0,0,0.06)" }} />

          <ReceiptSection booking={booking} />

          <div style={{ width: "100%", maxWidth: 540, height: 1, background: "rgba(0,0,0,0.06)" }} />

          <ConfirmedSection booking={booking} />
        </div>

        <BottomInputBar />
      </div>
    </div>
  );
}