import { Navigate, useLocation } from "react-router-dom";
import InactivityInterceptor from "./InterceptInactivity";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authToken = localStorage.getItem("token");

  if (!authToken) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return (
    <>
      <InactivityInterceptor />
      {children}
    </>
  );
};

export default ProtectedRoute;
