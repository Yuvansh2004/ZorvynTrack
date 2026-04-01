
# ZorvynTrack - Institutional Student Finance Dashboard

Built by **Yuvansh Dashrath Koli**  
**Personal Email:** yuvanshkoli1011@gmail.com  
**Reference ID:** TE85LMG1

## Project Overview
ZorvynTrack is a high-impact, institutional-grade financial terminal built for the Zorvyn internship assessment. The platform focuses on student financial literacy through intuitive data visualization, secure role-based access modulation (RBAC), and precise ledger management.

### Key Functional Approaches
1. **Centralized Node State**: Utilized React Context API (`FinanceContext.tsx`) to manage a master ledger of ~800 transactions across 10 demo accounts. This ensures absolute consistency across the Dashboard, Ledger, and Insights views.
2. **Institutional Security Logic**: Implemented a "Grace Period" protocol where Viewer roles have a 30-second window to correct entries. After 30 seconds, data becomes "Permanent," simulating real-world financial auditing.
3. **Adaptive Telemetry UI**: Created a dynamic scaling system for Summary Cards. Financial values automatically resize based on the sidebar's toggle state to ensure 100% legibility on laptop and mobile viewports.
4. **Data-Rich Telemetry**: Built a generation engine that initializes the platform with professional, future-dated transactions starting from **January 1st, 2026**.

## Requirements Alignment Matrix
| Requirement | Implementation Detail | Status |
|:--- |:--- |:---:|
| **1. Dashboard Overview** | Real-time Summary Cards, Transaction Velocity (AreaChart), and Expenditure Breakdown (PieChart). | ✅ |
| **2. Transactions Ledger** | High-performance table with Search, Date Filtering, Sorting, and CSV Export. | ✅ |
| **3. RBAC (Admin/Viewer)** | Distinct authority levels. Admins can override; Viewers have corrected grace-period windows. | ✅ |
| **4. Insights Section** | Concentration analysis, Savings Rate health detection, and Telemetry Comparison bars. | ✅ |
| **5. State Management** | Robust React Context managing ledger persistence and session authorization. | ✅ |
| **6. UI/UX Excellence** | Fully responsive, Dark/Light theme modulated, and framer-motion transitions. | ✅ |

## Setup & Installation Instructions
1. **Environment Setup**: Ensure Node.js (v18+) is installed.
2. **Clone & Install**:
   ```bash
   git clone [repository-url]
   cd ZorvynTrack
   npm install
   ```
3. **Synchronization**:
   ```bash
   npm run dev
   ```
4. **Access Terminal**: Open `http://localhost:9002` in your browser.
5. **Sector Credentials**: Use the "Sector Credentials" button on the login screen to switch between Admin (Yuvansh) and Viewer accounts.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS & Shadcn UI
- **Visualization**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Developer Note
This terminal was built to exceed the assessment standards by implementing cultural onboarding ("Namaste" greeting), a point-to-point tutorial system, and institutional branding to demonstrate readiness for the Zorvyn FinTech environment.
