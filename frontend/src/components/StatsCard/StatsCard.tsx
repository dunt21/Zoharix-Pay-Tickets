import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  id: number;
  value: number;
  label: string;
  icon: React.ElementType;
  change?: string;
  className?: string;
}

const StatsCard: React.FC<StatsProps> = ({ id, value, label, icon: Icon, change }) => {
  return (
    <Card key={id} className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-16 h-16 transform rotate-12" />
      </div>
      <CardContent className="p-6 flex flex-col gap-2">
        <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight">
              {id === 5 ? `$${value.toFixed(2)}` : value}
            </h3>
            {change && (
              <span className="text-xs font-medium text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full">
                {change}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
