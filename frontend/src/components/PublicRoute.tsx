import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

// Only accessible when NOT logged in — redirects authenticated users to /dashboard
const PublicRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
