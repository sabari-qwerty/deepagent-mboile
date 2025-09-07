import { fileUpload } from "@/actions/handle/fileUpload";
import { sendMessage } from "@/actions/requests/send.message";
import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import { SendMessagePayload } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { FC, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const SendMessage: FC = () => {
  const [message, setMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(40);
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();

  const [accessToken] = useStorage(StorageKeys.accessToken);
  const [knowledgeBaseId] = useStorage(StorageKeys.activeWorkspaceId);

  const { mutate: sendTextMessageMutation } = useMutation({
    mutationFn: ({
      file,
      message,
      setMessage,
      sessionId,
      accessToken,
      knowledgeBaseId,
    }: SendMessagePayload) =>
      sendMessage({
        message,
        setMessage,
        sessionId,
        accessToken: accessToken as string,
        knowledgeBaseId: knowledgeBaseId as string,
        file,
      }),
  });

  const handleContentSizeChange = (event: {
    nativeEvent: { contentSize: { height: number } };
  }) => {
    const { height } = event.nativeEvent.contentSize;

    // Calculate new height with limits (40px for single line, max 120px for 5 lines)
    const newHeight = Math.max(10, Math.min(height + 16, 120)); // Adding padding to content height
    setInputHeight(newHeight);
  };

  const handleFileUpload = async ({
    message,
    setMessage,
    sessionId,
    accessToken,
    knowledgeBaseId,
  }: SendMessagePayload) => {
    const file = await fileUpload();

    if (!file) return;

    sendTextMessageMutation({
      file: {
        uri: file.url,
        name: file.title,
        type: file.type || "application/octet-stream",
        fileType: file.fileType,
      },
      message: String(message).trim() || "",
      setMessage,
      sessionId,
      accessToken: accessToken as string,
      knowledgeBaseId: knowledgeBaseId as string,
    });
  };

  const handleSendTextMessage = async ({
    message,
    setMessage,
    sessionId,
    accessToken,
    knowledgeBaseId,
  }: SendMessagePayload) => {
    sendTextMessageMutation({
      message: String(message).trim() || "",
      setMessage,
      sessionId,
      accessToken: accessToken as string,
      knowledgeBaseId: knowledgeBaseId as string,
    });
  };

  return (
    <View className="w-full mb-2 border border-gray-200 ">
      <View className="w-[98%] mx-auto flex-row  rounded-md py-1  justify-end items-end bg-white ">
        <TouchableOpacity
          className="w-12 h-12"
          onPress={() => {
            handleFileUpload({
              message: String(message).trim() || "",
              setMessage,
              sessionId,
              accessToken: accessToken as string,
              knowledgeBaseId: knowledgeBaseId as string,
            });
          }}
        >
          <View className="w-12 h-12 bg-white rounded-full flex-row items-center justify-center">
            <Icons.FilePciker color="#2563eb" size={24} />
          </View>
        </TouchableOpacity>

        <TextInput
          className="text-text-primary  text-base rounded-md w-full   flex-1 bg-white"
          placeholder="Message"
          placeholderTextColor="#06152d"
          value={message}
          onChangeText={setMessage}
          multiline={true}
          returnKeyType="send"
          onSubmitEditing={() => {}}
          style={{
            textAlignVertical: "center",
            paddingVertical: 8,
            maxHeight: inputHeight,
          }}
          onContentSizeChange={handleContentSizeChange}
          scrollEnabled={false}
        />

        <TouchableOpacity
          className="w-12 h-12"
          onPress={() =>
            handleSendTextMessage({
              message,
              setMessage,
              sessionId,
              accessToken: accessToken as string,
              knowledgeBaseId: knowledgeBaseId as string,
            })
          }
        >
          <View className=" w-12 h-12 bg-white rounded-full  flex-row items-center justify-center">
            <Icons.Send color="#2563eb" size={24} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendMessage;
