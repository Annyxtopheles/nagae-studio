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

## 🔬 Core Experience Modules

### 01 // Featured Physical Release & Label Hero
- **Physical Vinyl Package Showcase**: High-craft presentation of the current flagship 180g mineral-marbled vinyl pressing, including the gatefold sleeve jacket, direct metal mastering specs, and a sliding, rotating vinyl disc with physical concentric groove reflections.
- **Direct Audio Auditioning**: Seamless client-side auditioning of Side A / Side B tracks with track-specific depth coordinates, peak frequency readouts, and instant physical preorder reservations.
- **Archival Edition Selector**: Instant switching between all 5 catalog releases (`LITH-001` through `LITH-005`) right at the top of the archive.
- **Persistent Bottom Audio Player**: Continuous streaming player bar docked across the bottom with time-domain oscilloscope, volume attenuation, and track skipping across the entire label catalog.

### 02 // Interactive Field Recording Deck & Spectrogram Synthesizer
- **Client-Side Web Audio API Synthesizer**: Zero external audio samples. Generates realistic infrasound sub-bass fundamental drones (18Hz–55Hz), harmonic overtone ratios, filtered brownian/seismic noise, and tectonic LFO swells directly in the browser.
- **Dual Visualizer Canvas**:
  - **Oscillogram (Time-Domain)**: Real-time phosphor green waveform display with sub-harmonic reflection.
  - **Waterfall Spectrogram (0Hz–250Hz)**: Continuous scrolling frequency waterfall mapping infrasound energy into heat-color strata gradients.
- **Tactile Modulation Controls**:
  - Strata Low-Pass Filter cutoff slider (20Hz–240Hz).
  - Preamp Sensitivity gain slider (-196 dB to -140 dB).
  - Infrasound Sub-Bass Boost (+9.0 dB @ 45Hz shelf).
  - Stereo Field Width (Binaural Center, Port, Starboard).
- **Sensor Telemetry Panel**: Downhole temperature (°C), hydrostatic pressure head (Bar), sensor serial ID, and field log excerpts.

### 03 // Transducer Rig & Hardware Schematics
- **Interactive Exploded Technical SVG Blueprints**:
  1. *Mark-IV Lithophone Borehole Geophone* (-4,500m titanium hull, quartz cantilever suspension, SmCo flux coils).
  2. *Titan-11K Abyssal Trench Hydrophone* (-12,000m hadal PZT piezoceramic ring, polyurethane acoustic window dome, Inconel 718 pressure-compensated bellows).
  3. *Nagra-Terra Infrasound Analog Field Modulator* (Duralumin chassis, Swiss coreless dual-capstan drive, FM sub-carrier modulator card).
- **Interactive Sub-Assembly Inspection**: Clickable hotspot markers revealing component metallurgy, mechanical function, depth tolerance, and laboratory calibration specs.

### 04 // Physical Editions & Pressing Vault
- **Brutalist Catalog of 180g Vinyl & Analog Tapes**:
  - `LITH-001`: *Meltwater Crypts: Sub-Glacial Resonance of Vatnajökull* (2xLP 180g Glacier-Ice clear with volcanic ash marble vinyl).
  - `LITH-002`: *Magma Chamber Harmonics: Kīlauea Infrasound* (LP 180g Obsidian black with molten vermilion splatter vinyl).
  - `LITH-003`: *Abyssal Mariana: Tectonic Subduction 10,920m* (2xLP 180g Pressure-cast trench-navy vinyl in vacuum-sealed Mylar).
  - `LITH-004`: *Halite Echoes: Cavern Impulse Responses* (Master Reel-to-Reel 1/4" Tape 15 IPS on aluminum NAB reel in birch crate).
  - `LITH-005`: *Faultline Shear: San Andreas Borehole Transductions* (LP 180g Desert granite stone-dust vinyl with 3-meter letterpress seismogram).
- **Interactive Edition Inspector Modal**: Detailed jacket specs, track-by-track breakdown with frequency peaks and depth markings, curator notes, and lacquer cut mastering details.
- **Slide-Out Physical Vault Cart Drawer**: Calculates freight mass in grams, shipping via DHL Geological Secure Cold-Chain, and simulated reservation checkout.

### 05 // Philosophical Manifesto & Field Log Dispatches
- **The Lithos Manifesto**: Four foundational pillars on the planetary infrasonic organ, the physical permanence of mineral vinyl, passive non-invasive listening ethics, and universal scientific open access.
- **Chronological Field Diary**: Interactive dispatch archive from Reykjanes Ridge, Kīlauea, Challenger Deep, Wieliczka Salt Mine, and Parkfield SAFOD.

### 06 // Global Colophon & Station Network
- Global listening stations network telemetry grid (uptime, coordinates, continuous 192kHz/32-bit streaming status).
- Seismic Dispatch Bulletin subscription form.
- Creative Commons BY-NC 4.0 Open Access research licensing statement.

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
