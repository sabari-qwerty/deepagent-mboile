import { config } from "@/config";
import { TempChat } from "@/lib/utils/tempChat";
import { SendMessagePayload } from "@/types/type";

import { ObjectId } from "bson";
export const sendMessage = async ({
  file,
  message,
  setMessage,
  sessionId,
  accessToken,
  knowledgeBaseId,
}: SendMessagePayload) => {
  try {
    const initId = new ObjectId();
    const objectId = initId.toHexString();

    if (!accessToken && !knowledgeBaseId) throw "Erorr happend";

    TempChat({
      message,
      sessionId,
      file,
      id: objectId,
    });

    const fromData = new FormData();

    if (message && message !== "") fromData.append("message", message);
    if (file) fromData.append("attachments", file as any);
    fromData.append("messageId", objectId);

    const response = await fetch(
      `${config.BackendUrl}/live/agent/${sessionId}/message`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken || ""}`,
          "x-knowledgeBaseId": knowledgeBaseId || "",
        },
        body: fromData,
      }
    );

    if (message !== "" && message !== null) setMessage("");

    return response;
  } catch (error) {
    console.log("\n");
    console.log("\n");
    console.log("\n");

    console.log(error);

    console.log("\n");
    console.log("\n");
    console.log("\n");
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
