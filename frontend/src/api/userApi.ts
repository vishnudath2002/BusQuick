import { apiClient } from "./apiClient"

export const browseBusesByLocation = async (fromCity: string, toCity: string) => {
  const response = await apiClient.post('/user/buses/location',{ source:fromCity, destination:toCity });
   return response.data;
}