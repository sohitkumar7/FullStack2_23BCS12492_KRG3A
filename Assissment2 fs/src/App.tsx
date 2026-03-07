import { Routes, Route } from "react-router-dom";
import { Initial } from "./Pages/login";
import Dashboard from "./Pages/Dashboard";
import WaterTracker from "./Pages/Wateracker";
import ProtectedRoute from "/Users/devendra/Desktop/Hydration/hydration/src/Hooks/ProtectedEoute.tsx";
import { useAuth } from "./Hooks/auth";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Initial />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/water"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <WaterTracker />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}