import { FC } from "react";
import { AddOrRemove } from "../screen/profile/CustomerTag";
import { AddTag } from "./Add.Tag";
import { RemoveTag } from "./Remove.Tag";

interface prop {
  AddOrRemove: AddOrRemove;
  close: () => void;
  text: string;
  setText: (e: string) => void;
  handleAddTag: () => void;
  handleRemoveTag: () => void;
}

export const TagModelRoute: FC<prop> = ({
  AddOrRemove,
  close,
  text,
  setText,
  handleAddTag,
  handleRemoveTag,
}) => {
  switch (AddOrRemove) {
    case "add":
      return (
        <AddTag
          close={close}
          text={text}
          setText={setText}
          handleAddTag={handleAddTag}
        />
      );
    case "remove":
      return <RemoveTag close={close} handleRemoveTag={handleRemoveTag} />;

    default:
      return null;
  }
};
