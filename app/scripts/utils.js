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

  var removeListitem = function (list, removeItem) {
    var items = list.childNodes;
    items.forEach(function (item) {
      if (item === removeItem) {
        list.removeChild(removeItem);
      }
    });
  };

  var removeContextMenu = function (id) {
    chrome.contextMenus.remove(id, function () {
      console.log("successfully removed context menu item!");
    })
  };

  var showInfotext = function (el, text, isSuccess) {
    el.innerHTML = text;
    if (isSuccess) {
      el.classList.remove("info-success", "info-error");
      el.classList.add("info-success");
    } else {
      el.classList.remove("info-success", "info-error");
      el.classList.add("info-error");
    }
    setTimeout(function () {
      el.innerHTML = ""
    }, 2000);
  };

  return {
    createListitem: createListitem,
    createRemoveKey: createRemoveKey,
    createRemoveId: createRemoveId,
    createContextMenu: createContextMenu,
    extractMoreUrls: extractMoreUrls,
    removeListitem: removeListitem,
    removeContextMenu: removeContextMenu,
    showInfotext: showInfotext
  };
})();