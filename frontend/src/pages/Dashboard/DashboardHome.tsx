import { ThemeProvider } from "@/context/ThemeContext";

import React from "react";
import Stats from "@/components/StatsCard/Stats";
import Tools from "@/components/Tools/Tools";
import UpcomingEvents from "@/components/Tools/Notifcations/UpcomingEvents";
import RecentBookings from "@/components/Tools/Notifcations/Bookings";
import Reminders from "@/components/Tools/Notifcations/Reminders";
import Payouts from "@/components/Tools/Notifcations/Payouts";
import SignUp from "@/components/SignUp/SignUp";

const DashboardHome: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="">
        <h1 className="text-2xl">Dashboard Overview</h1>
        <p>Welcome to your EventZ command center.</p>
      </div>

      <Stats />
      <SignUp />

      <Tools />

      <UpcomingEvents />
      <RecentBookings />
      <Reminders />
      <Payouts />
    </ThemeProvider>
  );
};

export default DashboardHome;
