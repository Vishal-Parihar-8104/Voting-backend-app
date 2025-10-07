# Troubleshooting Guide

## "Failed to Load" Error During Registration

### Step 1: Check Backend Server
1. Make sure your backend server is running:
   ```bash
   cd D:\VotingApp
   npm start
   ```
2. You should see: `listening on port 3000`
3. Test the API directly: http://localhost:3000

### Step 2: Check Frontend Server
1. Make sure your frontend server is running:
   ```bash
   cd D:\VotingApp\frontend
   npm run dev
   ```
2. You should see: `Local: http://localhost:3001`

### Step 3: Check Connection
1. Open the frontend: http://localhost:3001
2. Look for the connection status indicator at the top
3. It should show "Backend connected successfully!"

### Step 4: Common Issues & Solutions

#### Issue 1: CORS Error
**Error**: `Access to fetch at 'http://localhost:3000' from origin 'http://localhost:3001' has been blocked by CORS policy`

**Solution**: The backend now has CORS enabled. Restart your backend server.

#### Issue 2: Network Error
**Error**: `Network error. Please check if the backend server is running.`

**Solution**: 
1. Make sure backend is running on port 3000
2. Check if port 3000 is not being used by another application
3. Try restarting both servers

#### Issue 3: MongoDB Connection Error
**Error**: `MongoDB connection error`

**Solution**:
1. Set your MongoDB connection string in `.env` file as `MONGODB_URL`
2. Make sure MongoDB is running
3. Check internet connection if using MongoDB Atlas

#### Issue 4: JWT Secret Error
**Error**: `JWT_SECRET is not defined`

**Solution**:
1. Create a `.env` file in the root directory
2. Add: `JWT_SECRET=your-secret-key-here`
3. Restart the backend server

### Step 5: Test Registration

1. Go to http://localhost:3001
2. Click "Sign Up" tab
3. Fill in the form:
   - Name: Test User
   - Age: 25
   - Email: test@example.com
   - Mobile: 9876543210
   - Address: Test Address
   - Aadhar Card Number: 123456789012
   - Password: password123
   - Role: voter
4. Click "Create Account"

### Step 6: Check Browser Console

1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for any error messages
4. Check Network tab for failed requests

### Step 7: Verify Backend Logs

Check your backend terminal for any error messages when you try to register.

## Quick Fix Commands

```bash
# Stop all servers (Ctrl+C in each terminal)

# Start backend
cd D:\VotingApp
npm start

# Start frontend (in new terminal)
cd D:\VotingApp\frontend
npm run dev
```

## Still Having Issues?

1. Check if both servers are running
2. Verify the connection status indicator
3. Check browser console for errors
4. Check backend terminal for errors
5. Make sure all dependencies are installed

## Contact

If you're still having issues, please share:
1. The exact error message
2. Browser console errors
3. Backend terminal output
4. Steps you've tried




