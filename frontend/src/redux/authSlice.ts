import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'ADMIN';
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  phoneNumber?: string;
  dateOfBirth?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  pincode?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Retrieve cached auth state from localStorage
const storedToken = localStorage.getItem('cinebook_token');
const storedUser = localStorage.getItem('cinebook_user');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('cinebook_token', action.payload.token);
      localStorage.setItem('cinebook_user', JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('cinebook_token');
      localStorage.removeItem('cinebook_user');
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, setAuthLoading, setAuthError } =
  authSlice.actions;

export default authSlice.reducer;
