/* NOTICE
 * 
 * The word thumbsup used in the context of this extension has three meanings
 * 1, vi.		give someone or something done a thumbs-up.
 * 2, n.		Good Job!
 * 3, Proper N. The clickable html element 赞(pinyin: zan)
 */

var DEBUG = false;

if(DEBUG) {
	/* turn off console report */
	console.log = function() {};
}
var CAPTION = "Thumbsup ";
var MIN_POST_CONTENT_HEIGHT = 500;

/* class name for thumbsup element adopted by Tecent team */
var THUMBSUP_CLASSNAME = "item qz_like_btn_v3";

/* offsetHeight see: 
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
 */
var offset_height = document.body.offsetHeight;

var thumbsup_counter = 0;
window.addEventListener("load", function() {
	
	console.log(CAPTION + ": starts...");
	
	var feed_friend_list = document.getElementById("feed_friend_list");
	
	/* no scroll event will be dispatched after the page loaded,
	 * so we must call thumbsup() directly.
	 */
	thumbsup();
	
	console.log(CAPTION + ": event binding, invoked on scroll to end");
	
	/* thumbsup() will invoked on scroll to end event,
	 * as more fresh posts show up. 
	 */
	window.addEventListener("scroll",function(e) {
		if((document.body.offsetHeight - offset_height) > MIN_POST_CONTENT_HEIGHT) {
			console.log("Update!");
			offset_height = document.body.offsetHeight;
			thumbsup();
		}
		
	});

});

function thumbsup() {
	
	var thumbsup_collection = feed_friend_list.getElementsByClassName(THUMBSUP_CLASSNAME);
	
	for (var i = 0; i < thumbsup_collection.length; i++) { 
		
		/* every clicked thumbsup element has an attribute "data-clicklog"
		 * indicating its status, viz: being liked or disliked, upon which we
		 * depend to decide whether to fire or not.
		 */ 
		if (thumbsup_collection[i].getAttribute("data-clicklog") != "cancellike") {
			eventFire(thumbsup_collection[i], "click");
			thumbsup_counter++;
		}
	}

	console.log(CAPTION + ": effective thumbsup(totally) : " + thumbsup_counter);
}

/* Author: kooiinc
 * Profile: http://stackoverflow.com/users/58186/kooiinc
 */
function eventFire(el, etype){
	  if (el.fireEvent) {
	    el.fireEvent('on' + etype);
	  } else {
	    var evObj = document.createEvent('MouseEvents');
	    evObj.initEvent(etype, true, false);
	    el.dispatchEvent(evObj);
	  }
}
