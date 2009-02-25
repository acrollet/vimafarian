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
// TODOs
// the 'y' key sure would be nice, but seems technically impossible 
//   to implement correctly at the moment
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
  var newWindow = window.open('', 'New Tab', 'location=1,resizable=1,scrollbars=1');
  newWindow.focus();
  return false;
}

function upOneDir(docHref) {
  var lastSlash = docHref.lastIndexOf('/');
  var lengthOfHref = docHref.length;
  if (lengthOfHref == (lastSlash + 1)) {
    // if we're already at the top level, quit!
    if (charCount(docHref, '/') <= 3) {
      return docHref;
    }
    docHref = docHref.substr(0, (lengthOfHref - 2));
    var lastSlash = docHref.lastIndexOf('/');
  }
  return docHref.substr(0, (lastSlash + 1));
}

function upToTop(docHref) {
  var endIndex = 0;
  var counter = 0;
  var myArray = docHref.toLowerCase().split('');
  for (i=0;i<myArray.length;i++)
  {
    if (myArray[i] == '/')
    {
      counter++;
    }
    if (counter == 2) {
      endIndex = i;
    }
  }
  if (endIndex != 0) {
    return docHref.substr(0, (endIndex + 1));
  } else {
    return docHref;
  }
}

function charCount(myString, myChar) {
  var counter = 0;
  var myArray = myString.toLowerCase().split('');
  for (i=0;i<myArray.length;i++)
  {
    if (myArray[i] == myChar)
    {
      counter++;
    }
  }
  return counter;
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
      // here's where we find out the keyNum for ctrl chars
      // alert(keyNum);
		}

    if (e.keyCode) {
      keyCode = e.keyCode;
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
    else if (keyChar == 'h') {
      // emulates 'gh'
      if (pressed == 'g') {
        // go to user's home page
        window.location=homePage;
        pressed = '';
      } 
    }
    else if (keyChar == 'u') {
      // emulates 'gu'
      if (pressed == 'g') {
        // go up one level
        newHref = upOneDir(window.location.href);
        if (newHref != window.location.href) {
          window.location=newHref;
        }
        pressed = '';
      } 
    }
    else if (keyChar == 'U') {
      // emulates 'gU'
      if (pressed == 'g') {
        // go up one level
        newHref = upToTop(window.location.href);
        if (newHref != window.location.href) {
          window.location=newHref;
        }
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
    // scroll down one page
    // ctrl-f
		else if (keyNum == 6) {
      window.scrollBy(0, window.innerHeight);
    }
    // scroll up one page
    // ctrl-b
		else if (keyNum == 2) {
      window.scrollBy(0, -window.innerHeight);
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
    else if (keyChar == 'y') {
      var y=window.location.href;
      alert(y);
    }
	}, 
true);
