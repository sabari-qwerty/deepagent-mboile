import endpoints from "@/api/endpoints";
import api from "@/axios";
import { StatusUpdatePayload } from "@/types/type";

export const updateStatus = async ({ ...props }: StatusUpdatePayload) => {
  try {
    const resposne = await api.put(endpoints.updateStatus, {
      ...props,
    });

    return resposne.data;
  } catch (error) {
    throw error;
  }
};
