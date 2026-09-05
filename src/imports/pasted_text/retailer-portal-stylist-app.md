PRIORITY 1: RETAILER PORTAL & STYLIST APP
This is the highest priority and most immediate need

SYSTEM ARCHITECTURE OVERVIEW SCREEN
Create a simple visual diagram showing:
PostgreSQL Database (central repository)
API Layer (connects everything)
Web Portal (React - responsive/mobile-first)
Future App (same database, can add wrapper later)
Admin Interface (for NAGAE team)
Stylist Interface (for retailers/stylists)
Show that it's one system, mobile-first, scalable

STYLIST-FACING SCREENS (Mobile-First Design)
1. LOGIN / WELCOME
NAGAE branded login
Clean, elegant bridal aesthetic
Store/stylist login
Password recovery
Remember me option
2. HOME DASHBOARD
Welcome message with stylist's name
Quick access tiles:
Search Products
Ask NAGAE AI
Training Center
My Points & Badges
What's New
Push notification bell icon (with badge counter)
Recent activity feed
Featured dress of the week
Current incentive/promotion banner
3. PRODUCT KNOWLEDGE HUB
3a. Product Catalog Browse
Search bar at top (prominent)
Filter options:
Fabric (Mikado, Crepe, Tulle, etc.)
Silhouette (A-line, Fitted, Trumpet, etc.)
Neckline (primary filter)
Price range
Body type recommendations
Collection
Grid view of dresses with:
Hero image
Style name
Starting price
Key features (badges: "Bestseller", "New", "Customizable")
Sort options (Newest, Bestseller, Price, A-Z)
3b. Product Detail Page
Image gallery (swipeable on mobile)
Style name (e.g., "Sloan Mikado")
Price
Quick stats: Fabric, Silhouette, Neckline
Tabs/Accordion sections:
Overview (description, key features)
Modifications (available customizations)
Fit Notes (sizing guidance, body type recommendations)
Styling Tips (accessories, veil recommendations, best for...)
Similar Styles (comparable alternatives)
Selling Points (what makes this dress special)
"Ask AI about this dress" quick button
"Add to favorites" heart icon
Share button
3c. Modification Guide View For styles with mix-and-match options
Visual showing: "Sloan" as master category
List of variations:
Sloan Mikado (A-line)
Sloan Crepe
Sloan Fitted Mikado
Sloan Trumpet
Sloan Mini with Circle Skirt
Sloan Mini with Bubble Skirt
Sloan Mini with Fitted Skirt
Each with thumbnail, price, key differences
Tag structure visible: Master Tag → Sub-tags
4. ASK NAGAE AI
4a. AI Chat Interface
Clean chat interface (think modern messaging app)
Search/question input field at bottom
Prompt suggestions:
"Can Peyton be made with an A-line skirt?"
"Which gowns work best for athletic body types?"
"What accessories pair best with Ophelia?"
"Show me all mikado styles under $4,000"
"What's the difference between Mara and Ophelia?"
Chat history
Ability to reference specific dress from response
"Was this helpful?" feedback buttons
Voice input option (microphone icon)
4b. AI Answer Display
Clear, conversational answer
Related product cards (if applicable)
"Learn more" links to relevant training
"See product page" quick link
Suggested follow-up questions
5. TRAINING & EDUCATION CENTER
5a. Training Library Home
Categories:
Fabric Education
Fit Education
Styling Philosophy
Collection Inspiration
Selling Techniques
New Collection Launches
"Recently Added" section
"Continue Learning" (in-progress modules)
"Recommended for You"
Progress bar showing overall completion
5b. Training Module View
Video player (with progress tracking)
Module title and description
Duration
Key takeaways list
Downloadable resources (if applicable)
Quiz button at end
"Mark as complete" button
Next module suggestion
5c. Quiz Interface
Question counter (Q1 of 5)
Question text
Multiple choice or true/false options
Submit button
Results screen showing:
Score
Correct/incorrect breakdown
Points earned
Badge earned (if threshold met)
"Retake" or "Continue Learning" options
6. GAMIFICATION & REWARDS
6a. My Profile / Points Dashboard
Stylist name and photo
Current level (e.g., "NAGAE Expert Level 3")
Points total
Progress bar to next level
Badges earned (visual display)
Recent achievements
Leaderboard position
6b. Leaderboard
Top stylists ranking
Filters:
This Week
This Month
All Time
My Store
Display showing:
Rank
Stylist name (or anonymized)
Points
Level
Top badge
"You are #X" highlighted row
6c. Badges & Achievements
Grid of badges (earned vs locked)
Badge categories:
Training completion
Quiz mastery
Product expert (by fabric/silhouette)
Sales achievements
Engagement
Clicking badge shows:
How earned
When earned
Rarity percentage
6d. Rewards & Incentives
Current active promotions
Available rewards catalog:
Points redemption options
Cash bonuses for featured gowns
Gift cards
Market invitations
Exclusive access
"How to Earn" guide
Redemption history
7. NOTIFICATIONS CENTER
7a. Notification Feed
List of notifications with icons:
🎉 New training released
💰 Flash sale: Sell this dress, earn bonus
🏆 Badge earned
📢 Announcement: New collection preview
🔥 Trending: This dress is selling well
📚 Quiz reminder
Time stamps
Mark as read
Filter by type
Settings gear icon
7b. Notification Settings
Toggle switches for:
Push notifications
Email updates
New training
Sales & incentives
Badges & achievements
Weekly digest
8. WHAT'S NEW / UPDATES
Feed of latest updates:
New collection teasers
Product updates
Training releases
Company news
Trunk show resources
Marketing assets
Chronological with filters
Engaging visual content
9. RESOURCES LIBRARY
Marketing assets (downloadable)
Trunk show materials
Fit guides (PDFs)
Fabric swatches guide
Alteration guidelines
Sizing charts
FAQ quick reference
Brand story materials
10. SEARCH RESULTS
Universal search combining:
Products
Training modules
FAQs
Resources
Filtered results by category
Recent searches
Popular searches

ADMIN-FACING SCREENS (Desktop-First, Also Responsive)
11. ADMIN DASHBOARD HOME
Welcome, [Admin name]
Quick stats cards:
Total active users
Logins this week
Training completion rate
Active incentives
Most searched term
Top performing dress
Recent activity feed
Quick actions:
Upload content
Send notification
Create quiz
View analytics
12. CONTENT MANAGEMENT
12a. Product Management
Product list table view:
Thumbnail
Style name
Category
Price
Status (Active/Draft)
Last updated
Edit/Delete actions
"Add New Product" button
Bulk actions (import CSV)
Search and filter
12b. Add/Edit Product Form
Product information fields:
Style name (master tag)
Variations (sub-tags)
Price
Description
Fabric
Silhouette
Neckline
Available sizes
Body type recommendations
Fit notes
Styling tips
Modification options
Similar styles (relational picker)
Selling points
Image upload (multiple images)
Status dropdown (Draft/Published)
Save/Publish buttons
12c. CSV Import Interface
Upload area (drag-and-drop)
Template download button
Field mapping interface
Preview before import
Import history log
Error handling display
13. TRAINING MANAGEMENT
13a. Training Modules List
Table view:
Module title
Category
Duration
Completion rate
Published date
Status
Edit/Delete
"Add New Module" button
Organize by category
13b. Add/Edit Training Module
Module title
Category dropdown
Description
Video upload
Duration
Key takeaways (bullet list)
Downloadable resources upload
Related products (picker)
Associated quiz (dropdown)
Points value
Status (Draft/Published)
Save/Publish buttons
13c. Quiz Builder
Quiz title
Associated training module
Question list with drag-to-reorder:
Question text
Answer type (multiple choice/true-false)
Answer options
Correct answer indicator
Points per question
Add/remove question buttons
Passing score threshold
Badge earned (dropdown)
Save button
14. GAMIFICATION MANAGEMENT
14a. Badges & Levels Config
Badge list:
Badge name
Icon/image
Description
How to earn (criteria)
Points value
Rarity
Edit/Delete
"Create New Badge" button
Level structure editor:
Level number
Level name
Points required
Perks unlocked
14b. Incentives & Promotions
Active promotions list:
Title
Type (Flash sale, featured gown, challenge)
Start/end date
Reward
Participation count
Edit/Deactivate
"Create New Incentive" button
Promotion form:
Title
Description
Type
Featured products
Reward details
Duration
Target audience
Notification message
Save/Launch
15. COMMUNICATION CENTER
15a. Send Push Notification
Notification composer:
Title
Message body
Icon/image
Link to (dropdown: product, training, external)
Target audience:
All users
Specific stores
Top performers
Inactive users (re-engagement)
Schedule option (send now / schedule for later)
Preview on mobile mockup
Send button
Notification history
15b. Announcements Manager
Create announcement post:
Title
Content (rich text editor)
Featured image
Category
Call-to-action button
Publish date
Status
Published announcements list
16. ANALYTICS & INSIGHTS DASHBOARD
16a. User Analytics
Metrics:
Total users
Active users (daily/weekly/monthly)
New registrations
Engagement rate
Average session duration
Retention rate
Graphs showing trends over time
User breakdown by:
Store
Region
Activity level
16b. Product Analytics
Most viewed products
Most searched products
Most favorited products
Search terms heatmap
Top performing styles
Products needing better resources (high searches, low engagement)
Time on product pages
16c. AI Analytics
Total questions asked
Most common questions (word cloud or list)
Questions by category:
Fit questions
Modification questions
Styling questions
Technical questions
Pricing questions
Unanswered/poorly answered questions (flagged for content creation)
Search queries with no results
AI helpfulness ratings
16d. Training Analytics
Training completion rates by module
Average quiz scores
Most popular modules
Least completed modules
Video completion rates (% watched)
Time to complete training
Knowledge gaps (low quiz performance areas)
16e. Gamification Analytics
Points distribution
Badge earning rates
Leaderboard movement
Incentive participation
Reward redemptions
Engagement correlation (does gamification increase usage?)
16f. Store Performance
Engagement by store/retailer
Most active stores
Least active stores (need outreach)
Top stylists by store
Training completion by store
Feature adoption rates
17. USER MANAGEMENT
17a. User List
Table view:
Name
Store
Email
Role (Stylist/Admin)
Status (Active/Inactive)
Last login
Points/Level
Actions (Edit/Deactivate)
Search and filter
"Add New User" button
Bulk invite option
17b. Add/Edit User
Name
Email
Store/Retailer association
Role
Permissions
Send welcome email toggle
Status
Save button
18. SETTINGS & CONFIGURATION
18a. Portal Settings
Branding:
Logo upload
Color scheme
Custom domain (future)
General settings:
Default language
Time zone
Contact email
Feature toggles:
Enable/disable AI
Enable/disable gamification
Enable/disable specific sections
18b. Admin Account Management
Admin users list
Add/remove admins
Role permissions matrix

NAVIGATION STRUCTURE
Stylist Mobile Navigation (Bottom Tab Bar):
Home
Search
Ask NAGAE (AI icon)
Training
Profile/Points
Admin Desktop Navigation (Sidebar):
Dashboard
Products
Training
Gamification
Communications
Analytics
Users
Settings

DESIGN SYSTEM ELEMENTS TO ESTABLISH
Branding
NAGAE logo placement
Color palette (elegant bridal aesthetic)
Typography hierarchy
Button styles
Card styles
Icon set
Components Library
Headers
Navigation bars
Cards
Buttons (primary, secondary, text)
Form inputs
Modals/overlays
Toasts/notifications
Loading states
Empty states
Error states
Badges
Progress bars
Avatars
Search bars
Filters
Tags
Tabs
Accordions
Mobile-First Considerations
Thumb-friendly tap targets
Swipe gestures
Pull-to-refresh
Bottom sheet modals
Sticky headers
Quick actions
One-handed navigation

KEY USER FLOWS TO PROTOTYPE
Flow 1: Stylist in Appointment - Quick Product Answer
Opens app on phone
Taps "Ask NAGAE AI"
Types: "Can Peyton be made with A-line skirt?"
Receives instant answer
Taps through to Peyton product page
Shows bride modifications available
Returns to AI to ask follow-up
Flow 2: Stylist Completes Training & Earns Badge
Notification: "New training available"
Opens Training Center
Watches "Mikado Fabric Education" video
Takes quiz
Scores 100%
Earns "Fabric Expert" badge
Sees points added to profile
Views updated leaderboard position
Receives congratulations notification
Flow 3: Admin Pushes Flash Sale Incentive
Admin logs into dashboard
Goes to Incentives section
Creates new promotion: "Sell Sloan this week, earn $50 bonus"
Selects target audience: All active stylists
Writes push notification
Previews on mobile mockup
Schedules to send immediately
Stylists receive notification
Admin monitors participation in analytics
Flow 4: Admin Uploads New Collection via CSV
Admin goes to Product Management
Clicks "Import CSV"
Downloads template
Fills out product data in Excel
Uploads completed CSV
Reviews field mapping
Previews import
Confirms import
New products appear in stylist catalog
Admin sends announcement notification
Flow 5: Stylist Searches for Dress During Appointment
Bride asks: "What's good for broad shoulders?"
Stylist opens app
Uses search with filter: "Body type: Athletic/Broad shoulders"
Browses filtered results
Selects "Ophelia"
Reviews fit notes
Checks styling tips
Shows bride product images
Checks available modifications
Favorites dress for follow-up
Flow 6: Admin Reviews AI Question Trends
Admin opens Analytics
Goes to AI Analytics section
Reviews most asked questions this week
Notices repeated question: "Rush order timelines?"
Identifies content gap
Creates new FAQ resource
Updates AI knowledge base
Sends training update to stylists

DATA EXAMPLES TO INCLUDE IN PROTOTYPE
Sample Products (Use Real NAGAE Styles from Transcript):
Sloan Mikado - A-line, off-shoulder, bestseller
Sloan Fitted Mikado - Fitted silhouette variation
Sloan Trumpet - Trumpet silhouette variation
Sloan Mini Circle Skirt - Mini with circle skirt
Sloan Mini Bubble Skirt - Mini with bubble skirt
Gemma - Fitted gown
Mara - Style mentioned in comparison
Ophelia - Style mentioned for accessories/shoulders
Peyton - Style asked about in AI example
Kaia - Style mentioned for delivery timeline
Simone - Style mentioned for shapewear
Gemma - Fitted style reference
Sample Training Modules:
"Introduction to Mikado Fabric"
"Understanding NAGAE Fit Philosophy"
"Styling Athletic Body Types"
"Spring 2026 Collection Overview"
"How to Sell Modifications"
"Accessorizing with Confidence"
Sample Badges:
🎓 "First Training Complete"
👗 "Fabric Expert" (Complete all fabric trainings)
💎 "Quiz Master" (100% on 5 quizzes)
🏆 "Top Seller" (Sell featured dress)
⭐ "NAGAE Ambassador" (Complete all core training)
💪 "Fit Guru" (Complete all fit trainings)
🎨 "Style Maven" (Complete styling modules)
🔥 "30-Day Streak" (Login 30 days in row)
Sample AI Questions:
"Can Peyton be made with an A-line skirt?"
"What's the difference between Mara and Ophelia?"
"Which gowns work best for athletic body types?"
"What accessories pair best with Ophelia?"
"What is the delivery timeline for Kaia?"
"Show me all mikado styles under $4,000"
"Best shapewear under Simone?"
"What's a dress like Gemma but not fitted?"
Sample Notifications:
"🎉 New Training: Spring 2026 Collection is live!"
"💰 Flash Sale: Sell Sloan this week, earn $50 bonus"
"🏆 You earned the 'Fabric Expert' badge!"
"🔥 Trending: Ophelia is selling fast this month"
"📚 Quick reminder: Complete your quiz to earn points"
"✨ New modification options now available for Peyton"
Sample Analytics Data:
Most Searched Terms:
"Mikado" - 127 searches
"Fitted dress" - 94 searches
"Broad shoulders" - 72 searches
"Rush order" - 68 searches
"Under $4000" - 54 searches
Most Asked AI Questions:
"Can [dress] be customized?" - 43 times
"What's the difference between..." - 38 times
"Delivery timeline" - 31 times
"Best for [body type]" - 29 times
"Accessories for..." - 24 times
Top Products (Views):
Sloan Mikado - 234 views
Ophelia - 198 views
Gemma - 176 views
Peyton - 154 views
Mara - 143 views

PRIORITY 2: CRM SYSTEM
Can run parallel or Phase 2 - Include in prototype but mark as separate system

CRM SYSTEM ARCHITECTURE OVERVIEW SCREEN
Separate PostgreSQL Database (CRM data)
API Layer (connects integrations)
CRM Web Interface (React)
Integration points shown:
Front (email communication) - future
Google Sheets (sales data) - initial
Survey platform - future
Meeting notes - AI summaries

CRM SCREENS
20. CRM LOGIN
NAGAE branded admin login
Different from stylist portal
Internal team only
21. CRM DASHBOARD HOME
Welcome message
Key metrics cards:
Total Active Accounts: 68
Accounts in Pipeline: 7
High Growth Accounts: 12
At Risk Accounts: 3
Follow-ups Due Today: 5
YTD Wholesale Revenue: $XXX,XXX
Quick actions:
Add New Account
Log Meeting Notes
View Tasks
Run Reports
Recent activity feed
Upcoming follow-ups list
Account health overview chart
22. ACCOUNTS LIST VIEW
22a. All Accounts Table
Table columns:
Store Name
Location/Territory
Account Tier (Gold/Silver/Bronze or 1/2/3)
Status (Active/Pipeline/At Risk/Dormant)
Health Score (visual indicator: ●●●○○)
Last Contact
Next Follow-up
YTD Sales
Last Order Date
Owner/Contact
Quick Actions
Search bar
Filters:
Status
Territory/Region
Tier
Health score
Last contact date
Sales performance
Sort options
Export to CSV
Bulk actions
22b. Account Cards View
Alternative grid view
Cards showing:
Store name
Location
Tier badge
Health indicator
Key stats preview
Last interaction
Quick view button
23. ACCOUNT DETAIL PAGE
23a. Account Header
Store name (large)
Location and territory
Account status badge
Health score indicator
Quick actions toolbar:
Edit Account
Log Activity
Schedule Follow-up
View Sales Data
Send Email
Store website link
Social media links
23b. Account Overview Tab
Basic Information Section:
Store name
Full address
Territory
Anniversary date (when became customer)
Store type (Independent/Chain/Department)
Price point positioning
Current NAGAE assortment (which styles they carry)
Account status
Account tier
Key Contacts Section:
Contact cards for each:
Owner
Buyer
Store Manager
Key Stylists
Each contact card shows:
Name
Title
Email
Phone
Preferred communication method
Notes
"Add Contact" button
AI-Generated Account Summary:
Relationship strength indicator
Account history overview (AI-generated paragraph)
Current priorities (bullet points)
Open opportunities (bullet points)
Recent activity highlights
Key initiatives
"Regenerate Summary" button
23c. Communication Tab
Communication Timeline:
Chronological feed of all interactions:
Email threads (from Front - future)
Phone calls logged
Meeting notes
Internal notes
Survey responses
Follow-ups
Each entry shows:
Date/time
Type icon
Summary/preview
Team member involved
Expand to see full content
Filter by communication type
Search within communications
AI Communication Summary Panel:
Key themes identified
Relationship signals
Important events timeline
Opportunities mentioned
Risks/concerns raised
Responsiveness trend
"View Details" for each theme
Recent Conversations:
Last 5 email threads (preview)
Last call date
Last meeting date
Quick "Log New Communication" button
23d. Sales & Performance Tab
Sales Metrics Dashboard:
Lifetime sales (total)
YTD sales
Prior year sales (comparison)
Growth % (year over year)
Last order date
Days since last order
Reorder frequency
Average order value
Number of orders
Sales Trend Chart:
Line graph showing sales over time
Ability to toggle timeframes (6mo, 1yr, 2yr, all time)
Top-Selling Styles for This Account:
Table showing:
Style name
Units sold
Revenue
Last ordered
Link to product in portal
Assortment Analysis:
Current styles they carry
Assortment breadth score
Gaps in assortment (what they don't carry)
Recommendations
Performance Indicators:
Reorder velocity
Sell-through rate (if data available)
Growth trajectory indicator
23e. Surveys & Feedback Tab
Survey Response History:
All survey responses chronologically
Each survey card shows:
Date taken
Survey type
Overall satisfaction score
Key responses
Expand for full responses
AI Survey Insights:
Satisfaction trend over time
Goals mentioned
Feedback themes
Support requests made
Product requests
Team motivation preferences
Concerns raised
Sentiment analysis
Quick Wins Identified:
Actionable items from surveys flagged
Status: Addressed / In Progress / Pending
23f. Meetings & Notes Tab
Meeting History:
All meetings logged:
Market meetings (Bridal Fashion Week, etc.)
Store visits
Phone calls
Video calls
Each meeting entry shows:
Date
Meeting type
Attendees (NAGAE team + retailer contacts)
Meeting notes
AI-generated summary
Key takeaways
Concerns discussed
Commitments made
Action items generated
Follow-up tasks created
AI Meeting Intelligence:
Common topics across meetings
Recurring concerns
Commitment tracking (what was promised, status)
Relationship progression
Quick Log Meeting:
Button to add new meeting notes
AI can process and summarize
23g. Tasks & Follow-ups Tab
Open Tasks:
Task list showing:
Task description
Assigned to
Due date
Priority
Status
Related to (meeting, email, etc.)
Overdue tasks highlighted
Filter and sort options
Follow-up Schedule:
Calendar view option
Next follow-up date (prominent)
Reason for follow-up
Automated reminders
Action Items from Meetings:
Items auto-generated from meeting notes
Ability to convert to formal tasks
Completion tracking
Market Preparation:
Checklist for upcoming market
Sample opportunities
Expansion discussions planned
23g. Account Health & Insights
Health Score Breakdown:
Overall health score (visual meter)
Contributing factors:
Sales performance (weight: 30%)
Reorder frequency (weight: 25%)
Communication engagement (weight: 20%)
Survey satisfaction (weight: 15%)
Relationship activity (weight: 10%)
Each factor shows score and trend
Account Status:
Current status: High Growth / Stable / Expansion Opportunity / At Risk / Dormant
Status history (when status changed)
Reason for current status
Risk Indicators (if At Risk):
Reduced engagement flag
Decreasing orders trend
Repeated concerns unresolved
Missed opportunities
Days since last contact
Growth Opportunities:
AI-identified opportunities:
Expansion into new categories
Assortment gaps they could fill
Styles performing well at similar retailers
Support they've requested
Product lines they've expressed interest in
Recommended Actions:
AI suggestions:
"Follow up on curve sizing request from 3 months ago"
"Introduce new mikado styles - they sell well here"
"Schedule market meeting - last contact 45 days ago"
24. ADD/EDIT ACCOUNT
Form with all account fields:
Store information
Contacts
Account tier
Status
Territory
Anniversary date
Notes
Custom fields
Save/Cancel buttons
"Add Another Contact" repeating section
25. PIPELINE VIEW
Kanban board showing:
Prospecting (7 accounts)
Initial Contact Made
Sample Sent
Negotiating
Won (move to active accounts)
Lost
Drag and drop to move stages
Card shows:
Store name
Location
Contact
Days in stage
Last activity
Next step
26. TASKS & FOLLOW-UPS CENTER
My Tasks:
Assigned to me
Due today / This week / This month
Overdue (highlighted)
Team Tasks:
All open tasks
Filter by team member
Filter by account
Follow-up Calendar:
Calendar view showing scheduled follow-ups
Day/Week/Month view toggle
Click date to see details
Add new follow-up
27. REPORTS & ANALYTICS
27a. Sales Dashboard
Total wholesale revenue (YTD, Last Year, Growth %)
Revenue by territory
Revenue by account tier
Top 10 accounts by revenue
Top 10 accounts by growth %
Top selling styles (wholesale)
Reorder rate metrics
Average order value trends
27b. Account Health Report
Accounts by health status (pie chart)
At-risk accounts list (requires attention)
High-growth accounts list (opportunity)
Dormant accounts (re-engagement needed)
Health score distribution
27c. Activity Report
Communications logged this month
Meetings held
Follow-ups completed
Tasks completed
Response time metrics
Team activity breakdown
27d. Survey Insights Report
Overall satisfaction trend
Common feedback themes (word cloud)
Most requested features/products
Support requests by category
Retailer goals analysis
Regional differences
27e. Product Intelligence Report
Most requested product types
Customization requests by frequency
Fabric preferences by region
Silhouette trends by account tier
Price point analysis
Product gaps identified across retailers
Styles mentioned most in communications
27f. Territory Performance
Sales by territory comparison
Account count by region
Growth rates by geography
Territory manager performance
Regional opportunities
27g. Relationship Health
Average time between contacts
Communication frequency by account
Meeting cadence analysis
Responsiveness metrics
Relationship strength distribution
28. COMMUNICATION TOOLS
28a. Email Integration Setup (Future - Show as Coming Soon)
Front integration configuration
Email sync settings
Placeholder showing "Connect Front" button
Preview of how emails will appear once connected
28b. Bulk Communication
Compose message to multiple accounts
Select recipients:
All accounts
By territory
By tier
By status
Custom selection
Email template library
Track opens/responses
29. SURVEYS & FEEDBACK MANAGEMENT
29a. Survey List
All surveys sent
Survey templates:
Annual Satisfaction Survey
Post-Market Survey
Product Feedback Survey
Support Needs Assessment
Response rates
Create new survey
29b. Survey Builder
Question types:
Multiple choice
Rating scale
Text response
Yes/No
Survey logic/branching
Preview
Send to accounts
Schedule sends
29c. Survey Response Aggregation
All responses view
Filter by survey type
Filter by date range
Export responses
AI analysis of open-ended responses
30. INTEGRATIONS MANAGEMENT
30a. Integrations Dashboard
Connected integrations status:
✓ Google Sheets (Sales Data) - Connected
○ Front (Email) - Coming Soon
○ Survey Platform - Coming Soon
○ Calendar Sync - Coming Soon
○ AI Meeting Notes - Coming Soon
30b. Google Sheets Integration
Connected sheets list
Sync frequency settings
Field mapping:
Which columns map to which CRM fields
Account matching rules
Sales data mapping
Last sync timestamp
Manual sync button
Sync history/log
30c. Data Import/Export
Import accounts from CSV
Import contacts from CSV
Export accounts
Export reports
Bulk data operations
31. TEAM & USER MANAGEMENT
31a. Team Members
User list:
Name
Role (Admin, Sales, Manager)
Territory assigned
Accounts assigned
Last login
Status
Add team member
Edit permissions
31b. User Roles & Permissions
Role definitions:
Admin (full access)
Sales Rep (assigned accounts)
Manager (team view)
Read-only
Permission matrix
Custom role builder
32. CRM SETTINGS
32a. Account Settings
Custom fields configuration
Account tier definitions
Status options customization
Health score weighting adjustments
Territory definitions
32b. Sales Settings
Sales metric definitions
Fiscal year start
Revenue goals by territory
Target metrics
Benchmark settings
32c. Automation Rules
Auto-assign accounts by territory
Auto-create follow-up tasks based on triggers:
No contact in X days
Order placed
Survey completed
Status change
Auto-update health scores
Notification rules
32d. Notification Preferences
Email notifications for:
Tasks assigned
Follow-ups due
At-risk accounts
New communications
Report availability
Frequency settings
Digest options
33. SEARCH & GLOBAL NAVIGATION
33a. Global Search
Search across:
Accounts
Contacts
Communications
Tasks
Notes
Documents
Recent searches
Advanced search filters
Search results grouped by type
33b. CRM Navigation (Sidebar)
Dashboard
Accounts
Pipeline
Tasks & Follow-ups
Reports
Communications
Surveys
Integrations
Team
Settings

CRM KEY USER FLOWS TO PROTOTYPE
Flow 1: New Team Member Onboards & Reviews Account
New team member logs in
Opens account "Bella Bridal - Chicago"
Reads AI-generated account summary
Reviews communication history
Checks sales performance
Reads recent survey responses
Reviews open tasks
Notes next follow-up date
Feels informed about account in 5 minutes
Flow 2: Sales Manager Identifies At-Risk Account
Opens CRM Dashboard
Sees "3 At-Risk Accounts" alert
Clicks to view list
Opens "Grace & Lace - Atlanta"
Reviews health score breakdown:
No orders in 120 days
Last contact 60 days ago
Recent survey showed concerns
Reads AI insights: "Repeated concerns about delivery times unresolved"
Creates follow-up task: "Call to address delivery concerns"
Assigns to account manager
Sets reminder for 3 days
Flow 3: Account Manager Logs Market Meeting
Returns from Bridal Fashion Week
Goes to account "Pearl Bridal - Dallas"
Clicks "Log Activity"
Selects "Meeting" type
Enters date, attendees, notes
AI auto-generates summary and action items:
Follow up on curve sizing expansion
Send swatches for new crepe styles
Schedule trunk show for Fall
Converts action items to tasks
Sets follow-up for 2 weeks
Account timeline updated automatically
Flow 4: Admin Reviews Product Request Trends
Opens Reports
Selects "Product Intelligence Report"
Sees top requests:
"More curve sizing" - 23 mentions
"Plus size options" - 19 mentions
"More mikado under $3500" - 15 mentions
Filters by region: Pattern strongest in Southeast
Exports detailed report
Shares with product development team
Creates follow-up task to update requesting accounts once new products available
Flow 5: Sales Rep Prepares for Client Call
Has call scheduled with "Ivory & Beau - Savannah"
Opens account 15 minutes before call
Reviews AI account summary
Checks recent communications
Notes last order was 3 months ago (Sloan Mikado sold well)
Sees survey response mentioned interest in more fitted styles
Sees open task: "Discuss Spring collection expansion"
Prepares talking points based on data
Call goes smoothly - feels prepared
Flow 6: Manager Runs Territory Performance Review
Opens Reports dashboard
Selects "Territory Performance"
Reviews YTD sales by region
Southeast up 35% - high growth
Northwest flat - needs attention
Drills into Northwest accounts
Identifies 3 accounts with declining orders
Creates tasks for regional manager
Schedules team meeting to discuss strategy

DATA EXAMPLES FOR CRM PROTOTYPE
Sample Accounts (60-75 total, show ~15 in detail):
Tier 1 / High Performers:
Bella Bridal - Chicago, IL | Status: High Growth | Health: ●●●●● | YTD: $185K
Pearl Bridal - Dallas, TX | Status: Stable | Health: ●●●●○ | YTD: $156K
Ivory & Beau - Savannah, GA | Status: High Growth | Health: ●●●●● | YTD: $142K
The White Dress - Denver, CO | Status: Stable | Health: ●●●●○ | YTD: $128K
Tier 2 / Growing: 5. Grace & Lace - Atlanta, GA | Status: At Risk | Health: ●●○○○ | YTD: $67K 6. Blush Bridal - Portland, OR | Status: Expansion Opportunity | Health: ●●●○○ | YTD: $78K 7. Something Blue - Nashville, TN | Status: Stable | Health: ●●●○○ | YTD: $82K 8. The Bridal Suite - Boston, MA | Status: High Growth | Health: ●●●●○ | YTD: $91K
Tier 3 / Smaller Accounts: 9. Amore Bridal - Phoenix, AZ | Status: Stable | Health: ●●●○○ | YTD: $34K 10. Forever & Always - Minneapolis, MN | Status: Stable | Health: ●●○○○ | YTD: $28K
Pipeline: 11. Luxe Bridal Boutique - Miami, FL | Status: Prospecting 12. The Dress Theory - Seattle, WA | Status: Sample Sent 13. Modern Bride - San Francisco, CA | Status: Negotiating
Sample Contacts:
Sarah Mitchell - Owner, Bella Bridal
Jessica Chen - Buyer, Pearl Bridal
Amanda Rodriguez - Store Manager, Ivory & Beau
Katie Thompson - Lead Stylist, Grace & Lace
Sample Communications:
Email: "Re: Spring 2026 Collection - Ordering Questions" (3 days ago)
Meeting: "Bridal Fashion Week October 2025 - Market Booth" (2 weeks ago)
Phone Call: "Follow-up on trunk show logistics" (1 week ago)
Survey Response: "Annual Retailer Satisfaction Survey 2025" (1 month ago)
Note: "Mentioned interest in curve sizing expansion" (2 months ago)
Sample Survey Questions & Responses:
Q: How satisfied are you with NAGAE's current product line? A: 4/5 stars
Q: What products or features would you like to see added? A: "More curve sizes and plus size options. Our brides are asking for it."
Q: What's your primary goal for the next year? A: "Increase dress sales by 20% and expand into mother-of-the-bride market."
Q: How can NAGAE better support your store? A: "Faster delivery times and more marketing materials for social media."
Sample AI-Generated Insights:
Account Summary Example: "Bella Bridal has been an NAGAE retailer since 2019 and represents one of our strongest partnerships in the Midwest region. The relationship is characterized by consistent reorders, high engagement, and strong collaborative spirit. Current priorities include expanding their curve size offerings and preparing for their annual trunk show in Q2. The account shows strong growth trajectory with 42% YoY increase. Key contact Sarah Mitchell is highly responsive and actively promotes NAGAE on social media. Open opportunities include potential second location opening in Chicago suburbs (mentioned in last market meeting)."
Communication Themes Example:
Delivery timelines (mentioned 8 times) - mostly satisfied
Customization options (mentioned 5 times) - wants more details
Curve sizing (mentioned 3 times) - strong interest in expansion
Marketing support (mentioned 2 times) - requests more social assets
Risk Indicators Example (At-Risk Account):
⚠️ No orders in 120 days (previous average: every 45 days)
⚠️ Last contact 60 days ago (declining engagement)
⚠️ Recent survey showed concerns about delivery delays
⚠️ Survey satisfaction score dropped from 4.5 to 3.0
⚠️ Account manager turnover at their store (new buyer, relationship reset needed)

VISUAL DESIGN SPECIFICATIONS
Portal/App Aesthetic:
Clean, elegant bridal aesthetic
Sophisticated but not overly ornate
Modern sans-serif typography
Lots of white space
Soft, romantic color palette:
Primary: Soft champagne/blush
Secondary: Deep navy or charcoal
Accent: Rose gold or warm metallic
Success: Soft sage green
Warning: Warm amber
Error: Muted coral
High-quality dress photography
Smooth animations and transitions
Professional but approachable
CRM Aesthetic:
Professional, data-driven dashboard feel
Clean and organized
More structured than portal
Emphasis on readability and data visualization
Similar color palette but more neutral:
Primary: Navy/charcoal
Secondary: Light gray backgrounds
Accent: NAGAE brand color
Data visualizations: coordinated color scheme
Clear hierarchy and information architecture
Business intelligence focus
Responsive Breakpoints:
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px - 1439px
Large Desktop: 1440px+
Accessibility Considerations:
WCAG 2.1 AA compliance
Color contrast ratios minimum 4.5:1
Keyboard navigation support
Screen reader friendly
Focus indicators
Alt text for images
Clear error messages

TECHNICAL ANNOTATIONS FOR DEVELOPERS
Database Structure Notes:
Portal/App Database (PostgreSQL):
Products table (style_name, variations, fabric, silhouette, etc.)
Training modules table
Quizzes table
Users table (stylists)
User progress table
Badges table
Points/gamification table
Notifications table
Analytics/tracking table
Resources table
CRM Database (PostgreSQL - Separate):
Accounts table
Contacts table
Communications table
Meetings table
Tasks table
Survey responses table
Sales data table
Health scores table
Notes table
Team members table
API Endpoints Examples:
Portal APIs:
GET /api/products
GET /api/products/{id}
POST /api/ai/ask
GET /api/training/modules
POST /api/quiz/submit
GET /api/user/profile
POST /api/notifications/send
GET /api/analytics/questions
CRM APIs:
GET /api/accounts
GET /api/accounts/{id}
POST /api/accounts
PUT /api/accounts/{id}
GET /api/accounts/{id}/communications
POST /api/meetings
GET /api/sales-data
POST /api/integrations/google-sheets/sync
Third-Party Integration Placeholders:
AI Service (Claude/OpenAI) - for Ask NAGAE AI and CRM insights
Front API - email integration (future)
Google Sheets API - sales data sync
Push notification service
Video hosting (for training videos)
File storage (for resources, images)

PROTOTYPE STATES TO SHOW
Different States:
Empty states - "No training completed yet", "No notifications", "No accounts in pipeline"
Loading states - Skeleton screens, spinners
Error states - "Unable to load", "No results found"
Success states - "Badge earned!", "Product added", "Message sent"
Populated states - Full data examples
Mobile vs Desktop views - Show responsive behavior
Hover states - Interactive elements
Active/selected states - Current navigation item, selected filters
User Permission Views:
Stylist view (limited access)
Admin view (full portal management)
CRM sales rep view (assigned accounts)
CRM manager view (all accounts)
CRM admin view (full system access)



