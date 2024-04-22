import { UserAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/product" />;
  } else {
    return children;
  }
};

export default ProtectedRouter;
