var Utils = (function () {

  var createListitem = function (name, url) {
    var li = document.createElement("li");
    li.classList.add("li-mod");
    li.innerHTML = name + " - " + url;
    return li;
  };

  var createRemoveKey = function (li) {
    var removeItem = li.innerText.split("-");
    var removeKey = "mu-" + removeItem[0];
    return removeKey.trim();
  };

  var createRemoveId = function (li) {
    var removeItem = li.innerText.split("-");
    return removeItem[1].trim();
  };

  var createContextMenu = function (item) {
    chrome.contextMenus.create({
      id: item[1],
      contexts: ["browser_action"],
      title: item[0] + " - " + item[1]
    });
  };

  var extractMoreUrls = function (items) {
    var value = [];
    for (var item in items) {
      if (item.indexOf("mu-") !== -1) {
        value.unshift(items[item]);
      }
    }
    return value;
  };

  var removeListitem = function (list, index) {
    list.removeChild(list.childNodes[index + 1]);
  };

  var removeContextMenu = function (id) {
    chrome.contextMenus.remove(id, function () {
      console.log("successfully removed context menu item!");
    })
  };

  return {
    createListitem: createListitem,
    createRemoveKey: createRemoveKey,
    createRemoveId: createRemoveId,
    createContextMenu: createContextMenu,
    extractMoreUrls: extractMoreUrls,
    removeListitem: removeListitem,
    removeContextMenu: removeContextMenu
  };
})();