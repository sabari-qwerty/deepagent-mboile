import endpoints from "@/api/endpoints";
import api from "@/axios";
import { Workspace } from "@/types/type";

const workspaceGet = async (): Promise<Workspace[]> => {
  try {
    const response = await api.get(endpoints.workspace);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default workspaceGet;
