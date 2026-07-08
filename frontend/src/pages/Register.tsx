import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Film, Mail, Lock, Eye, EyeOff, User, Phone, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerUser } from '../api/authApi';
import { setCredentials } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '' as 'MALE' | 'FEMALE' | 'OTHER' | '',
    phoneNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const { mutate: register, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data.user, token: data.token }));
      toast.success(`Account created! Welcome, ${data.user.firstName}! 🎉`);
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      gender: (form.gender || 'OTHER') as 'MALE' | 'FEMALE' | 'OTHER',
      phoneNumber: form.phoneNumber,
      role: 'USER',
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card auth-card-wide">
        {/* Logo */}
        <div className="auth-logo">
          <Film size={32} className="auth-logo-icon" />
          <span>CineBook</span>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Join the CineBook community today</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Name row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First name *</label>
              <div className="input-wrapper">
                <User size={17} className="input-icon" />
                <input
                  id="firstName"
                  type="text"
                  className="form-input"
                  placeholder="John"
                  value={form.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last name *</label>
              <div className="input-wrapper">
                <User size={17} className="input-icon" />
                <input
                  id="lastName"
                  type="text"
                  className="form-input"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={(e) => update('lastName', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email address *</label>
            <div className="input-wrapper">
              <Mail size={17} className="input-icon" />
              <input
                id="reg-email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />
            </div>
          </div>

          {/* Password row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password *</label>
              <div className="input-wrapper">
                <Lock size={17} className="input-icon" />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Min 6 chars"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                />
                <button
                  type="button"
                  className="input-action"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password *</label>
              <div className="input-wrapper">
                <Lock size={17} className="input-icon" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={(e) => update('confirmPassword', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Gender & Phone row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="form-input form-select"
                value={form.gender}
                onChange={(e) => update('gender', e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phoneNumber">Phone number</label>
              <div className="input-wrapper">
                <Phone size={17} className="input-icon" />
                <input
                  id="phoneNumber"
                  type="tel"
                  className="form-input"
                  placeholder="+91 9876543210"
                  value={form.phoneNumber}
                  onChange={(e) => update('phoneNumber', e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            id="register-submit"
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isPending}
          >
            {isPending ? (
              <span className="spinner" />
            ) : (
              <>
                <UserPlus size={17} /> Create Account
              </>
            )}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
