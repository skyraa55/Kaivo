import { useState } from "react";
import { useRouter } from "next/router";

// ─────────────────────────────────────────────────────────────────────────────
// Airport database
// ─────────────────────────────────────────────────────────────────────────────
const AIRPORTS = [
  { code: "MIA", name: "Miami International",    city: "Miami",         aliases: ["miami", "mia"] },
  { code: "JFK", name: "John F. Kennedy",        city: "New York",      aliases: ["new york", "jfk", "nyc", "new york city", "manhattan"] },
  { code: "LAX", name: "Los Angeles Intl",       city: "Los Angeles",   aliases: ["los angeles", "lax", "la"] },
  { code: "ORD", name: "O'Hare International",   city: "Chicago",       aliases: ["chicago", "ord", "ohare"] },
  { code: "SFO", name: "San Francisco Intl",     city: "San Francisco", aliases: ["san francisco", "sfo"] },
  { code: "ATL", name: "Hartsfield-Jackson",     city: "Atlanta",       aliases: ["atlanta", "atl"] },
  { code: "DFW", name: "Dallas/Fort Worth",      city: "Dallas",        aliases: ["dallas", "dfw", "fort worth"] },
  { code: "SEA", name: "Seattle-Tacoma",         city: "Seattle",       aliases: ["seattle", "sea"] },
  { code: "BOS", name: "Logan International",    city: "Boston",        aliases: ["boston", "bos"] },
  { code: "EWR", name: "Newark Liberty",         city: "Newark",        aliases: ["newark", "ewr"] },
  { code: "IAD", name: "Dulles International",   city: "Washington DC", aliases: ["washington", "dc", "iad", "dulles", "washington dc"] },
  { code: "YYZ", name: "Toronto Pearson",        city: "Toronto",       aliases: ["toronto", "yyz", "canada"] },
  { code: "MEX", name: "Benito Juárez",          city: "Mexico City",   aliases: ["mexico city", "mex", "mexico"] },
  { code: "GRU", name: "Guarulhos",              city: "São Paulo",     aliases: ["sao paulo", "são paulo", "gru", "brazil"] },
  { code: "EZE", name: "Ezeiza",                 city: "Buenos Aires",  aliases: ["buenos aires", "eze", "argentina"] },
  { code: "BOG", name: "El Dorado",              city: "Bogotá",        aliases: ["bogota", "bog", "colombia"] },
  { code: "LIM", name: "Jorge Chávez",           city: "Lima",          aliases: ["lima", "lim", "peru"] },
  { code: "LHR", name: "Heathrow",              city: "London",        aliases: ["london", "lhr", "heathrow", "uk", "united kingdom", "england", "britain", "great britain"] },
  { code: "CDG", name: "Charles de Gaulle",     city: "Paris",         aliases: ["paris", "cdg", "france"] },
  { code: "AMS", name: "Schiphol",              city: "Amsterdam",     aliases: ["amsterdam", "ams", "schiphol", "netherlands", "holland"] },
  { code: "FRA", name: "Frankfurt",             city: "Frankfurt",     aliases: ["frankfurt", "fra", "germany"] },
  { code: "MAD", name: "Barajas",               city: "Madrid",        aliases: ["madrid", "mad", "spain"] },
  { code: "BCN", name: "El Prat",               city: "Barcelona",     aliases: ["barcelona", "bcn"] },
  { code: "FCO", name: "Leonardo da Vinci",     city: "Rome",          aliases: ["rome", "fco", "italy", "italia"] },
  { code: "MXP", name: "Malpensa",              city: "Milan",         aliases: ["milan", "mxp", "milano"] },
  { code: "LIS", name: "Humberto Delgado",      city: "Lisbon",        aliases: ["lisbon", "lis", "lisboa", "portugal"] },
  { code: "ZRH", name: "Zürich",                city: "Zurich",        aliases: ["zurich", "zrh", "zürich", "switzerland"] },
  { code: "VIE", name: "Vienna",                city: "Vienna",        aliases: ["vienna", "vie", "wien", "austria"] },
  { code: "MUC", name: "Munich",                city: "Munich",        aliases: ["munich", "muc", "münchen"] },
  { code: "BRU", name: "Brussels",              city: "Brussels",      aliases: ["brussels", "bru", "belgium"] },
  { code: "CPH", name: "Copenhagen",            city: "Copenhagen",    aliases: ["copenhagen", "cph", "denmark"] },
  { code: "ARN", name: "Stockholm Arlanda",     city: "Stockholm",     aliases: ["stockholm", "arn", "sweden"] },
  { code: "OSL", name: "Oslo Gardermoen",       city: "Oslo",          aliases: ["oslo", "osl", "norway"] },
  { code: "HEL", name: "Helsinki-Vantaa",       city: "Helsinki",      aliases: ["helsinki", "hel", "finland"] },
  { code: "WAW", name: "Warsaw Chopin",         city: "Warsaw",        aliases: ["warsaw", "waw", "poland"] },
  { code: "ATH", name: "Athens",                city: "Athens",        aliases: ["athens", "ath", "greece"] },
  { code: "IST", name: "Istanbul",              city: "Istanbul",      aliases: ["istanbul", "ist", "turkey"] },
  { code: "DXB", name: "Dubai Intl",            city: "Dubai",         aliases: ["dubai", "dxb", "uae", "united arab emirates"] },
  { code: "AUH", name: "Abu Dhabi",             city: "Abu Dhabi",     aliases: ["abu dhabi", "auh"] },
  { code: "DOH", name: "Hamad International",   city: "Doha",          aliases: ["doha", "doh", "qatar"] },
  { code: "RUH", name: "King Khalid",           city: "Riyadh",        aliases: ["riyadh", "ruh", "saudi arabia", "saudi"] },
  { code: "TLV", name: "Ben Gurion",            city: "Tel Aviv",      aliases: ["tel aviv", "tlv", "israel"] },
  { code: "CAI", name: "Cairo",                 city: "Cairo",         aliases: ["cairo", "cai", "egypt"] },
  { code: "JNB", name: "O.R. Tambo",            city: "Johannesburg",  aliases: ["johannesburg", "jnb", "south africa"] },
  { code: "NBO", name: "Jomo Kenyatta",         city: "Nairobi",       aliases: ["nairobi", "nbo", "kenya"] },
  { code: "LOS", name: "Murtala Muhammed",      city: "Lagos",         aliases: ["lagos", "los", "nigeria"] },
  { code: "CMN", name: "Mohammed V",            city: "Casablanca",    aliases: ["casablanca", "cmn", "morocco"] },
  { code: "SIN", name: "Changi",                city: "Singapore",     aliases: ["singapore", "sin", "changi"] },
  { code: "NRT", name: "Narita",                city: "Tokyo",         aliases: ["tokyo", "nrt", "narita", "japan"] },
  { code: "HND", name: "Haneda",                city: "Tokyo",         aliases: ["haneda", "hnd"] },
  { code: "SYD", name: "Kingsford Smith",       city: "Sydney",        aliases: ["sydney", "syd", "australia"] },
  { code: "MEL", name: "Melbourne",             city: "Melbourne",     aliases: ["melbourne", "mel"] },
  { code: "ICN", name: "Incheon",               city: "Seoul",         aliases: ["seoul", "icn", "incheon", "korea", "south korea"] },
  { code: "PEK", name: "Beijing Capital",       city: "Beijing",       aliases: ["beijing", "pek", "peking", "china"] },
  { code: "PVG", name: "Pudong",                city: "Shanghai",      aliases: ["shanghai", "pvg"] },
  { code: "HKG", name: "Hong Kong Intl",        city: "Hong Kong",     aliases: ["hong kong", "hkg"] },
  { code: "BKK", name: "Suvarnabhumi",          city: "Bangkok",       aliases: ["bangkok", "bkk", "thailand"] },
  { code: "KUL", name: "Kuala Lumpur",          city: "Kuala Lumpur",  aliases: ["kuala lumpur", "kul", "malaysia", "kl"] },
  { code: "MNL", name: "Ninoy Aquino",          city: "Manila",        aliases: ["manila", "mnl", "philippines"] },
  { code: "CGK", name: "Soekarno-Hatta",        city: "Jakarta",       aliases: ["jakarta", "cgk", "indonesia"] },
  { code: "SGN", name: "Tan Son Nhat",          city: "Ho Chi Minh",   aliases: ["ho chi minh", "saigon", "sgn", "vietnam"] },
  { code: "HAN", name: "Noi Bai",               city: "Hanoi",         aliases: ["hanoi", "han"] },
  { code: "DAC", name: "Hazrat Shahjalal",       city: "Dhaka",         aliases: ["dhaka", "dac", "bangladesh"] },
  { code: "CMB", name: "Bandaranaike",          city: "Colombo",       aliases: ["colombo", "cmb", "sri lanka"] },
  { code: "KTM", name: "Tribhuvan",             city: "Kathmandu",     aliases: ["kathmandu", "ktm", "nepal"] },
  { code: "DEL", name: "Indira Gandhi",         city: "Delhi",         aliases: ["delhi", "del", "new delhi", "india", "indian"] },
  { code: "BOM", name: "Chhatrapati Shivaji",   city: "Mumbai",        aliases: ["mumbai", "bom", "bombay"] },
  { code: "BLR", name: "Kempegowda",            city: "Bangalore",     aliases: ["bangalore", "bengaluru", "blr"] },
  { code: "MAA", name: "Chennai",               city: "Chennai",       aliases: ["chennai", "maa", "madras"] },
  { code: "HYD", name: "Rajiv Gandhi",          city: "Hyderabad",     aliases: ["hyderabad", "hyd"] },
  { code: "CCU", name: "Netaji Subhas Chandra", city: "Kolkata",       aliases: ["kolkata", "calcutta", "ccu"] },
  { code: "AMD", name: "Sardar Vallabhbhai",    city: "Ahmedabad",     aliases: ["ahmedabad", "amd"] },
  { code: "GOI", name: "Goa",                   city: "Goa",           aliases: ["goa", "goi"] },
  { code: "COK", name: "Cochin",                city: "Kochi",         aliases: ["kochi", "cochin", "cok"] },
  { code: "PNQ", name: "Pune",                  city: "Pune",          aliases: ["pune", "pnq"] },
  { code: "KHI", name: "Jinnah",                city: "Karachi",       aliases: ["karachi", "khi", "pakistan"] },
  { code: "LHE", name: "Allama Iqbal",          city: "Lahore",        aliases: ["lahore", "lhe"] },
  { code: "ISB", name: "New Islamabad",         city: "Islamabad",     aliases: ["islamabad", "isb"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// Date / cabin parsing helpers
// ─────────────────────────────────────────────────────────────────────────────
const MONTHS = {
  january:1,jan:1,february:2,feb:2,march:3,mar:3,april:4,apr:4,may:5,
  june:6,jun:6,july:7,jul:7,august:8,aug:8,september:9,sep:9,sept:9,
  october:10,oct:10,november:11,nov:11,december:12,dec:12,
};
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function findAirport(text) {
  if (!text) return null;
  const lower = text.trim().toLowerCase();
  const byCode = AIRPORTS.find(a => a.code.toLowerCase() === lower);
  if (byCode) return byCode;
  const tokens = lower.split(/[\s,\-\/]+/);
  const sorted = [...AIRPORTS].sort(
    (a, b) => Math.max(...b.aliases.map(x => x.length)) - Math.max(...a.aliases.map(x => x.length))
  );
  for (const airport of sorted) {
    for (const alias of airport.aliases) {
      const aliasTokens = alias.split(/\s+/);
      if (aliasTokens.every(at => tokens.includes(at))) return airport;
      if (lower.includes(alias)) return airport;
    }
  }
  return null;
}

function parseDate(text) {
  const lower = text.toLowerCase();
  const patterns = [
    /(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)/i,
    /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?/i,
  ];
  for (const pattern of patterns) {
    const match = lower.match(pattern);
    if (match) {
      let day, monthStr;
      if (isNaN(match[1])) { monthStr = match[1]; day = parseInt(match[2]); }
      else { day = parseInt(match[1]); monthStr = match[2]; }
      const monthNum = MONTHS[monthStr.toLowerCase()];
      if (monthNum && day >= 1 && day <= 31) {
        const date = new Date(new Date().getFullYear(), monthNum - 1, day);
        const dayName = DAY_NAMES[date.getDay()];
        const monthKey = Object.keys(MONTHS).find(k => MONTHS[k] === monthNum && k.length > 3);
        const monthLabel = monthKey ? monthKey.charAt(0).toUpperCase() + monthKey.slice(1, 4) : monthStr;
        return `${dayName}, ${monthLabel} ${day}`;
      }
    }
  }
  return null;
}

function parseCabin(text) {
  const lower = text.toLowerCase();
  if (lower.includes("business") || lower.includes("biz")) return "business";
  if (lower.includes("first")) return "first";
  if (lower.includes("premium")) return "premium";
  return "economy";
}

function parseQuery(query) {
  const result = {};
  const lower  = query.toLowerCase().trim();
  const fromToMatch = lower.match(/\bfrom\s+(.+?)\s+to\s+(.+?)(?:\s+on\b|\s+under\b|\s+for\b|\s*$)/i);
  if (fromToMatch) {
    const fromA = findAirport(fromToMatch[1]);
    const toA   = findAirport(fromToMatch[2]);
    if (fromA) result.from = fromA;
    if (toA)   result.to   = toA;
  }
  if (!result.from || !result.to) {
    const simpleMatch = lower.match(/^(.+?)\s+to\s+(.+?)(?:\s+on\b|\s+under\b|\s*$)/i);
    if (simpleMatch) {
      if (!result.from) { const a = findAirport(simpleMatch[1]); if (a) result.from = a; }
      if (!result.to)   { const a = findAirport(simpleMatch[2]); if (a) result.to   = a; }
    }
  }
  if (!result.to) {
    const toOnly = lower.match(/\bto\s+([a-z\s]+?)(?:\s+on\b|\s+under\b|\s*$)/i);
    if (toOnly) { const a = findAirport(toOnly[1]); if (a) result.to = a; }
  }
  if (!result.from) {
    const fromOnly = lower.match(/\bfrom\s+([a-z\s]+?)(?:\s+to\b|\s+on\b|\s*$)/i);
    if (fromOnly) { const a = findAirport(fromOnly[1]); if (a) result.from = a; }
  }
  if (!result.from || !result.to) {
    const found = AIRPORTS.filter(a =>
      a.aliases.some(alias => {
        const re = new RegExp(`\\b${alias.replace(/[-\/]/g, ".")}\\b`, "i");
        return re.test(lower);
      })
    );
    if (!result.from && found[0]) result.from = found[0];
    if (!result.to   && found[1] && found[1] !== result.from) result.to = found[1];
  }
  const date = parseDate(query);
  if (date) result.departDate = date;
  const cabin = parseCabin(query);
  if (cabin !== "economy") result.cabin = cabin;
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar nav items
// ─────────────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { active: true,  path: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     label: "Home" },
  { active: false, path: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z",                                                                                                                                                                                                                                                                                                                                                                                                                                                                         label: "Trends" },
  { active: false, path: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",                                                                                                                                                                                                                                                                                                                                                                                            label: "Calendar" },
  { active: false, path: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z",                                                                                                                                                                                                                                                                                                    label: "History" },
  { active: false, path: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",                                                                                                                                                                                                                                                                                                                                                                                                                                           label: "Files" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar — shared between desktop (fixed strip) and mobile (drawer)
// ─────────────────────────────────────────────────────────────────────────────
function SidebarContent({ onClose, isMobile }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      width: isMobile ? "100%" : 44,
      height: "100%",
      background: "#ffffff",
      paddingTop: 10, paddingBottom: 12, gap: 0,
    }}>
      {/* Top: collapse / close button */}
      <div
        onClick={onClose}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 24, cursor: "pointer", marginBottom: 10,
        }}
      >
        {isMobile ? (
          /* X icon on mobile drawer */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(0,0,0,0.4)">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(0,0,0,0.3)">
            <path d="M5.59 7.41L7 6l6 6-6 6-1.41-1.41L10.17 12zM16 6h2v12h-2z" />
          </svg>
        )}
      </div>

      {/* Avatar */}
      <div style={{
        width: 26, height: 26, borderRadius: "50%",
        background: "rgba(0,0,0,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 18, cursor: "pointer", flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(0,0,0,0.35)">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      </div>

      {/* Nav items */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "100%" }}>
        {NAV_ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center",
              justifyContent: isMobile ? "flex-start" : "center",
              width: isMobile ? "calc(100% - 16px)" : 32,
              height: 32, borderRadius: 10, cursor: "pointer",
              color: item.active ? "#1a3a35" : "rgba(0,0,0,0.22)",
              background: item.active ? "rgba(26,58,53,0.09)" : "transparent",
              transition: "background 0.15s",
              paddingLeft: isMobile ? 12 : 0,
              gap: isMobile ? 10 : 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d={item.path} />
            </svg>
            {isMobile && (
              <span style={{
                fontSize: 13, fontWeight: item.active ? 700 : 500,
                fontFamily: "'DM Sans', sans-serif",
                color: item.active ? "#1a3a35" : "rgba(0,0,0,0.45)",
              }}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Settings */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: isMobile ? "flex-start" : "center",
        width: isMobile ? "calc(100% - 16px)" : 32,
        height: 32, borderRadius: 10, cursor: "pointer",
        color: "rgba(0,0,0,0.22)", marginBottom: 4,
        paddingLeft: isMobile ? 12 : 0, gap: isMobile ? 10 : 0,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
        </svg>
        {isMobile && <span style={{ fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", color: "rgba(0,0,0,0.45)" }}>Settings</span>}
      </div>

      {/* Logout */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: isMobile ? "flex-start" : "center",
        width: isMobile ? "calc(100% - 16px)" : 32,
        height: 32, borderRadius: 10, cursor: "pointer",
        color: "rgba(0,0,0,0.22)", marginBottom: 10,
        paddingLeft: isMobile ? 12 : 0, gap: isMobile ? 10 : 0,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        </svg>
        {isMobile && <span style={{ fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", color: "rgba(0,0,0,0.45)" }}>Logout</span>}
      </div>

      {/* Star badge */}
      <div style={{
        width: 26, height: 26, borderRadius: "50%",
        background: "#f5c518",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0,
        boxShadow: "0 2px 6px rgba(245,197,24,0.4)",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#1a1a1a">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HomePage component
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const [aiQuery,       setAiQuery]      = useState("");
  const [tripType,      setTripType]     = useState("one-way");
  const [cabinClass,    setCabinClass]   = useState("economy");
  const [passengers,    setPassengers]   = useState(1);
  const [from,          setFrom]         = useState({ code: "DEL", name: "Indira Gandhi", city: "Delhi" });
  const [to,            setTo]           = useState({ code: "LHR", name: "Heathrow",      city: "London" });
  const [departDate,    setDepartDate]   = useState("Mon, May 25");
  const [parseHint,     setParseHint]    = useState(null);
  const [inputFocused,  setInputFocused] = useState(false);
  const [swapHover,     setSwapHover]    = useState(false);
  const [parseError,    setParseError]   = useState(null);
  // Mobile sidebar drawer
  const [sidebarOpen,   setSidebarOpen]  = useState(false);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setAiQuery(val);
    setParseError(null);
    if (val.trim().length > 3) {
      const parsed = parseQuery(val);
      setParseHint(parsed);
      if (parsed.from)       setFrom(parsed.from);
      if (parsed.to)         setTo(parsed.to);
      if (parsed.departDate) setDepartDate(parsed.departDate);
      if (parsed.cabin)      setCabinClass(parsed.cabin);
      if (!parsed.from && !parsed.to && val.trim().length > 8) {
        setParseError("Couldn't find airports — try city names like 'Delhi' or 'London'");
      }
    } else {
      setParseHint(null);
    }
  };

  const handleAsk = () => {
    if (!aiQuery.trim()) return;
    const parsed = parseQuery(aiQuery);
    const f = parsed.from || from;
    const t = parsed.to   || to;
    const d = parsed.departDate || departDate;
    router.push(
      `/globe?from=${f.code}&to=${t.code}&fromCity=${encodeURIComponent(f.city)}&toCity=${encodeURIComponent(t.city)}&depart=${encodeURIComponent(d)}&query=${encodeURIComponent(aiQuery)}`
    );
  };

  const handleFormAsk = () => {
    router.push(
      `/globe?from=${from.code}&to=${to.code}&fromCity=${encodeURIComponent(from.city)}&toCity=${encodeURIComponent(to.city)}&depart=${encodeURIComponent(departDate)}`
    );
  };

  const swapAirports = () => { setFrom(to); setTo(from); };
  const cabinClasses = ["economy", "premium", "business", "first"];

  return (
    <div
      className="kaivo-root"
      style={{ fontFamily: "'DM Sans', sans-serif", height: "100dvh", minHeight: "100vh" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* ── MOBILE SIDEBAR BACKDROP ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 40,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      <div
        className="mobile-sidebar-drawer"
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0,
          width: 200, zIndex: 50,
          borderRight: "1px solid rgba(0,0,0,0.07)",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: sidebarOpen ? "4px 0 24px rgba(0,0,0,0.12)" : "none",
        }}
      >
        <SidebarContent onClose={() => setSidebarOpen(false)} isMobile={true} />
      </div>

      {/* ── PAGE SHELL ── */}
      <div className="kaivo-shell" style={{ display: "flex", width: "100%", height: "100%", overflow: "hidden" }}>

        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="desktop-sidebar" style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          width: 44, minWidth: 44, maxWidth: 44,
          background: "#ffffff",
          borderRight: "1px solid rgba(0,0,0,0.07)",
          zIndex: 10, flexShrink: 0,
        }}>
          <SidebarContent onClose={() => {}} isMobile={false} />
        </aside>

        {/* ── MAIN COLUMN ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* TOP BAR */}
          <header style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexShrink: 0, position: "relative",
            padding: "0 16px", height: 46,
            background: "rgba(238,242,236,0.88)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(26,58,53,0.08)",
          }}>

            {/* Left: hamburger (mobile) + brand */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Hamburger — mobile only */}
              <button
                className="hamburger-btn"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                style={{
                  display: "none", /* shown via CSS below */
                  alignItems: "center", justifyContent: "center",
                  width: 30, height: 30, borderRadius: 8,
                  border: "none", background: "transparent",
                  cursor: "pointer", padding: 0, flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(14,28,25,0.6)">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c8f135", flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", color: "#1a3a35" }}>
                  KAIVO
                </span>
              </div>
            </div>

            {/* Centre flight info — hidden on small screens */}
            <div className="header-centre" style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 10, fontWeight: 500, color: "rgba(14,28,25,0.38)",
              letterSpacing: "0.06em", whiteSpace: "nowrap",
            }}>
              <span>DEL</span><span style={{ opacity: 0.4 }}>·</span><span>14:30</span>
              <span style={{ margin: "0 4px", opacity: 0.3 }}>—</span>
              <span>LHR</span><span style={{ opacity: 0.4 }}>·</span><span>19:30</span>
            </div>

            {/* Right icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="header-humid" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(14,28,25,0.32)" }}>HUMID</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(14,28,25,0.32)">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(14,28,25,0.32)">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
            </div>
          </header>

          {/* ── HERO / MAIN AREA ── */}
          <main style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            padding: "20px 16px 16px",
            background: "linear-gradient(160deg,#eef2ec 0%,#e8eeea 35%,#eaf0f5 65%,#ede9f5 100%)",
          }}>

            {/* Blobs */}
            <div style={{ position:"absolute",borderRadius:"50%",pointerEvents:"none",top:-60,right:-60,width:360,height:360,background:"radial-gradient(circle,rgba(200,241,53,0.1) 0%,transparent 65%)" }} />
            <div style={{ position:"absolute",borderRadius:"50%",pointerEvents:"none",bottom:-50,left:"8%",width:280,height:280,background:"radial-gradient(circle,rgba(26,58,53,0.07) 0%,transparent 65%)" }} />
            <div style={{ position:"absolute",borderRadius:"50%",pointerEvents:"none",top:"35%",left:-30,width:180,height:180,background:"radial-gradient(circle,rgba(100,150,240,0.07) 0%,transparent 65%)" }} />

            {/* HEADLINE */}
            <div style={{ textAlign:"center", marginBottom:"clamp(14px,2.5vw,32px)", position:"relative", zIndex:1 }}>
              <h1 style={{ margin:0, lineHeight:1.15, fontFamily:"Georgia,'Times New Roman',serif", fontSize:"clamp(26px,5vw,52px)", fontWeight:700, color:"#0e1c19", letterSpacing:"-0.02em" }}>
                Your next flight,
              </h1>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, flexWrap:"wrap", lineHeight:1.15 }}>
                <span style={{ display:"inline-flex", alignItems:"center", fontFamily:"Georgia,'Times New Roman',serif", fontSize:"clamp(26px,5vw,52px)", fontWeight:700, color:"#053C43", background:"#c8f135", borderRadius:50, paddingLeft:"0.5em", paddingRight:"0.5em", paddingTop:"0.05em", paddingBottom:"0.1em", letterSpacing:"-0.02em", lineHeight:1.2 }}>
                  one ask
                </span>
                <span style={{ fontFamily:"Georgia,'Times New Roman',serif", fontSize:"clamp(26px,5vw,52px)", fontWeight:700, color:"#0e1c19", letterSpacing:"-0.02em", lineHeight:1.2 }}>
                  away.
                </span>
              </div>
              <p style={{ marginTop:8, fontSize:"clamp(11px,1.5vw,14px)", fontWeight:400, color:"rgba(14,28,25,0.42)" }}>
                Tell Kaivo where you want to go.
              </p>
            </div>

            {/* SEARCH CARD */}
            <div style={{ width:"100%", maxWidth:700, position:"relative", zIndex:1, borderRadius:18, padding:10, background:"#ffffff", border:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 2px 8px rgba(14,28,25,0.06),0 12px 32px rgba(14,28,25,0.12),0 32px 80px rgba(14,28,25,0.14)" }}>

              {/* AI INPUT ROW */}
              <div style={{ display:"flex", alignItems:"center", gap:10, borderRadius:12, transition:"all 0.2s", padding:"10px 12px", marginBottom:2, background:inputFocused?"#ffffff":"#fafbf9", border:`1.5px solid ${inputFocused?"#1a3a35":"rgba(26,58,53,0.12)"}`, boxShadow:"0 0 0 1px rgba(181,250,230,0.8),0 0 20px rgba(180,255,235,0.35),0 8px 24px rgba(180,255,235,0.15),inset 0 1px 0 rgba(255,255,255,0.9)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={inputFocused?"#1a3a35":"rgba(14,28,25,0.28)"} style={{ flexShrink:0 }}>
                  <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V6zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
                <input
                  value={aiQuery}
                  onChange={handleQueryChange}
                  onKeyDown={e => e.key === "Enter" && handleAsk()}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder='e.g. "Book a flight from India to London"'
                  style={{ flex:1, border:"none", outline:"none", background:"transparent", fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(11px,1.5vw,13.5px)", color:"#0e1c19", minWidth:0 }}
                />

                {/* Live parse badges */}
                {parseHint && (parseHint.from || parseHint.to) && (
                  <div style={{ display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>
                    {parseHint.from && (
                      <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.04em", background:"#1a3a35", color:"#c8f135", borderRadius:50, padding:"2px 8px" }}>
                        {parseHint.from.code}
                      </span>
                    )}
                    {parseHint.from && parseHint.to && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(14,28,25,0.3)">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                      </svg>
                    )}
                    {parseHint.to && (
                      <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.04em", background:"#c8f135", color:"#1a3a35", borderRadius:50, padding:"2px 8px" }}>
                        {parseHint.to.code}
                      </span>
                    )}
                  </div>
                )}

                <button onClick={handleAsk} style={{ display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, width:30, height:30, borderRadius:10, border:"none", cursor:"pointer", transition:"all 0.15s", background:aiQuery?"#1a3a35":"#eaece8" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill={aiQuery?"#c8f135":"rgba(14,28,25,0.28)"}>
                    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
                  </svg>
                </button>
              </div>

              {/* Parse error */}
              {parseError && (
                <div style={{ fontSize:10.5, color:"#c84040", padding:"4px 14px 2px", fontWeight:500 }}>
                  ⚠ {parseError}
                </div>
              )}

              {/* OR divider */}
              <div style={{ display:"flex", alignItems:"center", gap:10, margin:"10px 2px" }}>
                <div style={{ flex:1, height:1, background:"rgba(26,58,53,0.08)" }} />
                <span style={{ fontSize:9.5, fontWeight:700, letterSpacing:"0.14em", color:"rgba(14,28,25,0.24)", whiteSpace:"nowrap" }}>OR FILL IN BELOW</span>
                <div style={{ flex:1, height:1, background:"rgba(26,58,53,0.08)" }} />
              </div>

              {/* FORM BODY */}
              <div style={{ padding:"4px 6px 6px" }}>

                {/* Controls row */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, flexWrap:"wrap", gap:6 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:5, fontFamily:"'DM Sans',sans-serif", fontSize:10.5, fontWeight:700, letterSpacing:"0.14em", color:"#1a3a35" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#1a3a35">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                    FLIGHT
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      {["round-trip","one-way"].map(t => (
                        <span key={t} onClick={() => setTripType(t)} style={{ cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11.5, fontWeight:tripType===t?700:500, color:tripType===t?"#1a3a35":"rgba(14,28,25,0.38)", borderBottom:tripType===t?"2px solid #c8f135":"2px solid transparent", paddingBottom:2, userSelect:"none", transition:"all 0.15s" }}>
                          {t === "round-trip" ? "Round trip" : "One way"}
                        </span>
                      ))}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:4, fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(14,28,25,0.38)" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(14,28,25,0.38)">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                      </svg>
                      <button onClick={() => setPassengers(Math.max(1, passengers - 1))} style={{ background:"transparent", border:"none", cursor:"pointer", fontSize:15, color:"rgba(14,28,25,0.4)", lineHeight:1, padding:"0 2px" }}>−</button>
                      <span style={{ fontSize:12, fontWeight:700, color:"#1a3a35", minWidth:14, textAlign:"center" }}>{passengers}</span>
                      <button onClick={() => setPassengers(passengers + 1)} style={{ background:"transparent", border:"none", cursor:"pointer", fontSize:15, color:"#1a3a35", lineHeight:1, padding:"0 2px" }}>+</button>
                    </div>
                  </div>
                </div>

                {/* Airport + date row — responsive */}
                <div className="airport-row" style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:0, borderTop:"1px solid rgba(26,58,53,0.08)", borderBottom:"1px solid rgba(26,58,53,0.08)", padding:"14px 0", marginBottom:10 }}>

                  {/* FROM */}
                  <div style={{ display:"flex", flexDirection:"column", gap:2, flex:"1 1 70px", minWidth:60 }}>
                    <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", color:"rgba(14,28,25,0.38)" }}>FROM</span>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(18px,3.5vw,28px)", fontWeight:800, lineHeight:1, color:"#1a3a35", letterSpacing:"-0.01em" }}>{from.code}</span>
                    <span style={{ fontSize:9.5, fontWeight:400, color:"rgba(14,28,25,0.36)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:100, marginTop:2 }}>{from.name}</span>
                  </div>

                  {/* Swap */}
                  <button onClick={swapAirports} onMouseEnter={() => setSwapHover(true)} onMouseLeave={() => setSwapHover(false)} style={{ display:"flex", alignItems:"center", justifyContent:"center", width:30, height:30, borderRadius:"50%", cursor:"pointer", transition:"all 0.2s", flexShrink:0, background:swapHover?"#f0f4f0":"#ffffff", border:`1.5px solid ${swapHover?"#1a3a35":"rgba(26,58,53,0.18)"}`, color:"#1a3a35", transform:swapHover?"rotate(180deg)":"rotate(0deg)", margin:"0 4px" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
                    </svg>
                  </button>

                  {/* TO */}
                  <div style={{ display:"flex", flexDirection:"column", gap:2, flex:"1 1 70px", minWidth:60 }}>
                    <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", color:"rgba(14,28,25,0.38)" }}>TO</span>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(18px,3.5vw,28px)", fontWeight:800, lineHeight:1, color:"#1a3a35", letterSpacing:"-0.01em" }}>{to.code}</span>
                    <span style={{ fontSize:9.5, fontWeight:400, color:"rgba(14,28,25,0.36)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:100, marginTop:2 }}>{to.name}</span>
                  </div>

                  {/* DEPART */}
                  <div className="depart-col" style={{ display:"flex", flexDirection:"column", gap:2, flex:"1 1 70px", minWidth:60, paddingLeft:8, borderLeft:"1px solid rgba(26,58,53,0.08)" }}>
                    <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", color:"rgba(14,28,25,0.38)" }}>DEPART</span>
                    <span style={{ fontSize:"clamp(11px,1.5vw,12.5px)", fontWeight:700, color:"#1a3a35", marginTop:4 }}>{departDate}</span>
                  </div>

                  {/* WHEN */}
                  <div className="when-col" style={{ display:"flex", flexDirection:"column", gap:2, flex:"1 1 55px", minWidth:50, paddingLeft:8, borderLeft:"1px solid rgba(26,58,53,0.08)" }}>
                    <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", color:"rgba(14,28,25,0.38)" }}>WHEN</span>
                    <span style={{ fontSize:"clamp(11px,1.5vw,12.5px)", fontWeight:400, color:"rgba(14,28,25,0.38)", marginTop:4 }}>Anytime</span>
                  </div>

                  {/* Ask button */}
                  <button onClick={handleFormAsk} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, border:"none", cursor:"pointer", borderRadius:12, transition:"all 0.15s", whiteSpace:"nowrap", marginLeft:6, padding:"0 14px", height:44, flexShrink:0, fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(12px,1.5vw,14px)", fontWeight:700, background:"linear-gradient(135deg,#c8f135 0%,#d4f54a 100%)", color:"#0e1c19", boxShadow:"0 4px 18px rgba(200,241,53,0.38),0 1px 4px rgba(200,241,53,0.2)" }}>
                    Ask
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                  </button>
                </div>

                {/* Cabin class tabs */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0 }}>
                  {cabinClasses.map(cls => (
                    <button key={cls} onClick={() => setCabinClass(cls)} style={{ border:"none", cursor:"pointer", textTransform:"uppercase", borderRadius:10, transition:"all 0.15s", padding:"10px 0", textAlign:"center", fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(9px,1.2vw,10.5px)", fontWeight:700, letterSpacing:"0.12em", background:cabinClass===cls?"#1a3a35":"transparent", color:cabinClass===cls?"#c8f135":"rgba(14,28,25,0.32)" }}>
                      {cls}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick chips */}
            <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap", justifyContent:"center", position:"relative", zIndex:1 }}>
              {["Cheapest week to fly","Overnight departures","Direct only"].map(label => (
                <button key={label} style={{ fontFamily:"'DM Sans',sans-serif", padding:"7px 14px", border:"1.5px solid rgba(26,58,53,0.14)", background:"rgba(255,255,255,0.6)", color:"rgba(14,28,25,0.55)", fontSize:"clamp(10px,1.2vw,11.5px)", fontWeight:500, backdropFilter:"blur(8px)", letterSpacing:"0.01em", borderRadius:50, cursor:"pointer", transition:"all 0.15s" }}>
                  {label}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }

        /* ── Desktop: show sidebar strip, hide hamburger ── */
        .desktop-sidebar { display: flex !important; }
        .hamburger-btn   { display: none !important; }
        .header-centre   { display: flex !important; }
        .header-humid    { display: inline !important; }

        /* ── ≤ 768px: hide desktop sidebar, show hamburger ── */
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .hamburger-btn   { display: flex !important; }
          .header-centre   { display: none !important; }
          .header-humid    { display: none !important; }
        }

        /* ── ≤ 480px: collapse WHEN column and tighten depart ── */
        @media (max-width: 480px) {
          .when-col    { display: none !important; }
          .depart-col  { min-width: 50px !important; }
        }

        /* ── ≤ 360px: further squeeze ── */
        @media (max-width: 360px) {
          .depart-col  { display: none !important; }
          .airport-row { gap: 0 !important; }
        }
      `}</style>
    </div>
  );
}