# KAIVO — Private Aviation Website

A luxury flight booking website inspired by JeskoJets, built with Next.js.

## 🚀 Quick Start

### 1. Install dependencies
```bash
cd kaivo
npm install
```

### 2. Run the development server
```bash
npm run dev
```

### 3. Open in browser
Visit **http://localhost:3000**

---

## 📁 Project Structure

```
kaivo/
├── pages/
│   ├── _app.js          # App wrapper
│   └── index.js         # Main page (all sections)
├── public/
│   ├── hero-bg.gif      # Background video GIF (your uploaded file)
│   ├── window.png       # Airplane window overlay (your uploaded file)
│   └── kaivo-logo.png   # KAIVO logo (your uploaded file)
├── styles/
│   └── globals.css      # All styles
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## ✨ Features

### Hero Section
- **GIF plays as full-screen background** automatically on load
- **Airplane window image overlaid** on top — looks like you're looking through a cabin window
- **KAIVO logo** displayed in the center with fade-in animation
- **GIF auto-stops after 6 seconds** (freezes on last frame)
- **Scroll-triggered parallax** — the window zooms slightly as you scroll down

### Smooth Scroll Transition
- Scrolling reveals a **pure white section** with the headline: *"Your next flight, one ask away."*
- Elements animate in with staggered fade-up reveals

### Features Section
- Three cards: 24/7 Availability, Global Reach, Bespoke Service
- Scroll-triggered animations

### Contact / Booking Form
- Full inquiry form (Name, Email, Phone, Departure, Destination)
- Success state after submission

### Navbar
- Transparent over hero, becomes solid dark on scroll
- KAIVO logo + navigation links + "Book a Flight" CTA

---

## 🛠️ Build for Production

```bash
npm run build
npm start
```
