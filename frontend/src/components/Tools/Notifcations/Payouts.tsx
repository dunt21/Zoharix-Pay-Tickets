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
    <Card style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Payouts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {payouts.map((p) => (
          <div key={p.id} className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2 items-center">
                <FaWallet size={14} className="text-green-500" />
                <p className="font-bold text-base">${p.amount}</p>
              </div>
              <Badge
                variant="outline"
                className="bg-purple-500 text-white border-purple-500 text-xs"
              >
                {p.status}
              </Badge>
            </div>
            <CardDescription className="text-sm mb-2">{p.source}</CardDescription>
            <div className="flex gap-3 text-xs text-muted-foreground pt-2 border-t border-white/5">
              <div className="flex items-center gap-1">
                <FaCheck />
                <span>{p.transactionId}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendar />
                <span>{p.date}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Payouts;
