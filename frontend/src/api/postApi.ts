import { apiClient } from "./apiClient"

export const fetchAllPosts = async () => {
  const response = await apiClient.get('/media/posts',{});
   return response.data;
}