import React from "react";
import { FaClock, FaUser } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const recentBookings = [
  {
    id: 1,
    title: "Photography Session",
    service: "Photography",
    datetime: "4:00pm",
    customer: "John Doe",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Consulting Service",
    service: "Business Consulting",
    datetime: "4:00pm",
    customer: "Jane Smith",
    status: "pending",
  },
];

const RecentBookings: React.FC = () => {
  return (
    <div className="space-y-3">
      {recentBookings.map((booking) => (
        <Card key={booking.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{booking.title}</CardTitle>
                <CardDescription className="text-sm">{booking.service}</CardDescription>
              </div>
              <Badge
                variant="outline"
                className="bg-purple-500 text-white border-purple-500"
              >
                {booking.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-3 border-t border-white/5">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{booking.customer}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{booking.datetime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecentBookings;
