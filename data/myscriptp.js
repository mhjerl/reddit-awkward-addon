var commentsMarkedForRemoval = [];
var dimba;
var pageJsonsArray;
var commentIdsArray;

/*
 Assign listenOListenMyFriend() as a listener for messages from the extension.
 */
chrome.runtime.onMessage.addListener(listenOListenMyFriend);

/**
 * Deprecated
 * @param request
 * @param sender
 * @param sendResponse
 */
function listenOListenMyFriend(request, sender, sendResponse) {
	if (request.funkodonko === "myScriptp") {
        if (processing) return;
        processing = true;
        pageJsonsArray = request.jsonsOfCommentPagesArray;
        console.log("alabadaster!" + pageJsonsArray.length);
        commentIdsArray = request.mainPageCommentIdsArray;
        mimba();
    }
}

function runScriptP(arrayOfMainPagePostIds, jsonsOfCommentPagesArray) {





    //if (processing) return;
    //processing = true;




    commentIdsArray = arrayOfMainPagePostIds;
    pageJsonsArray = jsonsOfCommentPagesArray;
    console.log("alabadaster!" + pageJsonsArray.length);
    mimbaP();

}

var lookOut = false;
var rememberOThatIdYeah;
var lookOutForId = false;
var lookOutParentId;
var idsOfCommentWhoHasTOneParentPointer;
var idsOfCommentWhoHasTOneParent = [];
var leafs = [];
var branches = [];
var hideTheseThings;
var processing;
var globalCounter;
function mimbaP() {
	hideTheseThings = [];
	for (globalCounter = 0; globalCounter < pageJsonsArray.length; globalCounter++) {
		var a = pageJsonsArray[globalCounter];
		//console.log(a);
		dimba = JSON.parse(a);
		traverseF(dimba, 1);
	}
	/*for(var i=0, len=hideTheseThings.length; i < len; i++) {
		var id = hideTheseThings[i];
		var dut = "t3_" + id;
				
		$('div')
			.filter(function() {
			return $(this).data("fullname") == dut
			})
		.remove()
		;
	}*/
	processing = false;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {funkodonko: "erase", directChildrenIds: hideTheseThings, type: "t3"}, function(response) {});
    });
    console.log("DON DON DON DON DON!" + hideTheseThings.length);
}

function traverseF(x, level) {
  //toocplxcounter++;
  //if (toocplxcounter > 4000) return;
  if (isArray(x)) {
    traverseArrayF(x, level);
  } else if ((typeof x === 'object') && (x !== null)) {
    traverseObjectF(x, level);
  } else {
    //console.log(level + x);
		if (lookOut) { if ( (x) && (typeof x === "string") && (x.indexOf("¤¤¤m") !== -1) ) { var v = commentIdsArray[globalCounter]; if (!contains(hideTheseThings, v)) { hideTheseThings.push(v); } lookOut = false; console.log("G O O O O O O O O P A:" + v); }}
		if (lookOutForId) { rememberOThatIdYeah = x; lookOutForId = false; }
		lookOut = false;
		lookOutForId = false;
  }
}
 
function traverseArrayF(arr, level) {
  //console.log(level + "<array>");
  arr.forEach(function(x) {
    traverseF(x, level + "  ");
  });
}

function traverseObjectF(obj, level) {
  //console.log(level + "<object>");
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      //console.log(level + "  " + key + ":");
	if ("body" === key) { lookOut = true; }
	if ("id" === key) { lookOutForId = true; }
      	traverseF(obj[key], level + "    ");
    }
  }
}


