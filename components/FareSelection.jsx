import { useState } from "react";
import { useRouter } from "next/router";

const FARE_OPTIONS = [
  {
    id: "light",
    name: "Light",
    price: 0,
    label: "Included",
    perks: ["Carry-on"],
    recommended: false,
    mostChosen: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: 38,
    label: "+$38",
    perks: ["Carry-on", "Checked bag", "Seat choice"],
    recommended: false,
    mostChosen: true,
  },
  {
    id: "flex",
    name: "Flex",
    price: 96,
    label: "+$96",
    perks: ["Carry-on", "Checked bag", "Seat choice", "Free changes"],
    recommended: false,
    mostChosen: false,
  },
];

const BAGGAGE_OPTIONS = [
  { id: "none", label: "No checked bag", price: 0 },
  { id: "one", label: "1 checked bag", price: 35 },
  { id: "two", label: "2 checked bags", price: 60 },
];

export default function FareSelection() {
  const router = useRouter();
  const {
    from = "MIA",
    to = "LGA",
    fromCity = "Miami",
    toCity = "New York",
    depart = "Fri 12 Jun",
    airline = "American Airlines",
    departTime = "07:45 PM",
    arriveTime = "10:50 PM",
    price = "90.88",
    cabin = "ECONOMY",
    arriveCode = "LGA",
  } = router.query || {};

  const baseFare = 74.52;
  const taxes = 16.36;

  const [selectedFare, setSelectedFare] = useState("light");
  const [selectedBaggage, setSelectedBaggage] = useState("none");
  const [perksOpen, setPerksOpen] = useState(false);
  const [protectionOpen, setProtectionOpen] = useState(false);
  const [fareUpgradeOpen, setFareUpgradeOpen] = useState(true);
  const [baggageOpen, setBaggageOpen] = useState(true);

  const fareExtra = FARE_OPTIONS.find((f) => f.id === selectedFare)?.price || 0;
  const baggageExtra = BAGGAGE_OPTIONS.find((b) => b.id === selectedBaggage)?.price || 0;
  const extras = fareExtra + baggageExtra;
  const total = (baseFare + taxes + extras).toFixed(2);

  const handleContinue = () => {
    router.push({
      pathname: "/checkout",
      query: { ...router.query, total, fare: selectedFare },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-blue-50/30 font-body flex flex-col">

      {/* ── Top Nav ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-3 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm gap-2">
        {/* Left */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-gray-700 transition-colors text-sm font-medium flex-shrink-0"
          >
            ← <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 border border-gray-200 rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 min-w-0 overflow-hidden">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0">1 traveler</span>
            <span className="text-gray-300 text-xs hidden sm:inline">·</span>
            <span className="text-xs text-gray-500 hidden sm:inline truncate">Flexible dates</span>
          </div>
        </div>

        {/* Right */}
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

      {/* ── Flight Summary Bar ───────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-start sm:justify-end gap-2 sm:gap-4 overflow-x-auto">
        <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{departTime}</span>
        <span className="text-gray-300">·</span>
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex-shrink-0">{cabin}</span>
        <span className="text-gray-300">·</span>
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 flex-shrink-0">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          1 TRAVELER
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">

          {/* ── KAIVO RECOMMENDED ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                KAIVO RECOMMENDED
              </p>
              {/* 2-col on all sizes, just smaller on mobile */}
              <div className="grid grid-cols-2 gap-y-4 sm:gap-y-5 gap-x-4 sm:gap-x-8">
                {[
                  {
                    label: "FARE", value: "Light",
                    icon: <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />,
                  },
                  {
                    label: "BAGGAGE", value: "Checked bag",
                    icon: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></>,
                  },
                  {
                    label: "SEAT", value: "Window",
                    icon: <circle cx="12" cy="12" r="9" />,
                  },
                  {
                    label: "PROTECTION", value: "Plus protection",
                    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
                  },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5">
                        {icon}
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-0.5">{label}</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── UPGRADE FARE ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between"
              onClick={() => setFareUpgradeOpen(!fareUpgradeOpen)}
            >
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">UPGRADE FARE</p>
                <p className="text-sm sm:text-base font-bold text-gray-900 text-left mt-0.5">
                  {FARE_OPTIONS.find((f) => f.id === selectedFare)?.name}
                </p>
              </div>
              <svg
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
                className={`transition-transform flex-shrink-0 ${fareUpgradeOpen ? "rotate-180" : ""}`}
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>

            {fareUpgradeOpen && (
              <div className="px-3 sm:px-6 pb-4 sm:pb-6">
                {/* On mobile: vertical stack; sm+: 3-column grid */}
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {FARE_OPTIONS.map((fare) => (
                    <div
                      key={fare.id}
                      onClick={() => setSelectedFare(fare.id)}
                      className={`relative rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedFare === fare.id
                          ? "border-gray-900 bg-white shadow-md"
                          : "border-gray-100 bg-white hover:border-gray-200"
                      }`}
                    >
                      {/* Most chosen badge */}
                      {fare.mostChosen && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                          <span className="bg-teal-400 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                            • MOST CHOSEN
                          </span>
                        </div>
                      )}

                      {/* Mobile: horizontal layout inside card */}
                      <div className="p-3 sm:p-4 flex sm:block items-center gap-4">
                        <div className="flex items-start justify-between mb-0 sm:mb-3 flex-shrink-0 sm:w-auto w-28">
                          <span className="text-sm font-bold text-gray-900">{fare.name}</span>
                        </div>
                        <div className="flex sm:hidden items-center gap-2 flex-1 flex-wrap">
                          {fare.perks.map((perk) => (
                            <div key={perk} className="flex items-center gap-1">
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span className="text-xs text-gray-500">{perk}</span>
                            </div>
                          ))}
                        </div>
                        <span className={`text-xs font-semibold ml-auto sm:ml-0 flex-shrink-0 sm:hidden ${fare.price === 0 ? "text-gray-400" : "text-gray-700"}`}>
                          {fare.price === 0 ? "Included" : `+$${fare.price}`}
                        </span>

                        {/* Desktop layout */}
                        <div className="hidden sm:flex items-start justify-between mb-3">
                          <span className="text-sm font-bold text-gray-900">{fare.name}</span>
                          <span className={`text-xs font-semibold ${fare.price === 0 ? "text-gray-400" : "text-gray-700"}`}>
                            {fare.price === 0 ? "Included" : `+$${fare.price}`}
                          </span>
                        </div>
                        <div className="hidden sm:block space-y-1.5">
                          {fare.perks.map((perk) => (
                            <div key={perk} className="flex items-center gap-1.5">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span className="text-xs text-gray-500">{perk}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Selected indicator */}
                      {selectedFare === fare.id && (
                        <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── CUSTOMIZE BAGGAGE ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between"
              onClick={() => setBaggageOpen(!baggageOpen)}
            >
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">CUSTOMIZE BAGGAGE</p>
                <p className="text-sm sm:text-base font-bold text-gray-900 text-left mt-0.5">
                  {BAGGAGE_OPTIONS.find((b) => b.id === selectedBaggage)?.label}
                </p>
              </div>
              <svg
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
                className={`transition-transform flex-shrink-0 ${baggageOpen ? "rotate-180" : ""}`}
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>

            {baggageOpen && (
              <div className="px-3 sm:px-6 pb-4 sm:pb-6 space-y-2">
                {BAGGAGE_OPTIONS.map((bag) => (
                  <div
                    key={bag.id}
                    onClick={() => setSelectedBaggage(bag.id)}
                    className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border cursor-pointer transition-all ${
                      selectedBaggage === bag.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedBaggage === bag.id ? "border-gray-900" : "border-gray-300"
                      }`}>
                        {selectedBaggage === bag.id && (
                          <div className="w-2 h-2 rounded-full bg-gray-900" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{bag.label}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-500 flex-shrink-0">
                      {bag.price === 0 ? "Included" : `+$${bag.price}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── ADD PERKS ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between"
              onClick={() => setPerksOpen(!perksOpen)}
            >
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">ADD PERKS</p>
                <p className="text-sm sm:text-base font-bold text-gray-900 text-left mt-0.5">Optional upgrades available</p>
              </div>
              <svg
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
                className={`transition-transform flex-shrink-0 ${perksOpen ? "rotate-180" : ""}`}
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>

            {perksOpen && (
              <div className="px-3 sm:px-6 pb-4 space-y-2">
                {["Priority boarding", "Extra legroom", "In-flight Wi-Fi"].map((perk) => (
                  <div key={perk} className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-all">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{perk}</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-400">+$12</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── ADJUST PROTECTION ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between"
              onClick={() => setProtectionOpen(!protectionOpen)}
            >
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">ADJUST PROTECTION</p>
                <p className="text-sm sm:text-base font-bold text-gray-900 text-left mt-0.5">Plus protection</p>
              </div>
              <svg
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
                className={`transition-transform flex-shrink-0 ${protectionOpen ? "rotate-180" : ""}`}
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>

            {protectionOpen && (
              <div className="px-3 sm:px-6 pb-4 space-y-2">
                {[
                  { name: "No protection", price: 0 },
                  { name: "Basic protection", price: 12 },
                  { name: "Plus protection", price: 28 },
                ].map((opt) => (
                  <div key={opt.name} className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-all">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{opt.name}</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-400">
                      {opt.price === 0 ? "Free" : `+$${opt.price}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── PRICE BREAKDOWN + CTA ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5">
              {/* Line items */}
              <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
                {[
                  { label: "Base fare", value: `$${baseFare.toFixed(2)}` },
                  { label: "Taxes",     value: `$${taxes.toFixed(2)}` },
                  { label: "Extras",    value: `+$${extras.toFixed(2)}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-500">{label}</span>
                    <span className="text-xs sm:text-sm text-gray-700">{value}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 mb-4 sm:mb-5" />

              {/* Total + CTA — stacks on mobile, side-by-side on sm+ */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Total block */}
                <div>
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">TOTAL</span>
                    <button className="text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600 transition-colors">
                      Skip extras
                    </button>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">${total}</div>
                  <div className="text-xs text-gray-400 mt-1">Includes taxes and airline fees</div>
                </div>

                {/* CTA block — full width on mobile */}
                <div className="flex flex-col items-stretch sm:items-end gap-2">
                  <button
                    onClick={handleContinue}
                    className="flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm px-6 sm:px-7 py-3 rounded-full transition-colors shadow-md w-full sm:w-auto whitespace-nowrap"
                  >
                    Looks good, continue
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                  </button>
                  <div className="flex items-center justify-center sm:justify-end gap-1.5 text-xs text-gray-400">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="uppercase tracking-wider font-medium">SECURE CHECKOUT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-6 sm:h-8" />
        </div>
      </div>

      <style>{`
        /* Add to tailwind.config.js → theme.extend.screens: { xs: '480px' } */
      `}</style>
    </div>
  );
}