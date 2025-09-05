import endpoints from "@/api/endpoints";
import api from "@/axios";
import { StatusOverView, StatusOverViewResponse } from "@/types/type";



const statusGet = async ({
  workspaceId,
}: {
  workspaceId: string;
}): Promise<StatusOverViewResponse> => {
  const response = (await api.get(endpoints.status + workspaceId))
    .data as StatusOverView;


  return {
    general: response.general,
    mentioned: response.mentioned,
    openChats: response["open-chats"],
    unassigned: response.unassigned,
  };
};

export default statusGet;
