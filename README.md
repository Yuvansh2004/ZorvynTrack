# ZorvynTrack - Student Internship Assignment

Built by **Yuvansh Dashrath Koli** (yuvanshkoli1011@gmail.com)

## My Approach
For this assignment, I focused on building a clean, intuitive financial dashboard that prioritizes ease of use and professional data presentation. 

### Tech Stack Decisions
- **Next.js & React**: I chose this because of my extensive experience with the MERN stack in college projects. The component-based architecture allowed me to keep the code modular and maintainable.
- **Tailwind CSS**: Used for the 'Student-Pro' aesthetic. I opted for a light, clean palette (Indigo accent) to ensure the UI feels modern yet professional.
- **React Context API**: I chose Context over heavier state management libraries (like Redux) to demonstrate my ability to handle global state efficiently for front-end logic (transactions and RBAC).
- **Framer Motion**: Integrated subtle animations to give the dashboard a polished, "genuine" feel.

### Key Assumptions
- **Frontend-First RBAC**: I used local React state for the Role-Based UI (Admin/Viewer) to demonstrate the front-end logic requirements without the overhead of a back-end authentication provider for this specific UI task.
- **LocalStorage for Persistence**: Assumed persistence was required across refreshes, so I implemented a simple LocalStorage sync in the FinanceProvider.

## Features
- [x] **Dashboard Summary**: Total Balance, Income, and Expenses formatted in INR (₹).
- [x] **Visual Analytics**: Interactive Balance Trend (Area) and Spending Breakdown (Pie).
- [x] **Interactive Ledger**: Searchable table with category filtering.
- [x] **RBAC Controls**: Functional 'Viewer' and 'Admin' modes with dynamic UI updates.
- [x] **Responsive Design**: Optimized for mobile and desktop viewports.

## Setup Instructions
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Access at `http://localhost:9002`