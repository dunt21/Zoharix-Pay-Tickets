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
    <Card style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Reminders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {reminders.map((r) => (
          <div key={r.id} className="p-3 rounded-lg border-l-4 border-l-purple-500" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderLeft: '4px solid #a855f7' }}>
            <div className="flex items-start gap-2 mb-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              <p className="font-medium text-sm">{r.title}</p>
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground ml-4">
              <div className="flex items-center gap-1">
                <FaNoteSticky />
                <span>{r.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendar />
                <span>{r.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{r.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Reminders;
