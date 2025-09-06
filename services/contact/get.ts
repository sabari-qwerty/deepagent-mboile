import endpoints from "@/api/endpoints";
import api from "@/axios";
import { ContactPayload } from "@/types/type";

const contactGet = async ({ ...props }: ContactPayload) => {
  const response = (
    await api.post(endpoints.getContact, {
      ...props,
    })
  ).data;

  return response;
};

export default contactGet;
