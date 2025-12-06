import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaClock, FaUser } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";

const upcomingEvents = [
  {
    id: 1,
    title: "Music Festival 2024",
    theme: "Event themes",
    attendees: 32,
    date: "2024-12-15",
    time: "6:00 PM",
    location: "Central Park",
  },
  {
    id: 2,
    title: "Business Workshop",
    theme: "Event feature",
    attendees: 30,
    date: "2024-12-18",
    time: "10:00 AM",
    location: "Conference Hall A",
  },
];

const UpcomingEvents: React.FC = () => {
  return (
    <div className="space-y-3">
      {upcomingEvents.map((ev) => (
        <Card key={ev.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{ev.title}</CardTitle>
            <CardDescription className="text-sm">{ev.theme}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FaUser />
              <span>{ev.attendees}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock />
              <span>{ev.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapLocation />
              <span>{ev.location}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UpcomingEvents;
