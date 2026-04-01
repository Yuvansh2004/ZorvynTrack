# ZorvynTrack - Student Internship Assignment

Built by **Yuvansh Dashrath Koli** (yuvanshkoli@zorvyn.com)

## My Approach
For this technical screening, I focused on building a clean, intuitive financial terminal that mirrors the standards of a professional fintech application while remaining firmly rooted in a student's technical perspective.

### Tech Stack & Rationale
- **Next.js 15 & React 19**: I chose the latest versions of these frameworks to demonstrate my ability to keep pace with rapid development cycles. My experience in college projects with the MERN stack gave me a strong foundation for managing components and hooks.
- **Tailwind CSS**: I implemented a "Student-Pro" aesthetic. I deliberately used a clean Indigo accent against a slate/white palette to ensure high professional legibility without visual over-engineering.
- **React Context API**: Instead of reaching for heavy libraries like Redux, I utilized the Context API for state management. This allowed me to handle `transactions`, `userRole`, and `navigation` efficiently within the client's memory.
- **LocalStorage Persistence**: I integrated LocalStorage to simulate backend persistence. This ensures that any "Admin" commits remain visible even after a system refresh.

### Core Assumptions
- **Frontend-First RBAC**: Assumption: I used local state for the Role-Based UI to demonstrate frontend logic without needing a complex Auth provider for this internship assignment.
- **Mock Telemetry**: I generated 20+ localized Indian context transactions (UPI, Stipends, Bills) to ensure the data feels realistic for a Zorvyn auditor.

## Core Features
- [x] **Dashboard Overview**: Summary cards for Balance, Income, and Expenses formatted in INR (₹).
- [x] **Visual Analytics**: Interactive 7-day balance trend (Area) and categorical breakdown (Pie).
- [x] **Role-Based UI (RBAC)**: Distinct 'Admin' and 'Viewer' modes. Viewers are restricted to read-only access.
- [x] **Ledger Terminal**: Full-featured transaction table with search, category filtering, and CSV export.
- [x] **Adaptive Layout**: Fully responsive sidebar that handles high-quantum values without clipping.

## Setup Instructions
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Access at `http://localhost:9002`
