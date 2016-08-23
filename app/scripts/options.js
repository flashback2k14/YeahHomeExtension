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
        console.log("no items found!");
      }
    })
    .catch(function (error) {
      console.error(error.message);
    });
});

window.addEventListener("DOMContentLoaded", function () {
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
            console.log(response.message);
          })
          .catch(function (error) {
            console.error(error.message);
          });
        break;
      case "black":
        // set
        chrome.browserAction.setIcon({path: "images/ic_home_black_48dp_2x.png"});
        // save
        StorageUtil.save({extensionIcon: "black"})
          .then(function (response) {
            console.log(response.message);
          })
          .catch(function (error) {
            console.error(error.message);
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
      console.log("ToDo: add Notification");
      return;
    }
    // set opening url
    StorageUtil.save({openingUrl: txtUrl.value})
      .then(function (response) {
        console.log(response.message);
      })
      .catch(function (error) {
        console.error(error.message);
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
        console.log(response.message);
      })
      .catch(function (error) {
        console.error(error.message);
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
      console.log("ToDo: add Notification");
      return;
    }
    if (mUrl.length === 0) {
      console.log("ToDo: add Notification");
      return;
    }

    var item = {};
    item["mu-" + mName] = [mName, mUrl];

    StorageUtil.save(item)
      .then(function (response) {
        console.log(response.message);
        ulMoreUrls.appendChild(Utils.createListitem(mName, mUrl));
        Utils.createContextMenu([mName, mUrl]);
        txtMoreUrlName.value = "";
        txtMoreUrl.value = "";
      })
      .catch(function (error) {
        console.error(error.message);
      });
  });
  // register EventListener
  ulMoreUrls.addEventListener("click", function (e) {
    StorageUtil.remove(Utils.createRemoveKey(e.target))
      .then(function (response) {
        console.log(response.message);
        Utils.removeListitem(ulMoreUrls, e.target.value);
        Utils.removeContextMenu(Utils.createRemoveId(e.target));
      }.bind(this))
      .catch(function (error) {
        console.error(error.message);
      });
  });
});