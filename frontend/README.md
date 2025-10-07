# Digital Voting System - Frontend

A modern, responsive React frontend for the Digital Voting System built with Vite, React, and Tailwind CSS.

## Features

- 🔐 **Authentication System**: Login and registration with JWT tokens
- 👤 **User Management**: Profile management and password updates
- 🗳️ **Voting Interface**: Secure voting system for registered users
- 👨‍💼 **Admin Dashboard**: Complete candidate management system
- 📊 **Real-time Results**: Live voting results and statistics
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🎨 **Modern UI**: Beautiful, intuitive user interface

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3001`
4. Ensure `VITE_API_BASE_URL` is set in `.env` or defaults to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AdminDashboard.jsx
│   ├── ChangePasswordModal.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   ├── UserProfile.jsx
│   ├── VoterDashboard.jsx
│   └── VoteResults.jsx
├── contexts/            # React contexts
│   └── AuthContext.jsx
├── pages/               # Page components
│   ├── Dashboard.jsx
│   └── Login.jsx
├── services/            # API services
│   └── api.js
├── utils/               # Utility functions
├── assets/              # Static assets
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## API Integration

The frontend communicates with the backend API through the following endpoints:

- **Authentication**: `/user/signup`, `/user/login`, `/user/profile`
- **Candidates**: `/candidate` (CRUD operations)
- **Voting**: `/candidate/vote/{id}`, `/candidate/vote/count`

## Features Overview

### For Voters
- Register and login with Aadhar card number
- View all available candidates
- Cast vote (one-time only)
- View voting results
- Update profile and password

### For Admins
- All voter features
- Add, edit, and delete candidates
- Monitor voting statistics
- View detailed results

## Security Features

- JWT token-based authentication
- Password hashing (handled by backend)
- One-time voting system
- Role-based access control
- Secure API communication

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
