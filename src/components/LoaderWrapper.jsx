import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CardLoader, TableLoader } from "./ui/loader";

function DashboardSection() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // 1. Define loaders and endpoints per route
  const routeConfig = {
    "/overview": {
      endpoint: "/api/overview",
      showCard: true,
      showTable: false,
    },
    "/users": {
      endpoint: import.meta.env.VITE_GET_ALL_USERS,
      showCard: false,
      showTable: true,
    },
    "/admins": {
      endpoint: "/api/admins",
      showCard: false,
      showTable: true,
    },
    "/transactions": {
      endpoint: "/api/transactions",
      showCard: true,
      showTable: true,
    },
    "/payment-history": {
      endpoint: "/api/payment-history",
      showCard: true,
      showTable: true,
    },
    "/login-logs": {
      endpoint: "/api/logs/login",
      showCard: false,
      showTable: true,
    },
  };

  // 2. Get the current config, or default to overview
  const currentConfig = routeConfig[location.pathname] || routeConfig["/overview"];

  useEffect(() => {
    setLoading(true);

    fetch(currentConfig.endpoint)
      .then((res) => res.json())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

  }, [currentConfig.endpoint, location.pathname]);

  // 3. Conditionally render loaders
  return loading ? (
    <>
      {currentConfig.showCard && <CardLoader />}
      {currentConfig.showTable && <TableLoader />}
    </>
  ) : null;
}

export default DashboardSection;
