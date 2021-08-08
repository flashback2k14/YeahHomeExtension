(function () {
  /**
   * Helper function to create context menu items
   */
  function _createMenuItems() {
    StorageUtil.get(null)
      .then(function (response) {
        var moreUrls = Utils.extractMoreUrls(response.items);
        if (moreUrls) {
          Utils.createParentContextMenu();
          moreUrls.forEach(function (item) {
            Utils.createContextMenu(item);
          });
        }
      })
      .catch(function (error) {
        console.error(error.message);
      });
  }

  /**
   * Listener for extension icon was clicked
   */
  chrome.browserAction.onClicked.addListener(function (tab) {
    StorageUtil.get(['openingUrl'])
      .then(function (response) {
        if (Object.keys(response.items).length !== 0) {
          chrome.tabs.create({ url: response.items.openingUrl });
        } else {
          chrome.tabs.create({ url: 'https://www.google.com' });
        }
      })
      .catch(function (error) {
        console.error(error.message);
      });
  });

  /**
   * Listener for context menu item was clicked
   */
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    chrome.tabs.create({ url: info.menuItemId });
  });

  /**
   * Fired when a profile that has this extension installed first starts up
   */
  chrome.runtime.onStartup.addListener(_createMenuItems);

  /**
   * Fired when the extension is first installed,
   * when the extension is updated to a new version,
   * and when Chrome is updated to a new version
   */
  chrome.runtime.onInstalled.addListener(_createMenuItems);
})();
