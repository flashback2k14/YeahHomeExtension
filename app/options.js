window.addEventListener("load", function () { 
  var extensionIcon = localStorage.getItem("extensionIcon");
  var openingUrl = localStorage.getItem("openingUrl");
  // set extension icon
  if (extensionIcon) {
    switch (extensionIcon) {
      case "black":
        chrome.browserAction.setIcon({path: "images/ic_home_black_48dp_2x.png"});
        document.querySelector("#selectIcon").selectedIndex = "0";
        break;
      case "white":
        chrome.browserAction.setIcon({path: "images/ic_home_white_48dp_2x.png"});
        document.querySelector("#selectIcon").selectedIndex = "1";
        break;
      default:
        break;
    }
  }
  // set opening url
  if (openingUrl) {
    document.querySelector("#txtUrl").value = openingUrl;
  }
});

window.addEventListener("DOMContentLoaded", function () {
  // get extension icon
  var selectIcon = document.querySelector("#selectIcon");
  selectIcon.addEventListener("change", function (e) {
    switch (e.target.value) {
      case "black":
        chrome.browserAction.setIcon({path: "images/ic_home_black_48dp_2x.png"});
        localStorage.setItem("extensionIcon", "black");
        break;
        
      case "white":
        chrome.browserAction.setIcon({path: "images/ic_home_white_48dp_2x.png"});
        localStorage.setItem("extensionIcon", "white");
        break;
        
      default:
        break;
    }
  });
  // get opening url
  var txtUrl = document.querySelector("#txtUrl");
  var btnSend = document.querySelector("#btnSend");
  btnSend.addEventListener("click", function () {
    if (txtUrl.value.length > 0) {
      localStorage.setItem("openingUrl", txtUrl.value);
    }
  });
  // reset opening url
  var btnClear = document.querySelector("#btnClear");
  btnClear.addEventListener("click", function () {
    txtUrl.value = "";
    localStorage.removeItem("openingUrl");
  })
});