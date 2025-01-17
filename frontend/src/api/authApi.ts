import { apiClient } from "./apiClient"

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};


export const register = async (name: string, email: string, password: string,phone: string,role: string) => {
  const response = await apiClient.post('/register', { name, email , password , phone , role });
  return response.data;
};


export const otpVerify = async (email: string, otp: string) => {
  const response = await apiClient.post('/verify-otp', { email, otp });
  return response.data;
};


export const otpResend = async (email: string) => { 
  const response = await apiClient.post('/resend-otp',{ email });
  return response.data;
}

export const forgotPassword = async (email: string) => {
  const response = await apiClient.post('/forgot-password',{ email });
  return response.data;
}


export const resetPassword = async (email: string , newPassword: string) => {
  const response = await apiClient.post('/reset-password',{ email , newPassword });
  return response.data;
}









export const userDetails = async (userId: string | null) => {
  const response = await apiClient.post('/user/checkstatus',{ userId });
   return response.data;
}