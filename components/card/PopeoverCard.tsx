import { FC } from "react";
import { Text, TouchableOpacity } from "react-native";

interface popeoverCardProps {
  label: string;
  value: string;
  Icon: ({ isActive }: { isActive: boolean }) => React.ReactNode;
  onPress: () => void;
  isActive: boolean;
  activeColorCode: string;
  deactiveColorCode: string;
}

export const PopeoverCard: FC<popeoverCardProps> = ({
  label,
  value,
  Icon,
  onPress,
  isActive,
  activeColorCode,
  deactiveColorCode,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-start  gap-x-2 px-2 py-1"
      onPress={() => {
        onPress();
      }}
      disabled={isActive}
    >
      <Icon isActive={isActive} />
      <Text
        className={`  `}
        style={{
          color: isActive ? activeColorCode : deactiveColorCode,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
