import React from "react";
import StatsCard from "./StatsCard";
import { Calendar, Layers, Ticket, Users, Wallet } from "lucide-react";

const stats = [
  {
    id: 1,
    label: "Events Created",
    value: 12,
    icon: Calendar,
    change: "+12%",
  },
  {
    id: 2,
    label: "Services Created",
    value: 8,
    icon: Layers,
    change: "+5%",
  },
  {
    id: 3,
    label: "Tickets Sold",
    value: 245,
    icon: Ticket,
    change: "+24%",
  },
  {
    id: 4,
    label: "Bookings Received",
    value: 67,
    icon: Users,
    change: "+18%",
  },
  {
    id: 5,
    label: "Wallet Balance",
    value: 1250.0,
    icon: Wallet,
    change: "+8%",
  },
];

const Stats: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-5 lg:grid-rows-1 md:grid-cols-3 md:grid-rows-2 grid-cols-2 grid-rows-3 gap-5 mt-10!">
      {stats.map((obj) => (
        <StatsCard {...obj} />
      ))}
    </div>
  );
};

export default Stats;
