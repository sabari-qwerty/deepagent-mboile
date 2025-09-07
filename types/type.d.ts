import { ReactNode } from "react";

// ============================= CHILDREN =============================
export interface Children {
  children: ReactNode;
  className?: string;
}

// ============================= WORKSPACE  =============================

interface Workspace {
  _id: string;
  name: string;
  tenantId: string;
  status: string;
  chatWidgeData: ChatWidgeData;
  createdAt: string;
  crawlData: CrawlData;
  shared: boolean;
}

interface ChatWidgeData {
  botProfile: string;
}

interface CrawlData {
  stats: knowledgeBaseStatus;
}

type knowledgeBaseStatus =
  | "CREATED"
  | "CRAWLING"
  | "CRAWLED"
  | "CRAWL_ERROR"
  | "GENERATING_EMBEDDINGS"
  | "EMBEDDING_ERROR"
  | "READY";

export interface localWorkspace {
  id: string;
  name: string;
  imageUrl: string;
  shared: boolean;
}

// ============================= FILTER =============================

type converstationStatusType = "opened" | "closed" | "snoozed" | "blocked";

type conversationFilterType =
  | "general"
  | "mentioned"
  | "openChats"
  | "unassigned";

// ============================= CONTACT Payload =============================

type options = "allMessage" | "priority";

export interface ContactPayload {
  knowledgeBaseId: string;
  gobalFilter: conversationFilterType;
  status: converstationStatusType;
  option: options;
  pageSize: number;
  page: number;
}

// Conatact List Params

interface ContactData {
  _id: string;
  startedAt: string;
  updatedAt: string;
  isUnread: boolean;
  userData: UserData;
  platform: platform;
  priority: boolean;
  status: string;
  latestMessage: LatestMessage;
}

interface UserSummary {
  email: any;
  id: any;
  name: any;
  image_url: any;
}

interface sessionNote {
  id: string;
  note: string;
  imageUrl: string;
  timeStamp: string;
}
interface LatestMessage {
  id: string;
  sender: string;
  user_summary?: UserSummary;
  blocks: [Blocks, any[]];
  timeStamp: string;
  bot_summary?: BotSummary;
  question?: string;
  answer?: string;
  attachments: {
    url: string;
    title: string;
    fileExtension: string;
    fileType: string;
  }[];
  questionTokens?: number;
  answerTokens?: number;
}

interface ContactDataResposne {
  pageParams: number[];
  pages: ContactData[];
}

// ============================= Platform =============================

type platform = "whatsapp" | "facebook" | "telegram" | "widget";

// ============================= Filter  =============================

export interface StatusOverViewResponse {
  general: number;
  mentioned: number;
  openChats: number;
  unassigned: number;
}

type conversationFilterType =
  | "general"
  | "mentioned"
  | "openChats"
  | "unassigned";

type converstationStatusType = "opened" | "closed" | "snoozed" | "blocked";

export type genericFiltersValues = Record<
  string,
  {
    name: string;
    value: string;
    icon: ({ isActive }: { isActive: boolean }) => React.ReactNode;
  }
>;

// ============================= Bottom Sheet =============================

export type bottomSheet = "status" | "gobalFilter" | "";

// ============================= Status =============================

export interface GetStatusResponse {
  general: number;
  mentioned: number;
  openChats: number;
  unassigned: number;
}

export interface GetStatusRequestResposne {
  general: number;
  mentioned: number;
  "open-chats": number;
  allMessage: number;
  priority: number;
  unassigned: number;
}

// ============================= Search =============================

export interface SearchPayload {
  knowledgeBaseId: string;
  conversation: string[];
  tag: string[];
  q: string;
}

// ============================= Status Update  =============================

interface commandPayload {
  sessionId: string;
  knowledgeBaseId: string;
}

interface StatusUpdatePayload extends commandPayload {
  status: string;
}

// ============================= Custom Contact Data =============================

export interface CustomContactData {
  asOrganization: string;
  city: string;
  continent: string;
  country: string;
  email: string;
  id: string;
  imageId: string;
  ip: string;
  isEmailModified: boolean;
  latitude: string;
  longitude: string;
  name: string;
  platform: platform;
  region: string;
  status: string;
  timezone: string;
  type: string;
  userId: string;
}
