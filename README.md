
# ZorvynTrack - Institutional Student Finance Dashboard

Built by **Yuvansh Dashrath Koli**  
**College:** Terna Engineering College  
**Reference ID:** TE85LMG1

## What is ZorvynTrack?
I built ZorvynTrack for my Zorvyn internship assessment. It's a professional-looking dashboard for students to track their money. I didn't want it to look like a simple app; I wanted it to feel like an "Institutional Terminal"—something a bank or a college office would use.

### Demo Credentials
I've set up a few accounts so you can see how the permissions work. Every account comes pre-loaded with a deep history of 50-100 transactions so you can test the filters and search immediately.

**Admin Node (Global Power)**
- **User:** `Admin@DemoZorvynTrack.io`
- **Pass:** `admin_zorvyn`
- **Capability:** Full audit visibility across all student nodes. Management access to wipe mock data and export the global ledger to CSV.

**Viewer Nodes (Student View)**
- **Users:** 
  - `aditya.rao@DemoZorvynTrack.io` (Pass: `viewer_rao`)
  - `priya.sharma@DemoZorvynTrack.io` (Pass: `viewer_sharma`)
  - `rohan.mehta@DemoZorvynTrack.io` (Pass: `viewer_mehta`)
  - `sneha.kapoor@DemoZorvynTrack.io` (Pass: `viewer_kapoor`)
- **Capability:** Students only see their own telemetry. They can add entries, but after a 30-second security window, the entries become permanent for audit integrity.

## My Approach & Thinking (The "Logic")

1.  **State Management (Context API)**: 
    I used the React Context API as my "Central Telemetry Hub." When a student adds an expense, I want the charts, the summary cards, and the table to synchronize instantly. It makes the UI feel like a real-time banking terminal.

2.  **The "Grace Period" Security**: 
    In real-world accounting, you can't just delete the past. I added a **30-second window**. Students can fix a typo right after they hit "Add," but once that timer expires, the entry is locked. This makes the data reliable for audits.

3.  **Adaptive UI for Small Screens**: 
    Institutional data is often dense. I noticed that on 13-inch laptops, charts and numbers get crowded. I used horizontal scrolling for summary cards and "Adaptive Typography" to ensure that numbers are never cut off.

4.  **Color Psychology**: 
    I chose **Indigo-600** as the primary brand color. Indigo feels trustworthy and secure. I paired it with **Slate-50** backgrounds to keep the "terminal" look easy on the eyes during long review sessions.

5.  **Namaste Greeting**: 
    I added a "Namaste" protocol when you log in. It adds a personal, respectful touch to an otherwise high-tech institutional system.

## Core Features
- **High-Velocity Ledger**: Every account initializes with **50-100 random transactions** to simulate a busy academic year.
- **Deep Audit Search**: The search bar isn't just for text; you can search by specific **amounts** or **dates (YYYY-MM-DD)** to find entries instantly.
- **Admin Command Center**: Admins can reset the mock telemetry to a clean state for new testing cycles.
- **Permanent Records**: Viewer nodes cannot delete historical data, ensuring audit trails remain intact.

## How to Run
1. `npm install`
2. `npm run dev`
3. Access the terminal at `http://localhost:9002`
