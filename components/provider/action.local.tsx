// ActionLockProvider.js
import React, { createContext, useCallback, useContext, useState } from "react";

const ActionLocalContext = createContext<ActionLocalContextProp | undefined>(
  undefined
);

export interface ActionLocalContextProp {
  locked: boolean;
  runOnce: (fn: () => Promise<void>) => Promise<void>;
}

export const ActionLocalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locked, setLocked] = useState(false);

  const runOnce = useCallback(
    async (fn: () => Promise<void>) => {
      if (locked) {
        console.log("Blocked: already running");
        return;
      }

      setLocked(true);

      try {
        await fn(); // your async work
      } finally {
        setTimeout(() => {
          setLocked(false);
        }, 1000);
      }
    },
    [locked]
  );
  return (
    <ActionLocalContext.Provider value={{ locked, runOnce }}>
      {children}
    </ActionLocalContext.Provider>
  );
};

export const useActionLocal = () => {
  return useContext(ActionLocalContext);
};
