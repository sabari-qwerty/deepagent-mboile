import { useEffect, useState } from "react";

export const useDebouse = <T>(value: T, delay: number) => {
  const [debouseValue, setDebouseValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouseValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouseValue;
};
