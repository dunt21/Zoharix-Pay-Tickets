// import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";

const SignUp: React.FC = () => {
  //   const [isNewUser, setIsNewUser] = useState(true);

  return (
    <div className="flex justify-center">
      <Card className="mt-10! p-5! w-full  lg:w-[50%]! bg-purple-500/80 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Get Started with ZOHARIX</CardTitle>
          <CardDescription className="text-white">
            Start your journey by creating your first event or adding a service!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="px-2!">
            <FaPlus size={5} />
            Create your first Event
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
