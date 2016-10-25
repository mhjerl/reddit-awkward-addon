//fra manifest.json:   , "https://www.reddit.com/*", "https://denandenavis.dk/*"


var pageJsonTemp;

var codeOneURL = "";
var codeOneTag = "";
var activated = false;
var authenticated;
var versionError;


function logStorage() {
	if(chrome.storage) {
		chrome.storage.local.get(function(data){
			console.log("chrome.storage.local:");
			if(chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError);
			} else {
				console.log(data);
			}
			chrome.storage.sync.get(function(data){
				console.log("chrome.storage.sync:");
				if(chrome.runtime.lastError) {
					console.error(chrome.runtime.lastError);
				} else {
					console.log(data);
				}
			});
		});
	} else {
		console.warn("chrome.storage is not accessible, check permissions");
	}
}









/*chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	codeOneURL = tabs[0].url;
	document.getElementById('codeOneURLElem').value = codeOneURL;
	//processReddit();
});*/




document.addEventListener("DOMContentLoaded", function(event) {





$( "#auth_subm" ).click(function(event) {
	var hash = $('#auth_hash_inp').val();
	// spændende, egentlig!
	var backgroundPage = chrome.extension.getBackgroundPage();
	var authenticated = backgroundPage.authenticateCalledFromPopse(hash);
	
	if (!authenticated) {
		$( "#statusSpanner" ).text("Unknown hash.");
	}
	else {
		$( '#before_authenticated_div' ).hide();
		$( '#after_authenticated_div' ).show();
		$( "#statusSpanner" ).css( "color", "green" );
		$( "#statusSpanner" ).text("Ready for action. Please reload the reddit page...");
		set("semiSecretHash", hash);
	}
}); 










console.log("popse.js: glutse glutse glutse glutse glutse glutse glutse glutse123 DOM fully loaded and parsed");
loadIt();

document.querySelector('#checkboxActive').addEventListener('change',  function(event) {
        var t = event.target;
		activated = t.checked;
		storeIt();
		//changeHandler();
}, false);

});


function removeOptions(selectbox) {
    var i;
    for (i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}







function stripTrailingSlash(site)
{
	return site.replace(/\/+$/, '');
}

function waitButtonHandler() {
	// spændende, egentlig...
	var backgroundPage = chrome.extension.getBackgroundPage();
	backgroundPage.runScriptW(codeOneTag, pageJsonTemp);
}


function addDissappointmentHandler(t) {
	var constructedUrl = codeOneURL + ".json";
	console.log("constructedUrl:" + constructedUrl);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", constructedUrl, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			//console.log("response from server: " + xhr.responseText.success);
			pageJsonTemp = xhr.responseText;
			addDissappointmentHandler2(t);
		}
	}
	xhr.send();


}

function addDissappointmentHandler2(t) {
	console.log("glufer! " + pageJsonTemp.length + " " + t);

	// spændende, egentlig!
	var backgroundPage = chrome.extension.getBackgroundPage();

	backgroundPage.runScriptX(t, pageJsonTemp);
}


function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i] === obj) {
			return true;
		}
	}
	return false;
}

// "self" is a global object in content scripts
// Listen for a "drawBorder"
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("dimle fra popse.js");
	if (request.funkodonko === "daaadddisttext") {
            console.log("daaadddisttext");
            var constructedUrl = "https://denandenavis.dk/primaserver/adddistext.php?author=" + request.lookOutForAuthorName + "&text=" + 				request.commentBodyToLookFor + "&mainpostid=" + request.mainPostId + "&commentid=" + request.commentBodyToLookForId;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", constructedUrl, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    console.log("response from server: " + xhr.responseText.success);
                }
            }
            xhr.send();
    }
    else if (request.funkodonko === "setLoadedDataaaaa") {
		console.log("setLoadedData .......................");
		activated = request.activated;
		codeOneURL = request.codeOneURL;
		codeOneTag = request.codeOneTag;
		console.log("setLoadedData tag:" + codeOneTag);

		var e = document.getElementById('checkboxActive');
		e.checked = activated;





		//mistillidPersonArray = JSON.parse(request.mistillidPersonArray);
		//populateMistillidPersonSelect(mistillidPersonArray);





	}
	else if(request.funkodonko === "notifyAboutNiceGiftsJustInAndPutThemOnTheShelf") {
		console.log("processing processing processing")
		//processReddit();

	}
});
















function set(key, value) {
	chrome.storage.local.set({
		[key]: value
	}, function () {
		if(chrome.runtime.lastError) {
			console.log("errr: " + chrome.runtime.lastError);
		} else {
			//console.log("set done!");
		}
	});
	
}

function storeIt() {

	//console.log("garnske11");
	if (codeOneURL && codeOneURL !== "") set("codeOneURL", codeOneURL);
	if (codeOneTag && codeOneTag !== "") set("codeOneTag", codeOneTag);
	set("activated", activated);


	//logStorage();
	//console.log("garnske51");
	var c = mistillidPersonArray;
	if (!c) {
		c = [];
		console.log("mistillidPersonArray was null")
	}
	else if (c=== "") {
		c =  [];
		console.log("mistillidPersonArray was empty string")
	}
	chrome.storage.local.set({
		"mistillidPersonArray": c
	});
	// spændende, egentlig!
	var backgroundPage = chrome.extension.getBackgroundPage();
	backgroundPage.setVariablesCalledFromPopse(codeOneTag, activated, mistillidPersonArray);
}

function loadIt() {
	console.log("loadIt 1");
	// Chrome docs: "Pass in null to get the entire contents of storage."
	chrome.storage.local.get(null, function(data) {
		versionError = data.versionError;
		if (versionError !== "none") {
			$( '#before_authenticated_div' ).hide();
			$( '#versionerror_div' ).show();
			return;
		}
		var semiSecretHash = data.semiSecretHash;
		if(typeof semiSecretHash === 'undefined') {
			authenticated = false;
			return;
		}
		else {
			authenticated = true;
			$( '#before_authenticated_div' ).hide();
			$( '#after_authenticated_div' ).show();
		}

		console.log("dat baand: " + JSON.stringify(data));
		if (data.initError === "yes") {
			var statusSpanner = document.getElementById('statusSpanner');
			statusSpanner.innerHTML = "redditawkward.com is down. Please try again in a minute.";
			return;
		}

		var redditor = data.redditor;
		var redditorSpanner = document.getElementById('redditorSpanner');
		redditorSpanner.innerHTML = "" + redditor;
	
		var totalPKarma = data.totalPKarma;
		console.log("loadIt totalPKarma: " + totalPKarma);
		var pKarmaSpanner = document.getElementById('pKarmaSpanner');
		pKarmaSpanner.innerHTML = "" + totalPKarma + "!";
		var accountType = data.accountType;
		if (accountType === "premium") {
			$( "#accountTypeInfo" ).empty();
		}

		var gifts = data.gifts;
		console.log("gifts.length: " + gifts.length);

		var notifications = data.notifications;
		console.log("notifications.length: " + notifications.length);


		//giftsEntry.textContent = "scooper";
		
		//giftsContainer.appendChild(giftsEntry);
		var createdUTCToGiftsOrNotificationsObject = [];


		for (var i = 0; i < gifts.length; i++) {
			if (gifts[i]) {
				createdUTCToGiftsOrNotificationsObject.push({ utc: gifts[i].utc, type: 'gift', obby: gifts[i] });
			}
		}
		
		for (var i = 0; i < notifications.length; i++) {
			if (notifications[i]) {
				createdUTCToGiftsOrNotificationsObject.push({ utc: notifications[i].utc, type: 'notification', obby: notifications[i] });
			}
		}
		console.log("createdUTCToGiftsOrNotificationsObject size: " + createdUTCToGiftsOrNotificationsObject.length);
		createdUTCToGiftsOrNotificationsObject.sort(keysrt('utc'));
		createdUTCToGiftsOrNotificationsObject.reverse();
		console.log("done0");	
		// spændende, egentlig!
		/*var backgroundPage = chrome.extension.getBackgroundPage();
		backgroundPage.clearBadge();
		*/
		//var nyedva = document.getElementById('nyedva');
		console.log("done");



		
		var notificationsandgiftsContainer = document.querySelector('#notificationsandgifts-container');

		var notificationsandgiftsTable = document.getElementById("notificationandgift-table");

		for (var i = 0; i < createdUTCToGiftsOrNotificationsObject.length; i++) {
			if (createdUTCToGiftsOrNotificationsObject[i]) {
				// "The value of -1 can also be used, this results in a new row being inserted at the last position."
				var row = notificationsandgiftsTable.insertRow(-1);
				
				// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);

				var imghyperlink = null;
				var timeinfo = null;
				
				var obby = createdUTCToGiftsOrNotificationsObject[i];

				var titlepopup = obby.obby.motivation;
				if (obby.type === "gift") {
					var imagetype = obby.obby.imagetype;
					if (imagetype === "man") {
						hyperlink = '<a title="' + titlepopup + '" href="https://redditawkward.com/user.php?redditor=' + friendName + '"><img src="https://redditawkward.com/images/avatars/builderman.png" width="48"></a>';
					}
					else if (imagetype === "woman") {
						hyperlink = '<a title="' + titlepopup + '" href="https://redditawkward.com/user.php?redditor=' + friendName + '"><img src="https://redditawkward.com/images/avatars/builderwoman.png" width="48"></a>';
					}
					else if (imagetype === "neutral") {
						hyperlink = '<a title="' + titlepopup + '" href="https://redditawkward.com/user.php?redditor=' + friendName + '"><img src="https://redditawkward.com/images/avatars/astronaut.png" width="48"></a>';
					}
					else if (imagetype === "custom") {
						var imagecustom = obby.obby.imagecustom;
						hyperlink = '<a title="' + titlepopup + '" href="https://redditawkward.com/user.php?redditor=' + friendName + '"><img src="https://redditawkward.com/uplooood/' + imagecustom +'"></a>';
					}
				}
				
				else if (obby.type === "notification") {
					var tag = obby.obby.tag;
					tag = tag.match(/\{([^)]+)\}/)[1];
					console.log("tag: " + tag);
					var tagCategory = tagCategories[tag];
					console.log("tagCategory: " + tagCategory);
					tagCategory = tagCategory.toLowerCase();
					imghyperlink = '<a title="' + titlepopup + '" href="https://redditawkward.com/rules/' + tag + '.html"><img src="https://redditawkward.com/images/categories/' + tagCategory + '.png" width="48"></a>';
					console.log("imghyperlink: " + imghyperlink);
				}
				
			
				// Add some text to the new cells:
				var now = new Date();
				var backThen = createdUTCToGiftsOrNotificationsObject[i].utc * 1000;
				
				timeinfo = "" + timeMagic(now, backThen);
	
				
				
				cell1.innerHTML = imghyperlink;
				cell2.innerHTML = "" + timeMagic(now, backThen);



				/*cell3.innerHTML = '<a target="_blank" href="https://www.reddit.com/r/' + notifications[i].subreddit + '/comments/'  + notifications[i].pageid + '/' + notifications[i].pagename + '/' + notifications[i].commentid + '">Kommentar</a>';
				cell4.innerHTML = '<a target="_blank" href="https://primadonnakoder.wordpress.com/2016/09/13/tagoverblik/#' + notifications[i].rule + '">Regel</a>';*/












			}
		}
		

		console.log("done0");	
		// spændende, egentlig!
		/*var backgroundPage = chrome.extension.getBackgroundPage();
		backgroundPage.clearBadge();
		*/
		//var nyedva = document.getElementById('nyedva');
		notificationsandgiftsContainer.scrollTop = 200;
		console.log("done");


		var friends = data.friends;

		console.log("friends.length: " + friends.length);
		var friendsContainer = document.querySelector('#friends-container');

		var table = document.getElementById("friend-table");

		for (var i = 0; i < friends.length; i++) {
			if (friends[i]) {
				// "The value of -1 can also be used, this results in a new row being inserted at the last position."
				var row = table.insertRow(-1);

				// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);

				// Add some text to the new cells:
				var friendName = friends[i].friend;
				var hyperlink = null;
				if (friends[i].imagetype === "man") {
					hyperlink = '<a href="https://redditawkward.com/user.php?redditor=' + friendName + '"><img src="https://redditawkward.com/images/avatars/builderman.png" width="48"></a>';
				}
				else if (friends[i].imagetype === "woman") {
					hyperlink = '<a href="https://redditawkward.com/user.php?redditor=' + friendName + '"><img src="https://redditawkward.com/images/avatars/builderwoman.png" width="48"></a>';
				}
				else if (friends[i].imagetype === "neutral") {
					hyperlink = '<a href="https://redditawkward.com/user.php?redditor=' + friendName + '"><img src="https://redditawkward.com/images/avatars/astronaut.png" width="48"></a>';
				}
				else if (friends[i].imagetype === "custom") {
					hyperlink = '<a href="https://redditawkward.com/user.php?redditor=' + friendName + '"><img src="https://redditawkward.com/uplooood/' + friends[i].imagecustom +'" width="48"></a>';
				}
				cell1.innerHTML = hyperlink;
				cell2.innerHTML = friends[i].total;
			}
		}

		console.log("done0");	
		// spændende, egentlig!
		/*var backgroundPage = chrome.extension.getBackgroundPage();
		backgroundPage.clearBadge();
		*/
		//var nyedva = document.getElementById('nyedva');
		friendsContainer.scrollTop = 200;
		console.log("done");

		activated = data.activated;
		if (data.codeOneURL) codeOneURL = data.codeOneURL;
		if (data.codeOneTag) codeOneTag = data.codeOneTag;
		console.log("loadIt tag:" + codeOneTag);

		var e = document.getElementById('checkboxActive');
		e.checked = activated;

		var backgroundPage = chrome.extension.getBackgroundPage();
		backgroundPage.clearBadgeText();
		// clear notification count	

	});
	console.log("loadIt 2");


}


function changeMainPage(newUrl) {
chrome.tabs.getCurrent(function (tab) {
  var tabUrl = encodeURIComponent(tab.url);
  var tabTitle = encodeURIComponent(tab.title);
  chrome.tabs.update(tab.id, {url: newUrl});
});
}


function isArray(o) {
	return Object.prototype.toString.call(o) === '[object Array]';
}

function timeMagic(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' s';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' m';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' h';   
    }

    else if (elapsed < msPerMonth) {
        return ' ' + Math.round(elapsed/msPerDay) + ' d';   
    }

    else if (elapsed < msPerYear) {
        return ' ' + Math.round(elapsed/msPerMonth) + ' mo';   
    }

    else {
        return ' ' + Math.round(elapsed/msPerYear ) + ' yrs';   
    }
}

// sort on values
function srt(desc) {
  return function(a,b){
   return desc ? ~~(a < b) : ~~(a > b);
  };
}

// sort on key values
function keysrt(key,desc) {
  return function(a,b){
   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}

var tagCategories = {
	"waits.for.anyone"  : "Requests",
	"waits.for.your.reply.only" : "Requests",
	"i.find.this.unworthy.for.discussion" : "Outrule",
	"i.find.the.subject.unworthy.for.discussion" : "Outrule",
	"please.use.reddit.awkward.tags.from.here" : "Meta",
	"i.will.not.reply.and.expect.apology" : "Anger",
	"i.apologize" : "Apology",
	"no.problem" : "Apology",
	"your.comment.inspired.me" : "Praise",
	"thanks" : "Praise",
	"youre.welcome" : "Praise",
	"i.dont.think.the.original.post.has.been.addressed.yet" : "Meta",
	"i.dont.think.the.original.post.has.been.taken.seriously.yet" : "Meta",
	"i.dont.think.the.original.post.has.been.treated.respectfully" : "Meta",
	"guarded.apology" : "Apology",
	"explanation.why.i.was.angry" : "Apology",
	"dont.mind.its.ok.lets.move.on" : "Apology",
	"i.was.being.careless" : "Apology",
	"doorslam" : "Anger",
	"i.am.glad.you.said.that.to.me" : "Praise",
	"its.fine.i.consider.the.case.closed" : "Apology" ,
	"i.consider.this.comment.definitive.and.consider.any.reply.inappropriate" : "Meta",
	"interesting.will.write.more.in.a.few.days.time" : "Patience",
	"i.am.one.of.the.strangest.people.youll.ever.meet" : "Funny",
	"er.hi.what.kind.of.strange.presentation.is.that" : "Funny",
	"youre.being.overly.ironic.and.are.violating.the.rules" : "Meta",
	"awkward" : "Awkward",
	"f**k.you" : "Kidding",
	"haha" : "Kidding",
	"wtf" : "Kidding",
	"watch.me.playing.soccer.with.myself.in.this.video" : "Bodily",
	"how.are.things.old.chap" : "Friendly",
	"reading.lagerlof" : "Friendly",
	"reading.steinbeck" : "Friendly",
	"no.i.mean.it" : "Praise",
	"that.pissed.me.off.but.please.dont.mind" : "Anger"
};

