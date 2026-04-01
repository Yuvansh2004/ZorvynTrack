
# ZorvynTrack - Student Internship Assignment

Built by **Yuvansh Dashrath Koli**  
**Personal Email:** yuvanshkoli1011@gmail.com  
**Demo Identity:** yuvanshkoli@demozorvyn.com  
**Assignment Reference ID:** Z-992-KOLI

## My Approach
For this technical screening by Zorvyn FinTech, I focused on building a modular, state-driven financial terminal that demonstrates technical depth while remaining clean and intuitive.

### Tech Stack & Architecture
- **Framework**: Next.js 15 (App Router) with React 19.
- **State Management**: React Context API (`FinanceProvider`) managing unified transaction data, user roles, and UI states.
- **Persistence**: `localStorage` implementation to simulate backend behavior for data persistence and role selection.
- **Visuals**: `Recharts` for time-based (Area) and categorical (Pie/Bar) data interpretation.
- **Styling**: Tailwind CSS with a "Student-Pro" aesthetic focusing on weight-based typography and Indigo accents.

### Core Features (Requirement Alignment)
- [x] **Dashboard Overview**: KPI cards for Net Liquidity, Inflow, and Outflow. Time-based balance trends and expenditure classification charts.
- [x] **Ledger Terminal (Transactions)**: Advanced table with real-time search, category tagging, and status-based coloring.
- [x] **Role-Based UI (RBAC)**: Distinct 'Admin' and 'Viewer' experiences. Toggling to Viewer locks the UI and isolates data, while Admin provides global oversight and modification rights.
- [x] **Analytics Kernel (Insights)**: Dedicated view identifying highest expenditure categories, retention ratios, and monthly comparison audits.
- [x] **Responsive UX**: Fluid sidebar navigation that adapts from desktop expanded mode to mobile-optimized patterns.
- [x] **Export Logic**: Professional CSV generation for Admin users, simulating official financial statements.

## Setup Instructions
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Access at `http://localhost:9002`
4. Use the "Sector Manifest" on the login screen to test different user roles.
