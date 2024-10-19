# Roc8-Analytics

**This project is made as an assignment for Moonshot** designed to build a full-stack product analytics platform for visualizing real-time data. The platform provides interactive charts, advanced filtering options, user authentication, and cookie management, allowing users to analyze data such as sales and user engagement seamlessly. The backend handles data processing, authentication, and filter-based queries.

## Features

### 1. Interactive Data Visualization
- **Bar Chart:** Displays different features (A, B, C, etc.) with the total time spent on each feature over a selected date range.
- **Line Chart:** Shows the time trend for a specific category when a bar in the bar chart is clicked. The line chart supports pan, zoom-in, and zoom-out features for exploring time-based data.

### 2. Advanced Filtering
- **Filters Implemented:** 
  - **Age Group Filter:** Allows filtering by age groups: 15-25 and >25.
  - **Gender Filter:** Allows filtering by gender: male and female.
  - **Date Range Selector:** Lets users select a custom time range to analyze data. Charts update based on the selected filters and date range.

### 3. API Integration and Data Pipeline
- **APIs Implemented:** 
  - **Signup, Signin, and Logout APIs:** Implemented user authentication with HTTP-only cookies for secure token management.
  - **Filter-Based Data Retrieval:** The backend API supports filter-based queries for gender, age group, and date range to dynamically fetch and return data based on the selected filters.
- **Data Pipeline:** Data is fetched, processed, and managed via the backend API to deliver consistent data to the front end.

### 4. Cookie Management
- **Secure Token Storage:** Tokens are stored in HTTP-only cookies set from the backend, ensuring secure user authentication.
- **User Preferences:** Filters and date range preferences are saved in cookies to maintain the user's settings across sessions.
- **Clear Preferences Option:** Users can reset or clear their filter and date range preferences.

### 5. User Authentication
- **User Sign-up, Login, and Logout:** Allows users to sign up, log in, and securely log out of the application. 
- **Authentication Handling:** Uses JWT-based authentication with tokens stored in HTTP-only cookies for enhanced security.
- **Access Control:** Users must be authenticated to view the dashboard and share charts.

### 6. URL Sharing
- **Shareable Views:** Users can generate and share URLs containing the current view, including selected filters and date range.
- **Access Protection:** Recipients must log in to view the shared data for privacy and data confidentiality.

### 7. Responsive Design
- The application is responsive and works seamlessly across various devices, including desktops, tablets, and mobile devices.

## Tech Stack

- **Frontend:** Next.js (React), TypeScript, Tailwind CSS, Chart.js
- **Backend:** Next.js TypeScript
- **Database:** PostgreSQL (hosted on NeonDB)
- **Authentication:** JSON Web Tokens (JWT) with HTTP-only cookies for secure authentication

## Getting Started

### Prerequisites
- **Node.js**: Make sure Node.js is installed.
- **PostgreSQL**: Set up a PostgreSQL database (preferably hosted on NeonDB).
- **Environment Variables**: Configure a `.env` file with your database connection details, JWT secrets, and other configurations.

### Installation

1. **Clone the repository:**
   ```bash
    git clone https://github.com/AnchalDevBytes/roc8-analytics.git
   cd roc8-analytics
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
    ```bash
   npm run dev
   ```
