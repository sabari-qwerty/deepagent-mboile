import { ReactNode, useEffect } from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SWIPE_THRESHOLD = -60;
const ACTION_WIDTH = 70;

interface props {
  children: ReactNode;
  oprations: {
    text: string;
    onPress: ({ sessionId }: { sessionId: string }) => void;
    isVisible: boolean;
    icon: ReactNode;
    bgColor: string;
  }[];

  itemId: string;
  contactId: string;
  setContactId: (id: string) => void;

  closeRow: () => void;
}

export default function Swipeable({
  oprations,
  children,
  closeRow,
  itemId,
  contactId,
  setContactId,
}: props) {
  const translateX = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .enabled(!!children)
    .activeOffsetX([-10, 10]) // Activate gesture after 10px horizontal movement
    .failOffsetY([-10, 10]) // Fail gesture and allow scroll if vertical movement > 10px
    .onUpdate((e) => {
      // Handle horizontal swipe
      if (Math.abs(e.translationY) < Math.abs(e.translationX)) {
        // Allow swiping left when closed
        if (e.translationX < 0 && contactId !== itemId) {
          translateX.value = e.translationX;
        }
        // Allow swiping right when opened
        else if (e.translationX > 0 && contactId === itemId) {
          translateX.value = -ACTION_WIDTH + e.translationX;
        }
      }
    })
    .onEnd(() => {
      const isCurrentlyClosed = contactId !== itemId;

      if (isCurrentlyClosed) {
        // Opening logic
        if (translateX.value < SWIPE_THRESHOLD) {
          translateX.value = withSpring(-ACTION_WIDTH, springConfig);
          runOnJS(setContactId)(itemId); // This will make isOpen true
        } else {
          translateX.value = withSpring(0, springConfig);
        }
      } else {
        // Closing logic
        if (translateX.value > -ACTION_WIDTH / 2) {
          translateX.value = withSpring(0, springConfig);
          runOnJS(setContactId)(""); // This will make isOpen false
        } else {
          translateX.value = withSpring(-ACTION_WIDTH, springConfig);
        }
      }
    });

  // Animation configuration
  const springConfig = {
    damping: 15,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.3,
    restDisplacementThreshold: 0.3,
  };

  // Sync animation with contactId changes
  useEffect(() => {
    const isItemOpen = contactId === itemId;

    translateX.value = withSpring(isItemOpen ? -ACTION_WIDTH : 0, springConfig);

    return () => {
      translateX.value = withSpring(0, springConfig);
    };
  }, [contactId, itemId]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (contactId === itemId) {
          // Animate to closed position first, then call closeRow
          translateX.value = withSpring(0, springConfig, () => {
            runOnJS(closeRow)();
          });
        }
      }}
    >
      <View className="bg-white overflow-hidden">
        {/* Action Buttons */}
        <View className="absolute right-0 flex-row h-full">
          {oprations
            .filter((opration) => opration.isVisible)
            .map((opration, keys) => {
              return (
                <TouchableOpacity
                  className={`w-20 justify-center items-center ${opration.bgColor} `}
                  onPress={() => {
                    opration.onPress({ sessionId: itemId });
                    closeRow();
                  }}
                  key={keys}
                >
                  {opration.icon}
                </TouchableOpacity>
              );
            })}
        </View>

        {/* Chat Row */}
        {children ? (
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[animatedStyle, { minHeight: 1 }]}
              className="border-gray-300 bg-white"
            >
              {children}
            </Animated.View>
          </GestureDetector>
        ) : (
          <View className="border-gray-300 bg-white">{children}</View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
