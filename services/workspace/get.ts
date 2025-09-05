import endpoints from "@/api/endpoints";
import api from "@/axios";
import { Workspace } from "@/types/type";

const workspaceGet = async (): Promise<Workspace[]> => {
  const response = await api.get(endpoints.workspace);
  return response.data;
};

export default workspaceGet;
