import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/auth";
import { Button } from "@/components/ui/button";
import { Droplets } from "lucide-react";
export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b bg-card px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-primary font-bold text-blue-600 text-lg">
          <Droplets className="h-5 w-5 text-blue-600" />
          EcoTrack
        </div>
        <div className="flex gap-1">
          <Link to="/dashboard">
            <Button variant={isActive("/dashboard") ? "secondary" : "ghost"} size="sm">
              Dashboard
            </Button>
          </Link>
          <Link to="/dashboard/water">
            <Button variant={isActive("/dashboard/water") ? "secondary" : "ghost"} size="sm">
              Water Tracker
            </Button>
          </Link>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onLogout}>
        Logout
      </Button>
    </nav>
  );
}