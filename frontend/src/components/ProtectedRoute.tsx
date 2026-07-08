import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

// Only accessible when logged in — redirects to /login otherwise
const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
