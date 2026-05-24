import { useState } from "react";
import { useRouter } from "next/router";

const PAYMENT_METHODS = [
  {
    id: "kaivo",
    name: "KAIVO Card",
    subtitle: "•••• 7890",
    balance: "$1,089.55",
    icon: "kaivo",
  },
  {
    id: "apple",
    name: "Apple Pay",
    subtitle: null,
    balance: null,
    icon: "apple",
  },
  {
    id: "google",
    name: "Google Pay",
    subtitle: null,
    balance: null,
    icon: "google",
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    subtitle: "Via Stripe",
    balance: null,
    icon: "card",
  },
];

function PaymentIcon({ type }) {
  if (type === "kaivo") {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      </div>
    );
  }
  if (type === "apple") {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      </div>
    );
  }
  if (type === "google") {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg width="15" height="15" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      </div>
    );
  }
  if (type === "card") {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-purple-500 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <rect x="5" y="13" width="4" height="2" rx="0.5" fill="rgba(255,255,255,0.7)" />
        </svg>
      </div>
    );
  }
  return null;
}

export default function Checkout() {
  const router = useRouter();
  const {
    from = "MIA",
    arriveCode = "LGA",
    airline = "American Airlines",
    departTime = "07:45 PM",
    arriveTime = "10:50 PM",
    total = "146.88",
  } = router.query || {};

  const [selectedPayment, setSelectedPayment] = useState("kaivo");
  const [confirming, setConfirming] = useState(false);

  const baseFare = 120.44;
  const taxesFees = 26.44;
  const checkedBag = 55.0;

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      router.push({ pathname: "/confirmation", query: router.query });
    }, 1200);
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

      {/* ── Main Content ─────────────────────────────────────────── */}
      {/* On mobile: no vertical centering (content fills naturally).
          On md+: centered with items-start so card doesn't stretch. */}
      <div className="flex-1 flex flex-col md:items-center md:justify-center px-3 sm:px-4 py-4 sm:py-8">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">

          {/* ── Flight summary header ── */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-50">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* AA logo */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 40 40" width="28" height="28">
                  <circle cx="20" cy="20" r="20" fill="#fff" />
                  <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="#E91C23" fontSize="10" fontWeight="700">AA</text>
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-base font-bold text-gray-900">{from}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                  <span className="text-sm sm:text-base font-bold text-gray-900">{arriveCode}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5 truncate">
                  {airline} · {departTime} → {arriveTime} · 3h 5m
                </div>
              </div>
            </div>
          </div>

          {/* ── Price breakdown ── */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-50">
            <div className="space-y-2 sm:space-y-2.5">
              {[
                { label: "Base fare",    value: `$${baseFare.toFixed(2)}` },
                { label: "Taxes & fees", value: `$${taxesFees.toFixed(2)}` },
                { label: "Checked bag",  value: `+$${checkedBag.toFixed(2)}` },
                { label: "Seat",         value: "Window" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-500">{label}</span>
                  <span className="text-xs sm:text-sm text-gray-700">{value}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
              <span className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">TOTAL</span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">${total || "146.88"}</span>
            </div>
          </div>

          {/* ── Payment methods ── */}
          <div className="px-3 sm:px-6 py-3 sm:py-4">
            <div className="space-y-1.5 sm:space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedPayment === method.id
                      ? "border-gray-200 bg-white shadow-sm"
                      : "border-transparent hover:border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {/* Radio */}
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    selectedPayment === method.id
                      ? "border-gray-900 bg-gray-900"
                      : "border-gray-300 bg-white"
                  }`}>
                    {selectedPayment === method.id && (
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
                    )}
                  </div>

                  {/* Icon */}
                  <PaymentIcon type={method.icon} />

                  {/* Name + subtitle */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{method.name}</div>
                    {method.subtitle && (
                      <div className="text-xs text-gray-400 mt-0.5">{method.subtitle}</div>
                    )}
                  </div>

                  {/* Balance (KAIVO card only) */}
                  {method.balance && (
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 flex-shrink-0">{method.balance}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom actions ── */}
          <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => router.back()}
                className="flex-shrink-0 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors px-3 sm:px-4 py-3"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirming}
                className={`flex-1 flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm py-3 sm:py-3.5 rounded-full transition-all shadow-md ${
                  confirming ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {confirming ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Confirming...
                  </>
                ) : (
                  <>
                    Confirm booking
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-3">
              Kaivo will confirm your booking instantly after payment.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        /* Add to tailwind.config.js → theme.extend.screens: { xs: '480px' } */
      `}</style>
    </div>
  );
}