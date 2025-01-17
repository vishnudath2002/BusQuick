import { apiClient } from "./apiClient";


export const userLists = async () => {
    const response = await apiClient.get('/admin/userlist');
    return response.data;
  }
  
  
  export const ownerLists = async () => {
    const response = await apiClient.get('/admin/ownerlist');
    return response.data;
  }
  
  
  export const adminLogin = async (email: string, password: string) => {
    const response = await apiClient.post('/admin/adminlogin', { email, password });
    return response.data;
  };
  
  
  export const userBlockToggle = async (userId: string) => {
     const response = await apiClient.post(`/admin/toggle-block/${userId}`);
     return response.data;
  }