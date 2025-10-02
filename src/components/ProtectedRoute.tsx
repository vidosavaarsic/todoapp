import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  user: Boolean | null;
  redirectPath?: string;
  children?: React.ReactNode;
};

const ProtectedRoute = ({
  user,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
