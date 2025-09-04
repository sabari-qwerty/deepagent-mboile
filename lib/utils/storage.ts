import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKeys {
  accessToken = "@authToken",
  allWorkspaces = "@allWorkspaces",
  activeWorkspace = "@activeWorkspace",
  activeWorkspaceId = "@activeWorkspaceId",
  activeFilter = "@activeFilter",
  contactData = "@contactData",
  tags = "@tags",
  teamId = "@teamId",
  assignee = "@assignee",
}

// Event system for storage changes
type StorageListener = (key: string, value: any) => void;

export class Storage {
  private static listeners: StorageListener[] = [];
  private static cache = new Map<string, any>();

  // Add listener for storage changes
  static addListener(listener: StorageListener): () => void {
    Storage.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = Storage.listeners.indexOf(listener);
      if (index > -1) {
        Storage.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of storage changes
  private static notifyListeners(key: string, value: any): void {
    // Use setTimeout to avoid blocking the main thread
    setTimeout(() => {
      Storage.listeners.forEach((listener) => {
        try {
          listener(key, value);
        } catch (error) {
          console.error("Error in storage listener:", error);
        }
      });
    }, 0);
  }

  // Safe JSON parsing with error handling
  private static safeJsonParse<T>(data: string | null): T | null {
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("JSON parse error:", error);
      return null;
    }
  }

  //  set data
  static async set(key: StorageKeys | string, value: any): Promise<void> {
    if (!key) {
      throw new Error("Storage key cannot be undefined or empty");
    }
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);

      // Update cache
      Storage.cache.set(key, value);

      // Notify listeners of the change
      Storage.notifyListeners(key, value);
    } catch (error) {
      console.error("Error storing data:", error);
      throw error;
    }
  }

  // get data with caching
  static async get<T>(key: string): Promise<T | null> {
    try {
      // Check cache first
      if (Storage.cache.has(key)) {
        return Storage.cache.get(key);
      }

      const data = await AsyncStorage.getItem(key);
      const parsedData = Storage.safeJsonParse<T>(data);

      // Update cache
      if (parsedData !== null) {
        Storage.cache.set(key, parsedData);
      }

      return parsedData;
    } catch (error) {
      console.error("Error reading data:", error);
      return null;
    }
  }

  //  remove data
  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);

      // Remove from cache
      Storage.cache.delete(key);

      // Notify listeners of the removal
      Storage.notifyListeners(key, null);
    } catch (error) {
      console.error("Error removing data:", error);
      throw error;
    }
  }

  // create all data
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();

      // Clear cache
      Storage.cache.clear();

      // Notify listeners of the clear
      Storage.notifyListeners("*", null);
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw error;
    }
  }

  // Clear cache manually if needed
  static clearCache(): void {
    Storage.cache.clear();
  }

  // Get cache size for debugging
  static getCacheSize(): number {
    return Storage.cache.size;
  }
}
