# LITHOS — Subterra Acoustic & Seismological Field Archive

> An art-directed, Awwwards-tier experimental research collective and physical vinyl/tape label capturing deep-earth acoustic phenomena: tectonic faultline resonance, sub-glacial hydrophone arrays, volcanic fumarole infrasound, and subterranean cavern acoustics.

[![Live Demo](https://img.shields.io/badge/Demo-Live_Archive-D94E28?style=for-the-badge)](https://annyxtopheles.github.io/nagae-studio/)
[![Acoustic Telemetry](https://img.shields.io/badge/Telemetry-192kHz%2F32--bit-38EF7D?style=for-the-badge)](https://annyxtopheles.github.io/nagae-studio/)
[![Physical Editions](https://img.shields.io/badge/Editions-180g_Vinyl_%26_Tape-ECEAE4?style=for-the-badge)](https://annyxtopheles.github.io/nagae-studio/)

---

## 🏛️ Project Vision & Overview

**LITHOS** operates at the intersection of geophysical science, speculative deep listening, and tactile sound preservation. The collective deploys custom titanium transducers, hadal hydrophones, and deep-borehole geophones into subterranean chambers worldwide, inscribing the resulting infrasonic standing waves onto heavyweight 180-gram mineral-marbled vinyl and 1/4-inch archival analog master tapes.

The web platform is designed with a **brutalist geological editorial aesthetic**: volcanic basalt (`#0A0A0B`), strata charcoal (`#141416`), bone chalk (`#ECEAE4`), oxidized iron rust (`#D94E28`), and seismic phosphor green (`#38EF7D`), set in monumental lapidary serif (`Cinzel`) and high-density technical monospace (`Space Mono`).

---

## 🔬 Core Label Architecture

### 01 // Label Masthead & Navigation (`LabelHeader`)
- Austere, understated record label masthead (`LITHOS RECORDINGS · EST. 2024`).
- Direct navigation: `FEATURED` · `CATALOG` · `DISPATCHES` · `ABOUT` · `CART`.
- Micro playback status pill with immediate play/pause audition trigger.

### 02 // Flagship Physical Release Showcase (`FeaturedReleaseHero`)
- **Authentic Heavyweight Vinyl Presentation**: 180-gram mineral-marbled vinyl pressing sliding smoothly from a 350gsm tip-on gatefold jacket, rotating in real-time with realistic groove reflections.
- **Direct Track Auditioning**: Immediate client-side track playback with Side A / Side B selection, durations, and recording depth markers.
- **Mailorder Integration**: Clear physical price, stock status, and one-click cart reservation.
- **Discography Quick-Selector**: Instant tab switching across all 5 physical catalog releases.

### 03 // Complete Archival Catalog Grid (`LabelCatalog`)
- **Format Filtering**: Filter by `ALL FORMATS`, `180G VINYL`, or `ANALOG TAPE`.
- **Dossier Inspector Modal**: Full-screen archival view featuring lacquer mastering plant credits (Pallas GmbH, Bernie Grundman, Abbey Road), complete tracklists, packaging specifications, and mailorder ordering.
- **Physical Disc Mockups**: Real-time rotating marbled vinyl discs and analog tape reel visuals.

### 04 // Label Dispatches & Recording Manifesto (`LabelDispatches`)
- **Expedition Dispatches**: Literary field diary entries from Grímsvötn, Halemaʻumaʻu, Challenger Deep, Wieliczka Salt Mine, and San Andreas Fault.
- **The Lithos Manifesto**: Foundational statements on the planetary acoustic organ, the mechanical permanence of lacquer discs vs ephemeral streaming, and passive listening ethics.

### 05 // Independent Mailorder & Label Footer (`LabelFooter`)
- Hand-packed mailorder fulfillment terms (heavy-duty unbleached cardboard mailers, vinyl shipped outside jacket to prevent seam splits).
- Independent distribution network (Boomkat, Forced Exposure, Norman Records).
- Strict physical-only demo submission policy (cassette tapes and analog reels by postal mail).
- Postal announcement dispatch subscription.

### 06 // Persistent Audio Player Bar (`PersistentPlayer`)
- Unobtrusive bottom player docked across the viewport with real-time waveform oscillogram, volume slider, track transport, and quick mailorder cart access.

---

## 🛠️ Technical Stack & Architecture

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS theme variables, Brutalist geological color tokens
- **Audio Synthesis**: Native Web Audio API (`AudioContext`, `BiquadFilterNode`, `OscillatorNode`, `AudioBufferSourceNode`, `AnalyserNode`, `StereoPannerNode`)
- **Visuals**: Real-time `<canvas>` 60fps waveform & waterfall spectrogram rendering, interactive SVG vector schematics & contour maps
- **Typography**: Google Fonts (`Cinzel`, `Space Mono`, `Syne`, `Inter`)
- **Build & Bundler**: Vite 6.3 with custom `rollupOptions.output.manualChunks` code splitting
- **Icons**: Lucide React

---

## 🚀 Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build (optimized chunks < 240kB)
npm run build
```

---

## 📜 License & Attributions

- Raw audio telemetry streams: [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).
- Physical vinyl master recordings and packaging design © 2026 LITHOS Subterra Archive. All rights reserved.
