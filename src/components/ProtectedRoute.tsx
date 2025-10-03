import { Navigate, Outlet } from "react-router-dom";
import { useLogs } from "../context/LogContext";

type ProtectedRouteProps = {
  redirectPath?: string;
  children?: React.ReactNode;
};

const ProtectedRoute = ({
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
  const { log } = useLogs();

  if (!log) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
