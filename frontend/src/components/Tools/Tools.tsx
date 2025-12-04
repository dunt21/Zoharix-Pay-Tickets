import React from "react";
import { Button } from "@/components/ui/button";

const Tools: React.FC = () => {
  return (
    <div className="mt-10! flex justify-center gap-5 *:cursor-pointer">
      <Button className=" px-3! bg-purple-500 text-white">Create Event</Button>
      <Button className=" px-3! bg-purple-500 text-white">
        Create Service
      </Button>
      <Button className=" px-3! bg-purple-500 text-white">
        View Analytics
      </Button>
    </div>
  );
};

export default Tools;
