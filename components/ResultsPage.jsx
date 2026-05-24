"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

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
    duration: "3H 3M · NONSTOP",
    fromCode: "MIA",
    toCode: "LGA",
    date: "JUN 12",
    price: 91,
    cabin: "ECONOMY",
    selected: true,
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
    duration: "3H 5M · NONSTOP",
    fromCode: "MIA",
    toCode: "LGA",
    date: "JUN 12",
    price: 91,
    cabin: "ECONOMY",
    selected: false,
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
    duration: "3H 3M · NONSTOP",
    fromCode: "MIA",
    toCode: "LGA",
    date: "JUN 12",
    price: 303,
    cabin: "FIRST",
    selected: false,
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

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const fromCode = searchParams?.get("from") || "MIA";
  const toCode = searchParams?.get("to") || "JFK";

  const [selectedFlight, setSelectedFlight] = useState(1);
  const [expandedFlight, setExpandedFlight] = useState(1);
  const [selectedDate, setSelectedDate] = useState(2);
  const [aiQuery, setAiQuery] = useState("");

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#f0f2f5" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .font-syne { font-family: 'Syne', sans-serif; }
        .scrollable { overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.1) transparent; }
        .scrollable::-webkit-scrollbar { width: 4px; }
        .scrollable::-webkit-scrollbar-track { background: transparent; }
        .scrollable::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
        .ai-input { border: none; outline: none; background: transparent; font-size: 13px; flex: 1; color: #111827; font-family: 'DM Sans', sans-serif; }
        .ai-input::placeholder { color: #aab0bc; }
      `}</style>

      {/* ── Sidebar ── */}
      <div
        className="flex flex-col items-center py-4 gap-2 z-10 flex-shrink-0"
        style={{
          width: 64,
          background: "linear-gradient(180deg, #1a3a35 0%, #0f2420 100%)",
          boxShadow: "2px 0 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* Logo */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center mb-3"
          style={{ background: "#c8f135" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#1a3a35" />
          </svg>
        </div>

        {/* Nav icons */}
        {SIDEBAR_ICONS.map((icon, i) => (
          <div
            key={i}
            className="w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200"
            style={{ color: icon.active ? "#c8f135" : "#9aa0ab" }}
            onMouseEnter={e => { if (!icon.active) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; } }}
            onMouseLeave={e => { if (!icon.active) { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#9aa0ab"; } }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={icon.path} /></svg>
          </div>
        ))}

        <div className="flex-1" />

        {/* Bottom icons */}
        {[
          "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z",
          "M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z",
        ].map((path, i) => (
          <div
            key={i}
            className="w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200"
            style={{ color: "#9aa0ab" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#9aa0ab"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>
          </div>
        ))}

        {/* Star badge */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center mt-2"
          style={{ background: "#c8f135" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a3a35">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Results Header */}
        <div
          className="flex items-center justify-between px-6 py-3.5 border-b flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(10px)",
            borderColor: "rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "#c8f135" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a3a35">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <span className="font-bold text-sm" style={{ color: "#1a3a35" }}>{fromCode}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#9aa0ab">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
            <span className="font-bold text-sm" style={{ color: "#1a3a35" }}>{toCode}</span>
            <span className="text-xs" style={{ color: "#9aa0ab" }}>· Jun 12 · 1 traveler</span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Cabin selector */}
            <div
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-bold cursor-pointer"
              style={{
                background: "rgba(26,58,53,0.08)",
                borderColor: "rgba(26,58,53,0.15)",
                color: "#1a3a35",
              }}
            >
              ECONOMY
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a3a35"><path d="M7 10l5 5 5-5z" /></svg>
            </div>

            {/* Edit */}
            <button className="bg-transparent border-none cursor-pointer" style={{ color: "#9aa0ab" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </button>

            {/* New Search */}
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white border-none cursor-pointer transition-all duration-200"
              style={{ background: "#1a3a35", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.background = "#2a5248"}
              onMouseLeave={e => e.currentTarget.style.background = "#1a3a35"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
              </svg>
              + NEW SEARCH
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="scrollable flex-1 flex flex-col gap-2.5 p-6">

          {/* Flight Cards */}
          {FLIGHTS.map((flight) => {
            const isSelected = selectedFlight === flight.id;
            const isExpanded = expandedFlight === flight.id;

            return (
              <div
                key={flight.id}
                onClick={() => setSelectedFlight(flight.id)}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
                style={{
                  border: isSelected
                    ? "1.5px solid #1a3a35"
                    : "1.5px solid rgba(0,0,0,0.05)",
                  boxShadow: isSelected
                    ? "0 4px 20px rgba(26,58,53,0.1)"
                    : "none",
                }}
                onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = "rgba(26,58,53,0.2)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; } }}
                onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)"; e.currentTarget.style.boxShadow = "none"; } }}
              >
                {/* Card Inner */}
                <div
                  className="grid items-center px-5 py-4"
                  style={{ gridTemplateColumns: "180px 1fr 120px", gap: 16 }}
                >
                  {/* Airline Info */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center text-white flex-shrink-0"
                        style={{ background: flight.logoColor, fontSize: 10, fontWeight: 800 }}
                      >
                        {flight.airlineLogo}
                      </div>
                      <div>
                        <div className="text-xs font-semibold" style={{ color: "#111827" }}>{flight.airline}</div>
                        {flight.tag && (
                          <span
                            className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                            style={{
                              fontSize: 9,
                              background: `${flight.tagColor}15`,
                              color: flight.tagColor,
                              border: `1px solid ${flight.tagColor}30`,
                            }}
                          >
                            · {flight.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Flight Times */}
                  <div className="flex items-center gap-3">
                    {/* Departure */}
                    <div className="text-left">
                      <div className="font-syne font-bold leading-none" style={{ fontSize: 28, color: "#111827" }}>{flight.departure}</div>
                      <div className="text-xs font-semibold tracking-wider uppercase mt-0.5" style={{ color: "#9aa0ab" }}>{flight.fromCode}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#9aa0ab" }}>{flight.date}</div>
                    </div>

                    {/* Duration / Line */}
                    <div className="flex-1 text-center">
                      <div className="text-xs font-medium tracking-wide" style={{ color: "#9aa0ab", letterSpacing: "0.06em" }}>{flight.duration}</div>
                      <div className="flex items-center gap-1 my-1">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#9aa0ab" }} />
                        <div className="flex-1 h-px relative" style={{ background: "#d1d5db" }}>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#6b7280">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                            </svg>
                          </div>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#9aa0ab" }} />
                      </div>
                      <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "#9aa0ab", fontSize: 10 }}>{flight.cabin}</div>
                    </div>

                    {/* Arrival */}
                    <div className="text-right">
                      <div className="font-syne font-bold leading-none" style={{ fontSize: 28, color: "#111827" }}>{flight.arrival}</div>
                      <div className="text-xs font-semibold tracking-wider uppercase mt-0.5" style={{ color: "#9aa0ab" }}>{flight.toCode}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col items-end gap-1">
                    {isSelected && (
                      <div
                        className="w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: 18, height: 18, background: "#c8f135" }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#1a3a35">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    )}
                    <div className="font-syne font-extrabold" style={{ fontSize: 22, color: "#1a3a35" }}>${flight.price}</div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setExpandedFlight(isExpanded ? null : flight.id); }}
                      className="flex items-center gap-0.5 bg-transparent border-none cursor-pointer text-xs"
                      style={{ color: "#9aa0ab", fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}
                    >
                      Flight details
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
                        style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                      >
                        <path d="M7 10l5 5 5-5z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div
                    className="flex items-center gap-4 px-5 py-3 border-t"
                    style={{ background: "rgba(26,58,53,0.03)", borderColor: "rgba(0,0,0,0.05)" }}
                  >
                    {[
                      { icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", label: "Terminal B · Gate 22" },
                      { icon: "M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.53 15.52.01 12.35 0 9 0 6 3 6 6.65V7H2v13h20V7h-2zm-8 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z", label: "Carry-on included" },
                      { icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z", label: "Boeing 737-800" },
                      { icon: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z", label: "On-time 89%" },
                    ].map((chip, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs" style={{ color: "#6b7280", fontSize: 11 }}>
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
          <div
            className="bg-white rounded-2xl border px-5 py-4"
            style={{ borderColor: "rgba(0,0,0,0.05)" }}
          >
            <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#9aa0ab" }}>
              Flexible Dates
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {FLEXIBLE_DATES.map((d, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedDate(i)}
                  className="flex flex-col items-center text-center cursor-pointer transition-all duration-200 rounded-xl px-3.5 py-2.5 flex-shrink-0 hover:scale-[1.03]"
                  style={{
                    minWidth: 80,
                    background: d.tag ? "rgba(200,241,53,0.15)" : "white",
                    border: `1.5px solid ${d.tag ? "#c8f135" : "rgba(0,0,0,0.08)"}`,
                    outline: selectedDate === i ? "2px solid #1a3a35" : "none",
                    outlineOffset: 2,
                  }}
                >
                  {d.tag && (
                    <div
                      className="text-xs font-extrabold tracking-widest uppercase rounded px-1.5 py-0.5 mb-1 inline-block"
                      style={{ fontSize: 8, background: "#c8f135", color: "#1a3a35" }}
                    >
                      {d.tag}
                    </div>
                  )}
                  <div className="text-xs font-bold" style={{ color: "#9aa0ab", fontSize: 10 }}>{d.day}</div>
                  <div className="text-xs font-semibold whitespace-nowrap" style={{ fontSize: 11, color: "#1a3a35" }}>{d.date}</div>
                  <div className="font-bold mt-0.5" style={{ fontSize: 12, color: d.tag ? "#1a6640" : "#6b7280" }}>${d.price}</div>
                </div>
              ))}

              {/* +3 days */}
              <div
                className="flex items-center justify-center gap-1 text-xs cursor-pointer rounded-xl px-3.5 py-2.5 flex-shrink-0 border"
                style={{
                  minWidth: 80,
                  background: "rgba(26,58,53,0.04)",
                  borderColor: "rgba(0,0,0,0.08)",
                  color: "#9aa0ab",
                  fontSize: 11,
                }}
              >
                +3 days
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="flex items-center gap-4 px-5 py-3.5 border-t flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(0,0,0,0.06)",
          }}
        >
          {/* AI Input */}
          <div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl flex-1 border"
            style={{
              background: "rgba(255,255,255,0.9)",
              borderWidth: 1.5,
              borderColor: "rgba(0,0,0,0.06)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#9aa0ab">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
            <input
              className="ai-input"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Ask anything..."
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#9aa0ab">
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
          </div>

          {/* Cheapest Price */}
          <div className="flex flex-1 items-center gap-1.5 min-w-0">
            <span className="font-syne font-extrabold" style={{ fontSize: 18, color: "#1a3a35" }}>$90.88</span>
            <span className="text-xs whitespace-nowrap" style={{ color: "#9aa0ab" }}>American Airlines</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {[
              { icon: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z", label: "Track" },
              { icon: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z", label: "Dates" },
              { icon: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z", label: "All flights" },
            ].map((btn, i) => (
              <button
                key={i}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-150"
                style={{
                  borderColor: "rgba(0,0,0,0.08)",
                  background: "white",
                  color: "#555e6b",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a3a35"; e.currentTarget.style.color = "#1a3a35"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.color = "#555e6b"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={btn.icon} /></svg>
                {btn.label}
              </button>
            ))}

            {/* Book Button */}
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white border-none cursor-pointer transition-all duration-200 whitespace-nowrap"
              style={{ background: "#1a3a35", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2a5248"; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1a3a35"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Book flight
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}