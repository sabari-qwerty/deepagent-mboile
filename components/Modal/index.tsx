import { FC } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

interface prop {
  children: React.ReactNode;
  isVisible: boolean;
  closeModel: () => void;
}

export const Model: FC<prop> = ({ children, isVisible, closeModel }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <KeyboardAvoidingView behavior={"padding"} className="flex-1 ">
        <TouchableOpacity
          className="flex-1 justify-center items-center bg-black/50"
          activeOpacity={1}
          onPress={closeModel}
        >
          <TouchableOpacity
            className="bg-white rounded-lg mx-4 w-[85%] max-w-[350px] shadow-lg"
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {children}
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};
