import apiClient from './apiClient';
import type { User } from '../redux/authSlice';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phoneNumber?: string;
  role?: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await apiClient.post<AuthResponse>('/api/users/login', data);
  return res.data;
};

export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
  const res = await apiClient.post<AuthResponse>('/api/users/register', data);
  return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await apiClient.get<User>(`/api/users/${id}`);
  return res.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await apiClient.get<User[]>('/api/users');
  return res.data;
};
