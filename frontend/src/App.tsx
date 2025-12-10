import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import AuthLayout from './components/AuthLayout/AuthLayout';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import DashboardHome from './pages/Dashboard/Home/DashboardHome';
import EventsServices from './pages/Dashboard/Services/EventsServices';
import TicketsBookings from './pages/Dashboard/Bookings/TicketsBookings';
import Wallet from './pages/Dashboard/Wallet/Wallet';
import Analytics from './pages/Dashboard/Analytics/Analytics';
import Settings from './pages/Dashboard/Settings/Settings';
import Verification from './pages/Auth/Verification';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verification />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="services" element={<EventsServices />} />
          <Route path="bookings" element={<TicketsBookings />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
