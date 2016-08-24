var StorageUtil = (function () {
  /**
   * Save Items to sync between Chrome Browsers 
   * @param items [Object] - items to save {key: value}
   * @returns Promise
   */
  var save = function (items) {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.set(items, function () {
        if (chrome.runtime.lastError) {
          reject({type: "error", message: chrome.runtime.lastError.message});
          return;
        }
        resolve({type: "success", message: "item successfully saved"});
      });
    });
  };
  /**
   * Get all Items from keys
   * @param keys [String | Array of Strings] - key name
   * @returns Promise
   */
  var get = function (keys) {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.get(keys, function (items) {
        if (chrome.runtime.lastError) {
          reject({type: "error", message: chrome.runtime.lastError.message});
          return;
        }
        resolve({type: "success", message: "items successfully getted", items: items});
      });
    });
  };
  /**
   * Remove Items from keys from Chrome Browsers
   * @param keys [String | Array of Strings] - key name
   * @returns Promise
   */
  var remove = function (keys) {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.remove(keys, function () {
        if (chrome.runtime.lastError) {
          reject({type: "error", message: chrome.runtime.lastError.message});
          return;
        }
        resolve({type: "success", message: "item successfully removed"});
      });
    });
  };
  /**
   * Public Functions
   */
  return {
    save    : save,
    get     : get,
    remove  : remove
  };
})();