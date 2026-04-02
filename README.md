# ZorvynTrack - Institutional Student Finance Dashboard

Built by **Yuvansh Dashrath Koli**  
**Personal Email:** yuvanshkoli1011@gmail.com  
**College Email:** yuvanshkoli2324@ternaengg.ac.in  
**Reference ID:** TE85LMG1

## Project Overview
ZorvynTrack is a high-impact, institutional-grade financial terminal built for the Zorvyn internship assessment. The platform focuses on student financial literacy through intuitive data visualization, secure role-based access modulation (RBAC), and precise ledger management.

### Evaluation Credentials (Logins)
| Role | Email | Password | Access Type |
|:--- |:--- |:--- |:--- |
| **Admin** | `Admin@DemoZorvynTrack.io` | `admin_zorvyn` | Full Ledger Authority |
| **Viewer** | `aditya.rao@DemoZorvynTrack.io` | `viewer_rao` | Restricted Audit Mode |
| **Viewer** | `priya.sharma@DemoZorvynTrack.io` | `viewer_sharma` | Restricted Audit Mode |

*Note: Use the "Sector Credentials" button on the login screen to quickly switch between demo nodes.*

## Key Technical Approaches (My Thinking)

1. **Strategic Node State (Context API)**: 
   - I used the React Context API (`FinanceContext.tsx`) to manage a master ledger across the whole app. I chose this over complex libraries to keep the architecture **"Simple and Smart"**. It allows for instant updates and an audit-ready state that works perfectly on a single-page terminal.

2. **Institutional Security Protocol**: 
   - I implemented a **"Grace Period"** system. In a real institutional environment, you can't just delete data. Here, users have a 30-second window to correct their own entries. After 30 seconds, data becomes "Permanent," simulating a secure immutable audit trail that only an Admin node can override.

3. **Adaptive Typography Telemetry**: 
   - To solve layout constraints on laptop screens (13-inch), I developed an **"Adaptive Typography"** system. Financial values in the summary cards don't just shrink; they stay on one line and use a horizontal scroll node if needed, ensuring 100% legibility regardless of the currency length.

4. **Dynamic Identity Synchronization**: 
   - The terminal features a dynamically linked **Developer Node**. When the Admin updates their external node settings (Personal Email, GitHub, LinkedIn), the global footer icons update for all users in real-time. This shows how branding can be managed centrally.

5. **Democratic Data Contribution**: 
   - While maintaining RBAC, I allowed **Common Viewers** to contribute data to the ledger. This reflects a collaborative environment where students track their own spending while the Admin manages the institutional integrity.

## Requirements Alignment Matrix
| Requirement | Implementation Detail | Status |
|:--- |:--- |:---:|
| **1. Dashboard Overview** | Wide Summary Cards with single-line telemetry and AreaChart trend analysis. | ✅ |
| **2. Transactions Ledger** | High-performance table with Search, Date-Range Filtering, and CSV Export. | ✅ |
| **3. RBAC (Admin/Viewer)** | Democratic entry for all; Viewers restricted to 30s edit window for own entries. | ✅ |
| **4. Insights Section** | Concentration analysis, Savings Rate health detection, and Telemetry Comparison bars. | ✅ |
| **5. State Management** | Robust React Context managing master ledger persistence and session authorization. | ✅ |
| **6. UI/UX Excellence** | Indigo/Slate theme modulation, collapsible modules, and "Namaste" greeting protocol. | ✅ |

## Setup & Installation
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

## Developer Note
This terminal was built to show how a human developer thinks about problem-solving. I prioritized things like the **30-second security window**, the **Verified Authority Badge**, and the **Adaptive Typography** to prove that ZorvynTrack is built for actual institutional use cases. Every color choice (Indigo-600 for brand authority) and greeting (Namaste) was made to create a resonant and professional user experience.