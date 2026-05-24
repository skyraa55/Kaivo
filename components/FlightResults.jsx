import { useState } from "react";
import { useRouter } from "next/router";

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */
const buildFlights = (from, to) => [
  {
    id: 0,
    airline: "American Airlines",
    badge: "RECOMMENDED",
    badgeColor: "#059669",
    badgeBg: "#d1fae5",
    flight: "AA1423",
    depart: "08:35 PM",
    arrive: "11:38 PM",
    departCode: from || "MIA",
    arriveCode: to || "LGA",
    duration: "3h 3m",
    stops: "Nonstop",
    date: "Jun 12",
    price: 91,
    cabin: "Economy",
  },
  {
    id: 1,
    airline: "American Airlines",
    badge: "CHEAPEST",
    badgeColor: "#2563eb",
    badgeBg: "#dbeafe",
    flight: "AA1289",
    depart: "07:45 PM",
    arrive: "10:50 PM",
    departCode: from || "MIA",
    arriveCode: to || "LGA",
    duration: "3h 5m",
    stops: "Nonstop",
    date: "Jun 12",
    price: 91,
    cabin: "Economy",
  },
  {
    id: 2,
    airline: "American Airlines",
    badge: "BEST TIMING",
    badgeColor: "#7c3aed",
    badgeBg: "#ede9fe",
    flight: "AA1423",
    depart: "08:35 PM",
    arrive: "11:38 PM",
    departCode: from || "MIA",
    arriveCode: to || "LGA",
    duration: "3h 3m",
    stops: "Nonstop",
    date: "Jun 12",
    price: 303,
    cabin: "First",
  },
];

const FLEX_DATES = [
  { day: "Tue", date: "Jun 9", price: "$90.88", cheapest: true },
  { day: "Wed", date: "Jun 10", price: "$90.88", cheapest: true },
  { day: "Thu", date: "Jun 11", price: "$90.88", cheapest: true },
  { day: "Fri", date: "Jun 12", price: "$90.88", cheapest: true, today: true },
  { day: "Sat", date: "Jun 13", price: "$90.88", cheapest: true },
  { day: "Sun", date: "Jun 14", price: "$132.45", cheapest: false },
  { day: "Mon", date: "Jun 15", price: "$109.35", cheapest: false },
];

/* ─────────────────────────────────────────────
   AA LOGO SVG
───────────────────────────────────────────── */
function AALogo({ size = 32 }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      <circle cx="30" cy="30" r="30" fill="#fff" />
      <path d="M10 38 Q20 20 30 18 Q40 16 50 28" stroke="#E91C23" strokeWidth="4" fill="none" />
      <circle cx="30" cy="18" r="4" fill="#E91C23" />
      <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fill="#E91C23" fontSize="11" fontWeight="700">AA</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   PLANE ICON
───────────────────────────────────────────── */
function PlaneIcon({ color = "#fff", size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   FLIGHT CARD
───────────────────────────────────────────── */
function FlightCard({ flight, selected, onToggle, delay }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: "#fff",
        borderRadius: 20,
        border: selected ? "1.5px solid #059669" : "1.5px solid #f0f0f0",
        boxShadow: selected
          ? "0 4px 24px rgba(5,150,105,0.10)"
          : "0 2px 12px rgba(0,0,0,0.04)",
        cursor: "pointer",
        transition: "box-shadow 0.18s, border-color 0.18s, transform 0.15s",
        transform: selected ? "translateY(-1px)" : "translateY(0)",
        animation: `fadeSlide 0.35s ease both`,
        animationDelay: `${delay}s`,
        overflow: "hidden",
        marginBottom: 12,
      }}
    >
      {/* Top strip if selected */}
      {selected && (
        <div style={{ height: 3, background: "linear-gradient(90deg,#059669,#34d399)" }} />
      )}

      <div style={{ padding: "16px 20px 14px" }}>
        {/* Row 1: Airline + badge + price */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: "1px solid #f3f4f6",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <AALogo size={28} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", letterSpacing: "-0.01em" }}>
            {flight.airline}
          </span>
          <span
            style={{
              background: flight.badgeBg,
              color: flight.badgeColor,
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 999,
              padding: "2px 9px",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            {flight.badge}
          </span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            {selected && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#059669">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
            <span style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              ${flight.price}
            </span>
          </div>
        </div>

        {/* Row 2: Times + timeline */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {/* Depart */}
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
              {flight.depart}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3, fontWeight: 600, letterSpacing: "0.04em" }}>
              {flight.departCode}
            </div>
          </div>

          {/* Middle timeline */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 12px", gap: 5 }}>
            <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, textAlign: "center" }}>
              {flight.duration} · {flight.stops}
            </div>
            <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", border: "2px solid #d1d5db", background: "#fff", flexShrink: 0 }} />
              <div style={{ flex: 1, height: 1, background: "#e5e7eb", position: "relative" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                  <PlaneIcon color="#9ca3af" size={13} />
                </div>
              </div>
              <div style={{ width: 7, height: 7, borderRadius: "50%", border: "2px solid #d1d5db", background: "#fff", flexShrink: 0 }} />
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af", letterSpacing: "0.05em", fontWeight: 600 }}>
              {flight.date}
            </div>
          </div>

          {/* Arrive */}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
              {flight.arrive}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3, fontWeight: 600, letterSpacing: "0.04em" }}>
              {flight.arriveCode}
            </div>
          </div>

          {/* Cabin */}
          <div style={{ textAlign: "right", marginLeft: 14, minWidth: 52 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                background: "#f9fafb",
                borderRadius: 6,
                padding: "3px 7px",
                border: "1px solid #f3f4f6",
              }}
            >
              {flight.cabin}
            </span>
          </div>
        </div>

        {/* Row 3: Flight number + details */}
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "#c4c9d4", fontWeight: 500 }}>{flight.flight}</span>
          <button
            style={{ fontSize: 11, color: "#9ca3af", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            Flight details
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function FlightResults() {
  const router = useRouter();
  const {
    from = "MIA",
    to = "LGA",
    fromCity = "Miami",
    toCity = "New York",
    depart = "Jun 12",
  } = router.query || {};

  const flights = buildFlights(from, to);
  const [selected, setSelected] = useState({ 0: true, 1: false, 2: false });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedFlight =
    flights.find((f) => selected[f.id]) || flights[0];

  const handleBook = () => {
    router.push({
      pathname: "/booking",
      query: {
        from, to, fromCity, toCity, depart,
        airline: selectedFlight.airline,
        flightNum: selectedFlight.flight,
        departTime: selectedFlight.depart,
        arriveTime: selectedFlight.arrive,
        price: selectedFlight.price,
        cabin: selectedFlight.cabin,
        arriveCode: selectedFlight.arriveCode,
      },
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        body { background: #f4f6f9; }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }

        .fr-topbar {
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
          padding: 10px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          gap: 12px;
        }
        .fr-topbar-left { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .fr-topbar-right { display: flex; align-items: center; gap: 8px; }

        .fr-route-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          padding: 7px 16px;
          flex-wrap: wrap;
          row-gap: 4px;
        }
        .fr-route-pill .code { font-size: 13px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em; }
        .fr-route-pill .sep  { color: #d1d5db; font-size: 13px; }
        .fr-route-pill .meta { color: #6b7280; font-size: 12px; font-weight: 500; }

        .fr-back-btn {
          font-size: 13px; font-weight: 600; color: #9ca3af;
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 4px;
          padding: 6px 0; transition: color 0.15s;
        }
        .fr-back-btn:hover { color: #374151; }

        .fr-pill-btn {
          display: flex; align-items: center; gap: 5px;
          border: 1px solid #e5e7eb; border-radius: 999px;
          padding: 7px 14px; font-size: 12px; font-weight: 700;
          color: #374151; cursor: pointer; background: #fff;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .fr-pill-btn:hover { background: #f9fafb; }

        .fr-icon-btn {
          width: 35px; height: 35px;
          border: 1px solid #e5e7eb; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: #fff; cursor: pointer; transition: background 0.15s;
          flex-shrink: 0;
        }
        .fr-icon-btn:hover { background: #f9fafb; }

        .fr-content {
          max-width: 720px;
          margin: 0 auto;
          padding: 20px 16px 130px;
        }

        .fr-section-label {
          font-size: 11px; font-weight: 700; color: #9ca3af;
          text-transform: uppercase; letter-spacing: 0.07em;
          margin-bottom: 12px; padding-left: 2px;
        }

        /* Flexible dates */
        .flex-card {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid #f0f0f0;
          padding: 18px 20px;
          margin-top: 16px;
          animation: fadeSlide 0.4s ease both;
          animation-delay: 0.3s;
        }
        .flex-dates-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }
        .flex-day {
          border-radius: 12px;
          padding: 8px 4px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.12s;
        }
        .flex-day:hover { transform: translateY(-1px); }
        .flex-day.active { background: #bbf7d0; }
        .flex-day.active.today { background: #4ade80; }
        .flex-day.inactive { background: #f4f6f9; }

        /* Bottom bar */
        .fr-bottom-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: #fff;
          border-top: 1px solid #f0f0f0;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 100;
          gap: 12px;
          animation: popIn 0.3s ease;
        }
        .fr-bb-actions { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
        .fr-bb-action {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 600; color: #6b7280;
          background: none; border: none; cursor: pointer;
          padding: 8px 10px; border-radius: 999px;
          transition: background 0.15s, color 0.15s; white-space: nowrap;
        }
        .fr-bb-action:hover { background: #f9fafb; color: #374151; }
        .fr-book-btn {
          display: flex; align-items: center; gap: 8px;
          background: #065f46; color: #fff;
          font-size: 14px; font-weight: 700;
          padding: 11px 24px; border-radius: 999px;
          border: none; cursor: pointer;
          transition: background 0.15s, transform 0.12s;
          white-space: nowrap; flex-shrink: 0;
        }
        .fr-book-btn:hover { background: #047857; transform: scale(1.02); }
        .fr-book-btn:active { transform: scale(0.98); }

        /* Responsive */
        @media (max-width: 640px) {
          .fr-topbar { padding: 9px 14px; gap: 8px; }
          .fr-topbar-right .fr-pill-btn.hide-mobile { display: none; }
          .fr-topbar-right .fr-icon-btn.hide-mobile { display: none; }
          .fr-route-pill { padding: 6px 12px; gap: 6px; }
          .fr-route-pill .code { font-size: 12px; }
          .fr-route-pill .meta { font-size: 11px; }
          .fr-content { padding: 14px 12px 120px; }
          .flex-dates-grid { grid-template-columns: repeat(7,1fr); gap: 3px; }
          .flex-day { padding: 6px 2px; border-radius: 10px; }
          .fr-bottom-bar { padding: 10px 14px; }
          .fr-bb-actions .fr-bb-action.hide-mobile { display: none; }
          .fr-book-btn { font-size: 13px; padding: 10px 18px; }
        }
        @media (max-width: 400px) {
          .fr-route-pill .meta { display: none; }
          .fr-route-pill .sep.meta-sep { display: none; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .fr-content { padding: 18px 20px 130px; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>

        {/* ── TOP NAV BAR ── */}
        <div className="fr-topbar">
          <div className="fr-topbar-left">
            <button className="fr-back-btn" onClick={() => router.back()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back
            </button>

            {/* Route pill */}
            <div className="fr-route-pill">
              <div
                style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "#065f46",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <PlaneIcon color="#fff" size={12} />
              </div>
              <span className="code">{from}</span>
              <span className="sep">→</span>
              <span className="code">{to}</span>
              <span className="sep">·</span>
              <span className="meta">{depart}</span>
              <span className="sep meta-sep">·</span>
              <span className="meta">1 traveler</span>
            </div>
          </div>

          <div className="fr-topbar-right">
            <button className="fr-pill-btn hide-mobile">
              ECONOMY
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
            </button>
            <button className="fr-icon-btn hide-mobile">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button className="fr-pill-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="hide-mobile" style={{ display: "inline" }}>NEW SEARCH</span>
            </button>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="fr-content">

          {/* Route summary heading */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 18,
              flexWrap: "wrap",
              gap: 8,
              animation: "fadeSlide 0.3s ease both",
            }}
          >
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.2 }}>
                {fromCity} → {toCity}
              </h1>
              <p style={{ fontSize: 13, color: "#6b7280", marginTop: 3, fontWeight: 500 }}>
                {depart} · 1 traveler · Economy
              </p>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #f0f0f0",
                borderRadius: 12,
                padding: "8px 14px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Best price</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#059669", letterSpacing: "-0.03em" }}>$90.88</div>
            </div>
          </div>

          {/* Section label */}
          <div className="fr-section-label">Available Flights</div>

          {/* Flight cards */}
          {flights.map((f, i) => (
            <FlightCard
              key={f.id}
              flight={f}
              selected={!!selected[f.id]}
              onToggle={() => toggleSelect(f.id)}
              delay={i * 0.07}
            />
          ))}

          {/* Flexible Dates */}
          <div className="flex-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#374151", letterSpacing: "-0.01em" }}>
                Flexible Dates
              </span>
              <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>±3 days</span>
            </div>
            <div className="flex-dates-grid">
              {FLEX_DATES.map((d, i) => (
                <div
                  key={i}
                  className={`flex-day ${d.cheapest ? (d.today ? "active today" : "active") : "inactive"}`}
                >
                  {d.cheapest ? (
                    <div
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: d.today ? "#14532d" : "#166534",
                        marginBottom: 2,
                      }}
                    >
                      Best
                    </div>
                  ) : (
                    <div style={{ height: 14 }} />
                  )}
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: d.cheapest ? "#14532d" : "#6b7280",
                    }}
                  >
                    {d.day}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: d.cheapest ? "#166534" : "#9ca3af",
                      marginTop: 2,
                    }}
                  >
                    {d.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="fr-bottom-bar">
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em" }}>
              ${selectedFlight.price}.00
            </span>
            <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
              {selectedFlight.airline}
            </span>
          </div>

          <div className="fr-bb-actions">
            <button className="fr-bb-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="hide-mobile">Track</span>
            </button>
            <button className="fr-bb-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="hide-mobile">Dates</span>
            </button>
            <button className="fr-bb-action hide-mobile">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              All flights
            </button>

            <button className="fr-book-btn" onClick={handleBook}>
              Book flight
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}