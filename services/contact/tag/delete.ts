import endpoints from "@/api/endpoints";
import api from "@/axios";
import { TagPayload } from "@/types/type";

export const DeleteTag = async ({ ...props }: TagPayload) => {


  const reposen = await api.put(endpoints.removeTag, {
    ...props,
  });

  console.log(reposen);

  return reposen;
};
