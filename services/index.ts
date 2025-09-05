// import { getAssignee } from "./contact/chat/assignee/get";
// import { updateAssignee } from "./contact/chat/assignee/update";
// import { DeleteMessage } from "./contact/chat/delet";
// import getChat from "./contact/chat/get";
// import { NewChat } from "./contact/chat/newChat";
// import contactGet from "./contact/get";
// import { getRecentPage } from "./contact/recentpage/get";
// import { SearchContact } from "./contact/search/get";
// import { updateStatus } from "./contact/status/update/update";
// import { DeleteTag } from "./contact/tag/delete";
// import { PutTag } from "./contact/tag/put";
import workspaceGet from "./workspace/get";

export const services = {
  workspace: {
    get: workspaceGet,
  },
  // status: {
  //   get: statusGet,
  //   update: updateStatus,
  // },
  // contact: {
  //   get: contactGet,
  //   chat: {
  //     get: getChat,
  //     send: NewChat,
  //     delete: DeleteMessage,
  //   },
  //   assignee: {
  //     get: getAssignee,
  //     update: updateAssignee,
  //   },
  //   tag: {
  //     add: PutTag,
  //     delete: DeleteTag,
  //   },
  //   viewedPage: {
  //     get: getRecentPage,
  //   },
  //   search: {
  //     get: SearchContact,
  //   },
  // },
};
