import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reduce unnecessary refetches
      staleTime: 5 * 60 * 1000, // 5 minutes

      // Optimize for mobile networks
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for network/server errors
        return failureCount < 3;
      },

      // Retry with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Disable refetch on window focus for mobile
      refetchOnWindowFocus: false,

      // Only refetch on reconnect if data is stale
      refetchOnReconnect: "always",

      // Disable refetch on mount if data exists
      refetchOnMount: false,
    },
    mutations: {
      // Retry mutations on network errors
      retry: 1,
      retryDelay: 1000,
    },
  },
});
