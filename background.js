'use strict';


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({file: 'content.js'});
});




chrome.runtime.onMessage.addListener(function(msg) {
  for(let url of msg) {
    chrome.history.addUrl({url});
  }
});
