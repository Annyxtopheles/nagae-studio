# Plan: NAGAE Studio Retailer Portal & Stylist App

## Context

Build a comprehensive interactive prototype of the NAGAE Studio (NAGAE) Retailer Portal & Stylist App using:
- The Figma design system import (`/src/imports/Frame1/index.tsx`) as a visual/token reference
- The requirements document (`/src/imports/pasted_text/retailer-portal-stylist-app.md`) as the feature spec

The Figma import establishes: color palette, typography scale, button variants, input styles, card patterns, navigation components, and icons — all of which must be faithfully reflected in the built app.

---

## Design System Extraction

### Colors (from import)
| Token | Hex | Usage |
|-------|-----|-------|
| Charcoal | `#4A4A4C` | Primary text, primary button fill |
| Cream | `#F7F6F3` | Page background |
| Champagne | `#F1EDEB` | Accent backgrounds, card backgrounds |
| Grey | `#C3C0B9` | Secondary text, borders, disabled states |
| White | `#FFFFFF` | Card surfaces, input backgrounds |
| Success | `#E8EDE6` | Success states |
| Error | `#E5D5D1` | Error states |

### Typography (from import)
- **Display/Hero**: Cormorant Garamond, Italic — used for hero text (48px/36px/28px)
- **Headers**: Inter Regular, letter-spaced, UPPERCASE — H1 24px, H2 20px, H3 16px, H4 14px
- **Body**: Inter Regular — 16px large, 14px regular, 12px small
- **UI Labels (captions)**: Inter Semi Bold, spaced, UPPERCASE — 11px/10px/9px
- **Card Titles**: Instrument Serif Regular — 20-24px
- **UI Bold**: Manrope Bold/SemiBold — badges, tags, tab labels

### Buttons (from import)
- **Primary**: Charcoal fill `#4A4A4C`, cream text, 48px height, 24px padding, Inter Semi Bold 14px, UPPERCASE, tracked, **no border radius**
- **Secondary**: Transparent bg, 1.5px charcoal border, same sizing
- **Text**: Underline style, no background

### Cards (from import)
- **Type A / Product**: White bg, image area, Instrument Serif title, Manrope body/price, drop shadow
- **Type B / Content**: White bg, border, icon, Instrument Serif heading, Manrope body text
- **Type C / Stat**: Champagne bg, Instrument Serif large number, Manrope bold label

### Navigation (from import)
- **Bottom Tab Bar**: White bg, top border in Champagne, 64px height, 5 tabs (Home/Catalog/Training/Resources/Profile), Manrope SemiBold 10px UPPERCASE labels
- **Top Header (main)**: White bg, bottom border, Instrument Serif brand name centered, hamburger right
- **Top Header (detail)**: Arrow-left + title + share icon

---

## Architecture

### Root (App.tsx)
A top-level **mode switcher** with two entry points:
1. **Stylist App** — mobile-first (max-w-[393px] centered on larger screens)  
2. **Admin Portal** — desktop-first (full width with sidebar)

Landing page shows NAGAE brand name, a login-style choice between the two modes.

### Stylist App
Mobile-first layout, max-width 393px, with **bottom tab navigation** (5 tabs):

| Tab | Icon | Screens |
|-----|------|---------|
| Home | house | Dashboard, Notifications |
| Catalog | grid | Product List, Product Detail, Modification Guide |
| AI | message | Ask NAGAE AI Chat |
| Training | book-open | Training Library, Module View, Quiz |
| Profile | user | Points Dashboard, Badges, Leaderboard, Rewards |

Screen flow driven by React `useState` — no router needed.

**Key Stylist Screens:**
1. **Login** — NAGAE logo, email/password inputs, Remember Me, ForgotPassword link
2. **Home Dashboard** — Welcome + stylist name, notification bell with badge, 4 quick-access tiles (Search/Ask AI/Training/Points), featured dress of week, current promotion banner, recent activity feed
3. **Product Catalog** — prominent search bar, filter chips (Fabric/Silhouette/Neckline/Price/Collection), sort options, 2-col product grid (Card Type A with hero image, style name, price, feature badges)
4. **Product Detail** — image gallery (swipeable indicator dots), style name header, price, 3 quick stats (fabric/silhouette/neckline), accordion tabs (Overview/Modifications/Fit Notes/Styling Tips/Similar Styles/Selling Points), "Ask AI" floating button, heart favorite + share
5. **Modification Guide** — master style header, list of variations with thumbnail + price + key differences
6. **Ask NAGAE AI** — chat bubble history, bottom input with mic icon, 4 prompt suggestion chips, "Was this helpful?" feedback
7. **Training Library** — category chips, "Continue Learning" in-progress section, "Recently Added" modules grid, overall progress bar
8. **Training Module** — video placeholder, title/description/duration, key takeaways list, quiz button
9. **Quiz** — progress counter, question text, multiple choice options, results screen (score, badge earned, points)
10. **Profile/Points** — stylist photo + name, level badge, points total, progress to next level, badges grid (earned/locked), leaderboard position
11. **Leaderboard** — filter tabs (This Week/Month/All Time/My Store), ranked list with position highlight
12. **Notifications** — grouped notification list with icons + timestamps, mark as read

### Admin Portal
Desktop-first, full-width layout with **left sidebar** (240px) + main content area.

**Sidebar nav items:** Dashboard, Products, Training, Gamification, Communications, Analytics, Users, Settings

**Key Admin Screens:**
1. **Admin Dashboard** — 6 stat cards (total users, logins this week, training completion %, active incentives, most searched term, top dress), quick actions row, recent activity feed
2. **Product Management** — table with thumbnail/name/category/price/status/actions, "Add New" button, bulk import CSV
3. **Add/Edit Product Form** — all product fields, image upload area, status dropdown, save/publish
4. **Training Management** — module table, add/edit form with video upload placeholder
5. **Analytics** — tabbed sub-nav (User/Product/AI/Training/Gamification/Store), charts using recharts (line graphs, bar charts, word-cloud-style tags)
6. **User Management** — table with role/status/last login/points, add user form
7. **Communications** — notification composer with audience picker, mobile preview mockup, notification history

---

## Implementation Plan

### Step 1: Foundation — `src/styles/fonts.css` & `src/styles/theme.css`

**fonts.css:**
```
Google Fonts imports:
- Cormorant Garamond: wght@300,400&ital
- Inter: wght@400,600
- Manrope: wght@400,500,600,700
- Instrument Serif: wght@400
```

**theme.css token updates** (preserve `@theme inline` structure):
- `--background: #F7F6F3`
- `--foreground: #4A4A4C`
- `--card: #FFFFFF`
- `--primary: #4A4A4C`
- `--primary-foreground: #F7F6F3`
- `--secondary: #F1EDEB`
- `--secondary-foreground: #4A4A4C`
- `--muted: #F1EDEB`
- `--muted-foreground: #C3C0B9`
- `--border: #C3C0B9`
- `--accent: #F1EDEB`
- `--destructive: #E5D5D1`
- `--radius: 0` (square corners per design system)

### Step 2: `src/app/App.tsx`

Single file, ~1200-1600 lines. Structure:
```tsx
// Data constants (products, modules, badges, notifications)
// Design system primitives (PrimaryBtn, SecondaryBtn, TextBtn, ProductCard, ContentCard, StatCard)
// Stylist screens (StylistLogin, HomeDashboard, ProductCatalog, ProductDetail, AskAI, TrainingLibrary, Quiz, ProfilePoints, Leaderboard, Notifications)
// Admin screens (AdminDashboard, ProductManagement, TrainingManagement, Analytics, UserManagement, Communications)
// StylistApp (bottom tab nav + screen router)
// AdminPortal (sidebar nav + screen router)
// App (root with mode switcher / landing)
```

### Step 3: SVG Icons
Import svgPaths from `./imports/Frame1/svg-k0rl4dc9yj` and use the imported icon components (House, Grid, BookOpen, Folder, User, Search, Filter, Heart, Share, ArrowLeft, Hamburger, etc.) directly via re-implementing the SVG inline code from the design system (as the import components are private functions, I'll use lucide-react for the actual app icons, matched to the design system's icon set).

---

## Sample Data to Embed

### Products (10 styles)
Sloan Mikado, Sloan Crepe, Sloan Fitted Mikado, Sloan Trumpet, Sloan Mini (Circle/Bubble/Fitted Skirt), Gemma, Ophelia, Peyton, Mara, Kaia, Simone — with fabric, silhouette, neckline, price, badges

### Training Modules (6)
"Introduction to Mikado Fabric", "Understanding NAGAE Fit Philosophy", "Styling Athletic Body Types", "Spring 2026 Collection Overview", "How to Sell Modifications", "Accessorizing with Confidence"

### Badges (8)
Emoji + title + criteria per the spec

### AI Prompts (6)
Pre-seeded questions + mock AI responses

### Analytics Data
Top search terms with counts, product views, AI question categories

### CRM Accounts (5 visible)
Bella Bridal, Pearl Bridal, Ivory & Beau, Grace & Lace, Blush Bridal — with health scores, YTD sales

---

## Verification

1. App loads with mode switcher landing
2. Stylist mode: tap through all 5 tabs without errors
3. Complete flow: Home → Catalog → Product Detail → Ask AI → Training → Quiz → Profile
4. Admin mode: click through all sidebar sections
5. Fonts render correctly (Cormorant Garamond display, Instrument Serif card titles, Manrope UI labels)
6. Color palette matches design system (Cream background, Charcoal text, Champagne accents)
7. Buttons are square (no border radius), properly sized (48px height primary)
8. Mobile frame centered on desktop (393px max-width for stylist view)

---

## Multi-Select Chip Tags for Fabric & Silhouette

### Context
Products currently store `fabric` and `silhouette` as single strings. The user wants to tag a product with multiple fabrics/silhouettes. Changing these to arrays unlocks richer filtering in the stylist catalog.

### Data Shape Change

**PRODUCTS array** — change `fabric` and `silhouette` from `string` to `string[]` on all 10 product entries:
```ts
// Before
{ fabric: "Mikado", silhouette: "A-Line" }
// After
{ fabric: ["Mikado"], silhouette: ["A-Line"] }
```

`neckline` stays a single string.

### Admin Product Form — Multi-Select Chip UI

Replace the plain `<input>` for Fabric and Silhouette with an **inline toggleable chip grid**:

- Option lists:
  - `FABRICS = ["Mikado", "Crepe", "Tulle", "Chiffon", "Lace", "Satin", "Jersey"]`
  - `SILHOUETTES = ["A-Line", "Fitted", "Trumpet", "Ballgown", "Sheath", "Mini"]`
- Selected chips: `bg-[#4A4A4C] text-[#F7F6F3]`; unselected: `border border-[#C3C0B9] text-[#C3C0B9]`
- Clicking toggles the value in/out of the selection array
- Label reads "Fabric" / "Silhouette" with sub-note "(select all that apply)"
- Local state: `selectedFabrics: string[]`, `selectedSilhouettes: string[]`

The chip fields replace only the Fabric and Silhouette entries in the mapped field list in `AdminProducts` (~line 1334).

### Stylist Catalog Filter — Multi-Value Matching

Update filter logic (~line 462) from string `.includes()` to array `.includes()`:
```ts
p.fabric.includes(activeFilter) || p.silhouette.includes(activeFilter)
```
Array `.includes()` does exact match — correct for tag matching.

### Product Detail Display

Where fabric/silhouette are shown as single strings (~line 530), render with `.join(", ")` or as mini inline pills.

### Files to Touch
`src/app/App.tsx` only:
1. `PRODUCTS` const — 10 entries, convert `fabric`/`silhouette` to arrays
2. `AdminProducts` form — replace 2 text inputs with chip-toggle UI
3. `ProductCatalog` filter logic — `p.fabric.includes()` (array version)
4. `ProductDetail` display — `.join(", ")` for fabric/silhouette

### Verification
1. Admin → Products → Add New: Fabric/Silhouette show chip grids, multi-select works
2. Stylist Catalog: filter by "Mikado" still matches products tagged with it
3. Product Detail: fabric/silhouette display correctly (no `[object Array]`)
