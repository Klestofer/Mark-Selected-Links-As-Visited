'use strict';
var l = console.log.bind(console);


var urls = [];
var selection = window.getSelection();
if (selection.rangeCount === 0 || selection.toString() === '') {
  // nothing is selected - get all links
  getLinks(document);
}
else {
  // something is selected - get selected links
  getLinks(selection.getRangeAt(0).cloneContents());
}




function getLinks(docRoot) {
  for (let link of Array.from(docRoot.querySelectorAll('a[href]'))) {
    let hrefAttr = link.getAttribute('href');
    if (hrefAttr === '' || hrefAttr === 'javascript:') {
      // something bad
      continue;
    }
    urls.push(link.href);
  }
  chrome.runtime.sendMessage(urls);
}
