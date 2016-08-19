(function () {

  // function _createMenuItems () {
  //   for (var i = 0; i < 3; i++) {
  //     chrome.contextMenus.create({
  //       id: "yeah-home-menu-item-" + i,
  //       contexts: ["browser_action"],
  //       title: "TEST - click me!" + i
  //     }); 
  //   }
  // }

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
    console.log(info.menuItemId);
  });

  // _createMenuItems();

})();