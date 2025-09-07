import endpoints from "@/api/endpoints";
import api from "@/axios";
import { ViewedPage } from "@/types/type";

interface prop {
  sessionId: string;
}
export const getRecentPage = async ({
  sessionId,
}: prop): Promise<ViewedPage["pages"]> => {
  console.log("\n");
  console.log("\n");
  console.log("\n");

  console.log(endpoints.viewPage + sessionId);
  console.log("/chatbot/recentpage/68b3de319b6a10e30a17e378");

  console.log("\n");
  console.log("\n");
  console.log("\n");
  console.log("\n");

  const response = await api.get(
    "/chatbot/recentpage/68b3de319b6a10e30a17e378"
  );

  console.log("\n");
  console.log("\n");
  console.log("\n");

  console.log(response);

  console.log("\n");
  console.log("\n");
  console.log("\n");

  return (response.data as ViewedPage).pages;
};
