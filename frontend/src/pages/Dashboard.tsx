import { useQuery } from '@tanstack/react-query';
import {
  User, Mail, Phone, MapPin, Calendar,
  Shield, Film, Settings, LogOut, Star
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/authSlice';
import { getUserById } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => getUserById(user!.id),
    enabled: !!user?.id && !!token,
    staleTime: 1000 * 60 * 5,
  });

  const handleLogout = () => {
    dispatch(logout());
    toast.success('See you next time! 👋');
    navigate('/login');
  };

  const displayUser = profile || user;

  const stats = [
    { label: 'Movies Watched', value: '24', icon: <Film size={20} /> },
    { label: 'Reviews Written', value: '12', icon: <Star size={20} /> },
    { label: 'Bookings Made', value: '8', icon: <Calendar size={20} /> },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              {displayUser?.firstName?.[0]}{displayUser?.lastName?.[0]}
            </div>
            <h2 className="profile-name">
              {displayUser?.firstName} {displayUser?.lastName}
            </h2>
            <span className={`role-badge ${displayUser?.role === 'ADMIN' ? 'role-admin' : 'role-user'}`}>
              <Shield size={12} /> {displayUser?.role}
            </span>
          </div>

          <nav className="sidebar-nav">
            <button className="sidebar-link active">
              <User size={18} /> Profile
            </button>
            <button className="sidebar-link">
              <Film size={18} /> My Movies
            </button>
            <button className="sidebar-link">
              <Settings size={18} /> Settings
            </button>
            <button className="sidebar-link sidebar-logout" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Stats Row */}
          <div className="stats-row">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Profile Info */}
          <div className="info-card">
            <div className="info-card-header">
              <h3>Profile Information</h3>
            </div>

            {isLoading ? (
              <div className="loading-state">
                <span className="spinner spinner-lg" />
                <p>Loading profile...</p>
              </div>
            ) : (
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <User size={15} /> Full Name
                  </div>
                  <div className="info-value">
                    {displayUser?.firstName} {displayUser?.lastName}
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <Mail size={15} /> Email
                  </div>
                  <div className="info-value">{displayUser?.email}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <Phone size={15} /> Phone
                  </div>
                  <div className="info-value">
                    {displayUser?.phoneNumber || '—'}
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <User size={15} /> Gender
                  </div>
                  <div className="info-value">
                    {displayUser?.gender || '—'}
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <MapPin size={15} /> City
                  </div>
                  <div className="info-value">
                    {displayUser?.city || '—'}
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <MapPin size={15} /> State
                  </div>
                  <div className="info-value">
                    {displayUser?.state || '—'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
