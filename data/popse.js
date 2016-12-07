var pageJsonTemp;

var codeOneURL = "";
var codeOneTag = "";
var activated = false;
var authenticated;
var versionError;
var blockedError;
SCF = {};

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


(function() {
function Checkbox(element) {
    this.element = element;
}

var klass = Checkbox.prototype;
var self = Checkbox;
SCF.Checkbox = Checkbox;

klass.init = function() {
    this.bindEvents();
};

klass.bindEvents = function() {
    var _this = this;

    $(this.element).click(function() {
        $(this).toggleClass("checked");
    });
}

}());






(function() {
function Tabbox(element) {
    this.element = element;
    this.tabboxStuff = this.element + " .tabbox-stuff";
    this.tabboxTabs = this.element + " .tabbox-tabs";
    this.tabboxTab = this.tabboxTabs + " li";
    this.activeTabIndex = null;
}

var klass = Tabbox.prototype;
var self = Tabbox;
SCF.Tabbox = Tabbox;

klass.init = function() {
    this.storeActiveTabIndex();
    this.openCorrectTabContent();
    this.bindEvents();
};

klass.bindEvents = function() {
    var _this = this;

    $(this.tabboxTab).click(function() {
        _this.switchTabs(this);
    });
};

klass.openCorrectTabContent = function() {
    $(this.tabboxStuff).addClass("hidden");
    $(this.tabboxStuff).eq(this.activeTabIndex).removeClass("hidden");
};

klass.storeActiveTabIndex = function() {
    var _this = this;

    $(this.tabboxTab).each(function(index) {
        if ($(this).hasClass("active")) {
            _this.activeTabIndex = index;
        }
    });
};

klass.switchTabs = function(tab) {
    $(this.tabboxTab).removeClass("active");
    $(tab).addClass("active");
    this.storeActiveTabIndex();
    this.openCorrectTabContent();
}

}());









document.addEventListener("DOMContentLoaded", function(event) {











// Custom checkboxes
var checkbox = new SCF.Checkbox(".js-checkbox");
checkbox.init();

// Init tabbox
var tabBox = new SCF.Tabbox(".tabbox");
tabBox.init();
$(".tabbox-stuff").tabs();



$('body').on('click', 'a', function(){
 if (this.getAttribute("href").charAt(0) !== "#") {
 	chrome.tabs.create({url: $(this).attr('href')});
 }
 return false;
});


$( "#logout_subm" ).click(function(event) {
	set("semiSecretHash", "<loggedout>");
	$( '#before_authenticated_div' ).fadeIn();
	$( '#real_un' ).fadeOut();
	$( "#statusSpanner" ).text("You are now logged out");
});

$('#auth_hash_inp').keypress(function (e) {
  if (e.which == 13) {
    $( "#auth_subm" ).click();
    return false;    //<---- Add this line
  }
});


$( "#auth_subm" ).click(function(event) {
	console.log("1");
	var hash = $('#auth_hash_inp').val();
	console.log("2");
	var redditor = $('#redditor_inp').val();
	console.log("3a");

	var xhr = new XMLHttpRequest();
	var url = "http://comment-tag.com/server/authenticate.php?redditor=" + redditor + "&hash=" + hash;
	xhr.open("GET", url, true);  // true indicates asynchronous
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
			if (xhr.status == 200) {
			    var responsoo = xhr.responseText;
				var responsooObby = JSON.parse(responsoo);
				$( "#blockederror_div" ).hide();
				if (responsooObby.msg === "correcthash") {
					$("auth_status").text("");
					$( '#before_authenticated_div' ).fadeOut();
					$( '#after_authenticated_home' ).fadeIn();
					$( "#statusSpanner" ).css( "color", "green" );
					$( "#statusSpanner" ).text("Ready for action. Please navigate to your favorite reddit comment page to populate these fields and tables...");
					$( "#redditorSpanner" ).text(redditor);
					$( "logout_subm" ).fadeIn();
					set("semiSecretHash", hash);
					set("redditor", redditor);
				}
				else if (responsooObby.msg === "wronghash") {
					$( "#auth_status" ).text("Wrong password.");
				}
				else if (responsooObby.msg === "connectionerror") {
					$( "#auth_status" ).text("Connection error. Please try again in 1 minute.");
				}
				else {
					$( "#auth_status" ).text("Connection error: A. Please contact us at mortenhh@gmail.com. Thanks. Message:" + responsooObby.msg);
				}
			}
			else {
				$( "#auth_status" ).text("Connection error: B. Please contact us at mortenhh@gmail.com. Thanks.");
			}
	    }
	}
	xhr.send();

});


console.log("popse.js: glutse glutse glutse glutse glutse glutse glutse glutse123 DOM fully loaded and parsed");
loadIt();


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
	if (request.funkodonko === "setLoadedDataaaaa") {
		console.log("setLoadedData .......................");
		activated = request.activated;
		codeOneURL = request.codeOneURL;
		codeOneTag = request.codeOneTag;
		console.log("setLoadedData tag:" + codeOneTag);
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

	// spændende, egentlig!
	var backgroundPage = chrome.extension.getBackgroundPage();
	backgroundPage.setVariablesCalledFromPopse(codeOneTag, activated);
}

function loadIt() {
	console.log("loadIt 1");
	// Chrome docs: "Pass in null to get the entire contents of storage."
	chrome.storage.local.get(null, function(data) {
		var redditor = stripHTML(data.redditor);
		$('#redditor_inp').val(redditor);
		blockedError = data.blockedError;
		console.log("------------------>blockedError: " + blockedError);
		if (blockedError !== "none" && typeof blockedError !== 'undefined') {
			$( '#blockederror_div' ).show();
			return;
		}


		versionError = data.versionError;
		console.log("------------------>versionError: " + versionError);
		if (versionError !== "none" && typeof versionError !== 'undefined') {
			$( '#versionerror_div' ).show();
			return;
		}
		var pleaseLogInOnRealRedditPage = data.pleaseLogInOnRealRedditPage;
		if (pleaseLogInOnRealRedditPage === "true") {
			$( '#logged_in_with_dif_usernames_error_div' ).show();
			$( '#real_un' ).text("You need to be logged into reddit (in the browser window) with the username: " + redditor);
		}

		$( "#statusSpanner" ).text("");
		var semiSecretHash = data.semiSecretHash;
		if(typeof semiSecretHash === 'undefined' || semiSecretHash === '<loggedout>') {
			authenticated = false;
			return;
		}
		else {
			authenticated = true;
			$( '#before_authenticated_div' ).hide();
			$( '#after_authenticated_home' ).show();
			$( "#statusSpanner" ).css( "color", "green" );
			$( "#statusSpanner" ).text("Ready for action. Please navigate to your favorite reddit comment page to populate these fields and tables...");
		}

		console.log("dat baand: " + JSON.stringify(data));
		if (data.initError === "yes") {
			var statusSpanner = document.getElementById('statusSpanner');
			statusSpanner.innerHTML = "comment-tag.com is down. Please try again in a minute.";
			return;
		}

		
		var redditorSpanner = document.getElementById('redditorSpanner');
		redditorSpanner.innerHTML = "" + redditor;
	
		var totalPKarma = stripHTML("" + data.totalPKarma);
		console.log("loadIt totalPKarma: " + totalPKarma);
		var pKarmaSpanner = document.getElementById('pKarmaSpanner');
		pKarmaSpanner.innerHTML = "" + totalPKarma + "!";
		if (totalPKarma !== 0 && totalPKarma !== 'undefined') {
			$( '#pkarma_table_row' ).fadeIn();
		}

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

		if (createdUTCToGiftsOrNotificationsObject.length === 0) {
			$('#notificationsandgifts-container').append('<div class="popup_section"><h3>No notifications, gifts or penalties...</h3></div>');
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

		for (var i = 0; i < createdUTCToGiftsOrNotificationsObject.length; i++) {
			if (createdUTCToGiftsOrNotificationsObject[i]) {
				var imghyperlink = null;
				var minusOrPlus = null;
				var minusOrPlusText = null;
				var ruleLink = null;
				var commentLink = null;
	
				var timeinfo = null;
				
				var obby = createdUTCToGiftsOrNotificationsObject[i];

				var pointsText = "";
				
				if (obby.type === "gift") {
					var redditorAddressed = stripHTML(obby.obby.redditorAddressed);
					var pageid = stripHTML(obby.obby.pageid);
					var commentid = stripHTML(obby.obby.commentid);
					var when = stripHTML(obby.obby.when);
					var utc = stripHTML(obby.obby.utc);
					var points = stripHTML(obby.obby.points);
					var motivation = stripHTML(obby.obby.motivation);
					var rule = stripHTML(obby.obby.rule);
					var subreddit = stripHTML(obby.obby.subreddit);
					var pagename = stripHTML(obby.obby.pagename);
					var tag = stripHTML(obby.obby.tag);
					
					var tagShortHand = tag.match(/\{([^)]+)\}/)[1];
					var tagCategoryCapital = tagCategories[tagShortHand];
					
					var tagCategory = tagCategoryCapital.toLowerCase();
					
					pointsText = "" + points;

					if (points < 0) {		
						minusOrPlus = 'minus';
						minusOrPlusText = ' <span style="color: red;">' + points + ' <img src="http://comment-tag.com/images/categories/minus.png" width="14"></span>';
					}
					else {
						minusOrPlus = 'plus';
						minusOrPlusText = ' <span>' + points + ' <img src="http://comment-tag.com/images/categories/plus.png" width="14"></span>';
						
					}


// From my jsbin: http://jsbin.com/maxidayeyo/4/


var html = '<div class="header_presentation">' +
    '<a style="cursor: pointer;" class="toggle15">' +
    '<div class="icon_images">' +
     	'<img class="icon_image1" src="http://comment-tag.com/images/categories/' + tagCategory + '.png" width="48"><img class="icon_image2" src="http://comment-tag.com/images/categories/' + minusOrPlus + '.png" width="20">' +
    '</div>' +
    '</a>' +
    '<div class="giftornotif_action">' +
	  '<div class="top_header_section_ra">' +
		'<div class="tag_section_ra">' + tagShortHand + minusOrPlusText + '</div>' +
	  '</div>' +
	  '<div class="giftornotif_content_section_ra">' +
		  '<table>' +
		    '<tr><td style="width: 150px">Time</td><td>' + when + '</td></tr>' +
		    '<tr><td style="width: 150px">Motivation</td><td>"' + motivation + '"</td></tr>' +
		    '<tr><td>Category</td><td>' + tagCategoryCapital + '</td></tr>' +
		    '<tr><td>Subreddit</td><td><a target="_new" href="https://www.reddit.com/r/' + subreddit + '">' + subreddit + '</a></td></tr>' +
		    '<tr><td>Reddit Links</td><td><a target="_new" href=https://www.reddit.com/r/' + subreddit + '/comments/' + pageid + '/' + pagename + '">thread</a>, <a target="_new" href=https://www.reddit.com/r/' + subreddit + '/comments/' + pageid + '/' + pagename + '/' + commentid + '">permalink</a></td></tr>' +
		    '<tr><td>Redditor Addressed</td><td><a target="_new" href="http://comment-tag.com/user.php?redditor=' + redditorAddressed + '">' + redditorAddressed + '</a></td></tr>' +
		    '<tr><td>Rule</td><td><a target="_new" href="http://comment-tag.com/rules/' + tagShortHand + '.php">Link</a></td></tr>' +
		  '</table>' +
		'</div>' +
	'</div>' +
  '</div>';
					
					//console.log("Beforex1" + html);
					html = cleanDomString(html);
					//console.log("Afterx1" + html);
					$('#notificationsandgifts-container').append(html);

				}
				else if (obby.type === "notification") {
					var pageid = stripHTML(obby.obby.pageid);
					var commentid = stripHTML(obby.obby.commentid);
					var when = stripHTML(obby.obby.when);
					var utc = stripHTML(obby.obby.utc);
					var motivation = stripHTML(obby.obby.motivation);
					var rule = stripHTML(obby.obby.rule);
					var subreddit = stripHTML(obby.obby.subreddit);
					var pagename = stripHTML(obby.obby.pagename);
					var tag = stripHTML(obby.obby.tag);
					var tagShortHand, tagCategoryCapital;
					if (tag) { 
						tagShortHand = tag.match(/\{([^)]+)\}/)[1];
						tagCategoryCapital = tagCategories[tagShortHand];
					}


var html;

if (subreddit) {
html = '<div class="header_presentation">' +
    '<a style="cursor: pointer;" class="toggle15">' +
	'<div class="icon_images">' +
     	'<img class="icon_image1" src="http://comment-tag.com/images/categories/browsericonandawkward.png" width="48">' +
	'</div>' +
    '</a>' +
    '<div class="giftornotif_action">' +
      '<div class="top_header_section_ra">' +
      '<div class="tag_section_ra">' + tagShortHand + '</div>' +
      '</div>' +
	  '<div class="giftornotif_content_section_ra">' +
		  '<table>' +
		    '<tr><td style="width: 150px">Time</td><td>' + when + '</td></tr>' +
		    '<tr><td style="width: 150px">Motivation</td><td>"' + motivation + '"</td></tr>' +
		    '<tr><td>Category</td><td>' + tagCategoryCapital + '</td></tr>' +
			'<tr><td> </td></tr>' +
		    '<tr><td>Subreddit</td><td><a target="_new" href="https://www.reddit.com/r/' + subreddit + '">' + subreddit + '</a></td></tr>' +
		    '<tr><td>Reddit Links</td><td><a target="_new" href=https://www.reddit.com/r/' + subreddit + '/comments/' + pageid + '/' + pagename + '">thread</a>, <a target="_new" href=https://www.reddit.com/r/' + subreddit + '/comments/' + pageid + '/' + pagename + '/' + commentid + '">permalink</a></td></tr>' +
		    '<tr><td>Rule</td><td>Link<a target="_new" href="http://comment-tag.com/rules/' + tagShortHand + '.php">Link</a></td></tr>' +
		'</table>' +
      '</div>' +
    '</div>' +
  '</div>';
}
else {
html = '<div class="header_presentation">' +
    '<a style="cursor: pointer;" class="toggle15">' +
	'<div class="icon_images">' +
     	'<img class="icon_image1" src="http://comment-tag.com/images/categories/browsericonandawkward.png" width="48">' +
	'</div>' +
    '</a>' +
    '<div class="giftornotif_action">' +
      '<div class="top_header_section_ra">' +
      '<div class="tag_section_ra">Message for you!</div>' +
      '</div>' +
	  '<div class="giftornotif_content_section_ra">' +
		  '<table>' +
		    '<tr><td style="width: 150px">Time</td><td>' + when + '</td></tr>' +
		    '<tr><td style="width: 150px">Motivation</td><td>"' + motivation + '"</td></tr>' +
			'<tr><td> </td></tr>' +
		'</table>' +
      '</div>' +
    '</div>' +
  '</div>';
}

					//console.log("Beforex2" + html);
					html = cleanDomString(html);
					//console.log("Afterx2" + html);
					$('#notificationsandgifts-container').append(html);









				}
				
			
				// Add some text to the new cells:
				var now = new Date();
				var backThen = createdUTCToGiftsOrNotificationsObject[i].utc * 1000;
				
				timeinfo = "" + timeMagic(now, backThen);
			}
		}
		

		console.log("done0");
		// spændende, egentlig!
		/*var backgroundPage = chrome.extension.getBackgroundPage();
		backgroundPage.clearBadge();
		*/
		//var nyedva = document.getElementById('nyedva');
		console.log("done");


		var friends = data.friends;

		console.log("friends.length: " + friends.length);

		for (var i = 0; i < friends.length; i++) {
			if (friends[i]) {
				// Add some text to the new cells:
				var friendName = friends[i].friend;
				var img = null;
				if (friends[i].imagetype === "man") {
					img = '<img src="http://comment-tag.com/images/avatars/builderman.png" width="48">';
				}
				else if (friends[i].imagetype === "woman") {
					img = '<img src="http://comment-tag.com/images/avatars/builderwoman.png" width="48">';
				}
				else if (friends[i].imagetype === "neutral") {
					img = '<img src="http://comment-tag.com/images/avatars/astronaut.png" width="48">';
				}
				else if (friends[i].imagetype === "custom") {
					img = '<img src="http://comment-tag.com/uplooood/' + friends[i].imagecustom +'" width="48">';
				}


var html = '<div class="header_presentation">' +
    '<a target="_new" href="http://comment-tag.com/user.php?redditor=' + friendName + '">' +
	'<div class="icon_images">' +
     	img +
	'</div>' +
    '</a>' +
    '<div class="giftornotif_action">' +
      '<div class="top_header_section_ra">' +
      	'<div class="tag_section_ra">' + friendName + ' (' + friends[i].total + ')</div>' +
      '</div>' +
    '</div>' +
  '</div>';

				//console.log("Beforex3" + html);
				html = cleanDomString(html);
				//console.log("Afterx3" + html);
				$('#friends-container').append(html);




			}
		}

		console.log("done0");	
		// spændende, egentlig!
		/*var backgroundPage = chrome.extension.getBackgroundPage();
		backgroundPage.clearBadge();
		*/
		//var nyedva = document.getElementById('nyedva');

		console.log("done");

		activated = data.activated;
		if (data.codeOneURL) codeOneURL = data.codeOneURL;
		if (data.codeOneTag) codeOneTag = data.codeOneTag;
		console.log("loadIt tag:" + codeOneTag);

		
		// clear notification count
		var backgroundPage = chrome.extension.getBackgroundPage();
		backgroundPage.clearBadgeText();
		

		console.log("done loading. adding handler...");


		$('.toggle15').click(function() {
		  console.log("click! height: " + $(this).parent().height());
		  //alert($(this).parent().height());
		  if ($(this).parent().height() > 80) {
			$(this).parent().animate(
			  {height: "80px"}, 400);
		  }
		  else if ($(this).parent().height() <= 80) {
			/*$("#giftornotif").animate({height: "360px"});*/
			$(this).parent().animate({height: $(this).parent().get(0).scrollHeight}, 400);
		  }
		  //$('.toggle3').toggle('slow');
		  return false;
		});





		console.log("handlers added.");








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
	"watch.me.playing.soccer.with.myself.in.this.video" : "Bodily",
	"no.i.mean.it" : "Praise",
	"that.pissed.me.off.but.please.dont.mind" : "Anger"
};

// Copied from server.js:
function removeInvalidAttributes(target) {
	var validAttrs = [ "class", "id", "href", "style", "src", "height", "width"]; // mhh originally: 	var validAttrs = [ "class", "id", "href", "style" ];
    var attrs = target.attributes, currentAttr;
    for (var i = attrs.length - 1; i >= 0; i--) {
        currentAttr = attrs[i].name;
        if (attrs[i].specified && validAttrs.indexOf(currentAttr) === -1) {
            target.removeAttribute(currentAttr);
        }
        if (
            currentAttr === "href" &&
            /^(#|javascript[:])/gi.test(target.getAttribute("href"))
        ) {
            target.parentNode.removeChild(target);
        }
    }
}

// Copied from server.js:
function cleanDomString(data) {
    var parser = new DOMParser;
	var tmpDom = parser.parseFromString(data, "text/html").body;
    var list, current, currentHref;
	
    list = tmpDom.querySelectorAll("script"); // mhh originally: list = tmpDom.querySelectorAll("script, img");
    for (var i = list.length - 1; i >= 0; i--) {
        current = list[i];
        current.parentNode.removeChild(current);
    }
    list = tmpDom.getElementsByTagName("*");
    for (i = list.length - 1; i >= 0; i--) {
        removeInvalidAttributes(list[i]);
    }
    return tmpDom.innerHTML;
}

function stripHTML(html_in){
	if (!html_in) return null;
	return html_in.replace(/<[^>]*>?/g, '');
}
