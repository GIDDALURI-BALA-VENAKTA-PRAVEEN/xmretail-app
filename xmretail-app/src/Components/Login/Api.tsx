import axios, { AxiosResponse } from 'axios';

const API_URL = "http://localhost:5000/api/auth";

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
