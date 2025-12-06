import React from "react";
import { Card } from "@/components/ui/card";
import { CalendarPlus, Briefcase, BarChart3 } from "lucide-react";

const Tools: React.FC = () => {
  const actions = [
    { label: "Create Event", icon: CalendarPlus, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Create Service", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "View Analytics", icon: BarChart3, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <Card
          key={index}
          className="p-4 cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 group"
          style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${action.bg} ${action.color} group-hover:bg-opacity-80 transition-all`}>
              <action.icon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
              {action.label}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Tools;
