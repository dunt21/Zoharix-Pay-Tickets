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
    <>
      <p className="mt-8! mb-6! text-lg font-semibold">Recent Bookings</p>

      <ul className="space-y-4!">
        {upcomingEvents.map((ev) => (
          <li className="p-5! lg:px-24!" key={ev.id}>
            <Card className="px-4! py-5! ">
              <CardHeader>
                <CardTitle>{ev.title}</CardTitle>
                <CardDescription>{ev.theme} </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaUser />
                  <span>{ev.attendees}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaClock />
                  <span>{ev.time}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapLocation />
                  <span>{ev.location}</span>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UpcomingEvents;
