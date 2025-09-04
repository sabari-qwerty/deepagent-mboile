// hooks/useStorage.ts
import { Storage, StorageKeys } from "@/lib/utils/storage";
import { useEffect, useState } from "react";

export function useStorage<T>(
  key: StorageKeys
): [T | null, (value: T) => Promise<void>] {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    let isMounted = true;

    Storage.get<T>(key).then((val) => {
      if (isMounted) {
        setValue(val);
      }
    });

    const unsubscribe = Storage.addListener((changedKey, newValue) => {
      if (changedKey === key) {
        setValue(newValue);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [key]);

  const updateValue = async (newVal: T) => {
    await Storage.set(key, newVal);
  };

  return [value, updateValue];
}
