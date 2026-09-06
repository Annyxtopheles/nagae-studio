# NAGAE Studio — Portfolio Case Study & Presentation Guide

> **Project Pitch Line:**
> *"An enterprise B2B retail enablement platform and dual-database operations ecosystem built for a luxury bridal fashion house — connecting in-store retail stylists, brand executives, and wholesale stockists in one cohesive experience."*

---

## 1. Why Did the Client Love It? (The Real Business Problem)

To explain this project with confidence, you don't need to know every line of code — you just need to understand **why it was built** and **what pain points it cured**.

In luxury bridal fashion (like NAGAE Studio):
1. **The Retail Disconnect**: The brand sells gowns through 150+ independent bridal boutiques around the world. The stylists working on the sales floor don't work directly for the brand — they work for the boutiques.
2. **The Stylist Knowledge Gap**: When a bride asks in an appointment: *"Can I get this with a cathedral train?", "Can I split sizes (size 4 top, size 8 bottom)?", or "What fabric is wrinkle-resistant for a beach wedding?"*, the stylist used to have to dig through PDFs, call headquarters, or guess.
3. **The Executive Blind Spot**: Brand leadership had zero visibility into which gowns stylists were recommending, what questions brides were asking, or which boutique stockists were at risk of churning.

### How Your Platform Solved It:
You designed a **Dual-Sided Unified Operating System**:
- **A Mobile-First Stylist Web App**: Fits naturally into a stylist's hand during a 60-minute bridal appointment to search gown specs, ask AI modification questions in real-time, take quizzes, and earn gamified rewards.
- **An Executive Admin Portal**: Allows brand headquarters to broadcast instant updates to all 150+ stores, track wholesale performance, and manage product collections.
- **A Wholesale CRM & Sales Intelligence System**: Tracks boutique account health, pipelines, commitments, and sales data syncs.
- **A Clean Architectural Blueprint**: Proves to engineering and investors that the platform was designed with two isolated PostgreSQL databases and a scalable API layer.

---

## 2. Walkthrough of the UI: "What Is Actually Happening Here?"

When a recruiter or client asks you to walk them through the UI, here is your cheat-sheet for each section:

### A. The Stylist App (Mobile Experience — 375px)
*Designed to be used on an iPhone/tablet by retail stylists on the showroom floor.*

1. **Home Screen**:
   - **What it does**: Welcomes the stylist, shows the "Gown of the Week", rewards points balance, and broadcast alerts from HQ.
   - **Why it matters**: Gives retail salespeople a high-energy dashboard that motivates them to sell NAGAE gowns over competing brands on their racks.
2. **Search / Catalog**:
   - **What it does**: Fast filter by silhouette (A-Line, Fitted, Trumpet) and fabrication (Mikado, Crepe, Tulle). Clicking a dress opens high-res galleries, fit notes, and selling points.
   - **Interactive Feature**: The **"Configure & Order"** drawer lets stylists customize trains, necklines, and sizing with live subtotal calculations.
3. **Ask NAGAE AI**:
   - **What it does**: An in-appointment AI assistant. If a bride asks a tricky question about rush fees, lead times, or modifications, the stylist types or taps voice-dictate to get instant answers.
   - **Why it matters**: Removes friction from the sale. No lost appointments waiting for an email response from HQ.
4. **Training & Certification Hub**:
   - **What it does**: Bite-sized video lessons on bridal fabrications, styling advice, and fit philosophies.
   - **Interactive Feature**: Multi-question quizzes that score the stylist and reward them with XP points (+50 pts) upon passing.
5. **Profile & Rewards Store**:
   - **What it does**: Tracks tier progression (*Stylist $\rightarrow$ Senior Stylist $\rightarrow$ Master Consultant*) and lets stylists redeem points for tangible rewards (fabric swatch decks, silk styling ribbons, customized lookbooks).

---

### B. The Admin Portal (Desktop Experience — 1440px)
*Designed for the brand founder and operations director at headquarters.*

1. **Overview & Analytics**:
   - Visualizes stylist engagement across the country, catalog views, and quiz completion rates with 30-day, 90-day, and 1-year toggles.
2. **Product Management**:
   - Live inventory CRUD table where admins can add new seasonal collections, modify SKUs, set wholesale pricing, and export everything to CSV.
3. **Broadcast Center**:
   - Sends real-time push alerts that immediately pop up on the mobile phones of every stylist in every boutique worldwide (e.g., *"Spring 2026 Sample Trunk Show dates announced"*).
4. **Retailer Directory**:
   - Manages authorized stockists and permissions.

---

### C. The Wholesale CRM (Desktop Experience — 1440px)
*Designed for the wholesale sales director managing accounts and boutique expansion.*

1. **Account Directory**:
   - Lists boutiques (e.g. *Bella Bridal*, *Pearl Bridal House*, *Ivory & Beau*) with custom health scores (1–5 dots) and growth statuses (*High Growth*, *Stable*, *At Risk*).
2. **Account Detail & Activity Timeline**:
   - Logs boutique call notes, exclusivity commitments, and wholesale re-order history.
3. **Wholesale Pipeline (Kanban)**:
   - Tracks incoming boutique leads through deal stages: *Lead Qualified $\rightarrow$ Lookbook Sent $\rightarrow$ Sample Trunk Show $\rightarrow$ Contract Signed $\rightarrow$ Active Stockist*.
4. **Integrations**:
   - Shows live synchronization status for Google Sheets, Shopify Wholesale, and QuickBooks.

---

### D. The Platform Architecture Blueprint
*Designed to demonstrate high-level technical thinking.*

- **Dual Isolated PostgreSQL Databases**: Keeps customer-facing portal data strictly separated from confidential corporate CRM and sales data.
- **REST API & Auth Layer**: Caching, rate limiting, and secure token access.
- **Microservices & Integrations**: Google Sheets, AI services (Claude/OpenAI), and video hosting.

---

## 3. How to Present This on Your Portfolio Website

Use this proven **Case Study Framework** when creating your Behance, Notion, or portfolio page:

### Title:
**NAGAE Studio — Bridging High Fashion & Enterprise Retail Enablement**

### Role & Scope:
- **Role**: Lead Product Designer & Frontend Prototyper
- **Scope**: UX Architecture, Design System, Mobile & Desktop Interfaces, Interactive Production Prototype
- **Tools / Tech**: Figma Make, React, TypeScript, Tailwind CSS, Recharts, Vite, Cloudflare Pages

### The Problem Statement:
> *"Luxury bridal designers rely on third-party boutiques to drive revenue, but traditional showroom operations suffer from fragmented PDFs, slow communication, and disconnected wholesale tracking. NAGAE Studio needed a unified platform that empowered retail stylists during live appointments while giving brand executives complete control over wholesale analytics and CRM operations."*

### Key Design Pillars:
1. **Context-Aware Usability**: Fast, one-thumb mobile workflows for stylists on their feet in showrooms; rich, information-dense desktop interfaces for brand operations.
2. **Subtle Japanese Aesthetic (Spring Sora & Sakura)**: Moving away from tired clichés into an ethereal palette of spring azure skies, crisp sumi ink typography, and sakura cherry blossom accents.
3. **Instrument Serif & Red Hat Display**: Balancing classical couture editorial prestige with clean modern legibility.
4. **Full Interactive Fidelity**: Replacing static wireframes with a working prototype featuring live calculations, custom drawer states, smart keyword AI, quiz scoring, and CSV data exports.

### Outcome & Impact:
- **Client Reception**: The client praised the dual-portal approach for making complex enterprise operations feel like a cohesive, luxury editorial experience.
- **Scalability**: Architected to support 500+ styles and 150+ global stockists with zero performance degradation.

---

## 4. How to Talk About It in an Interview

Here are exact answers you can use during design interviews:

**Q: "What was your favorite challenge in this project?"**
> *"My favorite challenge was designing for two completely different user mindsets in one brand ecosystem. On one hand, I designed for retail stylists who are on their feet, moving around dresses, and only have seconds to look at an iPhone screen to answer a bride's question. That required high-contrast, clean thumb zones and instant AI lookups. On the other hand, I designed for operations executives who need high-density tables, analytics, and CRM pipeline tracking on desktop. Making both experiences feel like they belong to the same luxury brand house was an incredible design and system challenge."*

**Q: "Why did you build a functional coded prototype instead of just Figma clicks?"**
> *"In enterprise B2B tools, static mocks often fail to communicate complex state changes — like subtotal price adjustments for custom dress modifications, interactive quiz scoring with live gamification points, and real-time database syncs between Admin and Stylist surfaces. By developing a functional prototype in React and deploying it on Cloudflare, stakeholders could test the actual tactile feel of the appointment workflow on their own devices."*
