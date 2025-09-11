import endpoints from "@/api/endpoints";
import api from "@/axios";
import { TagPayload } from "@/types/type";

export const PutTag = async ({ ...props }: TagPayload) => {
  try {
    return await api.put(endpoints.addTag, {
      ...props,
    });
  } catch (error) {
    throw error;
  }
};
