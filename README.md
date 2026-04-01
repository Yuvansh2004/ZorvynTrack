# ZorvynDash - Finance Dashboard Submission

Built by **Yuvansh Dashrath Koli**  
**Personal Email:** yuvanshkoli1011@gmail.com  
**Demo Identity:** yuvanshkoli@demozorvyn.com  
**Reference ID:** TE85LMG1

## Project Overview
This dashboard is a clean, interactive frontend application built for the Zorvyn internship assessment. It focuses on intuitive data visualization, component modularity, and a simulated role-based user interface.

### Features
- **Dashboard Summary**: Real-time KPI cards for Balance, Income, and Expenses.
- **Data Visualizations**: Time-based balance trends and categorical spending breakdowns using Recharts.
- **Transaction Ledger**: Searchable and filterable table with isolated data views for different users.
- **Simulated RBAC**: Distinct behaviors for 'Admin' and 'Viewer' roles. Admins have full CRUD access, while Viewers are restricted to read-only views of their own data.
- **Insights Kernel**: Automated logic to identify spending patterns and monthly comparisons.
- **Persistence**: Utilization of `localStorage` to maintain data across browser refreshes.

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS & Shadcn UI
- **Charts**: Recharts
- **Icons**: Lucide React

## Setup Instructions
1. Clone the repository or download the source.
2. Run `npm install` to install dependencies.
3. Start the development server with `npm run dev`.
4. Access the application at `http://localhost:9002`.
5. Use the "Sector Manifest" on the login screen to test different user scenarios.

## Evaluation Alignment
- **Requirement 1**: Summary cards and charts included in the Dashboard.
- **Requirement 2**: Functional Transaction Ledger with search/filter.
- **Requirement 3**: UI behavior changes based on Admin/Viewer role simulation.
- **Requirement 4**: Highest spending category and monthly comparisons in Insights.
- **Requirement 5**: State managed via React Context.
- **Requirement 6**: Fully responsive design for mobile and desktop.
