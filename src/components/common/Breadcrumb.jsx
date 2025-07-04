import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const breadcrumbLabels = {
  "dashboard": "Dashboard",
  "users": "User Management",
  "transactions": "Transactions",
  "settings": "Settings",
  "compliance": "Compliance",
  "notifications": "Notifications",
  "reports": "Reports",
};

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayName = breadcrumbLabels[name] || name;

          return (
            <li key={routeTo} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">{displayName}</span>
              ) : (
                <Link to={routeTo} className="text-muted-foreground hover:text-foreground transition-colors">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
