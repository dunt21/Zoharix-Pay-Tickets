import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  id: number;
  value: number;
  label: string;
  className?: string;
}

const StatsCard: React.FC<StatsProps> = ({ id, value, label }) => {
  return (
    <Card key={id} className="text-center py-3!">
      <CardContent>
        <p className="font-bold text-xl"> {value}</p>
        <p> {label}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
