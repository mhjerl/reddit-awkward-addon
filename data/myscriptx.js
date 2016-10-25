var taggedCommentIds = [];
var directChildrenIds = [];
var processedIds = [];
var commentsMarkedForRemoval = [];
var codeOneTag;
var orange;
var blue;
var dimba;
var commentBodyToLookFor;
var commentBodyToLookForId;


function runScriptX(t, pageJsonTemp) {
	console.log("asdfHoobaMixturen er great!" + pageJsonTemp.length + " " + t);
	commentBodyToLookFor = t;
	dimba = JSON.parse(pageJsonTemp);
	mimbaX();
}


var lookOut = false;
var rememberOThatIdYeah;
var rememberOThatAuthorNameYeah;
var lookOutForId = false;
var lookOutParentId;
var idsOfCommentWhoHasTOneParentPointer;
var idsOfCommentWhoHasTOneParent = [];
var leafs = [];
var branches = [];

function mimbaX() {
	console.log("go mimbapul!!!");
	traverseE(dimba,1);
	traverseG(dimba,1);
	console.log("commentBodyToLookForId: " + commentBodyToLookForId);
	console.log("lookOutForAuthorName: " + lookOutForAuthorName);
	if (lookOutForAuthorName) {
		var mainPostId = dimba[0].data.children[0].data.id;
		console.log("mainPostId:"+mainPostId);
		//var mainPostId = dimba[0].data.children[0].data.id;



		console.log("daaadddisttext");
		var constructedUrl = "https://denandenavis.dk/primaserver/adddistext.php?author=" + lookOutForAuthorName + "&text=" + commentBodyToLookFor + "&mainpostid=" + mainPostId + "&commentid=" + commentBodyToLookForId;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", constructedUrl, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				console.log("Tak for i dag! response from server: " + xhr.responseText.success);
			}
		}
		xhr.send();

		console.log("mainPostId ifgo!:"+mainPostId);
	}
}


var lookOutForAuthor = false;
var lookOutForAuthorName;
function traverseE(x, level) {
  //toocplxcounter++;
  //if (toocplxcounter > 4000) return;
  if (isArray(x)) {
    traverseArrayE(x, level);
  } else if ((typeof x === 'object') && (x !== null)) {
    traverseObjectE(x, level);
  } else {
    //console.log("knobso: " + x);
	if (lookOut) { if ( (x) && (typeof x === "string") && (x === commentBodyToLookFor) ) { console.log("it's a match!"); commentBodyToLookForId = rememberOThatIdYeah; lookOut = false; }}
	if (lookOutForId) { rememberOThatIdYeah = x; lookOutForId = false; }
	lookOut = false;
	lookOutForId = false;
  }
}
 
function traverseArrayE(arr, level) {
  //console.log(level + "<array>");
  arr.forEach(function(x) {
    traverseE(x, level + "  ");
  });
}

function traverseObjectE(obj, level) {
  //console.log(level + "<object>");
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
		//console.log(level + "  " + key + ":");
		if ("body" === key) { lookOut = true; }
		if ("id" === key) { lookOutForId = true; }
		traverseE(obj[key], level + "    ");
	}
  }
}






function traverseG(x, level) {
  //toocplxcounter++;
  //if (toocplxcounter > 4000) return;
  if (isArray(x)) {
    traverseArrayG(x, level);
  } else if ((typeof x === 'object') && (x !== null)) {
    traverseObjectG(x, level);
  } else {
	  //console.log("dobso: " + x);
    //console.log(level + x);
	if (lookOutForAuthor) { if ( (x) && (typeof x === "string") && commentBodyToLookForId === rememberOThatIdYeah ) { lookOutForAuthorName = x; console.log("author:" + x); lookOutForAuthor = false; }}
	if (lookOutForId) { rememberOThatIdYeah = x; lookOutForId = false; }
	lookOutForId = false;
	lookOutForAuthor = false;
  }
}
 
function traverseArrayG(arr, level) {
  //console.log(level + "<array>");
  arr.forEach(function(x) {
    traverseG(x, level + "  ");
  });
}

function traverseObjectG(obj, level) {
  //console.log(level + "<object>");
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
		//console.log(level + "  " + key + ":");
		if ("author" === key) { lookOutForAuthor = true; }
		if ("id" === key) { lookOutForId = true; }
		traverseG(obj[key], level + "    ");
	}
  }
}
