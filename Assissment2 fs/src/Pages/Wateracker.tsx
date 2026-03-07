import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, RefreshCw, Minus } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function WaterTracker() {
  const [glass, setGlass] = useState(0);
  const [limit, setLimit] = useState(8);

  const increment = () => {
    if (glass < limit) setGlass(glass + 1);
  };

  const decrement = () => {
    if (glass > 0) setGlass(glass - 1);
  };

  const reset = () => {
    setGlass(0);
  };

  const percentage = limit > 0 ? (glass / limit) * 100 : 0;

  return (
    <>
      <Navbar />

      <div className="grid place-items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Card className="w-full max-w-sm shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-blue-600 font-extrabold text-3xl text-center">
              💧 Hydration Tracker
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-blue-500 font-extrabold text-6xl text-center">
              {glass}
            </div>

            <div className="text-slate-500 text-center">
              {glass}/{limit} glasses completed
            </div>

            <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-3 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" onClick={decrement}>
                <Minus className="w-4 h-4" />
              </Button>

              <Button
                onClick={increment}
                className="flex items-center gap-2"
                disabled={glass >= limit}
              >
                <ArrowUpIcon className="w-4 h-4" /> Add Glass
              </Button>

              <Button variant="outline" size="icon" onClick={reset}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 text-slate-600 bg-white">
            <div className="text-sm font-medium">Daily Limit</div>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200"
                onClick={() => limit > 1 && setLimit(limit - 1)}
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-16 text-center outline-none"
                min={1}
              />

              <button
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200"
                onClick={() => setLimit(limit + 1)}
              >
                <ArrowUpIcon className="w-4 h-4" />
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}