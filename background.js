'use strict';
const l = console.log;
const MENU_ID = '1';


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({file: 'content.js'});
});




chrome.runtime.onMessage.addListener(function(msg) {
  for(let url of msg) {
    chrome.history.addUrl({url});
  }
});




chrome.contextMenus.create({
  title: 'Toggle visit state',
  contexts: [ 'link' ],
  id: MENU_ID
}, function () { l('context menu created') });




chrome.contextMenus.onClicked.addListener(function(info, tab) {
  l('contextMenus.onClicked()', info, tab);

  const url = info.linkUrl;
  chrome.history.getVisits({ url }, function({ length }) {
    l(length);

    if (length === 0) {
      // link is not visited
      chrome.history.addUrl({ url });
    }
    else {
      // link is visited
      chrome.history.deleteUrl({ url });
    }
  })
});
