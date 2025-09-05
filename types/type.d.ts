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
