import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaCalendar, FaCheck, FaWallet } from "react-icons/fa";

const payouts = [
  {
    id: 1,
    amount: 450.0,
    source: "Music Festival 2024",
    date: "2024-12-10",
    status: "completed",
    transactionId: "TXN001234",
  },
  {
    id: 2,
    amount: 120.0,
    source: "Photography Session",
    date: "2024-12-11",
    status: "pending",
    transactionId: "TXN001235",
  },
  {
    id: 3,
    amount: 800.0,
    source: "Business Workshop",
    date: "2024-12-09",
    status: "processing",
    transactionId: "TXN001236",
  },
];

const Payouts: React.FC = () => {
  return (
    <>
      <p className="mt-8! mb-6! text-lg font-semibold">Payouts</p>

      <ul className="space-y-4!">
        {payouts.map((p) => (
          <li className="p-5! lg:px-24!" key={p.id}>
            <Card className="px-4! py-5! ">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <FaWallet size={14} />
                    <CardTitle>${p.amount}</CardTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className="px-1! py-0.5!  bg-purple-500 text-white"
                  >
                    {p.status}
                  </Badge>
                </div>

                <CardDescription>{p.source} </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="w-full border-t-2"></div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCheck />
                    <span>{p.transactionId}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendar />
                    <span>{p.date}</span>
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

export default Payouts;
