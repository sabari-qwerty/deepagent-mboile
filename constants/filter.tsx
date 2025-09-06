import { Icons } from "@/constants/icons";
import { conversationFilterType, converstationStatusType } from "@/types/type";

export const conversationFilter: Record<
  conversationFilterType,
  {
    name: string;
    value: string;
    icon: ({ isActive }: { isActive: boolean }) => React.ReactNode;
  }
> = {
  general: {
    name: "General",
    value: "general",
    icon: ({ isActive }: { isActive: boolean }) => (
      <Icons.general color={isActive ? "#fff" : "#07142F"} />
    ),
  },
  mentioned: {
    name: "Mentioned",
    value: "mentioned",
    icon: ({ isActive }: { isActive: boolean }) => (
      <Icons.mentioned color={isActive ? "#fff" : "#07142F"} />
    ),
  },
  openChats: {
    name: "Open Chats",
    value: "openChats",
    icon: ({ isActive }: { isActive: boolean }) => (
      <Icons.openChats color={isActive ? "#fff" : "#07142F"} />
    ),
  },
  unassigned: {
    name: "Unassigned",
    value: "unassigned",
    icon: ({ isActive }: { isActive: boolean }) => (
      <Icons.unassigned color={isActive ? "#fff" : "#07142F"} />
    ),
  },
};

export const converstationStatus: Record<
  converstationStatusType,
  {
    name: string;
    value: string;
    icon: ({ isActive }: { isActive: boolean }) => React.ReactNode;
  }
> = {
  opened: {
    name: "Opened",
    value: "opened",
    icon: ({ isActive }: { isActive: boolean }) => (
      <Icons.opened color={isActive ? "#fff" : "#07142F"} />
    ),
  },
  closed: {
    name: "Closed",
    value: "closed",
    icon: ({ isActive }: { isActive: boolean }) => (
      <Icons.closed color={isActive ? "#fff" : "#07142F"} />
    ),
  },
  snoozed: {
    name: "Snoozed",
    value: "snoozed",
    icon: ({ isActive }: { isActive: boolean }) => (
      <Icons.snoozed color={isActive ? "#fff" : "#07142F"} />
    ),
  },
  blocked: {
    name: "Blocked",
    value: "blocked",
    icon: ({ isActive }: { isActive: boolean }) => (
      <Icons.blocked color={isActive ? "#fff" : "#07142F"} />
    ),
  },
};

export const ChatStatusChange = [
  {
    label: "Open",
    value: "opened",
    icon: ({ isActive }: { isActive: boolean }) => (
      <Icons.opened size={14} color={isActive ? "#05df72" : "#07142F"} />
    ),
    activeColorCode: "#05df72",
    deactiveColorCode: "#07142F",
  },
  {
    label: "Close",
    value: "closed",
    icon: ({ isActive }: { isActive: boolean }) => (
      <Icons.closed size={14} color={isActive ? "#fb2c36" : "#07142F"} />
    ),
    activeColorCode: "#fb2c36",
    deactiveColorCode: "#07142F",
  },
];
