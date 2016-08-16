chrome.browserAction.onClicked.addListener(function (tab) {
  var openingUrl = localStorage.getItem("openingUrl");
  if (openingUrl) {
    chrome.tabs.create({url: openingUrl});
  } else {
    chrome.tabs.create({url: "https://www.google.com"});
  }
});