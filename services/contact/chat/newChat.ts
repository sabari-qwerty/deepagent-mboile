// import { config } from "@/config";

// interface SendMessagePayload {
//   sessionId: string;
//   message?: string;
//   file?: any;
//   accessToken: string;
//   knowledgeBaseId: string;
//   id: string;
// }

// export const NewChat = async ({
//   sessionId,
//   message,
//   file,
//   id,
//   accessToken,
//   knowledgeBaseId,
// }: SendMessagePayload) => {
//   try {
//     if (!accessToken && !knowledgeBaseId) throw "Erorr happend";



//     const fromData = new FormData();

//     if (message && message !== "") fromData.append("message", message);
//     if (file) {
//       fromData.append("attachments", file as any);
//     }
//     if (id) fromData.append("messageId", id);

//     const response = await fetch(
//       `${config.BackendUrl}/live/agent/${sessionId}/message`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken || ""}`,
//           "x-knowledgeBaseId": knowledgeBaseId || "",
//         },
//         body: fromData,
//       }
//     );

//     return response;
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Upload failed" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// };
