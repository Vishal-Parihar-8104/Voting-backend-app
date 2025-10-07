# Digital Voting System

A secure, modern voting application built with React and Node.js.

## Project Structure

```
VotingApp/
├── backend/           # Backend API (Node.js/Express)
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── server.js    # Main server file
│   └── package.json
├── frontend/        # Frontend (React/Vite)
│   ├── src/         # Source code
│   ├── public/      # Static files
│   └── package.json
└── netlify.toml     # Netlify deployment config
```

## Features

- 🔐 **Secure Authentication** - JWT-based login system
- 👤 **User Management** - Profile management and password updates
- 🗳️ **Voting System** - Secure voting with one-time vote restriction
- 👨‍💼 **Admin Panel** - Complete candidate and results management
- 📊 **Live Results** - Real-time voting results (admin controlled)
- 📱 **Responsive Design** - Mobile-first with Tailwind CSS
- 🎨 **Modern UI** - Beautiful, intuitive interface

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Axios for API calls
- React Hot Toast

## Quick Start

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```
MONGODB_URL=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1h
CORS_ORIGIN=http://localhost:3001
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:3000
```

## Deployment

See `deploy-guide.md` for detailed deployment instructions.

## Developer

Developed by [Vishal Parihar](https://www.linkedin.com/in/vishal-kumar-b55266309/)

- GitHub: [@Vishal-Parihar-8104](https://github.com/Vishal-Parihar-8104)
- Instagram: [@vishu_8104](https://www.instagram.com/vishu_8104/)
- LinkedIn: [Vishal Kumar](https://www.linkedin.com/in/vishal-kumar-b55266309/)
