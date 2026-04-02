
# ZorvynTrack - Institutional Student Finance Dashboard

Built by **Yuvansh Dashrath Koli**  
**Personal Email:** yuvanshkoli1011@gmail.com  
**Reference ID:** TE85LMG1

## Project Overview
ZorvynTrack is a high-impact, institutional-grade financial terminal built for the Zorvyn internship assessment. The platform focuses on student financial literacy through intuitive data visualization, secure role-based access modulation (RBAC), and precise ledger management.

### Key Functional Approaches (The "Human" Logic)
1. **Centralized Node State**: Utilized React Context API (`FinanceContext.tsx`) to manage a master ledger of ~800 transactions across 10 demo accounts. I chose Context over Redux to keep the architecture "simple and smart," prioritizing auditability and performance for a single-page terminal.
2. **Institutional Security Protocol**: Implemented a "Grace Period" system. In a real-world FinTech environment, data integrity is paramount. Here, Viewers have a 30-second window to correct their own entries. After this, data becomes "Permanent," simulating an immutable audit trail.
3. **Adaptive Telemetry UI**: Developed a reactive font-scaling engine for the Dashboard Summary Cards. Financial values (INR) automatically resize based on the Sidebar's toggle state. This ensures 100% legibility on 13-inch laptops and mobile devices without visual overlap.
4. **Onboarding Synchronization**: Redesigned the sequence so the "Namaste" greeting triggers on every login. For new users, a point-to-point Tutorial initializes immediately after the greeting is dismissed, ensuring a welcoming and technical introduction.
5. **Data-Rich Telemetry**: Built a generation engine that initializes the platform with professional, future-dated transactions starting from **January 1st, 2026**. This ensures the charts show meaningful "velocity" rather than empty states.

## Requirements Alignment Matrix
| Requirement | Implementation Detail | Status |
|:--- |:--- |:---:|
| **1. Dashboard Overview** | Real-time Summary Cards, Transaction Velocity (AreaChart), and Expenditure Breakdown (PieChart). | ✅ |
| **2. Transactions Ledger** | High-performance table with Search, Date-Range Filtering, Sorting, and CSV Export. | ✅ |
| **3. RBAC (Admin/Viewer)** | Distinct authority levels. Admins can override; Viewers have restricted 30-second edit windows for own entries. | ✅ |
| **4. Insights Section** | Concentration analysis, Savings Rate health detection, and Telemetry Comparison bars. | ✅ |
| **5. State Management** | Robust React Context managing master ledger persistence and session authorization. | ✅ |
| **6. UI/UX Excellence** | Dark/Light theme modulated, responsive sidebar-drawer, and "Namaste" greeting protocol. | ✅ |

## Setup & Installation Instructions
1. **Environment Setup**: Ensure Node.js (v18+) is installed.
2. **Clone & Install**:
   ```bash
   npm install
   ```
3. **Synchronization**:
   ```bash
   npm run dev
   ```
4. **Access Terminal**: Open `http://localhost:9002` in your browser.
5. **Sector Credentials**: Use the "Sector Credentials" button on the login screen to switch between Admin (Yuvansh) and Viewer accounts.

## Developer Note
This terminal was built to exceed assessment standards by prioritizing "Strategic Additions" like the side-by-side brand header, institutional audit logs, and a culturally resonant "Namaste" onboarding flow to demonstrate readiness for a professional FinTech environment.
