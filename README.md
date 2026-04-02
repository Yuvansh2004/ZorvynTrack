
# ZorvynTrack - Institutional Student Finance Dashboard

Built by **Yuvansh Dashrath Koli**  
**Personal Email:** yuvanshkoli1011@gmail.com  
**College Email:** yuvanshkoli2324@ternaengg.ac.in  
**Reference ID:** TE85LMG1

## Project Overview
ZorvynTrack is a high-impact, institutional-grade financial terminal built for the Zorvyn internship assessment. I focused on making a platform that students can actually use to track their spending while feeling professional and secure. It features real-time data visualization, secure role-based access, and a precise audit trail.

### Evaluation Credentials (Logins)
To access the system, please use the following institutional handles. You can also use the "Sector Credentials" button on the login screen to quickly switch between demo accounts.

**Primary Admin Node**
- **Email:** `Admin@DemoZorvynTrack.io`
- **Password:** `admin_zorvyn`
- **Access Type:** Full Ledger Authority (Global Management)

**Restricted Viewer Nodes**
- **Aditya Rao:** `aditya.rao@DemoZorvynTrack.io` (Password: `viewer_rao`)
- **Priya Sharma:** `priya.sharma@DemoZorvynTrack.io` (Password: `viewer_sharma`)
- **Access Type:** Restricted Audit Mode (Local Telemetry Only)

## How I Built This (My Logic & Approach)

1.  **Why I used React Context API**: 
    Instead of overcomplicating things with heavy state libraries, I used the Context API (`FinanceContext.tsx`) to manage the entire ledger. This keeps the app fast and makes sure that every card, chart, and table is perfectly synced with the same data at all times. It acts as the "Single Source of Truth" for the entire terminal.

2.  **The "Grace Period" Security System**: 
    In an institutional tool, you can't just delete historical records. I added a **30-second window** logic. Users can edit their own entries for 30 seconds (to fix typos), but after that, the data becomes "Permanent." This simulates a real audit trail where data integrity is the top priority.

3.  **Solving the Laptop Screen Constraint**: 
    I noticed that on 13-inch laptops, wide financial data gets squashed. To fix this, I implemented **"Adaptive Typography."** The main summary cards use a horizontal scroll container and forced single-line text (`whitespace-nowrap`), so the numbers are always clear and never cut off, no matter the screen size.

4.  **Coloring & Theme Logic**: 
    I chose **Indigo-600** as the primary brand color because it represents authority and trust in fintech. The interface uses a clean **Slate-50** background to reduce eye strain during long auditing sessions. I also added a "Namaste" greeting to add a personal, professional touch to the login flow.

5.  **Data Contributions**: 
    Even though Viewers have restricted access, they can still contribute data. This reflects a collaborative campus environment where students track their own money while the Admin manages the overall system integrity.

## Core Features
- **Dashboard Hub**: Wide summary cards with single-line telemetry and trend analysis.
- **Transaction Ledger**: High-performance table with multi-parameter filtering and CSV export for Admins.
- **Verified Authority Badge**: Professional visual identification for the system developer.
- **Onboarding Protocol**: A point-to-point tutorial that initializes the user session.

## Setup Instructions
1.  **Install**: `npm install`
2.  **Run**: `npm run dev`
3.  **Access**: Open `http://localhost:9002` in your browser.

## Final Note
ZorvynTrack was built to show how I think about real-world constraints—like screen size, data permanence, and professional aesthetics. Every feature, from the verified badge to the 30-second edit window, was designed to create an institutional-grade experience.
