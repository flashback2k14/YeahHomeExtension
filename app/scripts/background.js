(function () {

  function _createMenuItems () {
    StorageUtil.get(null)
      .then(function (response) {
        var moreUrls = Utils.extractMoreUrls(response.items);
        if (moreUrls) {
          moreUrls.forEach(function (item) {
            Utils.createContextMenu(item);
          });
        }
      })
      .catch(function (error) {
        console.error(error.message);
      });
  }

  chrome.browserAction.onClicked.addListener(function (tab) {
    StorageUtil.get(["openingUrl"])
      .then(function (response) {
        if (Object.keys(response.items).length !== 0) {
          chrome.tabs.create({url: response.items.openingUrl});
        } else {
          chrome.tabs.create({url: "https://www.google.com"});
        }
      })
      .catch(function (error) {
        console.error(error.message);
      });
  });

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    chrome.tabs.create({url: info.menuItemId});
  });

  chrome.runtime.onInstalled.addListener(_createMenuItems);
  
})();