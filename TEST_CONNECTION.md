# Test Backend-Frontend Connection

## Status: Backend NOT Running ❌

Your backend is not currently running. Follow these steps:

## Step 1: Start Backend
```bash
cd backend
npm run dev
```

You should see:
```
Server running on http://localhost:5000
Environment: development
API Version: v1
MongoDB connected successfully
```

## Step 2: Test Backend API
Open a new terminal and run:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "...",
  "environment": "development",
  "version": "v1"
}
```

## Step 3: Install Axios in Frontend
```bash
cd frontend
npm install axios
```

## Step 4: Start Frontend
```bash
cd frontend
npm run dev
```

Should open at: `http://localhost:5173`

## Step 5: Test Connection

### Test Signup:
1. Go to `http://localhost:5173/signup`
2. Fill the form with:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
   - Accept terms
3. Click "Create Account"
4. Check browser console (F12) for response
5. Check backend terminal for request logs

### Test Login:
1. Go to `http://localhost:5173/login`
2. Use the same credentials
3. Should redirect to dashboard

## Troubleshooting

### Backend won't start?
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process if needed
kill -9 <PID>

# Try starting again
npm run dev
```

### Frontend can't connect?
- Check backend is running on port 5000
- Check CORS is enabled in backend (already configured)
- Check browser console for errors
- Check `.env` file in frontend has: `VITE_API_URL=http://localhost:5000/api/v1`

### MongoDB connection error?
```bash
# Start MongoDB
sudo systemctl start mongod

# Check status
sudo systemctl status mongod
```

## Quick Test Commands

**Test backend health:**
```bash
curl http://localhost:5000/api/health
```

**Test signup endpoint:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Test login endpoint:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```
