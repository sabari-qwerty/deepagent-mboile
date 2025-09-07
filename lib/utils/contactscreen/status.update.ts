import { queryClient } from "@/tanstack-query";
import {
  ContactData,
  CustomContactData,
  StatusUpdatePayload,
} from "@/types/type";

interface UpdateStatusProps {
  status: string;
  sessionId: string;
  keys: string[];
  ContactData: ContactData;
  setContactData: (data: CustomContactData) => void;
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

  console.log({ ContactData });

  ContactData.status = status;

  setContactData(ContactData as unknown as CustomContactData);

  // Update the contact's status
  // setContactData({
  //   ...(ContactData as unknown as CustomContactData),
  //   status,
  // });

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
