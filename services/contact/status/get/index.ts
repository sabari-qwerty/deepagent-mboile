import endpoints from "@/api/endpoints";
import api from "@/axios";
import { GetStatusRequestResposne, GetStatusResponse } from "@/types/type";

const statusGet = async ({
  workspaceId,
}: {
  workspaceId: string;
}): Promise<GetStatusResponse> => {
  try {
    const response = (await api.get(endpoints.status + workspaceId))
      .data as GetStatusRequestResposne;

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
