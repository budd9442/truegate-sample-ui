# TrueGate Smart Home Security System

A modern React-based smart home security dashboard with authentication and device management.

## Features

- 🔐 Secure authentication with JWT tokens
- 🏠 Smart home device management
- 📊 Real-time dashboard with statistics
- 👥 User and admin role management
- 🎨 Modern, responsive UI with dark theme
- 📱 Mobile-friendly design

## Development Mode

This application is configured to work in development mode without requiring a backend server. When the backend is not available, the app will:

- Generate mock CSRF tokens for development
- Provide mock login functionality
- Use mock data for devices and statistics
- Show appropriate success messages

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Login

You can use any email and password combination to log in during development. The app will create a mock user session.

## CSRF Token Fix

The application now handles CSRF token errors gracefully by:
- Attempting to fetch CSRF tokens from the backend
- Falling back to mock tokens when the backend is unavailable
- Providing mock authentication for development purposes

## Production Deployment

For production use, update the `API_BASE_URL` in `src/utils/constants.ts` to point to your actual backend server.

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form for form handling
- React Router for navigation
- Axios for API calls 