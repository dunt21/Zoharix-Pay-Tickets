# 🔔 Toast Notification Testing Guide

## ✅ Error Notifications Are Working!

Your app **already has** toast notifications for all errors. Here's how to test them:

---

## 🧪 Test Scenarios

### **1. Test Invalid Email (Login)**

**Steps:**
1. Go to: `http://localhost:5173/login`
2. Enter:
   - Email: `wrong@example.com` (non-existent email)
   - Password: `anything123`
3. Click "Sign In"

**Expected Result:**
```
🔴 Error Toast Appears:
"Invalid email or password. Please check your credentials."
```

---

### **2. Test Wrong Password (Login)**

**Steps:**
1. First, create an account with:
   - Email: `test@example.com`
   - Password: `password123`
2. Then try to login with:
   - Email: `test@example.com`
   - Password: `wrongpassword` ❌

**Expected Result:**
```
🔴 Error Toast Appears:
"Invalid email or password. Please check your credentials."
```

---

### **3. Test Duplicate Email (Signup)**

**Steps:**
1. Create an account with email: `test@example.com`
2. Try to create another account with the same email

**Expected Result:**
```
🔴 Error Toast Appears:
"User already exists or invalid data."
```

---

### **4. Test Server Connection Error**

**Steps:**
1. Stop the backend server (Ctrl+C in backend terminal)
2. Try to login or signup

**Expected Result:**
```
🔴 Error Toast Appears:
"Cannot connect to server. Please check your internet connection."
```

---

### **5. Test Successful Login**

**Steps:**
1. Login with valid credentials

**Expected Result:**
```
🟢 Success Toast Appears:
"Login successful! Redirecting..."
```

---

### **6. Test Successful Signup**

**Steps:**
1. Create a new account with valid data

**Expected Result:**
```
🟢 Success Toast Appears:
"Account created successfully! Redirecting to login..."
```

---

## 🎨 Toast Types & Colors

Your app has 4 toast types:

| Type | Color | Use Case | Example |
|------|-------|----------|---------|
| ✅ Success | Green | Successful actions | "Login successful!" |
| ❌ Error | Red | Failed actions | "Invalid credentials" |
| ⚠️ Warning | Yellow | Warnings | "Session expiring soon" |
| ℹ️ Info | Blue | Information | "Email sent" |

---

## 📊 Error Messages by Scenario

### **Login Errors:**

| Scenario | HTTP Status | Error Message |
|----------|-------------|---------------|
| Wrong email | 401 | "Invalid email or password. Please check your credentials." |
| Wrong password | 401 | "Invalid email or password. Please check your credentials." |
| Server down | No response | "Cannot connect to server. Please check your internet connection." |
| Server error | 500 | "Server error. Please try again later." |

### **Signup Errors:**

| Scenario | HTTP Status | Error Message |
|----------|-------------|---------------|
| Email exists | 400 | "User already exists or invalid data." |
| Invalid data | 400 | "User already exists or invalid data." |
| Server down | No response | "Cannot connect to server. Please check your internet connection." |
| Server error | 500 | "Server error. Please try again later." |

---

## 🔍 How It Works

### **Frontend (Login.tsx):**
```typescript
try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
        email: formData.email,
        password: formData.password
    });
    // Success!
    success('Login successful! Redirecting...');
} catch (err: any) {
    // Error handling
    if (err.response?.status === 401) {
        error('Invalid email or password. Please check your credentials.');
    }
}
```

### **Backend (authController.ts):**
```typescript
// Find user by email
const user = await User.findOne({ email });
if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
}

// Check password
const isValidPassword = await bcrypt.compare(password, user.password);
if (!isValidPassword) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
}
```

### **Toast Display (ToastContext.tsx):**
```typescript
const error = (message: string, duration = 3000) => {
    showToast(message, 'error', duration);
};

// Toast auto-dismisses after 3 seconds
setTimeout(() => {
    removeToast(id);
}, duration);
```

---

## ✨ Enhanced Features (Just Added)

### **Better Error Messages:**
- ✅ Specific message for 401 (invalid credentials)
- ✅ Specific message for 400 (user exists)
- ✅ Specific message for 500 (server error)
- ✅ Specific message for network errors
- ✅ Fallback for unknown errors

### **Security Note:**
For both wrong email and wrong password, we show the same message:
**"Invalid email or password"**

This prevents attackers from knowing if an email exists in the system! 🔒

---

## 🎯 Quick Test Checklist

- [ ] Test login with wrong email → See error toast ✅
- [ ] Test login with wrong password → See error toast ✅
- [ ] Test signup with existing email → See error toast ✅
- [ ] Test with backend stopped → See connection error ✅
- [ ] Test successful login → See success toast ✅
- [ ] Test successful signup → See success toast + redirect ✅

---

## 🚀 Ready to Test!

**Both servers are running:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

**Try entering a wrong email/password now and you'll see the error toast!** 🔔
