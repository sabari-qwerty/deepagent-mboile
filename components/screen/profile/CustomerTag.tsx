import { Devider } from "@/components/common/devider";
import { Model } from "@/components/Modal";
import { TagModelRoute } from "@/components/Modal/tag.modle.route";
import { Icons } from "@/constants/icons";
import { useStorage } from "@/hooks/useStorage";
import { StorageKeys } from "@/lib/utils/storage";
import truncateText from "@/lib/utils/truncateText";
import { services } from "@/services";
import { CustomContactData, TagPayload } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { ProfileTitle } from "./Title";

export type AddOrRemove = "add" | "remove" | "";

export const CustomerTag: FC = () => {
  const [tags, setTags] = useStorage<string[] | null>(StorageKeys.tags);
  const [activeWorkspaceId] = useStorage(StorageKeys.activeWorkspaceId);
  const [isVisible, setIsVisible] = useState(false);
  const [AddOrRemove, setAddOrRemove] = useState<"add" | "remove" | "">("");
  const [currentContact] = useStorage<CustomContactData | null>(
    StorageKeys.contactData
  );
  const [currentTag, setCurrentTag] = useState<string>("");

  const [addTaxt, setAddTaxt] = useState("");

  console.log({
    tags,
  });

  const { mutate: addTag } = useMutation({
    mutationFn: (payload: TagPayload) =>
      services.contact.tag.add({
        ...payload,
      }),
    onSuccess: () => {
      ToastAndroid.show("Tag added", ToastAndroid.SHORT);
    },
  });

  const { mutate: removeTag } = useMutation({
    mutationFn: (payload: TagPayload) =>
      services.contact.tag.delete({
        ...payload,
      }),
    onSuccess: () => {
      ToastAndroid.show("Tag removed", ToastAndroid.SHORT);
    },
  });

  const handleRemoveTag = () => {
    setTags(tags?.filter((tag) => tag !== currentTag) || null);
    removeTag({
      tag: currentTag,
      sessionId: (currentContact && currentContact?.id) || "",
      knowledgeBaseId: String(activeWorkspaceId),
    });
    handleClose();
    setAddOrRemove("");
  };
  const hanadleAddTag = () => {
    setTags([...(tags || []), addTaxt]);
    addTag({
      tag: addTaxt,
      sessionId: (currentContact && currentContact?.id) || "",
      knowledgeBaseId: String(activeWorkspaceId),
    });
    setAddTaxt("");
    handleClose();
    setAddOrRemove("");
  };

  const handleOpen = ({
    AddOrRemove,
    value,
  }: {
    AddOrRemove: "add" | "remove" | "";
    value?: string;
  }) => {
    setIsVisible(true);
    setAddOrRemove(AddOrRemove);

    if (value) setCurrentTag(value);
  };

  const handleClose = () => {
    setIsVisible(false);
    setAddTaxt("");
    setCurrentTag("");
  };

  return (
    <View className="gap-y-2">
      <View className="gap-y-2 w-[95%] mx-auto">
        <ProfileTitle
          name="Tag"
          icon={<Icons.tags color={"#586474"} />}
          isPressable
          onPress={() => handleOpen({ AddOrRemove: "add" })}
        />

        <View className="flex-row flex-wrap gap-2">
          {tags &&
            tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                className="bg-black/10 w-fit px-2 py-1.5 flex-row items-center gap-x-1 rounded-full"
                onPress={() =>
                  handleOpen({ AddOrRemove: "remove", value: tag })
                }
              >
                <Text className="text-sm text-text-secondary font-medium">
                  {truncateText({ text: tag, maxLength: 18 })}
                </Text>
                <View className="rounded-full ">
                  <Icons.closed color={"#586474"} size={14} />
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>
      <Devider />
      <Model isVisible={isVisible} closeModel={handleClose}>
        <TagModelRoute
          AddOrRemove={AddOrRemove}
          close={handleClose}
          text={addTaxt}
          setText={setAddTaxt}
          handleAddTag={hanadleAddTag}
          handleRemoveTag={handleRemoveTag}
        />
      </Model>
    </View>
  );
};
