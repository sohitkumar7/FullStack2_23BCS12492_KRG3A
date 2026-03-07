import { Navigate } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export default function ProtectedRoute({ isLoggedIn, children }: Props) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}