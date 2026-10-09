/**
 * Safe localStorage access utilities with error handling and fallback defaults
 */

export const getStorageItem = (key, defaultValue = null) => {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) {
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[storage] Failed to parse localStorage item for key "${key}":`, error);
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.warn(`[storage] Failed to save localStorage item for key "${key}":`, error);
    return false;
  }
};

export const removeStorageItem = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`[storage] Failed to remove localStorage item for key "${key}":`, error);
    return false;
  }
};
