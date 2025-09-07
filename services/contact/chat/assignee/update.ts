import endpoints from "@/api/endpoints";
import api from "@/axios";
import { ChangeAssigneePayload } from "@/types/type";

export const updateAssignee = async ({ ...props }: ChangeAssigneePayload) => {
  const response = await api.put(endpoints.updateAssignee, {
    ...props,
  });

  return response.data;
};
