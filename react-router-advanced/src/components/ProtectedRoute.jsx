import { Navigate } from "react-router-dom";



export default function ProtectedRoute({ children }) {
  const isAuthenticated = false; // simulate auth

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
