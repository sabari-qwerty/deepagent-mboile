import api from "@/axios";
import { ViewedPage } from "@/types/type";

interface prop {
  sessionId: string;
}
export const getRecentPage = async ({
  sessionId,
}: prop): Promise<ViewedPage["pages"]> => {
  try {
    const response = await api.get(
      "/chatbot/recentpage/68b3de319b6a10e30a17e378"
    );

    return (response.data as ViewedPage).pages;
  } catch (error) {
    throw error;
  }
};
