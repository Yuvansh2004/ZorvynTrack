# ZorvynTrack - Institutional Student Finance Dashboard

Built by **Yuvansh Dashrath Koli**  
**College:** Terna Engineering College  
**Reference ID:** TE85LMG1  
**Project Role:** Student Developer

---

## 1. Project Overview: The "Institutional" Vision
ZorvynTrack is not just a personal finance tracker; it is designed as an **Institutional Node Terminal**. My goal was to move away from the "app-like" feel of consumer banking and create something that looks and feels like a professional auditing tool used by a college finance office or a bank's global ledger terminal. Every design choice—from the color hex codes to the state management architecture—was made to signal **Trust, Accuracy, and Authority**.

---

## 2. My "Human Logic" & Architectural Approach

As a student developer, I wanted to solve the real-world problems I face with current financial tools. Here is my thinking from start to finish:

### A. State Management: The "Central Telemetry Hub"
I chose the **React Context API** to serve as the heart of the system. In a finance terminal, data needs to be perfectly synchronized. When a student adds an expense, it shouldn't just update the list; it needs to instantly modulate the **Transaction Velocity Charts**, update the **Summary Cards**, and adjust the **Insight Algorithms**. Using Context allows the entire UI to react like a real-time banking instrument without the lag of disconnected state nodes. This architectural choice ensures that the "Source of Truth" is always unified.

### B. The "30-Second Security Window" (Audit Integrity)
In real-world accounting, you can't just "delete" the past. To simulate this professional integrity, I implemented a **Grace Period Protocol**.
- **The Logic**: Students have exactly **30 seconds** after adding an entry to fix typos or adjust categories. 
- **The Result**: Once that timer expires, the entry becomes **Permanent Telemetry**. It can no longer be edited or deleted by a common Viewer node. This ensures that the student's audit trail remains untampered and reliable for the college office. This prevents "historical revisionism" in student spending data.

### C. Color Psychology: Indigo-600 & Slate-50
I strictly avoided "playful" or "neon" colors found in typical consumer apps.
- **Indigo-600**: I chose this as the primary brand color because it signals **Authority, Security, and Trust**. It feels institutional and "bank-grade."
- **Slate-50 & 950**: The backgrounds are modulated to reduce eye strain during long auditing sessions. The high contrast ensures that telemetry data—the most important part of the screen—is always the hero.

### D. Adaptive UI for High-Density Telemetry
Institutional data is often dense. I noticed that on standard 13-inch student laptops, large charts often break layouts.
- **The Solution**: I implemented **Adaptive Typography** and horizontal-scrolling Summary Cards. This ensures that even with **50-100 transactions** on the screen, the numbers never overlap or become unreadable. The sidebar is also retractable to maximize horizontal data space.

### E. The "Namaste" Cultural Protocol
Technology should still feel human. I added a "Namaste" greeting during the initialization sequence. This adds a layer of respect and personalization to an otherwise high-tech institutional system, acknowledging the cultural context of the developer.

---

## 3. Core Features & Advanced Audit Tools

### A. High-Velocity Ledger (Audit-Rich Data)
Every single account (Admin and all 9 Viewers) initializes with **50 to 100 random transactions**. This isn't just "dummy text"—it's a deep historical simulation of an entire academic year. You can immediately test the scrolling, filtering, and performance of the terminal.
- **Note to Interviewers**: Log into any account—be it `ishita.gupta` or `aditya.rao` - and you will find a rich, unique financial history waiting for analysis.

### B. Deep Audit Search
The search handle is engineered for speed and precision. You can search for:
- **Exact Amounts**: Type "450" to find all transactions matching that value.
- **Date Nodes**: Type "2026-02" to see all telemetry from that specific month (Format: YYYY-MM-DD).
- **Node Owners**: Admins can search by owner handle (e.g., "rao") to audit specific students.

### C. Advanced Row Modulation & Filtering
To handle high-volume data, I've added advanced row limits: **100, 250, 500, and "All"**. This allows a professional auditor to view the entire ledger at once without pagination lag. I also implemented a **Category Filter** to isolate specific spending sectors like "Education" or "Utilities."

---

## 4. How to Run the Terminal
1. `npm install`
2. `npm run dev`
3. Access the terminal at `http://localhost:9002`

---

## 5. Evaluation Credentials (Node Access)

### Admin Command Node (Global Authority)
- **User**: `Admin@DemoZorvynTrack.io`
- **Pass**: `admin_zorvyn`
- **Logic**: Full visibility across all 10 student nodes. Management access to reset the global ledger and export records to CSV.

### Viewer Nodes (Student Viewers)
- **Common Password**: `viewer_[surname]` (e.g., `viewer_rao`, `viewer_sharma`)
- **Users**: 
  - `aditya.rao@DemoZorvynTrack.io`
  - `priya.sharma@DemoZorvynTrack.io`
  - `rohan.mehta@DemoZorvynTrack.io`
  - `ishita.gupta@DemoZorvynTrack.io`
  - `sneha.kapoor@DemoZorvynTrack.io`
  - `vikram.singh@DemoZorvynTrack.io`
  - `ananya.iyer@DemoZorvynTrack.io`
  - `arjun.verma@DemoZorvynTrack.io`
  - `kabir.malhotra@DemoZorvynTrack.io`
- **Logic**: These accounts only see their own private telemetry. They have the 30-second window to manage entries before they lock permanently.

---

## 6. Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Engine**: React 19
- **Styling**: Tailwind CSS (Institutional Theme)
- **Telemetry Charts**: Recharts
- **Icons**: Lucide-React
- **State**: React Context API
