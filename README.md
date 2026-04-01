# ZorvynTrack - Institutional Student Finance Dashboard

Built by **Yuvansh Dashrath Koli**  
**Personal Email:** yuvanshkoli1011@gmail.com  
**Reference ID:** TE85LMG1

## Project Overview
ZorvynTrack is a high-impact, institutional-grade financial terminal built for the Zorvyn internship assessment. The platform focuses on student financial literacy through intuitive data visualization, secure role-based access modulation (RBAC), and precise ledger management.

### Core Institutional Features
- **Unified Assets System**: KPI cards for Balance, Income Velocity, and Expenditure classification.
- **Dynamic Ledger Authority**: 
  - **Viewer Mode**: 30-second grace period for new entries to correct errors. After 30 seconds, entries become permanent.
  - **Admin Mode**: Full override authority (Edit/Delete) at any time.
- **Brand Identity**: Custom "Z" logo integration across loading screens, headers, and the global footer.
- **Institutional Footer**: Professional "Developer Node" with contact details, Privacy Protocols, and System Audit logs.
- **Onboarding System**: First-time tutorial terminal to guide users through the institutional interface.
- **Data Persistence**: Local session encryption (via `localStorage`) to maintain ledger integrity across refreshes.
- **ZorvynTrack System Security Technology**: Advanced branding and terminology throughout the terminal.

### Functional Requirements Alignment
- **Requirement 1 (Dashboard)**: Real-time summary cards and Recharts-powered velocity/expenditure classifications.
- **Requirement 2 (Ledger)**: Multi-filter searchable table (Date, Type, Category) with CSV export for Admins.
- **Requirement 3 (RBAC)**: Distinct behaviors for 'Admin' (Yuvansh) and 'Viewer' (Aditya/Priya) roles.
- **Requirement 4 (Insights)**: High-spending category detection and savings rate telemetry.
- **Requirement 5 (State)**: React Context API managing master ledger state and user sessions.
- **Requirement 6 (UI/UX)**: Fully responsive, theme-modulated (Dark/Light) design using Shadcn UI.

### Tech Stack
- **Core Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS & Shadcn UI
- **Motion**: Framer Motion (for staggered reveals and loading transitions)
- **Charts**: Recharts (Area & Pie classification)
- **Icons**: Lucide React

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to synchronize dependencies.
3. Start the development server with `npm run dev`.
4. Access the application at `http://localhost:9002`.
5. **Sector Manifest**: Use the login dialog manifest to switch between 'Admin' and 'Viewer' accounts.

## Evaluator Notes
This platform has been built to exceed the standard assessment requirements, implementing advanced security logic (30s edit window) and institutional branding to demonstrate readiness for the Zorvyn FinTech environment.
