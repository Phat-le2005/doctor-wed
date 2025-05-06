import { Navigate, Outlet } from "react-router-dom";
import  {getCurrent} from "./getCurrent"

const ProtectedRoute = ({ allowedRoles }) => {
  const currentUser = getCurrent();

  if (!currentUser) {
    return <Navigate to="/register" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return (
      <div className="container mt-4 alert alert-danger">
        Bạn không có quyền truy cập vào trang này.
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;