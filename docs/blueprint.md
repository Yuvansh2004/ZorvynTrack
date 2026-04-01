# **App Name**: ZorvynTrack

## Core Features:

- Global State Management & Persistence: Utilizes React Context API (FinanceContext) to manage global state for transactions, userRole ('Admin' or 'Viewer'), and activeFilters. Implements LocalStorage to ensure the entire state, including the selected role and 20 unique Indian-context transactions (e.g., 'UPI to Ramesh', 'Swiggy Biryani', 'Jio Recharge', 'Airtel Bill', 'Internship Stipend'), persists across browser sessions.
- Personalized Financial Overview: Displays the developer name 'Yuvansh Dashrath Koli' and email 'yuvanshkoli1011@gmail.com' in the Navbar. Features Summary Cards for 'Total Balance', 'Total Income', and 'Total Expenses' formatted in INR (₹). Visualizations include a LineChart showing a 7-day balance trend and a PieChart for a spending breakdown by category.
- Dynamic Transaction Management: Presents a filterable and searchable table with columns: Date, Description, Amount, Category, and Type (Income/Expense). Includes a search bar for descriptions, a dropdown for category filtering, and a functional button to Export Transactions to CSV.
- Role-Based Access Control (RBAC): Features a Role Toggle switch in the top bar to swap between 'Admin' and 'Viewer' roles. The 'Viewer' role provides read-only access by hiding all 'Add' or 'Edit' buttons. The 'Admin' role displays an 'Add Transaction' button that opens a clean Modal for new data entry.
- Financial Insights & Analytics: Includes an 'Insights' card that dynamically calculates the Highest Spending Category and the Monthly Savings Rate.
- Responsive User Experience: Ensures the layout is fully responsive for all screen sizes and handles 'empty data' cases with professional messages.

## Style Guidelines:

- Dark Mode theme with a 'Slate-950' background and semi-transparent 'glassmorphism' cards for a modern and professional aesthetic.
- The 'Inter' font is used for all text to ensure high legibility and a contemporary appearance across the dashboard.
- Minimalist and professional icons from the 'Lucide-React' library are consistently used to ensure clarity and enhance navigation without visual clutter.
- Modular, semi-transparent 'glassmorphism' cards are used for presenting data. The layout is fully responsive, adapting seamlessly to various screen sizes for optimal display and usability.
- Subtle and purposeful 'fade-in-up' transitions, implemented with 'Framer Motion', are applied to cards and list items to provide fluid state changes and intuitive user feedback without being distracting.