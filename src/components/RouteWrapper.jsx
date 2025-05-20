import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PageLoader } from "../components/ui/loader";
// import {TableLoader} from "../components/ui/loader";

const RouteWrapper = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Detect route changes

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate load delay
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [location.pathname]); // Re-run when URL changes

  return loading ? <PageLoader /> : <Outlet />;
};

export default RouteWrapper;
