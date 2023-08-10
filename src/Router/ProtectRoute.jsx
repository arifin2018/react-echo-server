import { Navigate } from "react-router-dom";
import { useAuth } from "../State/AuthProvider";

export function ProtectRoute({ children }) {
    const { user } = useAuth();
    console.log(children);
    if (!user) {
      // user is not authenticated
      return <Navigate to="/" />;
    }
    return children;
}