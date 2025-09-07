import { queryClient } from "@/tanstack-query";
import { ContactData, StatusUpdatePayload } from "@/types/type";

interface UpdateStatusProps {
  status: string;
  sessionId: string;
  keys: string[];
  ContactData: ContactData;
  setContactData: (data: unknown) => void;
  updateRequest: ({
    knowledgeBaseId,
    status,
    sessionId,
  }: StatusUpdatePayload) => void;
  knowledgeBaseId: string;
  close: () => void;
}

export const UpdateStatus = async ({
  status,
  sessionId,
  keys,
  setContactData,
  ContactData,
  updateRequest,
  knowledgeBaseId,
  close,
}: UpdateStatusProps) => {
  const currentContactData = queryClient.getQueryData<{
    pages: ContactData[][];
    pageParams: unknown[];
  }>(keys);

  if (!currentContactData) return;

  // Update the contact's status
  setContactData(
    JSON.stringify({
      ...ContactData,
      status,
    })
  );

  // Remove from current status list
  const updatedCurrentPages = currentContactData.pages.map((page) =>
    page.filter((contact) => contact._id !== sessionId)
  );

  queryClient.setQueryData<{
    pages: ContactData[][];
    pageParams: unknown[];
  }>(keys, {
    ...currentContactData,
    pages: updatedCurrentPages,
  });

  updateRequest({
    knowledgeBaseId,
    status,
    sessionId,
  });

  close();
};
