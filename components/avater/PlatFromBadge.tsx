import { Icons } from "@/constants/icons";
import { platform } from "@/types/type";
import { FC } from "react";

export const PlatFromBadge: FC<{ platform: platform }> = ({ platform }) => {
  switch (platform) {
    case "whatsapp":
      return <Icons.Whatsapp />;
    case "telegram":
      return <Icons.Telegram size={16} color="#0088cc" />;
    case "facebook":
      return <Icons.Facebook size={12} color="white" />;
    case "widget":
      return <Icons.WidgetIcon />;
  }
};
