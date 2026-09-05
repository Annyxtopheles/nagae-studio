PROTOTYPE ASSESSMENT PROMPT FOR FIGMA MAKE:

Review this Figma prototype comprehensively and provide a detailed assessment report.

CONTEXT:
This is an MVP/Phase 1 prototype for NAGAE Studio (bridal fashion brand) consisting of two separate systems:
1. Retailer Portal & Stylist App (mobile-first)
2. Internal CRM System (desktop)

REQUIREMENTS TO ASSESS AGAINST:

---

SYSTEM 1: RETAILER PORTAL & STYLIST APP

REQUIRED CORE FEATURES:
□ Product Knowledge Hub
  - Product catalog with search/filter
  - Product detail pages with: images, price, modifications, fit notes, styling tips, similar styles
  - Mix-and-match tagging structure (master tag: neckline, sub-tags: variations)
  - ~35-100 products represented
  - Mobile-first design (375px)

□ Ask NAGAE AI
  - Chat interface for stylist questions
  - Question input field
  - Sample questions visible/suggested
  - AI response display
  - Product references in responses
  - "Was this helpful?" feedback mechanism

□ Training & Education
  - Training module library
  - Video player interface
  - Quiz functionality
  - Progress tracking
  - Categories: Fabric Education, Fit Education, Styling Philosophy, Collection Inspiration

□ Gamification & Incentives
  - Points system display
  - Badge collection (earned vs locked)
  - Leaderboard
  - Level progression tracker
  - Current incentives/promotions display
  - Reward catalog or redemption interface

□ Push Notifications & Communication
  - Notification feed/center
  - Notification types: training drops, sales/incentives, badges earned, announcements
  - Push notification settings

□ Resources Library
  - Marketing assets
  - Trunk show materials
  - Downloadable resources
  - FAQs

□ Navigation & UX
  - Bottom tab navigation (Home, Search, Ask NAGAE, Training, Profile)
  - Clean bridal aesthetic (champagne/blush, navy/charcoal, rose gold accents)
  - Mobile-optimized interactions
  - Search functionality

REQUIRED ADMIN FEATURES:
□ Admin Dashboard
  - Key metrics: active users, logins, training completion, most searched terms, top products
  - Quick actions
  - Analytics overview

□ Content Management
  - Product list/table view
  - Add/Edit product forms with all fields: style name, variations, price, fabric, silhouette, neckline, modifications, fit notes, styling tips, similar styles
  - CSV upload/import interface
  - Bulk operations

□ Training Management
  - Training module list
  - Add/Edit training forms
  - Quiz builder
  - Video upload interface

□ Gamification Management
  - Badge creation/editing
  - Level structure configuration
  - Incentive/promotion creator
  - Points management

□ Communication Tools
  - Push notification composer
  - Target audience selector
  - Notification scheduler
  - Announcement creator

□ Analytics Dashboard
  - User analytics (engagement, activity, retention)
  - Product analytics (views, searches, favorites)
  - AI analytics (questions asked, common queries, unanswered questions)
  - Training analytics (completion rates, quiz scores)
  - Store performance metrics

□ User Management
  - User list with roles
  - Add/edit users
  - Store associations

---

SYSTEM 2: CRM (SEPARATE DATABASE)

REQUIRED CRM FEATURES:
□ CRM Dashboard
  - Key metrics: total accounts (60-75), pipeline accounts, high growth, at risk, follow-ups due, YTD revenue
  - Quick actions
  - Recent activity feed
  - Account health overview

□ Account Management
  - Account list/table view with filters
  - Account detail pages including:
    * Basic information (store name, location, territory, anniversary, account tier, status)
    * Contacts (owner, buyer, manager, stylists)
    * AI-generated account summary
    * Communication timeline
    * Sales & performance metrics (lifetime sales, YTD, growth %, last order, top styles)
    * Survey responses history
    * Meeting notes & AI summaries
    * Tasks & follow-ups
    * Account health score breakdown

□ Account Health System
  - Health scoring (visual indicators)
  - Status types: High Growth, Stable, Expansion Opportunity, At Risk, Dormant
  - Risk indicators
  - Growth opportunities identified

□ Pipeline Management
  - Kanban board view
  - Stages: Prospecting, Initial Contact, Sample Sent, Negotiating, Won, Lost
  - Drag-and-drop functionality (or indicated)

□ Tasks & Follow-ups
  - Task list with due dates, assignments, priorities
  - Follow-up calendar
  - Overdue highlighting
  - Action items from meetings

□ Reports & Analytics
  - Sales dashboard (revenue, territory breakdown, top accounts)
  - Account health reports
  - Activity reports
  - Survey insights
  - Product intelligence (requests, trends)
  - Territory performance

□ Communication Tracking
  - Communication timeline/history
  - AI communication summaries
  - Integration placeholders for Front email
  - Meeting log functionality

□ Survey Management
  - Survey response aggregation
  - Survey builder interface
  - AI analysis of responses

□ Integrations
  - Google Sheets integration (sales data) - connected status
  - Front integration - coming soon placeholder
  - Integration dashboard showing status

□ Settings
  - Account field configuration
  - Health score weighting
  - Territory definitions
  - Automation rules
  - Team/user management

---

TECHNICAL ARCHITECTURE REQUIREMENTS:
□ System Architecture Diagram Present
  - Shows two separate PostgreSQL databases
  - API layer visualization
  - Portal/App connection
  - CRM independence
  - Clear separation between systems

□ Data Structure Indicators
  - CSV upload capability shown
  - Tagging structure evident (master tags, sub-tags)
  - Scalability messaging (handles growth to 500 products, 150+ retailers)

---

SAMPLE DATA REQUIREMENTS:
□ Real NAGAE style names used: Sloan (Mikado, Fitted, Trumpet, Mini variations), Gemma, Mara, Ophelia, Peyton, Kaia, Simone
□ Sample training modules: Mikado Fabric, Fit Philosophy, Athletic Body Types, Collection Overview
□ Sample badges: First Training, Fabric Expert, Quiz Master, Top Seller, etc.
□ Sample AI questions included
□ Sample notifications shown
□ Sample CRM accounts: Bella Bridal, Pearl Bridal, Ivory & Beau, Grace & Lace, etc. (15+ account names)
□ Sample territories and metrics

---

USER FLOWS REQUIRED:
□ Flow 1: Stylist searches product during appointment (Search → AI or Browse → Product Detail)
□ Flow 2: Stylist completes training & earns badge (Training → Quiz → Badge/Points)
□ Flow 3: Admin uploads content and sends notification (Admin → Upload → Notification)
□ Flow 4: CRM user reviews account health (Dashboard → Account Detail → Health Insights)

At minimum 2-3 flows should be clickable/navigable.

---

DESIGN SYSTEM COMPLIANCE:
□ Consistent use of design system components
□ Two distinct aesthetics:
  - Portal/App: Clean, elegant bridal (soft champagne/blush, navy, rose gold)
  - CRM: Professional dashboard (navy/charcoal, data-focused)
□ Mobile-first for Portal (375px base)
□ Desktop-optimized for Admin & CRM (1440px)
□ Proper hierarchy and white space
□ Accessibility considerations (contrast, readability)

---

STATES & VARIATIONS:
□ Empty states shown (no notifications, no training completed, etc.)
□ Loading states indicated
□ Success states (badge earned, content uploaded, etc.)
□ Populated states with realistic data
□ Error states or validation shown

---

NAVIGATION STRUCTURES:
□ Stylist: Bottom tab bar (Home, Search, Ask NAGAE, Training, Profile)
□ Admin: Sidebar navigation (Dashboard, Products, Training, Gamification, Communications, Analytics, Users, Settings)
□ CRM: Sidebar navigation (Dashboard, Accounts, Pipeline, Tasks, Reports, Communications, Surveys, Integrations, Team, Settings)

---

ASSESSMENT DELIVERABLE:

Provide a comprehensive report with:

1. COMPLETENESS SCORE (0-100%)
   - What percentage of required features are present in the prototype?

2. FEATURES PRESENT ✅
   - List all features/screens successfully implemented
   - Note which are fully detailed vs placeholder level

3. MISSING FEATURES ❌
   - List critical missing elements from requirements
   - Prioritize by importance (Critical / Important / Nice-to-have)

4. PARTIALLY IMPLEMENTED ⚠️
   - Features that are present but incomplete or need expansion
   - What's missing from each

5. DESIGN SYSTEM COMPLIANCE
   - Is branding consistent?
   - Are two system aesthetics distinct?
   - Mobile vs desktop appropriately designed?
   - Any design inconsistencies noted

6. USER FLOW ASSESSMENT
   - Which flows are clickable/functional?
   - Which flows are missing or incomplete?
   - Navigation logic clear?

7. DATA & CONTENT
   - Sample data realistic and sufficient?
   - Real NAGAE product names used?
   - Appropriate content depth?

8. TECHNICAL ARCHITECTURE
   - Is system separation clear (Portal vs CRM)?
   - Database architecture communicated?
   - Scalability addressed?

9. PHASE 1 MVP READINESS
   - Is this sufficient for NAGAE to review and provide feedback?
   - Does it communicate the vision clearly?
   - What would most improve client understanding?

10. RECOMMENDATIONS FOR FOLLOW-UP
    - Top 5 priorities to add/fix before next meeting
    - Quick wins (easy additions that add value)
    - Areas needing clarification from client

11. STRENGTHS
    - What is this prototype doing particularly well?
    - Most impressive aspects

12. RED FLAGS 🚩
    - Any critical gaps that could confuse the client?
    - Any misalignments with stated requirements?
    - Any technical impossibilities shown?

Be thorough, specific, and reference screen names/locations in the Figma file. Identify gaps by requirement section above.
