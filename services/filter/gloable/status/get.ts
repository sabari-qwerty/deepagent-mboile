import endpoints from "@/api/endpoints";
import api from "@/axios";
import { StatusOverViewResponse } from "@/types/type";

const statusGet = async ({
  workspaceId,
}: {
  workspaceId: string;
}): Promise<StatusOverViewResponse> => {
  try {
    const response = (await api.get(endpoints.status + workspaceId)).data as {
      general: number;
      mentioned: number;
      "open-chats": number;
      unassigned: number;
    };

    return {
      general: response.general,
      mentioned: response.mentioned,
      openChats: response["open-chats"],
      unassigned: response.unassigned,
    };
  } catch (error) {
    throw error;
  }
};

export default statusGet;
