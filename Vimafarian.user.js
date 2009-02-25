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

// globals
// this is hacky, necessitated by the lack of a js function for going
// to the user's home page in safari
var homePage='http://reluctanthacker.rollett.org/software/vimafarian/';
var pressed;

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
  var newWindow = window.open('', '_blank', 'location=1');
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

    // Multi-key functions
    if (keyChar == 'g') {
      // emulates 'gg'
      if (pressed == 'g') {
        window.scrollTo(0,0);
        pressed = '';
      } else {
        pressed = 'g';
      }
    }
    if (keyChar == 'h') {
      // emulates 'gh'
      if (pressed == 'g') {
        // go to user's home page
        window.location=homePage;
        pressed = '';
      } 
    }

    // Movement functions
    // scroll to bottom
    else if (keyChar == 'G') {
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
