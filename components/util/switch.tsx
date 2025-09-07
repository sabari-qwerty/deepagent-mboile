import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  thumbSize?: number;
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  width = 50,
  height = 28,
  activeColor = "#4CAF50",
  inactiveColor = "#E0E0E0",
  thumbColor = "#FFFFFF",
  thumbSize = 22,
}) => {
  const translateX = useRef(
    new Animated.Value(value ? width - height : 0)
  ).current;
  const backgroundColor = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: value ? width - height : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundColor, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value, width, height]);

  const handleToggle = () => {
    if (disabled) return;
    onValueChange(!value);
  };

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  return (
    <TouchableOpacity
      onPress={handleToggle}
      disabled={disabled}
      activeOpacity={0.8}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View
        style={{
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: interpolatedBackgroundColor,
          justifyContent: "center",
          paddingHorizontal: 2,
        }}
      >
        <Animated.View
          style={{
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: thumbColor,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            transform: [{ translateX }],
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
