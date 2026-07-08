import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Film, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginUser } from '../api/authApi';
import { setCredentials } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data.user, token: data.token }));
      toast.success(`Welcome back, ${data.user.firstName}! 🎬`);
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || 'Invalid email or password.';
      toast.error(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    login({ email, password });
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <Film size={32} className="auth-logo-icon" />
          <span>CineBook</span>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <div className="input-wrapper">
              <Mail size={17} className="input-icon" />
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={17} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-action"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            id="login-submit"
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isPending}
          >
            {isPending ? (
              <span className="spinner" />
            ) : (
              <>
                <LogIn size={17} /> Sign In
              </>
            )}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
