/**
 * Created by morten on 20-09-16.
 */

var serverJsonObj;
var tagsAtYourDisposal;
var commentPageId;
$.fn.exists = function () {
	return this.length !== 0;
}

// Event listener: listens for messages from inject.js
document.addEventListener('select_an_opt', function(data) {
	var commentId = data.detail.commentId;
	var valuePlain = data.detail.value;
	//alert("Received message dispatched from inject.js: " + commentId + " valuePlain: " + valuePlain);

	var tagline = ""; // "Hello world!";
	if (valuePlain === "awkward") {
		tagline = "An awkward text of at least 20 words, low-key, honest, cautious, reticent, modest, unobtrusive, with exactly one low-key, non-provocative question and one typo.";
	}

	var ruleSpannerId = "ra_rule_spanner_" + commentId;
	var selectId = "ra_select_" + commentId;
	var labelId = "ra_label_" + commentId;
	var divId = "ra_inserted_div_" + commentId;
	
	$( '#' + ruleSpannerId ).text( tagline );
	
	//alert(selectId);
	if ($( '#' + divId ).exists()) {
		console.log("removing div with dropdown");
		$( '#' + divId ).remove();
		//$( '#' + ruleSpannerId ).remove();
	}
});


// Event listener: listens for messages from inject.js
document.addEventListener('bug4_fix_event', function(data) {
	//dump(data);
	//console.log("Received message dispatched from inject.js: parentElementId: " + parentElementId);
	//alert("Received message dispatched from inject.js: " + commentId);

	var commentId = data.detail.commentId;
	var parentElementId = data.detail.parentElementId;

	console.log("removing ra_first_post_div from here. (BUG4_)");
	for (var a = 0; a < 10; a++) {
		$("[id^=ra_first_post_div" + a + "]").remove();
	}
	console.log("applied fix for BUG4_");
});


// Event listener: listens for messages from inject.js
document.addEventListener('small_reply_link_clicked', function(data) {
	//dump(data);
	//console.log("Received message dispatched from inject.js: parentElementId: " + parentElementId);
	//alert("Received message dispatched from inject.js: " + commentId);
	$("[id^=ra_inserted_div_]").remove();
	var commentId = data.detail.commentId;
	var parentElementId = data.detail.parentElementId;
	console.log("calling addControls from event handler...");
	addControls(commentId, parentElementId);
});


// Event listener: listens for messages from inject.js
document.addEventListener('load_more_clicked', function(data) {
	//dump(data);
	//console.log("Received message dispatched from inject.js: parentElementId: " + parentElementId);
	//alert("Received message dispatched from inject.js: " + commentId);
	$("[id^=ra_inserted_div_]").remove();
	var commentId = data.detail.commentId;
	var parentElementId = data.detail.parentElementId;
	console.log("calling addControls from event handler...");
	addControls(commentId, parentElementId);
});




function addControls(commentId, parentElementId) {
	console.log("hello from addControls: " + commentId + " " + parentElementId);
	var bugOneFixVarIsResponseToMyself = false;
	
	

	var ruleSpannerId = "ra_rule_spanner_" + commentId;
	var linkCheckboxId = "ra_link_chkbx_" + commentId;
	var selectId = "ra_select_" + commentId;
	var labelId = "ra_label_" + commentId;
	var divId = "ra_inserted_div_" + commentId;
	var isMainPost = false;
	if (parentElementId === "usertext-buttons") {
		divId = "ra_first_post_div";
		isMainPost = true;
	}
	

	var ruleSpanner = '<span style="color: green;" id="' + ruleSpannerId + '"></span>' +                                                '<br>';
	var checkbox = '<label id="' + labelId + '"><input type="checkbox" checked id="' + linkCheckboxId  + '">Link</label>' +             '<br>';
	var dropdown = '<select id="' + selectId + '" onchange="rADropdownSelect(this, \'' + commentId + '\', ' + isMainPost + ')">';
	var html = '<div id="' + divId + '">' + ruleSpanner + checkbox + dropdown;
	var optionTagsAtYourDisposal = getArrayOfNiceOptionTagsAtYourDisposal(commentId);
	if (optionTagsAtYourDisposal) {
		console.log("optionTagsAtYourDisposal isn't null");
		html += '<option id="ra_select_header_' + commentId + '">Please select a Comment Tag:</option>';
		// Here: We can't be certain there are any tags at all at our disposal, but in this case there are
		// Therefore: Create option list for select
		for (var c = 0; c < optionTagsAtYourDisposal.length; c++) {
			html += optionTagsAtYourDisposal[c];
		}
	}
	else {
		bugOneFixVarIsResponseToMyself = true;
		console.log("optionTagsAtYourDisposal is null");
		// Here: No option tags for this cid
		// Therefore: Put "No Comment Tag Tags available
		html += '<option id="ra_select_header_' + commentId + '">Please select a Comment Tag:</option>';
		html += '<option>' + intuitiveTagNames['your.comment.inspired.me'] + '</option>';
		html += '<option>' + intuitiveTagNames['waits.for.anyone'] + '</option>';
		html += '<option>' + intuitiveTagNames['waits.for.your.reply.only'] + '</option>';
		html += '<option>' + intuitiveTagNames['i.consider.this.comment.definitive.and.consider.any.reply.inappropriate'] + '</option>';
		html += '<option>' + intuitiveTagNames['a.warm.welcome.to.my.world.without.a.naive.invitation.to.be.my.friend'] + '</option>';	
	}
	html += '</select><br></div>';
	if ($('#siteTable').find('#thing_t3_' + commentId).exists()) {
		console.log("------------------------------->11exista");
	}
	else {
		console.log("------------------------------->11no-no exista");
	}	
	if ($('#siteTable').find('#thing_t3_' + commentId).find( ".usertext-buttons" ).first().exists()) {
		console.log("------------------------------->22exista");
	}
	else {
		console.log("------------------------------->22no-no exista");
	}
	if ($('.usertext-buttons').first().exists()) {
		console.log("------------------------------->3exista");
	}
	else {
		console.log("------------------------------->3no-no exista");
	}
	if (parentElementId === "usertext-buttons") {
		console.log("adding first control...." + divId);
		if ($( "#" + divId).length == 0) { // here divId is always: "ra_first_post_div"
			//console.log("------------------------->length of first" + $('.usertext-buttons').first().length());
			//dump ($('.usertext-buttons').first());
			console.log("---------------------------------> IMPORTANT: length of first: " + $('.usertext-buttons').first().length)
			
			$(".usertext-edit > div:nth-child(1)").after(html);


			
			//$('.usertext-buttons').first().prepend( html );
			if (!$( "#" + divId).exists()) {
				console.log("error: div not found. div not prepended. trying again...");
				/*$( '#' + divId).find('.usertext-buttons').prepend( html );
				if (!$( "#" + divId).exists()) {
					console.log("error: div still not found. div still not prepended");
				}
				else {
					console.log("found div. div prepended.");
				}*/
			}
			else {
				console.log("found div. div prepended.");
			}
		}
		else {
			console.log("------------------------->top select found!");
		}










		//$('.usertext-buttons').first().prepend( html );
		//console.log("added dropdown for main post/link");

















		// Fix for BUG3_:
		/*if (!$("#" + divId).is(":visible")) { // BUG3_ FIX - FAILED
			//console.log("applied BUG3_ FIX");
			//$( ".usertext-buttons" ).prepend( html );
		}*/
	}
	else if (!$( "#" + parentElementId ).find( "#" + selectId ).exists()) {
		console.log("select doesn't exist. html: " + html);
		if (!$( "#" + parentElementId ).find( ".usertext-buttons" ).first().exists()) {
			console.log("Couldn't find 1");
		}
		else {
			console.log("Could find 1");
		}
		if (!$( "#" + parentElementId ).find( ".usertext-buttons" ).exists()) {
			console.log("Couldn't find 2");
		}
		else {
			console.log("Could find 2");
		}
		if (!$( "#" + parentElementId ).exists()) {
			console.log("Couldn't find 3");
		}
		else {
			console.log("Could find 3");
		}
		if (bugOneFixVarIsResponseToMyself) {
			// Here: Reddit JS code unfolds html elements different if firstperson==secondperson
			// Therefore: Use "last"
			$( "#" + parentElementId ).find( ".usertext-buttons" ).last().prepend( html );
		}
		else {
			$( "#" + parentElementId ).find( ".usertext-buttons" ).first().prepend( html );
		}
		if (!$("#" + divId).is(":visible")) { // BUG2_ FIX
			console.log("applied BUG2_ FIX");
			$( "#" + parentElementId ).find( ".usertext-buttons" ).prepend( html );
			console.log(html);
		}
	}
	else {
		console.log("select does exist. not adding: " + selectId);
	}

	console.log("Tubbilup!");



}




function getArrayOfNiceOptionTagsAtYourDisposal(cid) {
	if (!tagsAtYourDisposal) { console.log("ERROR ERROR ERROR ERROR ERROR: no tags in here!"); }
	console.log("->tagsAtYourDisposal len: " + tagsAtYourDisposal.length + " cid: " + cid);
	//dump(tagsAtYourDisposal);
	for (var c = 0; c < tagsAtYourDisposal.length; c++) {
		var tagAtYourDisposal = tagsAtYourDisposal[c];
		//dump(tagAtYourDisposal);
		if (tagAtYourDisposal.id === cid) {
			var tagArray = tagAtYourDisposal.tagsAtYourDisposal;
			if (tagArray == null) {
				console.log("tagArray is null. returning null");
				// Here: Special situation: No tags, because redditor is trying to reply to himself without replying to comment-tag{your.comment.inspired.me}
				// Therefore: Simply return null
				return null;
			}
			console.log("tagArray len: " + tagArray.length);
			var optionElements = [];
			for (var j = 0; j < tagArray.length; j++) {
				var tag = tagArray[j].tag;
				var innerTag = tag.match(/\{([^)]+)\}/)[1];
				var intuitiveTagName = intuitiveTagNames[innerTag];
				var optionElement = '<option>' + intuitiveTagName + '</option>';
				console.log("------------------------------------------------------------>" + optionElement);
				optionElements[j] = optionElement;
			}
			return optionElements;
		}
	}
	return null;
}

/*
 Assign listenOListenMyFriend() as a listener for messages from the extension.
 */

chrome.runtime.onMessage.addListener(listenOListenMyFriend3);

//console.log("hej fra content scriptet server.js");
function listenOListenMyFriend3(request, sender, sendResponse) {
	//console.log("irriterende dims fra server.js!" + request.funkodonko);
	if (request.funkodonko === "makeDaryAlterationsToView") {
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
		console.log("2tagsAtYourDisposal len: " + tagsAtYourDisposal.length);
		
		//console.log("Ready to make dary alterations. Length: " + request.allComments.length + " VS length: " + request.viewSetterBunch.length + " members length: " + request.membersOnPage.length);		
		var subreddit = request.subreddit;
		commentPageId = request.commentPageId;
		console.log("aaaaaaaaaaaaaaaaaaaaab subreddit: " + subreddit + " commentPageId: " + commentPageId);
		var viewSetterBunch = request.viewSetterBunch;
		var allComments = request.allComments;
		var membersOnPage = request.membersOnPage;
		var imagetypeRedditor = request.imagetype;
		var imagecustomRedditor = request.imagecustom;
		var redditor = request.redditor;
		var onScreenRedditor = getOnScreenRedditor();
		console.log("onScreenRedditor: " + onScreenRedditor + " redditor ra: " + redditor);
		if (onScreenRedditor !== redditor) {
			sendResponse({msg: "pli" });
			return;
		}
		var colorPointer = 0;
		console.log("viewSetterBunch.length" + viewSetterBunch.length);
		console.log("allComments.length" + allComments.length);
		//setTimeout( function() {
			console.log("calling addControls from main...1");
			addControls(commentPageId, "usertext-buttons");
			console.log("calling addControls from main...Done..." + allComments.length);
		//}, 2000);
		for (var i = 0; i < allComments.length; i++) {
			var color = "##F8F8FF"; // "GhostWhite"
			if (redditor !== allComments[i]['author']) {
				color = "white"; // getColorFromScheme(colorPointer);
				colorPointer++;
			}
			for (var j = 0; j < membersOnPage.length; j++) {
				if (membersOnPage[j]['member'] === allComments[i]['author']) {
					var commentId = allComments[i]['id'];
					var tname = "thing_t1_" + commentId;
					//$('#' + tname).css("background", "green");
					









					$('#' + tname).find('.entry').first().css("background", color);
					//$('#' + tname).find('.entry').first().attr("class","BorderCorner");













				}
			}
			for (var j = 0; j < viewSetterBunch.length; j++) {
				//dump(viewSetterBunch[j]);
				//if (typeof viewSetterBunch[j]['id'] === 'undefined') {
				//	console.log("u");
				//}
				//else {
				//	console.log("d");
				//}
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
						//console.log("Before1.->: " + html);
						html = cleanDomString(html);
						//console.log("After1: " + html);
						$('#' + tname).find(".flat-list").first().append(html);






					
						if (!hideViolate) {
							var ruleViolationSpecification2 = "Report Comment Tag rule violation!";
							if (ruleViolationSpecification) {
								ruleViolationSpecification2 = ruleViolationSpecification;
							}
							html = '<li><span title="' + ruleViolationSpecification2 + '" style="color: red" class="tab"><a target="_blank" href="http://comment-tag.com/report_rule_violation.php?subreddit=' + subreddit + '&commentid=' + commentId + '&tag=' + tag + '&redditor=' + redditor + '">violation!</a></span></li>';

							gubbe = $('#' + tname);
							//var sizegubbe = $('#' + tname).html().length;
							//console.log("Before2: " + html);
							html = cleanDomString(html);
							//console.log("After2: " + html);
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







						
						var imagetype;
						var imagecustom;
						var imageurl;
						console.log("redditor: " + redditor + " comment author: " + allComments[i]['author']);
						console.log("imagetypeRedditor->" + imagetypeRedditor);
						console.log("imageurlRedditor->" + imagecustomRedditor);
						if (redditor === allComments[i]['author']) {
							console.log("schnooft!");
							// Here: This comments author is the redditor who is logged in with Comment Tag
							// Therefore: Set image
							imagetype = imagetypeRedditor;
							imagecustom = imagecustomRedditor;
						}
						else {
							// Here: This comments author is different from the redditor who is logged in with Comment Tag, but still a member
							// Therefore: Find member
							for (var k = 0; k < membersOnPage.length; k++) {
								console.log("membersOnPage[k]['member']: " + membersOnPage[k]['member'] + " --- allComments[i]['author']: " + allComments[i]['author']);
								if (membersOnPage[k]['member'] === allComments[i]['author']) {
									// Here: Found this comments author as member
									// Therefore: Extract image data
									imagetype = membersOnPage[k]['imagetype'];
									imagecustom = membersOnPage[k]['imagecustom'];
									break;
								}
							}
						}
						if (typeof imagetype === 'undefined') {
							imagetype = "neutral";
							imageurl = '<img class="friend_image_resize_fit_center" src="http://comment-tag.com/images/avatars/astronaut.png" height="65"/>';
						}
						else {
							if (imagetype === "man") {
								imageurl = '<img class="friend_image_resize_fit_center " src="http://comment-tag.com/images/avatars/builderman.png" height="65"/>';
							}
							else if (imagetype === "woman") {
								imageurl = '<img class="friend_image_resize_fit_center " src="http://comment-tag.com/images/avatars/builderwoman.png" height="65"/>';
							}
							else if (imagetype === "neutral") {
								imageurl = '<img class="friend_image_resize_fit_center" src="http://comment-tag.com/images/avatars/astronaut.png" height="65"/>';
							}
							else if (imagetype === "custom") {
								imageurl = '<img class="friend_image_resize_fit_center" src="http://comment-tag.com/uplooood/' + imagecustom + '"  height="65"/>';
							}
						}
						console.log("imageurl: " + imageurl);

					
						var html2 = $('#' + tname).find(".usertext-body").first().find(".md").first().html();
						var img = '<a target="_new" href="http://comment-tag.com/user.php?redditor=' + allComments[i]['author'] + '">' + imageurl + '</a>';
						var html3 = '<div class="wrapCommentWholeBox">';
						var urlImgo = chrome.extension.getURL('/data/openquote1.gif');
						html3 = html3 + '<div class="wrapCommentPartRedditText"><div class="md">' + html2 + '</div></div>';
						



						//var bubble = '<span class="triangle-border right border_gray"><span class="border_gray">' + exclamation + '</span></span>';
						var bubble = '<span class="triangle-border right border_gray">' + exclamation + '</span>';




						if (color === "red") {
							bubble = '<span class="triangle-border right border_red">' + exclamation + '</span>';
						}
						else if (color === "green") {
							bubble = '<span class="triangle-border right border_green">' + exclamation + '</span>';
						}
						else if (color === "black") {
							bubble = '<span class="triangle-border right border_black">' + exclamation + '</span>';
						}
						html3 = html3 + '<div class="wrapCommentBubbleAndImage"><div class="wrapCommentPartBubble"><div class="wrapCommentPartImage">' + img + '</div>' + bubble + '</div></div></div>';
						html3 = html3 + '</div>';
						//$('#' + tname).find(".usertext-body").find("p").first().append(img);
						$('#' + tname).find(".usertext-body").first().empty();
						//console.log("Before3: " + html);
						html = cleanDomString(html);
						//console.log("After3: " + html);
						$('#' + tname).find(".usertext-body").first().append(html3);
						//$('#' + tname).append(img);
					
						console.log("viewSetterBunch[j]['tag']: " + viewSetterBunch[j]['tag']);
					
	




					
						if (viewSetterBunch[j]['garble']) {
							console.log("this viewsetter is garbled:" + viewSetterBunch[j]['id']);
							console.log("garble type" + typeof viewSetterBunch[j]['garble']);
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
								var fontSize = getRandomInt(16, 24);
								var garbling = '<span style="color: ' + colors[colorPointer] + '; font-size:' + fontSize + 'px ;">' + charThing  + '</span>';
								garbledHtml = garbledHtml + garbling;
								colorPointer++;
							}
							//var garbledHtml = '<span style="color: ' + color + '" class="' + circleCSS + 'tab">' + text  + '</span></li>';
							//console.log("Before4: " + garbledHtml);
							garbledHtml = cleanDomString(garbledHtml);
							//console.log("After4: " + garbledHtml);
							$('#' + tname).find(".md").first().append(garbledHtml);
						}



						if (viewSetterBunch[j]['tag'] === "comment-tag{waits.for.anyone}") {
							$('#' + tname).find('.entry').first().css("border", "5px dotted #DAA520"); // GoldenRod
						}
						else if (viewSetterBunch[j]['tag'] === "comment-tag{your.comment.inspired.me}") {
							$('#' + tname).find('.entry').first().css("border", "5px dotted #F0E68C"); // Khaki
						}
						else {
							$('#' + tname).find('.entry').first().css("border", "5px dotted #800000"); // Maroon
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
		sendResponse({msg: "done" });
    }





}


// ("WhiteSmoke","MintCream","Gainsboro","GhostWhite","HoneyDew")
var colorScheme = ["#F5F5F5","#F5FFFA","#DCDCDC","#F8F8FF","#F0FFF0"];

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
    console.log(out);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getOnScreenRedditor() {
	var redditorOnScreen = "---";
    var longString = $("span.user").html();
    console.log("span: " + longString);
    var i = longString.indexOf('>');
    var i2 = longString.substring(i+1,longString.indexOf("</span>"));
    console.log("i2:" + i2);
    if (longString.indexOf('class="login-required"') !== -1) {
        console.log("not logged in");
    }
    else {
        var j = i2.indexOf("</a>");
        redditorOnScreen = i2.substring(0,j);
        console.log("redditorOnScreen: " + redditorOnScreen);
    }
	return redditorOnScreen;
}

// Copied from myscriptw.js:
var intuitiveTagNames = {
	"waits.for.anyone" : "Waits for anyone...",
    "waits.for.your.reply.only" : "Waits for your reply only...",
    "i.find.this.unworthy.for.discussion" : "I find this unworthy for discussion",
    "i.find.the.subject.unworthy.for.discussion" : "I find the subject unworthy for discussion",
    "i.will.not.reply.and.expect.apology" : "I will not reply and expect an apology",
    "i.apologize" : "I apologize",
    "no.problem" : "No problem",
    "your.comment.inspired.me" : "Your comment inspired me...",
	"thanks" : "Thanks!",
	"youre.welcome" : "You're welcome",
    "i.dont.think.the.original.post.has.been.addressed.yet" : "I don't think the original post has been addressed yet",
    "i.dont.think.the.original.post.has.been.taken.seriously.yet" : "I don't think the original post has been taken seriously yet",
    "i.dont.think.the.original.post.has.been.treated.respectfully" : "I don't think the original post has been treated respectfully",
    "guarded.apology" : "Guarded apology",
    "explanation.why.i.was.angry" : "Explanation why I was angry",
    "dont.mind.its.ok.lets.move.on" : "Don't mind. It's ok. Let's move on...",
    "i.was.being.careless" : "I was being careless",
    "i.am.glad.you.said.that.to.me" : "I'm glad you said that to me",
    "its.fine.i.consider.the.case.closed" : "It's fine. I consider the case closed" ,
    "i.consider.this.comment.definitive.and.consider.any.reply.inappropriate" : "I consider this comment definitive and consider any reply inappropriate",
    "interesting.will.write.more.in.a.few.days.time" : "Interesting. Will write more in a few days time",
    "i.am.one.of.the.strangest.people.youll.ever.meet" : "I am one of the strangest people you'll ever meet",
    "er.hi.what.kind.of.strange.presentation.is.that" : "Er. What kind of strange presentation is that...",
    "youre.being.overly.ironic.and.are.violating.the.rules" : "You're being overly ironic and are violating the rules",
    "awkward" : "The famous awkward tag",
    "watch.me.playing.soccer.with.myself.in.this.video" : "Watch me playing soccer with myself in this video",
	"that.pissed.me.off.but.please.dont.mind" : "That pissed me off, but please don't mind",
	"thanks.but.a.bit.off.topic" : "Thanks. But a bit off-topic...",
	"your.post.inspired.me" : "Your post inspired me",
	"your.link.inspired.me" : "Your link inspired me",
	"a.warning.from.one.intellectual.to.another" : "A warning from one intellectual to another",
	"i.wont.comment.for.personal.reasons" : "I won't comment for personal reasons",
	"a.warm.welcome.to.my.world.without.a.naive.invitation.to.be.my.friend" : "A warm welcome to my world, without a naive invitation to be my friend"
};

    
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
