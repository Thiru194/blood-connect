import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import { useAuth } from "../context/AuthContext";

// Guards admin-only pages: requires a logged-in user whose role is "admin".
function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("token");

  // Wait until the auth state has finished loading before deciding.
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  // Not logged in -> go to login.
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not an admin -> send to their own area.
  if (user.role !== "admin") {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default AdminRoute;
