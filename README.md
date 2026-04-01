
# ZorvynTrack Pro - FinTech Assessment

Built by **Yuvansh Dashrath Koli** (yuvanshkoli1011@gmail.com)
Terna Engineering College

## Overview
ZorvynTrack Pro is a high-performance personal finance dashboard designed to meet the rigorous requirements of the technical screening assessment. It provides real-time financial telemetry through a stylish, "Quantum Node" terminal interface.

## Approach & Methodology
- **Modular Frontend Architecture**: Developed using Next.js 15 (App Router) and React 19 for industry-standard performance and scalability.
- **Role-Based Access Control (RBAC)**: Implemented a robust context-driven role system (Admin/Viewer) that dynamically alters the UI based on user permissions.
- **Global State Synchronization**: Leveraged React Context API paired with LocalStorage to ensure seamless data persistence across browser sessions and multiple user accounts.
- **Professional Data Visualization**: Integrated Recharts for responsive, high-fidelity time-series and categorical analytics.
- **Stylish Design System**: Utilized Tailwind CSS and Framer Motion to create a unique "Quantum Noir" aesthetic with smooth transitions and professional glassmorphism.

## Core Features (Checklist Compliance)
- [x] **Summary Cards**: Total Balance, Total Income, and Total Expenses formatted in INR (₹).
- [x] **Visualizations**: 7-day balance velocity trend and categorical sector distribution.
- [x] **Ledger Terminal**: Full transaction list with Date, Amount, Category, and Type.
- [x] **Advanced Search/Filter**: Description-based search and categorical filtering.
- [x] **Persistence**: Full data retention across refreshes via LocalStorage.
- [x] **RBAC Logic**: Functional Admin/Viewer mode (Add/Delete actions restricted to Admins).
- [x] **Submission Strengths**: CSV Export engine and Framer Motion animations.

## Setup Instructions
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Access the application at `http://localhost:9002`
4. Use the "System Access Manifest" on the login page to choose between 15 predefined Indian identities.
5. Default Access Key: `zorvyn2024`

## Tech Stack
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS / ShadCN UI
- **Animations**: Framer Motion
- **Analytics**: Recharts
- **Icons**: Lucide React
