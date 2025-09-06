import { DubleTickIcon } from "@/components/icons/dubleTickIcon";
import { EmailIcon } from "@/components/icons/emailIcon";
import { FilterIcon } from "@/components/icons/filterIcon";
import { HashIcon } from "@/components/icons/hashIcon";
import { LeftArrow } from "@/components/icons/LeftArrow";
import { MetionIcon } from "@/components/icons/metionIcon";
import { OpenChatIcon } from "@/components/icons/openChat";
import { SearchIcon } from "@/components/icons/searchIcon";
// import { SendIcon } from "@/components/icons/sendIcon";
import { SingleTickIcon } from "@/components/icons/singletickIcons";
import { TagIcon } from "@/components/icons/tags";
import { UnassignedIcon } from "@/components/icons/unassigned";
import { UserIcon } from "@/components/icons/user";
import { WhatsappIcon } from "@/components/icons/whatsapp";
import { WidgetIcon } from "@/components/icons/WidgetIcon";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { FC } from "react";
import { View } from "react-native";

interface prop {
  size?: number;
  color: string;
}

const BlockedIcon: FC<prop> = ({ color, size = 20 }) => {
  return <MaterialIcons name="block-flipped" size={size} color={color} />;
};

const ClosedIcon: FC<prop> = ({ color, size = 18 }) => {
  return <AntDesign name="closecircleo" size={size} color={color} />;
};

const SnoozedIcon: FC<prop> = ({ color, size = 18 }) => {
  return <AntDesign name="clockcircleo" size={size} color={color} />;
};

const OpenedIcon: FC<prop> = ({ color, size = 18 }) => {
  return <AntDesign name="checkcircleo" size={size} color={color} />;
};

const PDFIcon: FC<prop> = ({ color, size = 18 }) => {
  return <FontAwesome5 name="file-pdf" size={size} color={color} />;
};

const DownloadIcon: FC<prop> = ({ color, size = 18 }) => {
  return <Feather name="download" size={size} color={color} />;
};

const PlayButtonIcon: FC<prop> = ({ color, size = 28 }) => {
  return <AntDesign name="playcircleo" size={size} color={color} />;
};

const BackArrowIcon: FC<prop> = ({ color, size = 24 }) => {
  return <Ionicons name="arrow-back" size={size} color={color} />;
};

const ThreeDotsIcon: FC<prop> = ({ color, size = 18 }) => {
  return <Entypo name="dots-three-vertical" size={size} color={color} />;
};

const TargetIcon: FC<prop> = ({ color, size = 24 }) => {
  return <MaterialCommunityIcons name="target" size={size} color={color} />;
};

const ClockIcon: FC<prop> = ({ color, size = 18 }) => {
  return <AntDesign name="clockcircleo" size={size} color={color} />;
};

const OrganizationIcon: FC<prop> = ({ color, size = 18 }) => {
  return <Octicons name="organization" size={size} color={color} />;
};

const LocationIcon: FC<prop> = ({ color, size = 16 }) => {
  return <Ionicons name="location-outline" size={size} color={color} />;
};

const CityIcon: FC<prop> = ({ color, size = 18 }) => {
  return (
    <MaterialCommunityIcons
      name="city-variant-outline"
      size={size}
      color={color}
    />
  );
};

const GlobeIcon: FC<prop> = ({ color, size = 18 }) => {
  return <Feather name="globe" size={size} color={color} />;
};

const LatitudeIcon: FC<prop> = ({ color, size = 18 }) => {
  return <MaterialCommunityIcons name="latitude" size={size} color={color} />;
};

const LongitudeIcon: FC<prop> = ({ color, size = 18 }) => {
  return <MaterialCommunityIcons name="longitude" size={size} color={color} />;
};

const ContinentIcon: FC<prop> = ({ color, size = 18 }) => {
  return <FontAwesome5 name="globe-americas" size={size} color={color} />;
};

const ContactIcon: FC<prop> = ({ color, size = 18 }) => {
  return <AntDesign name="contacts" size={size} color={color} />;
};

const PluseCircleIcon: FC<prop> = ({ color, size = 18 }) => {
  return <AntDesign name="pluscircleo" size={size} color={color} />;
};

const AssingeeIcon: FC<prop> = ({ color, size = 18 }) => {
  return <Feather name="user-check" size={size} color={color} />;
};

const EyeIcon: FC<prop> = ({ color, size = 18 }) => {
  return <Feather name="eye" size={size} color={color} />;
};

const ShareIcon: FC<prop> = ({ color, size = 18 }) => {
  return <MaterialIcons name="folder-shared" size={size} color={color} />;
};

const EditIcon: FC<prop> = ({ color, size = 18 }) => {
  return <Feather name="edit" size={size} color={color} />;
};

const DeleateIcon: FC<prop> = ({ color, size = 18 }) => {
  return <MaterialIcons name="delete" size={size} color={color} />;
};

const TelegramIcon: FC<prop> = ({ color, size = 18 }) => {
  return <FontAwesome6 name="telegram" size={size} color={color} />;
};

const FacebookIcon: FC<prop> = ({ color, size = 12 }) => {
  return (
    <View className="bg-[#316FF6] rounded-full w-[14px] h-[14px] flex justify-center items-center  ">
      <FontAwesome5 name="facebook" size={size} color={color} />
    </View>
  );
};

const SendIcon: FC<prop> = ({ color, size = 18 }) => {
  return <Ionicons name="send-outline" size={size} color={color} />;
};

const FilePickerIcon: FC<prop> = ({ color, size = 18 }) => {
  return <Ionicons name="attach-outline" size={size} color={color} />;
};

const DocumentIcon: FC<prop> = ({ color, size = 18 }) => {
  return <Entypo name="text-document-inverted" size={size} color={color} />;
};

const MailIcon: FC<prop> = ({ color, size = 18 }) => {
  return <MaterialIcons name="alternate-email" size={size} color={color} />;
};

const GroupIcon: FC<prop> = ({ color, size = 18 }) => {
  return <MaterialIcons name="groups" size={size} color={color} />;
};

const ExitIcon: FC<prop> = ({ color, size = 18 }) => {
  return <MaterialCommunityIcons name="exit-run" size={size} color={color} />;
};

export const Icons = {
  SearchIcon,
  FilterIcon,
  WidgetIcon,
  general: HashIcon,
  mentioned: MetionIcon,
  unassigned: UnassignedIcon,
  openChats: OpenChatIcon,
  blocked: BlockedIcon,
  closed: ClosedIcon,
  snoozed: SnoozedIcon,
  opened: OpenedIcon,
  Target: TargetIcon,
  LeftArrow,
  DownloadIcon,
  PDFIcon,
  PlayButtonIcon,
  SingleTickIcon,
  DubleTickIcon,
  BackArrowIcon,
  ThreeDotsIcon,
  SendIcon,
  UserIcon,
  ClockIcon,
  OrganizationIcon,
  LocationIcon,
  CityIcon,
  GlobeIcon,
  longitude: LongitudeIcon,
  latitude: LatitudeIcon,
  continent: ContinentIcon,
  EmailIcon,
  Contact: ContactIcon,
  tags: TagIcon,
  pluseCircle: PluseCircleIcon,
  Assingee: AssingeeIcon,
  Eye: EyeIcon,
  Share: ShareIcon,
  Whatsapp: WhatsappIcon,
  Edit: EditIcon,
  Deleate: DeleateIcon,
  Telegram: TelegramIcon,
  Facebook: FacebookIcon,
  Send: SendIcon,
  FilePciker: FilePickerIcon,
  Document: DocumentIcon,
  Mail: MailIcon,
  Group: GroupIcon,
  Exit: ExitIcon,
};
