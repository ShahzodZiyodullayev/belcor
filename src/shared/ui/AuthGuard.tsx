import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const authenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated);

  return <>{authenticated ? children : <Navigate to="/signin" />}</>;
};

export default AuthGuard;
