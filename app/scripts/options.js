window.addEventListener("load", function () {
  StorageUtil.get(null)
    .then(function (response) {
      // check if items available
      if (Object.keys(response.items).length !== 0) {
        // check if extensionIcon is available
        if (response.items.extensionIcon) {
          // set extension icon
          switch (response.items.extensionIcon) {
            case "white":
              chrome.browserAction.setIcon({path: "images/ic_home_white_48dp_2x.png"});
              document.querySelector("#selectIcon").selectedIndex = "0";
              break;
            case "black":
              chrome.browserAction.setIcon({path: "images/ic_home_black_48dp_2x.png"});
              document.querySelector("#selectIcon").selectedIndex = "1";
              break;
            default:
              break;
          }
        }
        // check if openingUrl is available
        if (response.items.openingUrl) {
          // set opening url
          document.querySelector("#txtUrl").value = response.items.openingUrl;
        }

        var moreUrls = Utils.extractMoreUrls(response.items);
        if (moreUrls) {
          var ulMoreUrls = document.querySelector("#ulMoreUrls");
          moreUrls.forEach(function (item) {
            ulMoreUrls.appendChild(Utils.createListitem(item[0], item[1]));
          });
        }
      } else {
        Utils.showInfotext(document.querySelector("#pInfoText"), "no items found!", true);
      }
    })
    .catch(function (error) {
      Utils.showInfotext(document.querySelector("#pInfoText"), error.message, false);
    });
});

window.addEventListener("DOMContentLoaded", function () {
  /**
   * INFO TEXT
   */
  var pInfoText = document.querySelector("#pInfoText");
  /**
   * ICONS
   */
  // get extension icon from HTML
  var selectIcon = document.querySelector("#selectIcon");
  // register EventListener
  selectIcon.addEventListener("change", function (e) {
    // set and save extension icon
    switch (e.target.value) {
      case "white":
        // set
        chrome.browserAction.setIcon({path: "images/ic_home_white_48dp_2x.png"});
        // save
        StorageUtil.save({extensionIcon: "white"})
          .then(function (response) {
            Utils.showInfotext(pInfoText, response.message, true);
          })
          .catch(function (error) {
            Utils.showInfotext(pInfoText, error.message, false);
          });
        break;
      case "black":
        // set
        chrome.browserAction.setIcon({path: "images/ic_home_black_48dp_2x.png"});
        // save
        StorageUtil.save({extensionIcon: "black"})
          .then(function (response) {
            Utils.showInfotext(pInfoText, response.message, true);
          })
          .catch(function (error) {
            Utils.showInfotext(pInfoText, error.message, false);
          });
        break;
      default:
        break;
    }
  });
  /**
   * OPENING URL
   */
  // get opening url and button from HTML
  var txtUrl = document.querySelector("#txtUrl");
  var btnSend = document.querySelector("#btnSend");
  // register EventListener
  btnSend.addEventListener("click", function () {
    // check if txtUrl is not empty
    if (txtUrl.value.length === 0) {
      Utils.showInfotext(pInfoText, "Invalid Input!", false);
      return;
    }
    // set opening url
    StorageUtil.save({openingUrl: txtUrl.value})
      .then(function (response) {
        Utils.showInfotext(pInfoText, response.message, true);
      })
      .catch(function (error) {
        Utils.showInfotext(pInfoText, error.message, false);
      });
  });
  // get button from HTML and reset opening url
  var btnClear = document.querySelector("#btnClear");
  // register EventListener
  btnClear.addEventListener("click", function () {
    // clear txtUrl
    txtUrl.value = "";
    // delete opening url
    StorageUtil.remove("openingUrl")
      .then(function (response) {
        Utils.showInfotext(pInfoText, response.message, true);
      })
      .catch(function (error) {
        Utils.showInfotext(pInfoText, error.message, false);
      });
  });
  /**
   * MORE URLS
   */
  // get HTML Elements
  var txtMoreUrlName = document.querySelector("#txtMoreUrlName");
  var txtMoreUrl = document.querySelector("#txtMoreUrl");
  var btnAdd = document.querySelector("#btnAdd");
  var ulMoreUrls = document.querySelector("#ulMoreUrls");
  // register EventListener
  btnAdd.addEventListener("click", function () {
    var mName = txtMoreUrlName.value;
    var mUrl = txtMoreUrl.value;
    
    if (mName.length === 0) {
      Utils.showInfotext(pInfoText, "Invalid value - Name!", false);
      return;
    }
    if (mUrl.length === 0) {
      Utils.showInfotext(pInfoText, "Invalid valie - URL!", false);
      return;
    }

    var item = {};
    item["mu-" + mName] = [mName, mUrl];

    StorageUtil.save(item)
      .then(function (response) {
        Utils.showInfotext(pInfoText, response.message, true);
        ulMoreUrls.appendChild(Utils.createListitem(mName, mUrl));
        Utils.createContextMenu([mName, mUrl]);
        txtMoreUrlName.value = "";
        txtMoreUrl.value = "";
      })
      .catch(function (error) {
        Utils.showInfotext(pInfoText, error.message, false);
      });
  });
  // register EventListener
  ulMoreUrls.addEventListener("dblclick", function (e) {
    StorageUtil.remove(Utils.createRemoveKey(e.target))
      .then(function (response) {
        Utils.showInfotext(pInfoText, response.message, true);
        Utils.removeListitem(ulMoreUrls, e.target);
        Utils.removeContextMenu(Utils.createRemoveId(e.target));
      }.bind(this))
      .catch(function (error) {
        Utils.showInfotext(pInfoText, error.message, false);
      });
  });
});