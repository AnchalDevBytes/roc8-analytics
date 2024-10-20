import { chartDataResponseInterface } from "@/interfaces/chartDataResponseInterface";
import axiosClient from "@/lib/axiosClient";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const fetchFilteredData = async (filters : { 
    startDate: string;
    endDate: string; 
    ageGroup: string; 
    gender: string 
}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const { data } : AxiosResponse<chartDataResponseInterface> = await axiosClient.get(`/api/chartdata?${queryParams}`);

      if(data.success !== true) {
        toast.error(data.message);
      }
      return data.data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
          toast.error("Unknow error while filtering data...");
      }
    }
  }
