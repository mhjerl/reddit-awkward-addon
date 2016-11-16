//console.log("----------------- daftust ----------------------------hi from background.js");
var redditor;
var pageJson;
var serverJson;
var imagetype;
var imagecustom;
var codeOneURL = "";
var codeOneTag = "";
var activated = false;
var membersOnPage = [];
var tagsAtYourDisposal;
var conflictRedditorsOnPage;
var allCommentsWithAllEntries = [];
var viewSetterBunch = [];
var loadCounter = 0;
var subreddit;
var commentPageId;
var pageName;
var semiSecretHash;
var tabURL;
var domain;
var disqusThreadID;
var justInstalled;


chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
	if (info.status == "complete") {
		var url = tab.url;
		codeOneURL = stripQueryString(url);
        codeOneURL =  stripTrailingSlash(codeOneURL);
		
		console.log("??????????????????????????????? complete ??????????????????????????????????" + codeOneURL);

		processReddit(codeOneURL);

	}
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	console.log("a");
    if (request.funkodonko == "authenticateFromPopseToBackground") {
	console.log("b");
		var xhr = new XMLHttpRequest();
		var url = "http://comment-tag.com/server/authenticate.php?hash=" + request.hash;
		xhr.open("GET", url, true);  // true indicates asynchronous
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4) {
		        var responsoo = xhr.responseText;
				var responsooObby = JSON.parse(responsoo);
				if (responsooObby.msg === "correcthash") {
					sendResponse({
						auth: true
					});
				}
				else {
					sendResponse({
						auth: false
					});
				}
		    }
		}
		xhr.send();
	}
});

function initCalledFromInjectScript() {
	console.log("initCalledFromInjectScript");
	processReddit(codeOneURL);
}


function logOnDOMContentLoaded(details) {
    console.log("--------------a b u t--------------" + details.url);
	







	//processReddit(details.url);










}

chrome.webNavigation.onDOMContentLoaded.addListener(logOnDOMContentLoaded);


//console.log("----------------- lapotska ----------------------------hi from background.js");


function initAsynchronous(redditurl) {
	//console.log("glame");



	subreddit = getSegment(redditurl, 2);
	commentPageId = getSegment(redditurl, 4);
	pageName = getSegment(redditurl, 5);
	pageName = encodeURIComponent(pageName); // BUG5_ fix
	
	if (!commentPageId) {
		console.log("Not a reddit comment page. Returning");
		return;
	}

	if(typeof semiSecretHash === 'undefined' || semiSecretHash === '<loggedout>') {
		chrome.browserAction.setIcon({
			path : "data/off1.png"
		});
		console.log("No hash. Returning");
		return;
	}

	chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"}); // purple
	chrome.browserAction.setBadgeText({text: "Wait"});

	
	var url = "http://comment-tag.com/server/init.php?redditor=" + redditor + "&hash=" + semiSecretHash +  "&subreddit=" + subreddit +"&commentpageid=" + commentPageId +"&pagename=" + pageName + "&strictversion=1";
	

	console.log("init url: " + url);










	var xhr = new XMLHttpRequest();
    console.log("dabut2: " + redditor);
	
    xhr.open("GET", url, true);  // true indicates asynchronous
    //console.log("dupse");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            serverJson = xhr.responseText;
            console.log("glot: " + serverJson.length);
			console.log(serverJson);
			
			if (!serverJson.startsWith("{")) {
				// Also correct
				chrome.browserAction.setIcon({
					path : "data/off1.png"
				});
				set("initError", "yes");
			}
			else {
				chrome.browserAction.setIcon({
				  path : "data/on1.png"
				});
				set("initError", "no");
			}
			
			set("redditor", redditor);
			var serverJsonObj = JSON.parse(serverJson);
			//console.log("Klopstockssisyy");
			var blockedError = serverJsonObj.blockedError;
			set("blockedError", blockedError);
			if (blockedError !== "none" && typeof blockedError !== 'undefined') {
				chrome.browserAction.setIcon({
					path : "data/off1.png"
				});
				chrome.browserAction.setBadgeText({
					'text': ''
				});
				console.log("Redditor is blocked. Returning");
				return;
			}

		

			var versionError = serverJsonObj.versionError;
			set("versionError", versionError);
			
			//dump(serverJsonObj);
			var gifts = JSON.parse(serverJsonObj.gifts);
			//console.log("");
			//dump(gifts);
			

			//console.log("Klossk");
			
			set("gifts", gifts);




			//if (!serverJsonObj.accountType) { console.log("non!"); } else { console.log("oui!"); }
			//dump(serverJsonObj.accountType);

			var accountType = serverJsonObj.accountType;
			set("accountType", accountType);
			console.log("accountType: " + accountType);







			var notifications = JSON.parse(serverJsonObj.notifications);
			//console.log("");
			//dump(notifications);
			
			//$mainPostId = $jsonObj[0]->data->children[0]->data->id;

			//console.log("Klossk");
			
			set("notifications", notifications);







			var friends = JSON.parse(serverJsonObj.friends);
			//console.log("");
			set("friends", friends);
			//dump(friends);
			

			//console.log("Klossk");


			var totalRelationalKarma = JSON.parse(serverJsonObj.totalRKarma);
			//console.log("totalPKarma: " + totalPKarma);
			set("totalRKarma", totalRelationalKarma);



			imagetype = serverJsonObj.imagetype;
			imagecustom = serverJsonObj.imagecustom;




			membersOnPage = JSON.parse(serverJsonObj.membersOnPage);
			//console.log("membersOnPage length: " + membersOnPage.length);
			set("membersOnPage", membersOnPage);



			var totalPKarma = JSON.parse(serverJsonObj.totalPKarma);
			//console.log("totalPKarma: " + totalPKarma);
			set("totalPKarma", totalPKarma);

			
			tagsAtYourDisposal = JSON.parse(serverJsonObj.tagsAtYourDisposal);
			//console.log("tagsAtYourDisposal: " + tagsAtYourDisposal);
			
			conflictRedditorsOnPage = JSON.parse(serverJsonObj.conflictRedditorsOnPage);
			

			var popups = chrome.extension.getViews();
			if (popups.length != 0) {
				var popup = popups[0];
				popup.loadIt();
			}

			chrome.browserAction.setBadgeBackgroundColor({color: "#933ec5"}); // purple
			chrome.browserAction.setBadgeText({text: (gifts.length + notifications.length).toString()});
			processReddit3();

			
        }
    }
    xhr.send();
}

function clearBadgeText() {
	chrome.browserAction.setBadgeText({
		'text': ''
	});
}

function set(key, value) {
	chrome.storage.local.set({
		[key]: value
	}, function () {
		if(chrome.runtime.lastError) {
			//console.log("errr: " + chrome.runtime.lastError);
		} else {
			////console.log("set done!");
		}
	});
	
}

function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    console.log(out);
}

function extractDomain(url) {
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	var domain = matches && matches[1];
	return domain;
}

var getSegment = function (url, index) {
	return url.replace(/^https?:\/\//, '').split('/')[index];
}

function processDisqus(url) {
	/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {funkodonko: "getDisqusThreadID"}, function(response) {
		    //console.log("response: " + response.redditor);
			if (response.found) {
				var disqusThreadID = response.disqusThreadID;
				console.log(">disqusThreadID: " + disqusThreadID);
			}
			console.log("hello world2");
		});
    });*/
}
// thread link:http://comment-tag.com/rules/your.comment.inspired.me.html
function processReddit(url) {
	console.log("-------------- k a b u t --------------" + url);
	/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {funkodonko: "getTabURLFromUtilJS"}, function(response) {
            //console.log("response: " + response.redditor);
            tabURL = response.tabURL;
			console.log("tabURL: " + tabURL);
			console.log("hello world"); 
			domain = extractDomain(tabURL);
			console.log("domain: " + domain);
			if (domain === "www.reddit.com") {
				processReddit11(url);
			}
			else {
				processDisqus(url);
			}
			
		});
    });*/
	domain = extractDomain(url);
	console.log("domain: " + domain);
	if (domain === "www.reddit.com") {
		processReddit11(url);
	}
	else {
		processDisqus(url);
	}
}


function processReddit11(url) {
	if (url.indexOf("https://www.reddit.com/") === 0) {
		subreddit = getSegment(url, 2);
		commentPageId = getSegment(url, 4);
		pageName = getSegment(url, 5);
		console.log("ooooooooooooooooooooooo subreddit: " + subreddit + " commentPageId: " + commentPageId);
		/* loadCounter++;
	}
	if (loadCounter > 4) { */
		////console.log("----------           ---------------         ------------ > processReddit url:"+url);
		console.log("calling loadIt...");
		loadIt();
		console.log("calling loadIt...done");
        console.log("arthurquonnosk: " + url);
        console.log("arthurguk: "+codeOneURL);




        /*if (!pageJson) {
         loadPageJson();
         return;
         }*/

        //console.log("dabut");
        var xhr = new XMLHttpRequest();
        //console.log("dabut2");
        xhr.open("GET", codeOneURL + ".json", true);
        //console.log("dabut3");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                pageJson = xhr.responseText;
                console.log("klabonk:");
                initAsynchronous(url);
            }
        }
        xhr.send();
        //console.log("krabat");
    }

}


function processReddit3() {
    ////console.log("fredesen");
    //console.log("redd: " + redditor);
	//console.log("arbsadut: " + codeOneURL);
    var a = getSegment(codeOneURL, 3);
	//console.log("arbsa");
    if (a && a === "comments") {
        //console.log("tab: in comment section of reddit.com");
        runScriptW(codeOneTag, pageJson, conflictRedditorsOnPage);
        //console.log("timmer: allCommentsWithAllEntries.len: " + allCommentsWithAllEntries.length);
		/*for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
			var cid = allCommentsWithAllEntries[i]['id'];
			//console.log("id:" + cid);
		}*/
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {funkodonko: "makeDaryAlterationsToView", allComments: allCommentsWithAllEntries, viewSetterBunch: viewSetterBunch, membersOnPage: membersOnPage, tagsAtYourDisposal: tagsAtYourDisposal, redditor: redditor, subreddit: subreddit, commentPageId: commentPageId, imagetype: imagetype, imagecustom: imagecustom}, function(response) {
				console.log("resp from server.js: " + response.msg);
				if (response.msg === "pli") {
					set("pleaseLogInOnRealRedditPage", "true");
				}
				else {
					set("pleaseLogInOnRealRedditPage", "false");
				}
				//console.log("response: " + response.msg);
			});
		});






    }
    else {
        //console.log("tab: in overview section of reddit.com");
        processMainPage();
        ////console.log("tab: in overview section of reddit.com DONE");
    }

}


function getSegment(url, index) {
	//console.log("gs1");
    return url.replace(/^https?:\/\//, '').split('/')[index];
	//console.log("gs2");
}


function processMainPage() {
    //console.log("bmx!" + codeOneURL + ".json");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", codeOneURL + ".json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            pageJson = xhr.responseText;
            processMainPage3();
        }
    }
    xhr.send();
}

var jsonsOfCommentPagesArray;
var arrayOfPermalinks;
var arrayOfMainPagePostIds;

function processMainPage3() {
    //console.log("bmput!!");
    arrayOfPermalinks = [];
    arrayOfMainPagePostIds = [];
    var jsonObj = JSON.parse(pageJson);
    var c = jsonObj.data.children;
    //console.log("children: " + c.length);
    for (var i = 0; i < c.length; i++) {
        //console.log("a");
        arrayOfPermalinks.push("https://www.reddit.com/" + stripTrailingSlash(c[i].data.permalink));
        //console.log("b" + "https://www.reddit.com/" + stripTrailingSlash(c[i].data.permalink));
        arrayOfMainPagePostIds.push(c[i].data.id);
        //console.log("c" + c[i].data.id );
    }
    permaHaarPointer = 0;
    jsonsOfCommentPagesArray = [];
    //console.log("d" + arrayOfPermalinks.length );
    if (arrayOfPermalinks.length > 0) processMainPage4();
}

var permaHaarPointer;
function processMainPage4() {
    if (permaHaarPointer < arrayOfPermalinks.length) {
        //console.log("e");
        var u = arrayOfPermalinks[permaHaarPointer] + ".json";
        //console.log("url: " + u);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", u, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                jsonsOfCommentPagesArray.push(xhr.responseText);
                ////console.log("plimseplimseplimseplimseplimseplimseplimse" + jsonsOfCommentPagesArray.length);
                processMainPage4();
            }
        }
        xhr.send();
        permaHaarPointer++;
    }
    else { // <--- means we've finished cycling!
        //console.log("boogy boogy boogy boogy boogy boogy boogy boogy ");
/*
deprecated


        runScriptP(arrayOfMainPagePostIds, jsonsOfCommentPagesArray);
*/
    }
}

//console.log("--------------------------------------------------------------------------------hello from background script!");


function stripTrailingSlash(site)
{
    return site.replace(/\/+$/, '');
}

function stripQueryString(url) {
  return url.split("?")[0];
}

function setVariablesCalledFromPopse(tag, ac) {
    codeOneTag = tag;
    activated = ac;
}




/*function authenticateCalledFromPopse(hash) {
	console.log("hash: " + hash);
	set("authenticated", "connectionerror");
	var xhr = new XMLHttpRequest();
	var url = "http://comment-tag.com/server/authenticate.php?hash=" + hash;
    xhr.open("GET", url, true);  // true indicates asynchronous
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var responsoo = xhr.responseText;
			var responsooObby = JSON.parse(responsoo);
			if (responsooObby.msg === "correcthash") {
				//set("authenticated", "correcthash");
				chrome.runtime.sendMessage({request: "authenticateFromBackgroundToPopse", auth: true}, function(response) {
					if (response.done) {
						//doSomething();
					}
				});
			}
			else {
				//set("authenticated", "wronghash");
				chrome.runtime.sendMessage({request: "authenticateFromBackgroundToPopse", auth: false}, function(response) {
					if (response.done) {
						//doSomething();
					}
				});
			}
        }
    }
    xhr.send();
}*/

function loadIt() {
    //console.log("loadIt 1");
    chrome.storage.local.get(null, function(data) {
		
		var storageValue = data.storageKey;
		if(typeof storageValue !== 'undefined'){
			justInstalled = false;
		}
		else {
			justInstalled = true;
		}
		console.log("get: justInstalled: " + justInstalled);
		set("storageKey", "storageValue");
		//if (!justInstalled) alert("was null");
        ////console.log("dat baand: " + JSON.stringify(data));
        activated = data.activated;
        if (data.codeOneURL) codeOneURL = data.codeOneURL;
        if (data.codeOneTag) codeOneTag = data.codeOneTag;
        //console.log("loadIt tag:" + codeOneTag);


		redditor = data.redditor;
		semiSecretHash = data.semiSecretHash;
		console.log("done loading from storage.");

    });
}

function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function startsWith(haystack, needle) {
    return (haystack.indexOf(needle) == 0);
}

function countMatches(a,b) {
    var c = 0;
    for (i = 0; i < a.length; i++) {
        if (a[i] === b) c++;
    }
    return c;
}


var substi = [
    "bliver", "sappulaja",
    "bort", "Dragsholm",
    "da", "kabut",
    "dag", "telefjorn",
    "de", "gyrba",
    "dem", "leef",
    "den", "kribbelhorn",
    "der", "salta",
    "deres", "njorn",
    "det", "spunk",
    "dig", "KungFu",
    "dog", "landstryger",
    "et", "ugle",
    "far", "sætter",
    "fik", "bjørnenene",
    "fin", "fene",
    "for", "fenene",
    "forbi", "fenenene",
    "fordi", "gjong",
    "fra", "dammsugar",
    "fri", "svata",
    "få", "tykkelt",
    "gik", "travhestenene",
    "glad", "smede",
    "godt", "knave",
    "ham", "sodden",
    "hans", "bung",
    "har", "rant",
    "havde", "vexing",
    "have", "gnarled",
    "hele", "thwack",
    "heller", "giggle",
    "hen", "sizzle",
    "hende", "moo",
    "her", "glug",
    "hjem", "eek",
    "hun", "brring",
    "hvad", "splosh",
    "hvem", "pitter",
    "hver", "groan",
    "hvilke", "waffle",
    "hvis", "tsk",
    "hvor", "ticktock",
    "igen", "clink",
    "ikke", "bam",
    "ind", "howl",
    "jeg", "drip",
    "jer", "swoosh",
    "jeres", "boom",
    "jo", "snip",
    "kan", "moan",
    "kom", "vroom",
    "kommer", "clunk",
    "kun", "chirp",
    "kunne", "phew",
    "lang", "splash",
    "lidt", "belch",
    "lige", "cheep",
    "lille", "bong",
    "løb", "beep",
    "man", "growl",
    "mange", "mutter",
    "med", "snuffle",
    "meget", "slurp",
    "men", "DuaneNorsker",
    "mere", "jangle",
    "mig", "woof",
    "min", "splat",
    "mod", "thud",
    "må", "hiccup",
    "ned", "itch",
    "nej", "chomp",
    "noget", "gasp",
    "nok", "bawl",
    "nu", "cacke",
    "når", "ahem",
    "og", "numsakkakorobjon",
    "også", "truffle",
    "om", "doughnut",
    "op", "crackers",
    "os", "apricots",
    "over", "muesli",
    "på", "paella",
    "sagde", "pretzels",
    "se", "chowder",
    "selv", "coconut",
    "sidste", "apples",
    "sig", "abalone",
    "siger", "syrup",
    "sin", "pudding",
    "sine", "gatorade",
    "skal", "vegetables",
    "skulle", "sausage",
    "små", "cordial",
    "som", "lollies",
    "stor", "basmati",
    "store", "polenta",
    "så", "pistachio",
    "tid", "pepper",
    "til", "springbalsamin",
    "tog", "spenderbukser",
    "ud", "pernittengryn",
    "under", "pragtfuldt",
    "var", "uforlignelig",
    "ved", "træls",
    "vi", "råhygge",
    "vil", "hurlumhej",
    "ville", "plutte",
    "være", "tusmørke",
    "været", "kålhøgen",
    "år", "ogginok"
];
