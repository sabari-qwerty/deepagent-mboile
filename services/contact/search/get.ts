// import api from "@/axios";
// import { CustomChatProfile, searchPayload } from "@/types/type";

// export const SearchContact = async ({ ...props }: searchPayload) => {
//   const { knowledgeBaseId, conversation, q, tag } = props;

//   const query = {
//     email: null as string | null,
//     name: null as string | null,
//     tag: [] as string[],
//     conversation: [] as string[],
//   };

//   query.email = q?.includes("@") ? q : null;
//   query.name = q?.includes("@") ? null : q || null;

//   query.tag = tag || [];
//   query.conversation = conversation || [];

//   const payload = {
//     knowledgeBaseId,
//     query,
//   };

//   const response = (await api.post(`/live/filter/getFilterData`, payload))
//     .data as {
//     results: CustomChatProfile[];
//   };

//   return response.results;
// };
