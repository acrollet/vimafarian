// ==UserScript==
// @name          Vimafarian
// @author	      Adrian Rollett
// @namespace     ACR
// @description   vimperator clone for Safari/GreaseKit
// @exclude       http://gmail.com/*
// @include       *
// ==/UserScript==
//
// CREDITS
// http://www.openjs.com/scripts/events/keyboard_shortcuts/
//

// functions 
function goToBottom() {
  var sh=document.body.scrollHeight;
  var oh=document.body.offsetHeight;
  if (sh > oh) window.scrollTo(0,sh);
  else window.scrollTo(0,oh);
  return false;
}

function openNewTab() {
  // Change "_blank" to something like "newWindow" to load all links in the same new window
  var newWindow = window.open(this.getAttribute('href'), '_blank');
  newWindow.focus();
  return false;
}

document.addEventListener('keypress', 
	function(e){

    var element;
    if(e.target) element=e.target;
    else if(e.srcElement) element=e.srcElement;
    if(element.nodeType==3) element=element.parentNode;

    if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;

		var keyNum;

    if (e.which) {
			keyNum = e.which;
		}

		var keyChar = String.fromCharCode(keyNum);

    // Movement functions
    // scroll to bottom
    if (keyChar == 'G') {
      goToBottom();
    }
    // scroll up
    else if (keyChar == 'j') {
			window.scrollBy(0,50);
		}
    // scroll down
		else if (keyChar == 'k') {
      window.scrollBy(0,-50);
		}

    // Browser functions
    // close window
		else if (keyChar == 'd') {
      window.open('', '_self', '');
      top.window.close();
    }
    else if (keyChar == 'r') {
      window.location.reload();
    }
    else if (keyChar == 't') {
      openNewTab();
    }
	}, 
true);
