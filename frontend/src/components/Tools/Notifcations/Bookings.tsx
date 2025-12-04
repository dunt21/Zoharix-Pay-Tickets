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
    datetime: " 4:00pm ",
    customer: "John Doe",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Consulting Service",
    service: "Business Consulting",
    datetime: " 4:00pm ",
    customer: "Jane Smith",
    status: "pending",
  },
];

const RecentBookings: React.FC = () => {
  return (
    <>
      <p className="mt-8! mb-6! text-lg font-semibold">Upcoming bookings</p>

      <ul className="space-y-4!">
        {recentBookings.map((booking) => (
          <li className="p-5! lg:px-24!" key={booking.id}>
            <Card className="px-4! py-5! ">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2!">
                    <CardTitle>{booking.title}</CardTitle>
                    <CardDescription>{booking.service} </CardDescription>
                  </div>

                  <Badge
                    variant="outline"
                    className="px-1! py-0.5! bg-purple-500 text-white"
                  >
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="border-t border-t-gray-400 ">
                <div className="mt-2! flex gap-4 ">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaUser />
                    <span>{booking.customer}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaClock />
                    <span>{booking.datetime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecentBookings;
