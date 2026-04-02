
# ZorvynTrack - Institutional Student Finance Dashboard

Built by **Yuvansh Dashrath Koli**  
**Personal Email:** yuvanshkoli1011@gmail.com  
**Reference ID:** TE85LMG1

## Project Overview
ZorvynTrack is a high-impact, institutional-grade financial terminal built for the Zorvyn internship assessment. The platform focuses on student financial literacy through intuitive data visualization, secure role-based access modulation (RBAC), and precise ledger management.

### Admin Access Credentials
- **Email:** `yuvanshkoli@DemoZorvynTrack.io`
- **Password:** `admin_zorvyn`
- **Role:** Admin (Full Ledger Authority)

### Key Functional Approaches (The "Human" Logic)
1. **Centralized Node State**: I utilized the React Context API (`FinanceContext.tsx`) to manage a master ledger of ~800 transactions across 10 demo accounts. I chose Context over complex libraries like Redux to maintain a "simple and smart" architecture that prioritizes auditability and performance for a single-page terminal.
2. **Institutional Security Protocol**: I implemented a "Grace Period" system. In a real-world FinTech environment, data integrity is paramount. Here, users have a 30-second window to correct their own entries. After this, data becomes "Permanent," simulating an immutable audit trail that only an Admin can override.
3. **Adaptive Telemetry UI**: Developed a **"Long-Node Scroll"** system and responsive scaling for the Dashboard Summary Cards. Financial values (INR) are handled as full-width nodes with horizontal scrolling, ensuring 100% legibility on laptop screens without truncation.
4. **Onboarding Synchronization**: The terminal features a culturally resonant "Namaste" greeting on every login. For new users, a point-to-point Tutorial initializes *immediately after* the greeting to explain the system architecture, mirroring a human-led onboarding experience.
5. **Data-Rich Telemetry**: Built a generation engine that initializes the platform with professional, future-dated transactions starting from **January 1st, 2026**. This ensures the charts show meaningful "velocity" rather than empty states.

## Requirements Alignment Matrix
| Requirement | Implementation Detail | Status |
|:--- |:--- |:---:|
| **1. Dashboard Overview** | Real-time Summary Cards with scroll nodes, AreaChart trend, and PieChart breakdown. | ✅ |
| **2. Transactions Ledger** | High-performance table with Search, Date-Range Filtering, Sorting, and CSV Export. | ✅ |
| **3. RBAC (Admin/Viewer)** | Democratic entry for all; Viewers restricted to 30s edit window for own entries. | ✅ |
| **4. Insights Section** | Concentration analysis, Savings Rate health detection, and Telemetry Comparison bars. | ✅ |
| **5. State Management** | Robust React Context managing master ledger persistence and session authorization. | ✅ |
| **6. UI/UX Excellence** | Dark/Light theme modulated, collapsible system modules, and "Namaste" greeting protocol. | ✅ |

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
5. **Sector Credentials**: Use the "Sector Credentials" button on the login screen to switch between Admin (Yuvansh) and various Viewer accounts.

## Developer Note
This terminal was built to exceed assessment standards by prioritizing "Strategic Additions" like the collapsible audit logs, side-by-side brand header, and the culturally resonant Namaste greeting. Every design decision was made to show how a human developer thinks about problem-solving, usability, and institutional security.
