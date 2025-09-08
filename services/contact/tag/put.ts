import endpoints from "@/api/endpoints";
import api from "@/axios";
import { TagPayload } from "@/types/type";

export const PutTag = async ({ ...props }: TagPayload) => {
  console.log("\n");
  console.log("\n");
  console.log("\n");

  console.log(props);

  console.log("\n");
  console.log("\n");
  console.log("\n");

  return await api.put(endpoints.addTag, {
    ...props,
  });
};
