import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const TRAVELER_PROFILE = {
  name: "Mr Alex Abramovic",
  initials: "AA",
  country: "United Kingdom",
  dob: "10 Feb 1992",
  email: "alex.abramovic@yahoo.com",
  phone: "+44 0743812394",
  cardLast: "3301",
  cardExpiry: "02/2040",
};

export default function BookingChat() {
  const router = useRouter();
  const {
    from = "MIA",
    to = "LGA",
    fromCity = "Miami",
    toCity = "New York",
    depart = "Fri 12 Jun",
    airline = "American Airlines",
    flightNum = "AA1289",
    departTime = "07:45 PM",
    arriveTime = "10:50 PM",
    price = "90.88",
    cabin = "ECONOMY",
    arriveCode = "LGA",
  } = router.query || {};

  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [phase, setPhase] = useState("loading");
  const [inputValue, setInputValue] = useState("");
  const userQuery =
    router.query?.query ||
    `Book me a flight from ${fromCity} to ${toCity} ${depart}`;

  useEffect(() => {
    if (!router.isReady) return;

    const sequence = [
      { delay: 200, type: "user", text: userQuery },
      { delay: 900, type: "ai", text: "Best route intelligence below." },
      {
        delay: 1600,
        type: "ai",
        text: "I've prepared the booking. Confirm your traveler details and I'll handle the rest.",
      },
      { delay: 2200, type: "card" },
    ];

    sequence.forEach(({ delay, type, text }) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { type, text, time: "9:15 PM" }]);
        if (type === "card") setPhase("confirm");
      }, delay);
    });
  }, [router.isReady]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleContinue = () => {
    router.push({
      pathname: "/fare",
      query: {
        from,
        to,
        fromCity,
        toCity,
        depart,
        airline,
        flightNum,
        departTime,
        arriveTime,
        price,
        cabin,
        arriveCode,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 font-sans flex flex-col">
      {/* ── Top Nav ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-3 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm gap-2">
        {/* Left: back + route pill */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-gray-700 transition-colors text-sm font-medium flex-shrink-0"
          >
            ← <span className="hidden sm:inline">Back</span>
          </button>

          {/* Route pill — collapses gracefully on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 border border-gray-200 rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 min-w-0 overflow-hidden">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            {/* Hide secondary labels on small screens */}
            <span className="hidden xs:inline text-xs text-gray-400">— · —</span>
            <span className="text-xs text-gray-500 truncate hidden sm:inline">Flexible dates</span>
            <span className="text-gray-300 text-xs hidden sm:inline">·</span>
            <span className="text-xs text-gray-500 flex-shrink-0">1 traveler</span>
          </div>
        </div>

        {/* Right: cabin + edit + new search */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">ECONOMY</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>

          <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          <button className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-700 border border-gray-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 transition-colors">
            <span className="text-sm leading-none">+</span>
            <span className="hidden xs:inline">NEW</span>
            <span className="hidden sm:inline"> SEARCH</span>
          </button>
        </div>
      </div>

      {/* ── Chat Area ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 w-full max-w-3xl mx-auto">
        <div className="space-y-3 sm:space-y-4">
          {messages.map((msg, i) => {
            /* ── User bubble ── */
            if (msg.type === "user") {
              return (
                <div
                  key={i}
                  className="flex justify-end"
                  style={{ animation: "bubblePop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
                >
                  <div className="max-w-[80%] sm:max-w-xs lg:max-w-md">
                    <div className="bg-emerald-800 text-white text-sm font-medium px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl rounded-br-sm shadow-sm leading-relaxed">
                      {msg.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-1.5 text-right pr-1">{msg.time}</div>
                  </div>
                </div>
              );
            }

            /* ── AI bubble ── */
            if (msg.type === "ai") {
              return (
                <div
                  key={i}
                  className="flex items-start gap-2 sm:gap-3"
                  style={{ animation: "bubblePop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                  </div>
                  <div className="max-w-[80%] sm:max-w-xs lg:max-w-md">
                    <div className="bg-white text-gray-800 text-sm font-medium px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 leading-relaxed">
                      {msg.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-1.5 pl-1">{msg.time}</div>
                  </div>
                </div>
              );
            }

            /* ── Booking card ── */
            if (msg.type === "card") {
              return (
                <div
                  key={i}
                  style={{ animation: "fadeUp 0.35s ease both 0.1s" }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden w-full">

                    {/* Card header */}
                    <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">TRAVELER</span>
                        <span className="text-gray-200">·</span>
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">1 READY</span>
                      </div>
                    </div>

                    {/* Card body — stacks on mobile, two-col on md+ */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col md:flex-row gap-5 md:gap-8">

                      {/* Left: traveler details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                            {TRAVELER_PROFILE.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-gray-900 truncate">{TRAVELER_PROFILE.name}</div>
                            <div className="text-xs text-gray-400 truncate">{TRAVELER_PROFILE.country} · {TRAVELER_PROFILE.dob}</div>
                          </div>
                        </div>

                        <div className="space-y-2 sm:space-y-2.5">
                          <div className="flex items-center gap-2.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span className="text-xs text-gray-500 truncate">{TRAVELER_PROFILE.email}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span className="text-xs text-gray-500">{TRAVELER_PROFILE.phone}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0">
                              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                              <line x1="1" y1="10" x2="23" y2="10" />
                            </svg>
                            <span className="text-xs text-gray-500">•••• {TRAVELER_PROFILE.cardLast} · Exp {TRAVELER_PROFILE.cardExpiry}</span>
                          </div>
                        </div>
                      </div>

                      {/* Divider — horizontal on mobile, vertical on md+ */}
                      <div className="h-px md:h-auto md:w-px bg-gray-100 self-stretch" />

                      {/* Right: flight summary */}
                      <div className="md:flex-shrink-0 md:min-w-[200px]">
                        <div className="flex items-center gap-2 mb-3">
                          <svg viewBox="0 0 40 40" width="20" height="20">
                            <circle cx="20" cy="20" r="20" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
                            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#E91C23" fontSize="9" fontWeight="700">AA</text>
                          </svg>
                          <span className="text-xs text-gray-500">{airline}</span>
                        </div>

                        {/* Route row */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl font-bold text-gray-900">{from}</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                          <span className="text-xl font-bold text-gray-900">{arriveCode}</span>
                        </div>

                        <div className="text-xs text-gray-500 mb-1">{depart} · {departTime} → {arriveTime}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-4">{cabin} · 1 TRAVELER</div>

                        <div className="border-t border-gray-100 pt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</span>
                            <span className="text-lg font-bold text-gray-900">${price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card footer — wraps on mobile */}
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2 sm:gap-3 border-t border-gray-50 pt-3 sm:pt-4">
                      <div className="flex gap-2 xs:gap-3 justify-end">
                        <button className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-gray-700 px-3 sm:px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <line x1="19" y1="8" x2="19" y2="14" />
                            <line x1="22" y1="11" x2="16" y2="11" />
                          </svg>
                          <span className="hidden sm:inline">Add traveler</span>
                          <span className="sm:hidden">Add</span>
                        </button>
                        <button className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-gray-700 px-3 sm:px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          <span className="hidden sm:inline">Edit traveler</span>
                          <span className="sm:hidden">Edit</span>
                        </button>
                      </div>
                      <button
                        onClick={handleContinue}
                        className="flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm px-5 sm:px-6 py-2.5 rounded-full transition-colors shadow-md whitespace-nowrap w-full xs:w-auto"
                      >
                        Continue booking
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Bottom Input Bar ─────────────────────────────────────── */}
      <div className="bg-white border-t border-gray-100 px-3 sm:px-6 py-3 sm:py-4 sticky bottom-0">
        <div className="max-w-3xl mx-auto flex items-center gap-2 sm:gap-3">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none min-w-0"
            />
          </div>

          {/* Keyboard hint — hidden on mobile to save space */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-300 select-none flex-shrink-0">
            <span>⌘ Command</span>
            <span>⌘ send</span>
            <span>Paste images</span>
          </div>

          <button className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-700 hover:bg-emerald-800 rounded-full flex items-center justify-center transition-colors shadow-sm flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Global animation keyframes ───────────────────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bubblePop {
          0%   { opacity: 0; transform: scale(0.95) translateY(6px); }
          100% { opacity: 1; transform: scale(1)    translateY(0); }
        }
        /* Custom xs breakpoint (480 px) not in default Tailwind config.
           Add this to tailwind.config.js → theme.screens: { xs: '480px' }
           or replace xs: classes with sm: if you can't extend config. */
      `}</style>
    </div>
  );
}