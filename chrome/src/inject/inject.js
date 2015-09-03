var CAPTION = "Thumbsup ";

var offset_height = document.body.offsetHeight;
var thumbsup_counter = 0;
window.addEventListener("load", function() {
	
	console.log(CAPTION + ": starts...");
	
	var feed_friend_list = document.getElementById("feed_friend_list");
	
	thumbsup();
	
	console.log(CAPTION + ": event binding, invoked on <b>scroll to end</b>");
	
	window.addEventListener("scroll",function(e) {
		if( document.body.offsetHeight - offset_height > 500) {
			console.log("Update!");
			offset_height = document.body.offsetHeight;
			thumbsup();
		}
		
	});

});

function thumbsup() {
	var thumbsup_collection = feed_friend_list.getElementsByClassName("item qz_like_btn_v3");
	
	for (var i = 0; i < thumbsup_collection.length; i++) { 
		/* every clicked thumbsup element has an attribute "data-clicklog"
		 * indicating its status, viz: being liked or disliked
		 */ 
		
		if (thumbsup_collection[i].getAttribute("data-clicklog") != "cancellike") {
			eventFire(thumbsup_collection[i], "click");
			thumbsup_counter++;
		}
	}

	console.log(CAPTION + ": effective thumbsup(totally) : " + thumbsup_counter);
}

function eventFire(el, etype){
	  if (el.fireEvent) {
	    el.fireEvent('on' + etype);
	  } else {
	    var evObj = document.createEvent('MouseEvents');
	    evObj.initEvent(etype, true, false);
	    el.dispatchEvent(evObj);
	  }
}

function findClass(element, className) {
    var foundElement = null, found;
    function recurse(element, className, found) {
        for (var i = 0; i < element.childNodes.length && !found; i++) {
            var el = element.childNodes[i];
            var classes = el.className != undefined? el.className.split(" ") : [];
            for (var j = 0, jl = classes.length; j < jl; j++) {
                if (classes[j] == className) {
                    found = true;
                    foundElement = element.childNodes[i];
                    break;
                }
            }
            if(found)
                break;
            recurse(element.childNodes[i], className, found);
        }
    }
    recurse(element, className, false);
    return foundElement;
}