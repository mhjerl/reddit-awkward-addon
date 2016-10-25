/**
 * Created by morten on 20-09-16.
 */

var serverJsonObj;
var tagsAtYourDisposal;
$.fn.exists = function () {
	return this.length !== 0;
}
/*chrome.tabs.onUpdated.addListener(function(tabId,info, tab) {
   if (info.status == "complete") {
   	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!! complete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	//chrome.runtime.sendMessage({funkodonko: "notifyAboutNiceGiftsJustInAndPutThemOnTheShelf", gifts: gifts}, function(response) {  
   }
});*/

/*window.addEventListener("load", myMain, false);
function myMain(evt) {
	/var jsInitCheckTimer = setInterval(checkForJSFinish, 111);
	


}
function checkForJSFinish() {


}*/


// Event listener: listens for messages from inject.js
document.addEventListener('select_an_opt', function(data) {
	var commentId = data.detail.commentId;
	var target = data.detail.targetThing;
	var valuePlain = data.detail.value;
	//alert("Received message dispatched from inject.js: " + commentId + " target: " + target + " valuePlain: " + valuePlain);

	var tagline = "Hello world!";
	if (valuePlain === "awkward") {
		tagline = "An awkward text of at least 20 words, low-key, honest, cautious, reticent, modest, unobstrusive, with exactly one low-key, non-provocative question and one typo.";
	}

	var ruleSpannerId = "ra_rule_spanner_" + commentId;
	var selectId = "ra_select_" + commentId;
	var labelId = "ra_label_" + commentId;
	
	$( '#' + ruleSpannerId ).text( tagline );
	
	//alert(selectId);
	if ($( '#' + selectId ).exists()) {
		$( '#' + labelId ).remove();
		$( '#' + ruleSpannerId ).remove();
	}
});


// Event listener: listens for messages from inject.js
document.addEventListener('small_reply_link_clicked', function(data) {
	var commentId = data.detail.commentId;
	var target = data.detail.targetThing;
	//alert("Received message dispatched from inject.js: " + commentId + " target: " + target);

	var ruleSpannerId = "ra_rule_spanner_" + commentId;
	var linkCheckboxId = "ra_link_chkbx_" + commentId;
	var selectId = "ra_select_" + commentId;
	var labelId = "ra_label_" + commentId;

	var ruleSpanner = '<span style="color: green;" id="' + ruleSpannerId + '"></span>';
	var checkbox = '<label id="' + labelId + '"><input type="checkbox" checked id="' + linkCheckboxId  + '">Link</label>';
	var dropdown = '<select id="' + selectId + '" onchange="rADropdownSelect(this, \'' + commentId + '\')"><option id="header">Please select a Reddit Awkward Tag:</option>';
	var html = ruleSpanner + checkbox + dropdown;
	var optionTagsAtYourDisposal = getArrayOfNiceOptionTagsAtYourDisposal(commentId);
	for (var c = 0; c < optionTagsAtYourDisposal.length; c++) {
		html += optionTagsAtYourDisposal[c];
	}
	html += '</select>';
	
	if (!$( target ).parent().parent().parent().parent().find( "#" + selectId ).exists()) {
		$( target ).parent().parent().parent().parent().find( ".usertext-buttons" ).prepend( html );
	}
});

function getArrayOfNiceOptionTagsAtYourDisposal(cid) {
	if (!tagsAtYourDisposal) { alert("error: no tags in here!"); }
	console.log("tagsAtYourDisposal len: " + tagsAtYourDisposal.length);
	for (var c = 0; c < tagsAtYourDisposal.length; c++) {
		var tagAtYourDisposal = tagsAtYourDisposal[c];
		if (tagAtYourDisposal.id === cid) {
			var tagArray = tagAtYourDisposal.tagsAtYourDisposal;
			console.log("tagArray len: " + tagArray.length);
			var optionElements = [];
			for (var j = 0; j < tagArray.length; j++) {
				var tag = tagArray[j].tag;
				var innerTag = tag.match(/\{([^)]+)\}/)[1];
				var optionElement = '<option id="' + innerTag + '">' + innerTag + '</option>';
				optionElements[j] = optionElement;
			}
			return optionElements;
		}
	}
}
/*
 Assign listenOListenMyFriend() as a listener for messages from the extension.
 */

chrome.runtime.onMessage.addListener(listenOListenMyFriend3);

//console.log("hej fra content scriptet server.js");
function listenOListenMyFriend3(request, sender, sendResponse) {
	//console.log("irriterende dims fra server.js!" + request.funkodonko);
    if (request.funkodonko === "serverMessageIsFineAndReadyEr") {
		//console.log("hej fra server.js!");
        var serverJson = request.sJson;
		serverJsonObj = JSON.parse(serverJson);
		//console.log("Klopstockssisyy");
		dump(serverJsonObj);
		var gifts = JSON.parse(serverJsonObj.gifts);
		//console.log("");
		dump(gifts);
		//$mainPostId = $jsonObj[0]->data->children[0]->data->id;

		////console.log("gifts 2 motivation...: " + gifts[2].motivation);
		browserAction.setBadgeText("" + gifts.length);


		chrome.runtime.sendMessage({funkodonko: "notifyAboutNiceGiftsJustInAndPutThemOnTheShelf", gifts: gifts}, function(response) {
  		////console.log(response.farewell);
		});
    }
	else if (request.funkodonko === "makeDaryAlterationsToView") {
		var s = document.createElement('script');
		s.src = chrome.extension.getURL('data/inject.js');
		// "If you immediately remove the node after inserting the script tag, then the asynchronous script load would be aborted and the script would never run. To avoid that, the the node removal has to be done in an onload event handler:"
		s.onload = function() {
			this.remove();
		};
		(document.head || document.documentElement).appendChild(s);
		
		/*var scripto = '<script type="text/javascript">$(document).ready(function() { $( ".save" ).click(function() { alert( "Handler for .click() called." ); }); });</script>';
		$('head').append(scripto);*/
		
		tagsAtYourDisposal = request.tagsAtYourDisposal;
		console.log("tagsAtYourDisposal len: " + tagsAtYourDisposal.length);
		
		//console.log("Ready to make dary alterations. Length: " + request.allComments.length + " VS length: " + request.viewSetterBunch.length + " members length: " + request.membersOnPage.length);		
		var subreddit = request.subreddit;
		var commentPageId = request.commentPageId;
		console.log("aaaaaaaaaaaaaaaaaaaaab subreddit: " + subreddit + " commentPageId: " + commentPageId);
		var viewSetterBunch = request.viewSetterBunch;
		var allComments = request.allComments;
		var membersOnPage = request.membersOnPage;
		var redditor = request.redditor;
		var colorPointer = 0;
		console.log("viewSetterBunch.length" + viewSetterBunch.length);
		console.log("allComments.length" + allComments.length);

		for (var i = 0; i < allComments.length; i++) {
			for (var j = 0; j < membersOnPage.length; j++) {
				if (membersOnPage[j]['member'] === allComments[i]['author']) {
					var commentId = allComments[i]['id'];
					var tname = "thing_t1_" + commentId;
					//$('#' + tname).css("background", "green");
					var color = "#FDF5E6"; // "OldLace"
					if (redditor !== allComments[i]['author']) {
						color = "#FAFAD2";  // "LightGoldenRodYellow"    //getColorFromScheme(colorPointer);
						colorPointer++;
					}
					$('#' + tname).find('.entry').first().css("background", color);
				}
			}
			for (var j = 0; j < viewSetterBunch.length; j++) {
				if (viewSetterBunch[j]['id'] === allComments[i]['id']) {
					var proceed = true;
					var hasOverrideDupletOrIsItselfOverriding = false;
					for (var k = 0; k < viewSetterBunch.length; k++) {
						if (viewSetterBunch[j]['id'] === viewSetterBunch[k]['id']) {
							// Here: Duplet found
							// Therefore: Find out whether it has override key
							if (viewSetterBunch[k].hasOwnProperty("override")) {
								// Here: Override key exists
								// Therefore: Pay special attention!
								hasOverrideDupletOrIsItselfOverriding = true;
							}
						}
					}
					if (hasOverrideDupletOrIsItselfOverriding) {
						// Here: viewSetter has an overriding duplet or is itself overriding
						// Therefore: Check if this is the one which overrides everything else
						if (!viewSetterBunch[j].hasOwnProperty("override")) {
							// Here: This should be overridden
							// Therefore: Don't proceed
							proceed = false;
						}
					}
					if (proceed) {
						var commentId = allComments[i]['id'];
						//console.log("!a");
						var tname = "thing_t1_" + commentId;
						var color = viewSetterBunch[j]['color'];
						var text = viewSetterBunch[j]['text'];
						var title = viewSetterBunch[j]['title'];
						var exclamation = viewSetterBunch[j]['exclamation'];
						var ruleViolationSpecification = viewSetterBunch[j]['ruleViolationSpecification'];
						var circleCSS = "";
						var tag = viewSetterBunch[j]['tag'];
						var hideViolate = false;
						if (viewSetterBunch[j].hasOwnProperty("hideViolate")){
							//alert("yes, i have that property");
							hideViolate = true;
						}
						if (redditor === allComments[i]['author']) {
							hideViolate = true;
						}

						if (viewSetterBunch[j]['circle']) {
							if (viewSetterBunch[j]['circlecolor'] === "green") {
								circleCSS = "circleEffectGreen ";
							}
							else if (viewSetterBunch[j]['circlecolor'] === "orange") {
								circleCSS = "circleEffectOrange ";
							}
						}
					
	 					var html = '<li><span title="' + title + '" style="color: ' + color + '" class="' + circleCSS + 'tab">' + text  + '</span></li>';

						var gubbe = $('#' + tname);
						//var sizegubbe = $('#' + tname).html().length;
						$('#' + tname).find(".flat-list").first().append(html);






					
						if (!hideViolate) {
							var ruleViolationSpecification2 = "Report Reddit Awkward rule violation!";
							if (ruleViolationSpecification) {
								ruleViolationSpecification2 = ruleViolationSpecification;
							}
							html = '<li><span title="' + ruleViolationSpecification2 + '" style="color: red" class="tab"><a target="_blank" href="https://redditawkward.com/p/report_rule_violation.php?subreddit=' + subreddit + '&commentid=' + commentId + '&tag=' + tag + '">violation!</a></span></li>';

							gubbe = $('#' + tname);
							//var sizegubbe = $('#' + tname).html().length;
							$('#' + tname).find(".flat-list").first().append(html);
							//console.log("lengo: " + sizegubbe);
						}


						//var stubbe = $('#' + tname).find(".flat-list").last().html();
						////console.log("stubbe: " + stubbe);

					

										




						/*//$('div[id^="list_"]')
						//$('#' + tname).find('form[id^="form-' + tname + '"]"').first().append(html);
						var formsel = 'form[id^="form-' + tname + '"]';
						console.log("formsel: " + formsel);
						var h = $('#' + tname).find(formsel).first().html();
						console.log("h: " + h);
						*/








						/*var html2 = $('#' + tname).find(".usertext-body").find(".md").first().html();
						var img = '<img src="https://denandenavis.dk/primalanding2/images/preview/team-member1.jpg" height="65">';
						var html3 = '<div class="wrapComment">';
						html3 = html3 + '<div class="wrapCommentPartLeft"><div class="md">' + html2 + '</div></div>';
						html3 = html3 + '<div class="wrapCommentPartRight">' + img + '</div>';
						html3 = html3 + '</div>';
						//$('#' + tname).find(".usertext-body").find("p").first().append(img);
						$('#' + tname).find(".usertext-body").empty();
						$('#' + tname).find(".usertext-body").append(html3);
						//$('#' + tname).append(img);*/
					
						var html2 = $('#' + tname).find(".usertext-body").first().find(".md").first().html();
						var img = '<div class="redditorImage"><a href="https://redditawkward.com/p/"><img src="https://redditawkward.com/temp/team-member3.jpg" height="65"></a></div>';
						var html3 = '<div class="wrapComment">';
						var urlImgo = chrome.extension.getURL('/data/openquote1.gif');
						html3 = html3 + '<div class="wrapCommentPartLeft"><div class="md">' + html2 + '</div></div>';
						html3 = html3 + '<div class="wrapCommentPartRight"><div class="wrapRightComment"><div class="wrapCommentPartLeft"><span class="triangle-border right"><span class="blockquote.style1"><span style="font-size:18px;">“</span>' + exclamation + '<span style="font-size:18px;">“</span></span></span></div><div class="wrapCommentPartRight">' + img + '</div></div></div>';
						html3 = html3 + '</div>';
						//$('#' + tname).find(".usertext-body").find("p").first().append(img);
						$('#' + tname).find(".usertext-body").first().empty();
						$('#' + tname).find(".usertext-body").first().append(html3);
						//$('#' + tname).append(img);
					
						console.log("viewSetterBunch[j]['tag']: " + viewSetterBunch[j]['tag']);
					
	




					
						if (viewSetterBunch[j]['garble']) {
							console.log("this viewsetter is garbled:" + viewSetterBunch[j]['id']);
							var originalHtml = $('#' + tname).find(".md").first().html();
							console.log("originalHtml:" + originalHtml);
							var cleanText = $(originalHtml).text(); // Let jQuery strip the tags off the string
							console.log("cleanText:" + cleanText);
							$('#' + tname).find(".md").first().empty();
							var garbledHtml = "";
							var colorPointer = 0;
							var colors = ["#D2691E","#8B008B","#DC143C","#FF1493","#008000","#0000CD","#808000"];
							for (var a = 0; a < cleanText.length; a++) {
								var charThing = cleanText.charAt(a);
								if (colorPointer >= colors.length) { colorPointer = 0; }
								var fontSize = getRandomInt(8, 16);
								var garbling = '<span style="color: ' + colors[colorPointer] + '; font-size:' + fontSize + 'px ;">' + charThing  + '</span>';
								garbledHtml = garbledHtml + garbling;
								colorPointer++;
							}
							//var garbledHtml = '<span style="color: ' + color + '" class="' + circleCSS + 'tab">' + text  + '</span></li>';
							$('#' + tname).find(".md").first().append(garbledHtml);
						}



						if (viewSetterBunch[j]['tag'] === "reddit.awkward{waits.for.anyone}") {
							$('#' + tname).find('.entry').first().css("border", "5px dotted "  + getColorFromScheme(0));
						}
						else if (viewSetterBunch[j]['tag'] === "reddit.awkward{waits.for.anyone}") {
							$('#' + tname).find('.entry').first().css("border", "5px dotted "  + getColorFromScheme(1));
						}
						else if (viewSetterBunch[j]['tag'] === "reddit.awkward{waits.for.your.reply.only}") {
							$('#' + tname).find('.entry').first().css("border", "5px dotted "  + getColorFromScheme(2));
						}
					}
				}
			}


/*

			var listItems = $("#productList li");
			listItems.each(function(idx, li) {
    			var product = $(li);

    			// and the rest of your code
			});

			//$('[class^="tab"]').css('color', 'red');






			$("#header ul").append('<li><a href="/user/messages"><span class="tab">Message Center</span></a></li>');





			var suppe = $('[class^="' + commentId + '"]');
			//console.log("b");
			var duppe = $(mainClassNameWithWildcard).html();
			//console.log("Så er der suppe! Suppe? Sup-sup!");
			//console.log(duppe);

			var magicalFlatListUL = $(mainClassNameWithWildcard).find(".flat-list ul");
		


			var magicalFlatListULHtml = $(mainClassNameWithWildcard).find(".flat-list ul").html();
			//console.log();
			//console.log(magicalFlatListULHtml);*/
		}
		sendResponse({msg: "kuk-kuk program?" });
    }





}

var colorScheme = ["#DEB887", "#FFEBCD", "#FAEBD7", "#F0F8FF", "#00FFFF", "#F5F5DC", "#FFF8DC", "#FFFACD", "#ADD8E6", "#F08080", "#00FF00", "#66CDAA", "#FFE4E1", "#AFEEEE", "#FFEFD5", "#DDA0DD", "#FFF5EE"];

function getColorFromScheme(n) {
	var m = n;
	if (m >= colorScheme.length) {
		var p = Math.floor(m/colorScheme.length);
		m = m - p * colorScheme.length;
	}
	return colorScheme[m];
}




function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }
    //console.log(out);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
