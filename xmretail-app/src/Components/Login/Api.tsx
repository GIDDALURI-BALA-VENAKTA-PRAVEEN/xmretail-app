import axios, { AxiosResponse } from 'axios';

const SERVER_URL = import.meta.env.VITE_API_URL;

const API_URL = `${SERVER_URL}/api/auth`;

interface OtpResponse {
  success: boolean;
  message: string;
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  updatedUser?: {
    email: string;
    name: string;
  };
}

export const sendOtp = (email: string): Promise<AxiosResponse<OtpResponse>> => 
  axios.post<OtpResponse>(`${API_URL}/send-otp`, { email });

export const verifyOtp = (email: string, otp: string, name: string): Promise<AxiosResponse<OtpResponse>> => 
  axios.post<OtpResponse>(`${API_URL}/verify-otp`, { email, otp, name });

export const updateProfile = (email: string, name: string): Promise<AxiosResponse<UpdateProfileResponse>> => 
  axios.put<UpdateProfileResponse>(`${API_URL}/update-profile`, { email, name });
