import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path?: string;
}

export default function ProtectedRoute({ component: Component, ...rest }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem("moti_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setLocation("/login");
    }
  }, [setLocation]);

  if (isAuthenticated === null) {
    return null; // Loading state
  }

  return isAuthenticated ? <Component {...rest} /> : null;
}
