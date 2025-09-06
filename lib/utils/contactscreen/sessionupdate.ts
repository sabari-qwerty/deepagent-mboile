import { queryClient } from "@/tanstack-query";
import { ContactData } from "@/types/type";

interface props {
  currentKesy: string[];
  payload: ContactData;
}

export const SessionUpdate = ({ currentKesy, payload }: props) => {
  const SessionData = queryClient.getQueryData(
    currentKesy as unknown as string[]
  ) as ContactData;

  if (!SessionData) return;

  // Find which page contains the updated chat

  const FilteredPage = SessionData.pages.flat().filter((page) => {
    return page._id !== payload._id;
  });
  const updatedData = [payload, ...FilteredPage];

  // Update the query data
  queryClient.setQueryData(currentKesy as unknown as string[], {
    ...SessionData,
    pages: updatedData,
  });
};
