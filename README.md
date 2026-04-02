
# ZorvynTrack - Institutional Student Finance Dashboard

Built by **Yuvansh Dashrath Koli**  
**College:** Terna Engineering College  
**Reference ID:** TE85LMG1

## What is ZorvynTrack?
I built ZorvynTrack for my Zorvyn internship assessment. It's a professional-looking dashboard for students to track their money. I didn't want it to look like a simple app; I wanted it to feel like an "Institutional Terminal"—something a bank or a college office would use.

### Demo Credentials
I've set up a few accounts so you can see how the permissions work.

**Admin Node (Global Power)**
- **User:** `Admin@DemoZorvynTrack.io`
- **Pass:** `admin_zorvyn`
- **What it does:** You can see every single transaction from every student. You can delete mock data and export the entire ledger to CSV.

**Viewer Nodes (Student View)**
- **Users:** `aditya.rao@DemoZorvynTrack.io`, `priya.sharma@DemoZorvynTrack.io`, `rohan.mehta@DemoZorvynTrack.io`
- **Pass:** `viewer_rao`, `viewer_sharma`, etc.
- **What it does:** Students only see their own money. They can add entries, but after 30 seconds, they can't change them anymore.

## My Approach & Thinking (The "Logic")

1.  **State Management (Context API)**: 
    I chose the React Context API because I wanted a "Single Source of Truth." When a student adds a transaction, I want the charts, the table, and the balance cards to update instantly. Context makes this smooth without making the code too messy.

2.  **The "Grace Period" Security**: 
    In real accounting, you can't just delete history. I added a **30-second window**. Students can fix a typo right after adding an entry, but once that window closes, the data is locked. This makes the data reliable for auditing.

3.  **Adaptive UI for Small Screens**: 
    I noticed that on 13-inch laptops, big numbers often get cut off. I used **whitespace-nowrap** and horizontal scrolling for the summary cards. This way, the "Telemetry" (the numbers) is always clear and professional.

4.  **Color Strategy**: 
    I picked **Indigo-600** as the main theme. Indigo feels trustworthy and modern. I paired it with **Slate-50** for the background so it's easy on the eyes during long sessions.

5.  **Namaste Greeting**: 
    I added a "Namaste" popup when you log in. It adds a personal, respectful touch to a high-tech terminal.

## Core Features
- **High-Velocity Ledger**: Every account comes with 50-100 random transactions to show how the system handles lots of data.
- **Searchable Audit Trail**: You can search by description, category, date, or even the amount.
- **Admin Command Center**: Admins can wipe mock data to start fresh.
- **Security Lock**: My developer node is locked to prevent unauthorized changes to my credentials.

## How to Run
1. `npm install`
2. `npm run dev`
3. Go to `http://localhost:9002`
