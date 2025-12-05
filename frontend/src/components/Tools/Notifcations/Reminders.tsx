import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";

const reminders = [
  {
    id: 1,
    title: "Music Festival starts tomorrow",
    type: "event",
    date: "2024-12-14",
    time: "6:00 PM",
    priority: "high",
    isRead: false,
  },
  {
    id: 2,
    title: "Photography Session scheduled",
    type: "booking",
    date: "2024-12-16",
    time: "4:00 PM",
    priority: "medium",
    isRead: false,
  },
  {
    id: 3,
    title: "Update event details",
    type: "task",
    date: "2024-12-13",
    time: "12:00 PM",
    priority: "low",
    isRead: true,
  },
];

const Reminders: React.FC = () => {
  return (
    <>
      <p className="mt-8! mb-6! text-lg font-semibold">Reminders</p>

      <ul className="space-y-4!">
        {reminders.map((r) => (
          <li className="p-5! lg:px-24!" key={r.id}>
            <Card className="px-4! py-5! border-l-4 border-l-purple-500 ">
              <CardHeader className="">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                  <div>
                    <CardTitle>{r.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaNoteSticky />
                  <span>{r.type}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendar />
                  <span>{r.date}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaClock />
                  <span>{r.time}</span>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Reminders;
