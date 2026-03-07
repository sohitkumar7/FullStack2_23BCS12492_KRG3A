import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar/>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 ">
        <Card className="p-8 text-center space-y-4 w=1/2 h=1/2">
          <Droplets className="h-12 w-12 text-blue-500 mx-auto" />
          <h2 className="text-2xl font-bold">
            Welcome to your Dashboard
          </h2>
          <p className="text-gray-500">
            Track your daily water intake and stay healthy.
          </p>

          <Link to="/dashboard/water">
            <Button>Go to Water Tracker</Button>
          </Link>
        </Card>
      </div>
    </>
  );
}