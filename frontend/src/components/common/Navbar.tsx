import { Link, useNavigate } from 'react-router-dom';
import { Film, LogOut, LayoutDashboard, Home } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Film size={26} className="navbar-icon" />
        <Link to="/" className="navbar-logo">CineBook</Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          <Home size={16} />
          Home
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link">
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <div className="navbar-user">
              <div className="user-avatar">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <span className="user-name">{user?.firstName} {user?.lastName}</span>
            </div>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>
              <LogOut size={15} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
