import storage from 'local-storage-fallback';

/**
 * Service to handle Storage, use this to customize later
 */
export const StorageService = (() => {
  const pGet = (key: string) => {
    return storage.getItem(key);
  };

  const pSet = (key: string, value: string) => {
    storage.setItem(key, value);
  };

  const pRemove = (key: string) => {
    storage.removeItem(key);
  };

  const pClear = () => {
    storage.clear();
  };

  return {
    get: pGet,
    set: pSet,
    remove: pRemove,
    clear: pClear,
  };
})();
