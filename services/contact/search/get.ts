import api from "@/axios";
import { ContactData, SearchPayload } from "@/types/type";

export const SearchContact = async ({ ...props }: SearchPayload) => {
  const { knowledgeBaseId, conversation, q, tag } = props;

  const query = {
    email: null as string | null,
    name: null as string | null,
    tag: [] as string[],
    conversation: [] as string[],
  };

  query.email = q?.includes("@") ? q : null;
  query.name = q?.includes("@") ? null : q || null;

  query.conversation = conversation || [];

  const payload = {
    knowledgeBaseId,
    query,
  };

  const response = (await api.post(`/live/filter/getFilterData`, payload))
    .data as {
    results: ContactData[];
  };

  return response.results;
};
