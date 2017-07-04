'use strict';
const l = console.log;

const MenuId = {
  TOGGLE_LINK_VISIT_STATE: '1',
  MARK_LINKS_IN_SELECTION: '2',
};




chrome.browserAction.onClicked.addListener(function(tab) {
  execScript();
});




chrome.runtime.onMessage.addListener(function(msg) {
  for(let url of msg) {
    chrome.history.addUrl({url});
  }
});




chrome.contextMenus.create({
  title: 'Toggle link visit state',
  contexts: [ 'link' ],
  id: MenuId.TOGGLE_LINK_VISIT_STATE,
}, function () { l('context menu created') });




chrome.contextMenus.onClicked.addListener(function(info, tab) {
  l('contextMenus.onClicked()', info, tab);

  switch(info.menuItemId) {
    case MenuId.TOGGLE_LINK_VISIT_STATE:
      toggleUrlVisitState(info.linkUrl);
    break;


    case MenuId.MARK_LINKS_IN_SELECTION:
      execScript();
    break;
  }
});




function execScript() {
  chrome.tabs.executeScript({file: 'content.js'});
}




function toggleUrlVisitState(url) {
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

}




chrome.contextMenus.create({
  title: 'Mark links in selection',
  contexts: [ 'selection' ],
  id: MenuId.MARK_LINKS_IN_SELECTION,
}, function () { l('context menu created') });
