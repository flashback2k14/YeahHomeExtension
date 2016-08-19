window.addEventListener("load", function () {
  StorageUtil.get(["extensionIcon", "openingUrl"])
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
      } else {
        console.log("no items found!");
      }
    })
    .catch(function (error) {
      console.error(error.message);
    });
});

window.addEventListener("DOMContentLoaded", function () {
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
  // get opening url and button from HTML
  var txtUrl = document.querySelector("#txtUrl");
  var btnSend = document.querySelector("#btnSend");
  // register EventListener
  btnSend.addEventListener("click", function () {
    // check if txtUrl is not empty
    if (txtUrl.value.length > 0) {
      // set opening url
      StorageUtil.save({openingUrl: txtUrl.value})
        .then(function (response) {
          console.log(response.message);
        })
        .catch(function (error) {
          console.error(error.message);
        });
    }
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
  })
});