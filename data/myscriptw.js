var directChildrenIds = [];
var processedIds = [];
var commentsMarkedForRemoval = [];
var codeOneTag;
var dimba;
var conflictRedditorsOnPage;
var mainPostId;

//https://addons.mozilla.org/en-US/developers/addon/primadonnakoder/versions/1930302


chrome.runtime.onMessage.addListener(listenOListenMyFriendW);


function listenOListenMyFriendW(request, sender, sendResponse) {
	//console.log("hello from listener at myscriptw.js");
	if (request.funkodonko === "myScriptw") {
		//console.log("hello from listener at myscriptw.js 2");
		codeOneTag = request.codeOneTag;
		////console.log("::::::::::----------::::::::::::::"+codeOneTag);
		dimba = JSON.parse(request.pageJson);

		//$mainPostId = $jsonObj->data->children[0]->data->id;


		var a1 = dimba[0]['data'];
		dump(a1);
		mainPostId = dimba[0]['data']['children'][0]['data']['id'];
		//console.log("------------------------>mainPostId: " + mainPostId);
		
		////console.log(":::::::::::++++++++++:::::::::::::");
		mimbaw();
		waitButtonHandler2();
	}
	

}

// Called from main background script (background.js) and popse.js
function runScriptW(codeOneTag1, pageJson1, conflictRedditorsOnPage2) {
	//console.log("hello from main funko at myscriptw.js 2");
	conflictRedditorsOnPage = conflictRedditorsOnPage2;
	codeOneTag = codeOneTag1;
	pageJson = pageJson1;
	//console.log("::::::::::------ blir ----::::::::::::::"+codeOneTag);
	dimba = JSON.parse(pageJson);

	//$mainPostId = $jsonObj->data->children[0]->data->id;
	mainPostId = dimba[0]['data']['children'][0]['data']['id'];
	//console.log("------------------------>mainPostId: " + mainPostId);


	//console.log(":::::::::::++++ kr aa ge ++++++:::::::::::::"+pageJson.length);
	mimbaw();
	waitButtonHandler2();

}


// Hvis et indlæg har en parent skal vi finde indlæggets id og parent'ens id og putte dem ind i arrayet childIdParentId
var lookOut = false;
var rememberOThatIdYeah;
var lookOutForId = false;
var lookOutParentId;
var allCommentsWithAllEntriesPointer;
var leafs = [];
var branches = [];


function mimbaw() {
	//dimba.iterate();
	axeSpots = [];
	branches = [];
	leafs = [];
	allCommentsWithAllEntries = [];
	//console.log("A1");
	traverseH(dimba,1);


	//console.log("len: " + allCommentsWithAllEntries.length);
  	//console.log("A2");
	//console.log("hertil");
	////console.log("len: " + allCommentsWithAllEntries.length);
	/*for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		var cid = allCommentsWithAllEntries[i]['id'];
		var parid = allCommentsWithAllEntries[i]['parent_id'];
		//console.log("cid: " + cid + " parid: " + parid);
	}*/
	//return;
	//console.log("count: " + allCommentsWithAllEntries.length);
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		allCommentsWithAllEntriesPointer = i;
		////console.log("allCommentsWithAllEntries: " + allCommentsWithAllEntries[i]);
		if (!isSomeOnesParent(allCommentsWithAllEntries[i]) && commentPageId !== allCommentsWithAllEntries[i]['id']) {
			leafs.push(allCommentsWithAllEntries[i]);
		}
		
	}
	//console.log("leaf count: " + leafs.length);
	for (var i = 0; i < leafs.length; i++) {
		////console.log("leaf: " + leafs[i]);
		var s = constructBranch(leafs[i]);
		if (s) { branches[i] = s; }
	}
	for (var i = 0; i < branches.length; i++) {
		////console.log("branch " + branches[i][0] + " size: " + branches[i].length);
		for (var b = 0; b < branches[i].length; b++) {
			////console.log("branch " + i + ": " + branches[i][b]['id']);
		}
	}
	



	// Replace intuitive values in body with non-intuitive (I)
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		var body = allCommentsWithAllEntries[i]['body'];
		//console.log("len------------------------------------------------------------------------> " + Object.keys(intuitiveTagNames).length);
		for (var a = 0; a < tagsKnownToWoman.length; a++) {
			var nonIntuitiveTagName = tagsKnownToWoman[a];
			var intuitiveTagName = intuitiveTagNames[nonIntuitiveTagName];

			var searchString = "Comment Tag: " + intuitiveTagName;
			var replaceString = "comment-tag{" + nonIntuitiveTagName + "}";
			//console.log("Body: " + body + " search: " + searchString + " replace: " + replaceString);
			if (body.indexOf(intuitiveTagName) !== -1) {
				//console.log("Found Brumblebee-tag: " + intuitiveTagName);
				body = body.replace(searchString, replaceString);
				allCommentsWithAllEntries[i]['body'] = body;
			}
		}
	}


/*
	// Replace intuitive values in body with non-intuitive (II)
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		var body = allCommentsWithAllEntries[i]['body'];
		//console.log("len------------------------------------------------------------------------> " + Object.keys(intuitiveTagNames).length);
		for (var a = 0; a < tagsKnownToWoman.length; a++) {
			var nonIntuitiveTagName = tagsKnownToWoman[a];
			var intuitiveTagName = intuitiveTagNames[nonIntuitiveTagName];

			var searchString = "Ye-Ye Youbeeya: " + intuitiveTagName;
			var replaceString = "comment-tag{" + nonIntuitiveTagName + "}";
			//console.log("Body: " + body + " search: " + searchString + " replace: " + replaceString);
			if (body.indexOf(intuitiveTagName) !== -1) {
				//console.log("Found Brumblebee-tag: " + intuitiveTagName);
				body = body.replace(searchString, replaceString);
				allCommentsWithAllEntries[i]['body'] = body;
			}
		}
	}
*/





	
	/*console.log("-----------------------------------------------------------------------------------------------------1.");
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		//console.log("" + i);
		dump(allCommentsWithAllEntries[i]);
	}
	//console.log("-------------------------------------------------------------------------------------------------2.");
	*/


	// declared in script background.js
	viewSetterBunch = [];
	

	
	
	// Enforce general rule §1: No more than one tag by the same redditor on the same level of the comment tree, i.e. as answer to any given comment.
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		//dump(allCommentsWithAllEntries[i]);
		//console.log("id: " + allCommentsWithAllEntries[i]['id']);
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{") !== -1) {
			var redditorInAllThisMess = allCommentsWithAllEntries[i]['author'];
			var secondPersonCommentWithAllEntriesYoobee = getParent(allCommentsWithAllEntries[i]);
			//console.log("cid: " + allCommentsWithAllEntries[i]['id']);
			//console.log("secondPersonCommentWithAllEntriesYoobee: " + secondPersonCommentWithAllEntriesYoobee);
			if (secondPersonCommentWithAllEntriesYoobee) {
				for (var j = 0; j < allCommentsWithAllEntries.length; j++) {
					if (allCommentsWithAllEntries[j]['parent_id'] === secondPersonCommentWithAllEntriesYoobee['id']) {
						// Here: Found comment on the same level as mine
						// Therefore: Be certain it isn't the one already known to the system
						if (allCommentsWithAllEntries[j]['id'] !== allCommentsWithAllEntries[i]['id']) {
							// Here: Comment isn't identical with the one already known to the system
							// Therefore: Check if it is indeed redditor, who is the author
							if (allCommentsWithAllEntries[j]['author'] === allCommentsWithAllEntries[i]['author']) {
								// Here: Redditor is author
								// Therefore: Check for existence of Comment Tag tag
								var commentBody = allCommentsWithAllEntries[j]['body'];
								if (commentBody.indexOf("comment-tag{") !== -1) {
									// Here: Conclusion: Redditor used more than one Awkward Tags on the same level
									// Therefore: Garble all viewSetters on this spot
									// Match text between {}
									var matches = commentBody.match(/\{(.*?)\}/);
									var shortHandTag = matches[1];
									var tag = "comment-tag{" + shortHandTag + "}";
									var titleCursory = "General Rule §1 violated";
									var textCursory = "General Rule §1: No more than one tag by the same redditor on the same level of the comment tree, i.e. as an answer to a given comment.";
									var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I used more than one Comment Tag in the same place.", override: true};
									if (!getFirstViewSetterById(allCommentsWithAllEntries[i]['id'])){
										viewSetterBunch.push(viewSetter);
									}
								}
							}
						}
					}
				}
			}
		}
	}
	


	// Enforce general rule §2: No self-made tags
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{") !== -1) {
			var body = allCommentsWithAllEntries[i]['body'];
			// Match text between {}
			var matches = body.match(/\{(.*?)\}/);
			var shortHandTag = matches[1];
			var tag = "comment-tag{" + shortHandTag + "}";
			if (typeof mustBeStandAloneTags[shortHandTag] === 'undefined') {
				var titleCursory = "Unrecognized tag";
				var textCursory = "" + allCommentsWithAllEntries[i]['author'] + " made this tag up";
				var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I made up a tag myself..."};
				viewSetterBunch.push(viewSetter);
			}
			
		}
	}
		
			
	// Enforce general rule §3: Tags can be either: mayNotStandAlone, mustStandAlone or noStandAloneRule
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{") !== -1) {
			var body = allCommentsWithAllEntries[i]['body'];
			// Match text between {}
			var matches = body.match(/\{(.*?)\}/);
			var shortHandTag = matches[1];
			var tag = "comment-tag{" + shortHandTag + "}";
			//console.log("tag: " + tag);
			var isStandAlone = hasMoreWordsBesidesTheTagItselfDude(body, tag);
			if (mustBeStandAloneTags[shortHandTag] === "mayNotStandAlone") {
				// Here: Tag may not stand alone
				// Therefore: If it does, garble
				if (isStandAlone) {
					var titleCursory = "Tag " + tag + " must not be stand-alone";
					var textCursory = "Stand-alone violation!";
					var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I forgot to add text to a non-stand-alone tag."};
				}
			}
			else if (mustBeStandAloneTags[shortHandTag] === "mustStandAlone") {
				// Here: Tag must stand alone
				// Therefore: If it doesn't, give penalty
				if (!isStandAlone) {
					var titleCursory = "Tag " + tag + " must be stand-alone";
					var textCursory = "Stand-alone violation!";
					var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I added text to a stand-alone tag."};
				}
			}
		}
	}


	// Enforce general rule §4: Redditors shouldn't talk to each other after A has used comment-tag{i.will.not.reply.and.expect.apology}. When A has apologized they can talk to each other again.
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		var redditor = allCommentsWithAllEntries[i]['author'];
		var body = allCommentsWithAllEntries[i]['body'];
		// Match text between {}
		var tag = "none";
		if (body.indexOf("comment-tag{") !== -1) {
			var matches = body.match(/\{(.*?)\}/);
			var shortHandTag = matches[1];
			tag = "comment-tag{" + shortHandTag + "}";
		}
		for (var j = 0; j < conflictRedditorsOnPage.length; j++) {
			if (conflictRedditorsOnPage[j]['needsToApologizeRedditor'] === redditor) {
				var secondPersonName = conflictRedditorsOnPage[j]['angryRedditor'];
				// Here: Our redditor needs to apologize before saying anything to the angry dude
				// Therefore: Make garbled viewSetter
				var titleCursory = "General Rule §4 Redditors shouldn't talk to each other after A has used comment-tag{i.will.not.reply.and.expect.apology}. When A has apologized they can talk to each other again.";
				var textCursory = "You need to apologize first!";
				var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I should apologize to " + secondPersonName + ".", override: true};
				viewSetterBunch.push(viewSetter);
			}
			else if (conflictRedditorsOnPage[j]['angryRedditor'] === redditor) {
				// Here: Our redditor needs to be apologized to before saying anything to the angry dude
				// Therefore: Make garbled viewSetter
				var culpritRedditorName = conflictRedditorsOnPage[j]['needsToApologizeRedditor'];
				var titleCursory = "General Rule §4 Redditors shouldn't talk to each other after A has used comment-tag{i.will.not.reply.and.expect.apology}. When A has apologized they can talk to each other again.";
				var textCursory = culpritRedditorName + " needs to apologize first.";
				var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: culpritRedditorName + " should apologize to me before speaking to me.", override: true};
				viewSetterBunch.push(viewSetter);
			}
		}
	}


	// Enforce general rule §5: Nearly all Awkward tags are social in nature. Redditors can't direct any tags towards their own comments.
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		var redditor = allCommentsWithAllEntries[i]['author'];
		var secondPersonCommentWithAllEntriesYoobee = getParent(allCommentsWithAllEntries[i]);
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{") !== -1) {
			if (secondPersonCommentWithAllEntriesYoobee) {
				if (redditor === secondPersonCommentWithAllEntriesYoobee['author']) {
					// Here: Redditor is responding to himself
					// Therefore: Garble
					var titleCursory = "General Rule §5: Nearly all Comment Tags are social in nature. Redditors can't direct any tags towards their own comments.";
					var textCursory = "Don't do that";
					var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I used a Comment Tag in dialogue with myself!", override: true};
					viewSetterBunch.push(viewSetter);
				}
			}
		}
	}



	// comment-tag{i.find.the.subject.unworthy.for.discussion} tags:
	// find (if it exists) comment with comment-tag{i.find.the.subject.unworthy.for.discussion} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{i.find.the.subject.unworthy.for.discussion}") !== -1) {
			var tag = "comment-tag{" + shortHandTag + "}";
			var titleCursory = "";
			var textCursory = "Was inspired";
			var viewSetter = {tag: "comment-tag{i.find.the.subject.unworthy.for.discussion}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I won't participate in this discussion."};
			viewSetterBunch.push(viewSetter);
		}
	}



	// comment-tag{i.find.this.unworthy.for.discussion} tag:
	// find (if it exists) comment with comment-tag{i.find.this.unworthy.for.discussion} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{i.find.this.unworthy.for.discussion}") !== -1) {
			var tag = "comment-tag{" + shortHandTag + "}";
			var titleCursory = "";
			var textCursory = "Was inspired";
			var viewSetter = {tag: "comment-tag{i.find.this.unworthy.for.discussion}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I won't participate in this discussion."};
			viewSetterBunch.push(viewSetter);
		}
	}



	// comment-tag{your.post.inspired.me} tag:
	// find (if it exists) comment with comment-tag{your.post.inspired.me} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{your.post.inspired.me}") !== -1) {
			var tag = "comment-tag{" + shortHandTag + "}";
			var titleCursory = "";
			var textCursory = "Was inspired";
			var viewSetter = {tag: "comment-tag{your.post.inspired.me}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I was inspired."};
			viewSetterBunch.push(viewSetter);
		}
	}


	// comment-tag{i.wont.comment.for.personal.reasons} tag:
	// find (if it exists) comment with comment-tag{i.wont.comment.for.personal.reasons} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{i.wont.comment.for.personal.reasons}") !== -1) {
			var tag = "comment-tag{" + shortHandTag + "}";
			var titleCursory = "";
			var textCursory = "Won't comment";
			var viewSetter = {tag: "comment-tag{i.wont.comment.for.personal.reasons}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I won't comment for personal reasons."};
			viewSetterBunch.push(viewSetter);
		}
	}


	// comment-tag{i.am.one.of.the.strangest.people.youll.ever.meet} tag:
	// find (if it exists) comment with comment-tag{i.am.one.of.the.strangest.people.youll.ever.meet} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{i.am.one.of.the.strangest.people.youll.ever.meet}") !== -1) {
			var tag = "comment-tag{" + shortHandTag + "}";
			var titleCursory = "";
			var textCursory = "Won Awkward Karma";
			var viewSetter = {tag: "comment-tag{i.am.one.of.the.strangest.people.youll.ever.meet}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I am one of the strangest people you'll ever meet."};
			viewSetterBunch.push(viewSetter);
		}
	}



	// comment-tag{er.hi.what.kind.of.strange.presentation.is.that} tag:
	// find (if it exists) comment with comment-tag{er.hi.what.kind.of.strange.presentation.is.that} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{er.hi.what.kind.of.strange.presentation.is.that}") !== -1) {
			var secondPersonCommentWithAllEntriesYoobee = getParent(allCommentsWithAllEntries[i]);
			if (secondPersonCommentWithAllEntriesYoobee) {
				if (secondPersonCommentWithAllEntriesYoobee['author'] === allCommentsWithAllEntries[i]['author']) {
					// Whoops. Redditor can't say this to himself/herself
					// Garble
					var titleCursory = "Redditor shouldn't talk to yourself here.";
					var textCursory = "Talking to himself/herself";
					var viewSetter = {tag: "comment-tag{er.hi.what.kind.of.strange.presentation.is.that}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I talked to myself too much."};
					viewSetterBunch.push(viewSetter);
				}
				else {
					if (secondPersonCommentWithAllEntriesYoobee['body'].indexOf("comment-tag{i.am.one.of.the.strangest.people.youll.ever.meet}") !== -1) {
						// Here: Should be reply to a comment with comment-tag{i.am.one.of.the.strangest.people.youll.ever.meet}
						var titleCursory = "";
						var textCursory = "Won Awkward Karma";
						var viewSetter = {tag: "comment-tag{er.hi.what.kind.of.strange.presentation.is.that}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I am one of the strangest people you'll ever meet."};
						viewSetterBunch.push(viewSetter);
					}
					else {
						var titleCursory = "Redditor shouldn't only say such things in reply to a comment with comment-tag{i.am.one.of.the.strangest.people.youll.ever.meet} in it.";
						var textCursory = "Don't say here!";
						var viewSetter = {tag: "comment-tag{er.hi.what.kind.of.strange.presentation.is.that}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "Er."};
						viewSetterBunch.push(viewSetter);
					}
				}
			}
		}
	}



	// comment-tag{watch.me.playing.soccer.with.myself.in.this.video} tag:
	// find (if it exists) comment with comment-tag{watch.me.playing.soccer.with.myself.in.this.video} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{watch.me.playing.soccer.with.myself.in.this.video}") !== -1) {
			var body = allCommentsWithAllEntries[i]['body'].toLowerCase()
			if (body.indexOf("youtube") === -1) {
				// Here: No YouTube links in here
				// Therefore: Garble
				var titleCursory = "Redditor said he/she would post a YouTube link, but no YouTube link was found in comment.";
				var textCursory = "No youtube link found.";
				var viewSetter = {tag: "comment-tag{watch.me.playing.soccer.with.myself.in.this.video}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I forgot a YouTube link in my comment."};
				viewSetterBunch.push(viewSetter);
			}
			else {
				// Here: Found YouTube word
				// Therefore: Make nice viewsetter
				var tag = "comment-tag{" + shortHandTag + "}";
				var titleCursory = "";
				var textCursory = "Won Awkward Karma";
				var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I won Awkward Karma for playing soccer with myself."};
				viewSetterBunch.push(viewSetter);
			}
		}
	}



	// comment-tag{interesting.will.write.more.in.a.few.days.time} tag:
	// find (if it exists) comment with comment-tag{interesting.will.write.more.in.a.few.days.time} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{interesting.will.write.more.in.a.few.days.time}") !== -1) {
			var secondPersonCommentWithAllEntriesYoobee = getParent(allCommentsWithAllEntries[i]);
			var firstPersonHasRepliedToHimOrHerself = false;
			var id = allCommentsWithAllEntries[i]['id'];
			// ----------------------- same as giveMeTheNamesOfAllApplesOnTheBranchWithThisCommentAsAxePointHmmm start ------------------------
			var apples = [];
			for (var k = 0; k < branches.length; k++) {
				var maybeApplesWeCanUse = [];
				var ourAppleFound = false;
				
				for (var m = 0; m < branches[k].length; m++) {
					//console.log("e: " + branches[k][m]['id'] + "f: " + id);
					if (branches[k][m]['id'] === id) {
						//console.log("found!");
						// Here: Apple found
						// Push and break
						ourAppleFound = true;
						break;
					}
					else {
						// Here: Apple not found yet and this is not our axepoint
						// Therefore: Push
						maybeApplesWeCanUse.push(branches[k][m]);
					}
				}
				if (ourAppleFound) {
					// Here: All apples we found are legit
					// Therefore: Add them to apples bunch
					apples = apples.concat(maybeApplesWeCanUse);
				}
			}
			// ----------------------- same as giveMeTheNamesOfAllApplesOnTheBranchWithThisCommentAsAxePointHmmm end --------------------------
			var answeredAbsolutelyCorrectly = false;
			for (var j = 0; j < apples.length; j++) {
				if (allCommentsWithAllEntries[i]['id'] !== apples[j]['id']) {
					// Here: Found other comment which is a reply to parent comment
					// Therefore: Check if author is me, i.e. then the comment is maybe valide (if it's within the timespan)
					if (allCommentsWithAllEntries[i]['author'] === apples[j]['author']) {
						// Here: Found comment by redditor
						// Therefore: 1) Set flag. 2) Check if redditor has answered in the appropriate timespan in the branch of the parent comment.
						firstPersonHasRepliedToHimOrHerself = true;
						var timeUTCTagUsed =  allCommentsWithAllEntries[i]['created_utc'] * 1000;
						var timeOfMyReply = apples[j]['created_utc'] * 1000;
						var hoursGoneBy = ((timeOfMyReply - timeUTCTagUsed) / (60 * 60 * 1000));
						if (hoursGoneBy < 24) {
							// Here: Redditor answered too early
							// Therefore: Garble
							var titleCursory = "Redditor said he/she would answer in a few days time, but answered within 24 hours.";
							var textCursory = "Answered too early";
							var viewSetter = {tag: "comment-tag{interesting.will.write.more.in.a.few.days.time}", id: apples[j]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I answered too soon."};
							viewSetterBunch.push(viewSetter);
						}
						else if (hoursGoneBy > 24 * 4) {
							// Here: Expired
                            // Therefore: Garble
							var titleCursory = "Redditor said he/she would answer in a few days time, but answered within after four days.";
							var textCursory = "Answered too late";
							var viewSetter = {tag: "comment-tag{interesting.will.write.more.in.a.few.days.time}", id: apples[j]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I answered too late."};
							viewSetterBunch.push(viewSetter);
						}
						else {
							// Here: Redditor answered correctly
							// Therefore: Make nice viewsetter
							answeredAbsolutelyCorrectly = true;
							var titleCursory = "";
							var textCursory = "Won Awkward Karma";
							var viewSetter = {tag: "comment-tag{interesting.will.write.more.in.a.few.days.time}", id: apples[j]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I won Awkward Karma for answering " + secondPersonCommentWithAllEntriesYoobee['author'] + " like I said I would do."};
							viewSetterBunch.push(viewSetter);
						}
					}
				}
			}
			if (!answeredAbsolutelyCorrectly) {
				// Here: Redditor didn't answer yet, as he/she said he/she would.
				// Therefore: Check if the time has run out
				var nowUTC = new Date().getTime();
				var timeUTCTagUsed =  allCommentsWithAllEntries[i]['created_utc'] * 1000;
				var hoursGoneBy = (nowUTC - timeUTCTagUsed)/Math.floor(1000 * 60 *60);
				if (hoursGoneBy > 24 * 4) {
					// Expired
					// Garble
					var titleCursory = "Redditor said he/she would answer in a few days time, but didn't answer within four days.";
					var textCursory = "Didn't answer";
					var viewSetter = {tag: "comment-tag{interesting.will.write.more.in.a.few.days.time}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I forgot to answer."};
					viewSetterBunch.push(viewSetter);
				}
				else {
					// Here: Redditor still has time to answer
					// Therefore: Check if redditor has answered him-/herself
					if (!firstPersonHasRepliedToHimOrHerself) {
						// Here: First person didn't put additional answers into the second persons reply tree
						// Therefore: Make still-waiting viewSetter
						var titleCursory = "§1 Redditor must answer somewhere after parent comment within the timespan 24h - 4*24h";
						var textCursory = "Waiting";
						var viewSetter = {tag: "comment-tag{interesting.will.write.more.in.a.few.days.time}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I'm still waiting for myself to answer..."};
						viewSetterBunch.push(viewSetter);
					}
					else {
						// Here: First person did answer, but not within the rules
						// Therefore: Garble original comment with comment-tag{interesting.will.write.more.in.a.few.days.time}
						var titleCursory = "Redditor didn't answered before 24 hours";
						var textCursory = "Answered too early";
						var viewSetter = {tag: "comment-tag{interesting.will.write.more.in.a.few.days.time}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I answered too early."};
						viewSetterBunch.push(viewSetter);
					}
				}
			}
		}
	}




	// comment-tag{youre.being.overly.ironic.and.are.violating.the.rules} tag:
	// find (if it exists) comment with comment-tag{youre.being.overly.ironic.and.are.violating.the.rules} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{youre.being.overly.ironic.and.are.violating.the.rules}") !== -1) {
			if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{youre.being.overly.ironic.and.are.violating.the.rules}")         ===        -1) {
				// Here: Disobeyed §1 Must be a reply to a comment with a Comment Tag tag in it.
				// Therefore: Garble
				var titleCursory = "Redditor must only use this tag against a comment containing a Comment Tag tag. (Tag Rule §1)";
				var textCursory = "Disallowed tag use";
				var viewSetter = {tag: "comment-tag{youre.being.overly.ironic.and.are.violating.the.rules}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I used this tag at a comment without an Comment Tag in it."};
				viewSetterBunch.push(viewSetter);
			}
		}
	}


	// comment-tag{i.consider.this.comment.definitive.and.consider.any.reply.inappropriate} tag:
	// find (if it exists) comment with comment-tag{i.consider.this.comment.definitive.and.consider.any.reply.inappropriate} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{i.consider.this.comment.definitive.and.consider.any.reply.inappropriate}") !== -1) {
			// Here: Found tag
			// Therefore: Make nice viewsetter
			var titleCursory = "Redditor wanted to express something freely and won't have anybody replying.";
			var textCursory = "Please don't reply";
			var viewSetter = {tag: "comment-tag{i.consider.this.comment.definitive.and.consider.any.reply.inappropriate}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I wanted to express this."};
			viewSetterBunch.push(viewSetter);
			var redditor = allCommentsWithAllEntries[i]['author'];
			var id = allCommentsWithAllEntries[i]['id'];
			// ----------------------- same as giveMeTheNamesOfAllApplesOnTheBranchWithThisCommentAsAxePointHmmm start ------------------------
			var apples = [];
			for (var k = 0; k < branches.length; k++) {
				var maybeApplesWeCanUse = [];
				var ourAppleFound = false;
				
				for (var m = 0; m < branches[k].length; m++) {
					//console.log("e: " + branches[k][m]['id'] + "f: " + id);
					if (branches[k][m]['id'] === id) {
						//console.log("found!");
						// Here: Apple found
						// Push and break
						ourAppleFound = true;
						break;
					}
					else {
						// Here: Apple not found yet and this is not our axepoint
						// Therefore: Push
						maybeApplesWeCanUse.push(branches[k][m]);
					}
				}
				if (ourAppleFound) {
					// Here: All apples we found are legit
					// Therefore: Add them to apples bunch
					apples = apples.concat(maybeApplesWeCanUse);
				}
			}
			// ----------------------- same as giveMeTheNamesOfAllApplesOnTheBranchWithThisCommentAsAxePointHmmm end --------------------------
			//console.log("------------------------------>apples length: " + apples.length);
			dumpLocal(apples);
			for (var j = 0; j < apples.length; j++) {
				//console.log("------------------------------>apple id: " + apples[j]['id']);
				var titleCursory = "Redditor must not comment following a comment with comment-tag{i.consider.this.comment.definitive.and.consider.any.reply.inappropriate}";
				var textCursory = "Replies prohibited";
				var viewSetter = {tag: "comment-tag{i.consider.this.comment.definitive.and.consider.any.reply.inappropriate}", id: apples[j]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I ignored the above tag."};
				viewSetterBunch.push(viewSetter);
			}
		}
	}




	// comment-tag{i.dont.think.the.original.post.has.been.addressed.yet}, comment-tag{i.dont.think.the.original.post.has.been.taken.seriously.yet} or comment-tag{its.fine.i.consider.the.case.closed} tags:
	// find (if it exists) comment with comment-tag{i.dont.think.the.original.post.has.been.addressed.yet}, comment-tag{i.dont.think.the.original.post.has.been.treated.respectfully} or comment-tag{its.fine.i.consider.the.case.closed} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if ((allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{no.problem}") !== -1) || (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{i.dont.think.the.original.post.has.been.taken.seriously.yet}") !== -1)  |(allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{i.dont.think.the.original.post.has.been.treated.respectfully}") !== -1)) {
			var secondPersonCommentWithAllEntriesYoobee = getParent(allCommentsWithAllEntries[i]);
			if (secondPersonCommentWithAllEntriesYoobee) {
				if (secondPersonCommentWithAllEntriesYoobee['id'] !== mainPostId) {
					// Here: Parent isn't main comment
					// Therefore: Garble!
					// Match text between {}
					var matches = body.match(/\{(.*?)\}/);
					var shortHandTag = matches[1];
					var tag = "comment-tag{" + shortHandTag + "}";
					var titleCursory = "This tag (" + tag + ") should only be used as direct answer to main post/link.";
					var textCursory = tag + " tag misuse";
					var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I should use this tag in direct reply to the main post or link."};
					viewSetterBunch.push(viewSetter);
				}
			}
		}
	}


	// comment-tag{thanks}, comment-tag{explanation.why.i.was.angry} and comment-tag{i.was.being.careless}
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if ((allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{thanks}") !== -1) || (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{explanation.why.i.was.angry}") !== -1)  |(allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{i.was.being.careless}") !== -1)) {
			var secondPersonCommentWithAllEntriesYoobee = getParent(allCommentsWithAllEntries[i]);
			if (secondPersonCommentWithAllEntriesYoobee) {
				if ((secondPersonCommentWithAllEntriesYoobee['body'].indexOf("comment-tag{no.problem}") === -1) && (secondPersonCommentWithAllEntriesYoobee['body'].indexOf("comment-tag{dont.mind.its.ok.lets.move.on}") === -1) || (secondPersonCommentWithAllEntriesYoobee['body'].indexOf("comment-tag{its.fine.i.consider.the.case.closed}") === -1)) {
					// Here: Tag is not used towards an overbearing act of kindness
					// Therefore: Garble

					// Match text between {}
					var body = allCommentsWithAllEntries[i]['body'];
					var matches = body.match(/\{(.*?)\}/);
					var shortHandTag = matches[1];
					var tag = "comment-tag{" + shortHandTag + "}";
					var titleCursory = "You misused the tag " + tag + ". It should be directed against 'an overbearing act' i.e. either towards comment-tag{no.problem}, comment-tag{dont.mind.its.ok.lets.move.on} or comment-tag{its.fine.i.consider.the.case.closed}."
					var textCursory = tag + " tag misuse";
					var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I used this tag where nobody was overbearing."};
					viewSetterBunch.push(viewSetter);
				}
			}
		}
	}






	// comment-tag{no.problem}, comment-tag{dont.mind.its.ok.lets.move.on} or comment-tag{its.fine.i.consider.the.case.closed} tags:
	// find (if it exists) comment with comment-tag{no.problem}, comment-tag{dont.mind.its.ok.lets.move.on} or comment-tag{its.fine.i.consider.the.case.closed} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if ((allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{no.problem}") !== -1) || (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{dont.mind.its.ok.lets.move.on}") !== -1)  |(allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{its.fine.i.consider.the.case.closed}") !== -1)) {
			var secondPersonCommentWithAllEntriesYoobee = getParent(allCommentsWithAllEntries[i]);
			if (secondPersonCommentWithAllEntriesYoobee) {
				if ((secondPersonCommentWithAllEntriesYoobee['body'].indexOf("comment-tag{i.apologize}") === -1) && (secondPersonCommentWithAllEntriesYoobee['body'].indexOf("comment-tag{guarded.apology}") === -1)) {
					// Here: Tag is not used towards apology
					// Therefore: Garble

					// Match text between {}
					var matches = body.match(/\{(.*?)\}/);
					var shortHandTag = matches[1];
					var tag = "comment-tag{" + shortHandTag + "}";
					var titleCursory = "This tag (" + tag + ")should only be used towards an apology.";
					var textCursory = tag + " tag misuse";
					var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "Nobody apologized."};
					viewSetterBunch.push(viewSetter);
				}
			}
		}
	}



	// comment-tag{i.will.not.reply.and.expect.apology} tag:
	// find (if it exists) comment with comment-tag{i.will.not.reply.and.expect.apology} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{i.will.not.reply.and.expect.apology}") !== -1) {
			var secondPersonCommentWithAllEntriesYoobee = getParent(allCommentsWithAllEntries[i]);
			for (var j = 0; j < conflictRedditorsOnPage.length; j++) {
				if (conflictRedditorsOnPage[j]['needsToApologizeRedditor'] === redditor) {
					var secondPersonName = conflictRedditorsOnPage[j]['angryRedditor'];
					// Here: Our redditor needs to apologize before saying anything to the angry dude
					// Therefore: Make garbled viewSetter
					var titleCursory = "Rule §2: You must only use this tag one time towards second person (" + secondPersonName + ") before he/she has apologized.";
					var textCursory = secondPersonName + " needs to apologize first!";
					var viewSetter = {tag: "comment-tag{i.will.not.reply.and.expect.apology}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I should apologize to " + secondPersonName + "."};
					viewSetterBunch.push(viewSetter);
				}
				else {
					// Here: Redditor didn't use comment-tag{i.will.not.reply.and.expect.apology} towards second person without getting an apology. (Rule §1)
					// Therefore: Check if redditor obeys i.will.not.reply.and.expect.apology Rule §1
					if (secondPersonCommentWithAllEntriesYoobee['body'].indexOf("comment-tag{") !== -1) {
						// Here: Redditor is replying to a comment with at least one Comment Tag, violating Rule §2
						// Therefore: Give penalty.
						var titleCursory = "Rule §1: User mustn't use this in a reply to a comment with Comment Tags.";
						var textCursory = "Target comment contains a Comment Tag";
						var viewSetter = {tag: "comment-tag{i.will.not.reply.and.expect.apology}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I shouldn't be doing this."};
						viewSetterBunch.push(viewSetter);
					}
				}
			}
			var id = allCommentsWithAllEntries[i]['id'];
			// ----------------------- same as giveMeTheNamesOfAllApplesOnTheBranchWithThisCommentAsAxePointHmmm start ------------------------
			var apples = [];
			for (var k = 0; k < branches.length; k++) {
				var maybeApplesWeCanUse = [];
				var ourAppleFound = false;
				
				for (var m = 0; m < branches[k].length; m++) {
					//console.log("e: " + branches[k][m]['id'] + "f: " + id);
					if (branches[k][m]['id'] === id) {
						//console.log("found!");
						// Here: Apple found
						// Push and break
						ourAppleFound = true;
						break;
					}
					else {
						// Here: Apple not found yet and this is not our axepoint
						// Therefore: Push
						maybeApplesWeCanUse.push(branches[k][m]);
					}
				}
				if (ourAppleFound) {
					// Here: All apples we found are legit
					// Therefore: Add them to apples bunch
					apples = apples.concat(maybeApplesWeCanUse);
				}
			}
			// ----------------------- same as giveMeTheNamesOfAllApplesOnTheBranchWithThisCommentAsAxePointHmmm end --------------------------
			for (var j = 0; j < apples.length; j++) {
				if (allCommentsWithAllEntries[i]['author'] !== apples[j]['author'] && secondPersonCommentWithAllEntriesYoobee['author'] !== apples[j]['author']) {
					var titleCursory = "";
					var textCursory = "Intrusion prohibited";
					var viewSetter = {tag: "comment-tag{i.will.not.reply.and.expect.apology}", id: apples[j], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I intruded in a conflict"};
					viewSetterBunch.push(viewSetter);
				}
			}
		}
	}


	// comment-tag{explanation.why.i.was.angry} tag:
	// find (if it exists) comment with comment-tag{explanation.why.i.was.angry} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{explanation.why.i.was.angry}") !== -1) {
			var secondPersonCommentWithAllEntriesYoobee = getParent(allCommentsWithAllEntries[i]);
			var secondPersonName = secondPersonCommentWithAllEntriesYoobee['author'];
			var titleCursory = "";
			var textCursory = "Won Awkward Karma";
			var viewSetter = {tag: "comment-tag{explanation.why.i.was.angry}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, garble: false, exclamation: "I won Awkward Karma for explaining why I was angry and so did" + secondPersonName + "!"};
			viewSetterBunch.push(viewSetter);
		}
	}



	// comment-tag{your.comment.inspired.me} tag:
	// find (if it exists) comment with comment-tag{your.comment.inspired.me} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{your.comment.inspired.me}") !== -1) {
			var secondPersonCommentWithAllEntriesYoobee = getParent(allCommentsWithAllEntries[i]);
			if (getWordCountBesidesTheTagItselfDude(secondPersonCommentWithAllEntriesYoobee['body'], "comment-tag{your.comment.inspired.me}") < 20) {
				// Here: Word count of second persons comment is less than 20 words
				// Therefore: Give penalty to first person
				var titleCursory = "comment-tag{your.comment.inspired.me} tag violation: $1 May not be used in response to a comment with less than 20 words.";
				var textCursory = "comment-tag{your.comment.inspired.me} tag violation";
				var viewSetter = {tag: "comment-tag{your.comment.inspired.me}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I misused this tag."};
				viewSetterBunch.push(viewSetter);
			}
		}
	}



/*
	alt: tagAwkward();
*/


	// comment-tag{awkward} tag:
	// find (if it exists) comment with comment-tag{awkward} tag
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{awkward}") !== -1) {
			var secondPersonDudeAllEntriesInHere = getParent(allCommentsWithAllEntries[i]);
			if (secondPersonDudeAllEntriesInHere['body'].indexOf("comment-tag{") !== -1) {
				// Here: Second person's comment has ra tag. = violation!
				// Therefore: Make an appropriate viewsetter for this situation
				var titleCursory = "comment-tag{awkward} tag violation: §1: Don't use after comment with Comment Tag tag.";
				var textCursory = "comment-tag{awkward} tag violation";
				var viewSetter = {tag: "comment-tag{awkward}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I misused this tag."};
				viewSetterBunch.push(viewSetter);
			}
			else {
				if (!hasMoreWordsBesidesTheTagItselfDude(allCommentsWithAllEntries[i]['body'], "comment-tag{awkward}")) {
					// Here: tag is stand-alone the way it sholdn't be
					// Therefore: Garble
					var titleCursory = "comment-tag{awkward} tag violation: §2 Must not be stand-alone (no other text in comment)";
					var textCursory = "comment-tag{awkward} tag violation";
					var viewSetter = {tag: "comment-tag{awkward}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I forgot the not-stand-alone rule for this tag."};
					viewSetterBunch.push(viewSetter);
				}
				else {
					if (getWordCountBesidesTheTagItselfDude(allCommentsWithAllEntries[i]['body'], "comment-tag{awkward}") < 20) {
						// Here: Less than 20 words
						var titleCursory = "comment-tag{awkward} tag violation: §3 Must be precluded by a text with no less than 20 words.";
						var textCursory = "comment-tag{awkward} tag violation";
						var viewSetter = {tag: "comment-tag{awkward}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I used too few words for comment-tag{awkward}", hideViolate: true};
						viewSetterBunch.push(viewSetter);
					}
					else {
						// Here: No RA tag in second person's comment
						// Therefore: Everything is ok.
						var titleCursory = "";
						var textCursory = "comment-tag{awkward}";
						var viewSetter = {tag: "comment-tag{awkward}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, exclamation: "I used the comment-tag{awkward} tag...", garble: false};
						viewSetterBunch.push(viewSetter);
					}
				}
			}
		}
	}











	// all based on branches:

	// if isleaf:
		// set points based on age
		// add "tagAPKarma=points" to setterBunch
	// else
		// put every direct-answer comment in sub-branch into cursoryArrayDirectAnswers (new method: universalMethodGetDirectAnswerComments() )
		// find (is it exists) the youngest of these answers which is identical to second-person
			// add "tagAAnsweredCorrectlyByMeTheSecondPerson=true" to setterBunch [Display: Thanks! xx PKarma]
			// add "tagAAnsweredCorrectlyForMeTheFirstPerson=true" to setterBunch [Display: Answered + tick]
		// for all third-person direct answers:
			// add "tagAImproperlyAnsweredByMeTheThirdPerson=true" to setterBunch [Display: Bad answerer][Display: Red box around comment]

	// comment-tag{waits.for.anyone} tag:
	// find (if it exists) comment with comment-tag{waits.for.anyone} tag which hasn't been replied to by a second- or third person
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{waits.for.anyone}") !== -1) {
			var nowUTC = new Date().getTime();
			var thenUTC = allCommentsWithAllEntries[i]['created_utc'] * 1000;
			//console.log("then: " + thenUTC);
			//console.log("now: " + nowUTC);
			//console.log("age: " + (nowUTC - thenUTC));
			//console.log("tenMinutesChunksGoneBy:" + tenMinutesChunksGoneBy);
			//console.log("points:" + points);
			//if (points > 20) points = 20;
			//if (points < 5) points = 5;
			// Here: This comments body contains comment-tag{waits.for.anyone} tag
			// Therefore: Traverse all of them and find 2. and 3. person direct answers
			var wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson = getWholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson(allCommentsWithAllEntries[i]);
			var onlySecondAndThirdPersonsArray = [];
			//console.log("wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson.length: " + wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson.length);
			for (var j = 0; j < wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson.length; j++) {
				//console.log("allCommentsWithAllEntries[i]['author']: " + allCommentsWithAllEntries[i]['author']);
				//console.log("redditor: " + redditor);
				if (wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson[j]['author'] !== allCommentsWithAllEntries[i]['author']) {
					// Here: Author of reply IS NOT equal with first person
					// Therefore: Stuff possible direct second- and third-person answers into array
					onlySecondAndThirdPersonsArray.push(wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson[j]);
				}
			}
			if (onlySecondAndThirdPersonsArray.length == 0) {
				// Here: There are no replies yet
				// Therefore: Determine whether or not viewer is author of this comment and make viewsetter accordingly
				//console.log("this comment author: " + allCommentsWithAllEntries[i]['author'] + " redditor: " + redditor);
				var tenMinutesChunksGoneBy = (nowUTC - thenUTC)/Math.floor(1000 * 60 * 10);
				var points = Math.floor(tenMinutesChunksGoneBy);

				//console.log("then: " + thenUTC);
				//console.log("now: " + nowUTC);
				//console.log("age: " + (nowUTC - thenUTC));
				//console.log("tenMinutesChunksGoneBy:" + tenMinutesChunksGoneBy);
				//console.log("points:" + points);
				
				if (points > 20) points = 20;
				if (points < 5) points = 5;
				if (allCommentsWithAllEntries[i]['author'] === redditor) {
					var pointsText = "" + points;
					var viewSetter = {tag: "comment-tag{waits.for.anyone}", id: allCommentsWithAllEntries[i]['id'], text: pointsText, color: "black", title: "Waiting for an answer.", circle:true, circlecolor: "orange", exclamation: "I'm waiting for a reply from anybody..."};
					viewSetterBunch.push(viewSetter);
				}
				else {
					var pointsText = "" + points;
					var viewSetter = {tag: "comment-tag{waits.for.anyone}", id: allCommentsWithAllEntries[i]['id'], text: pointsText, color: "black", title: "Answer this question and earn p-karma!", circle: true, circlecolor: "green", exclamation: "I'm waiting for a reply from anybody..."};
					viewSetterBunch.push(viewSetter);
				}
			}
			else {
				// Here: There ARE replies!
				// Therefore: Iterate through them, to find winner of p-karma
				var oldestChildUTC = new Date().getTime();
				var oldestChildCommentIdCursory;
				var oldestChildNameCursory;
				for (var h = 0; h < onlySecondAndThirdPersonsArray.length; h++) {
					var milliSecondsAgeCursory = onlySecondAndThirdPersonsArray[h]['created_utc'] * 1000;
					//console.log("milliSecondsAgeCursory: " + milliSecondsAgeCursory);
					//console.log("oldestChildUTC        : " + oldestChildUTC);
					if (milliSecondsAgeCursory < oldestChildUTC) {
						oldestChildUTC = milliSecondsAgeCursory;
						oldestChildCommentIdCursory = onlySecondAndThirdPersonsArray[h]['id'];
						oldestChildNameCursory = onlySecondAndThirdPersonsArray[h]['author'];
					}
				}
				var notSoThenUTC = allCommentsWithAllEntries[i]['created_utc'] * 1000;
				tenMinutesChunksGoneBy = (oldestChildUTC - notSoThenUTC)/Math.floor(1000 * 60 * 10);
				//console.log("allCommentsWithAllEntries[i]['id']: " + allCommentsWithAllEntries[i]['id']);
				//console.log("notSoThenUTC  :" + notSoThenUTC);
				//console.log("oldestChildUTC: " + oldestChildUTC);
				var points = Math.floor(tenMinutesChunksGoneBy);
				//console.log("points: " + points);
				if (points > 20) points = 20;
				if (points < 5) points = 5;
				if (oldestChildNameCursory === redditor) {
					//console.log("is redditor: oldestChildCommentIdCursory: " + oldestChildCommentIdCursory + " oldestChildNameCursory" + oldestChildNameCursory);
					var textCursory = "You won " + points + " p-karma for your answer!";
					var viewSetter = {tag: "comment-tag{waits.for.anyone}", id: oldestChildCommentIdCursory, text: textCursory, color: "orange", title: "Congratulations!", exclamation: "I earned Awkward Karma for answering."};
					viewSetterBunch.push(viewSetter);
				}
				else {
					//console.log("is not redditor: oldestChildCommentIdCursory: " + oldestChildCommentIdCursory + " oldestChildNameCursory" + oldestChildNameCursory);
					var pointsText = "Won " + points + "!";
					var viewSetter = {tag: "comment-tag{waits.for.anyone}", id: oldestChildCommentIdCursory, text: pointsText, color: "red", title: "Answered question first and won p-karma", exclamation: "I answered first and won Awkward Karma."};
					viewSetterBunch.push(viewSetter);
				}
				var viewSetter = {tag: "comment-tag{waits.for.anyone}", id: allCommentsWithAllEntries[i]['id'], text: "answered", color: "black", title: "Answered question first and won p-karma", exclamation: "My comment was answered by " + oldestChildNameCursory};
				viewSetterBunch.push(viewSetter);
			}
		}
	}
	


	// comment-tag{waits.for.your.reply.only} tag:
	// find (if it exists) comment with comment-tag{waits.for.your.reply.only} tag, which hasn't been replied to by a second- or third person
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{waits.for.your.reply.only}") !== -1) {
			var secondPersonDudeAllEntriesInHere = getParent(allCommentsWithAllEntries[i]);
			var wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson = getWholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson(allCommentsWithAllEntries[i]);
			var onlySecondAndThirdPersonsArray = [];
			//console.log("wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson.length: " + wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson.length);
			for (var j = 0; j < wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson.length; j++) {
				//console.log("allCommentsWithAllEntries[j]['author']: " + allCommentsWithAllEntries[j]['author']);
				//console.log("redditor: " + redditor);
				//console.log("wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson[j]['author']:" + wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson[j]['author']);
				if (wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson[j]['author'] !== allCommentsWithAllEntries[i]['author']) {
					// Here: Author of reply IS NOT equal with first person
					// Therefore: Stuff possible direct second- and third-person answers into array
					onlySecondAndThirdPersonsArray.push(wholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson[j]);
				}
			}
			//console.log("onlySecondAndThirdPersonsArray.length " + onlySecondAndThirdPersonsArray.length);
			if (onlySecondAndThirdPersonsArray.length == 0) {
				// Here: There are no replies yet
				// Therefore: Make a viewsetter for either firstperson, secondperson and thirdperson
				if (allCommentsWithAllEntries[i]['author'] === redditor) {
					// Here: First person found!
					// Therefore: Make a viewsetter for first person
					var titleCursory = "You are waiting for " + secondPersonDudeAllEntriesInHere['author'] + " to answer!";
					var viewSetter = {tag: "comment-tag{waits.for.your.reply.only}", id: allCommentsWithAllEntries[i]['id'], text: "you are waiting", color: "black", title: titleCursory, exclamation: "I am waiting for " + secondPersonDudeAllEntriesInHere['author'] + " to answer..."};
					viewSetterBunch.push(viewSetter);
				}
				else {
					if (redditor !== secondPersonDudeAllEntriesInHere['author']) {
						// Here: Third person found!
						// Therefore: Make a viewsetter for third person
						var titleCursory = "Please don't reply to this message! " + allCommentsWithAllEntries[i]['author']  + " is waiting for " + secondPersonDudeAllEntriesInHere['author'] + " to answer his/her comment!";
						var textCursory = "Do not reply!";
						var viewSetter = {tag: "comment-tag{waits.for.your.reply.only}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, exclamation: "Please don't reply. (I'm waiting for " + getParent(allCommentsWithAllEntries[i])['author'] + ")."};
						viewSetterBunch.push(viewSetter);
					}
					else {
						// Here: Second person found!
						// Therefore: Make a nice viewsetter for him/her
						var titleCursory = "Please reply to this message! I am waiting.";
						var textCursory = "Please reply!";
						var viewSetter = {tag: "comment-tag{waits.for.your.reply.only}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, exclamation: titleCursory};
						viewSetterBunch.push(viewSetter);
					}
				}
			}
			else {
				// Here: There ARE replies!
				// Therefore: Iterate through them, and make viewsetters for second- and third-persons
				var nowUTC = new Date().getTime();
				for (var h = 0; h < onlySecondAndThirdPersonsArray.length; h++) {
					var milliSecondsAgeCursory = onlySecondAndThirdPersonsArray[h]['created_utc'] * 1000;
					var minutesGoneBy = (nowUTC - milliSecondsAgeCursory)/Math.floor(1000 * 60);
					if (secondPersonDudeAllEntriesInHere['author'] !== onlySecondAndThirdPersonsArray[h]['author']) {
						// Here: Answerer is third person and is interfering in this
						// Therefore: Garble this persons comment
						var titleCursory = "Redditor interfered. " + secondPersonDudeAllEntriesInHere['author'] + " should answer and not " + onlySecondAndThirdPersonsArray[h]['author'] +".";
						var viewSetter = {tag: "comment-tag{waits.for.your.reply.only}", id: onlySecondAndThirdPersonsArray[h]['id'], text: "interfered", color: "red", title: titleCursory, garble: true, exclamation: "I interfered."};
						viewSetterBunch.push(viewSetter);
					}
					else {
						// Here: Second person answered
						// Therefore: Make two glad ViewSetters
						// Here: Second person found!
							// Therefore: Make a nice viewsetter for him/her
						var titleCursory = "Redditor answered the comment from " + onlySecondAndThirdPersonsArray[h]['author'] + " just like he/she were requested to.";
						var textCursory = "Answered comment";
						var viewSetter = {tag: "comment-tag{waits.for.your.reply.only}", id: onlySecondAndThirdPersonsArray[h]['id'], text: textCursory, color: "green", title: titleCursory, exclamation: "I answered and won Awkward Karma."};
						viewSetterBunch.push(viewSetter);
						
						var titleCursory = "Comment answered.";
						var textCursory = "Answered comment";
						var viewSetter = {tag: "comment-tag{waits.for.your.reply.only}", id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, exclamation: "My comment was answered."};
						viewSetterBunch.push(viewSetter);
						
					}
				}
			}
		}
	}
	


	// comment-tag{i.apologize} tag:
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if ((allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{i.apologize}") !== -1) || (allCommentsWithAllEntries[i]['body'].indexOf("comment-tag{guarded.apology}") !== -1)) {
			var secondPersonDudeAllEntriesInHere = getParent(allCommentsWithAllEntries[i]);
			var secondPersonName = secondPersonDudeAllEntriesInHere['author'];
			var firstPersonName = allCommentsWithAllEntries[i]['author'];
			var body = allCommentsWithAllEntries[i]['body'];
			// Match text between {}
			var matches = body.match(/\{(.*?)\}/);
			var shortHandTag = matches[1];
			var tag = "comment-tag{" + shortHandTag + "}";

			if (secondPersonDudeAllEntriesInHere['body'].indexOf("comment-tag{i.will.not.reply.and.expect.apology}") !== -1) {
				var titleCursory = "I apologized to " + secondPersonName + ".";
				if (redditor === firstPersonName) {
					titleCursory = "You apologized to " + secondPersonName + ".";
				}
				var textCursory = "Ignored.";
				var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "green", title: titleCursory, exclamation: "I apologized."};
				viewSetterBunch.push(viewSetter);
			}
			else {
				var titleCursory = tag + " tag misuse: Must be used right after comment-tag{i.will.not.reply.and.expect.apology}";
				var textCursory = tag + " tag violation";
				var viewSetter = {tag: tag, id: allCommentsWithAllEntries[i]['id'], text: textCursory, color: "red", title: titleCursory, garble: true, exclamation: "I misused this tag."};
				viewSetterBunch.push(viewSetter);
			}
		}
	}

	










	// finally apply setterBunch to view via content script
















	// Find axePoints:
	//traverseD(dimba, 1);
















    //console.log("start 3 hooop. axeSpot count: " + axeSpots.length);
}
function hasMoreWordsBesidesTheTagItselfDude(text, tag) {
	var actualStringTheWayItLooksOnThePage = tag;
	if (text.indexOf("](http://comment-tag.com/rules/") !== -1) {
		actualStringTheWayItLooksOnThePage = '[' + tag + '](http://comment-tag.com/rules/' + tag + '.php)';
	}
	//This javascript code removes all 3 types of line breaks
	text = text.replace(/(\r\n|\n|\r)/gm,"");
	return (text.length > actualStringTheWayItLooksOnThePage.length);
}

function getWordCountBesidesTheTagItselfDude(text, tag) {
	//This javascript code removes all 3 types of line breaks
	text = text.replace(/(\r\n|\n|\r)/gm,"");
	var actualStringTheWayItLooksOnThePage = '[' + tag + '](http://comment-tag.com/rules/' + tag + '.php)';
	text = text.replace(actualStringTheWayItLooksOnThePage, '');
	return text.split(/\s+/).length;
}

function getWholeBunchOfDirectRepliersArrayFirstSecondAndThirdPerson(commentWithAllEntries) {
	var bunch = [];
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {	
		if (commentWithAllEntries['id'] === allCommentsWithAllEntries[i]['parent_id'] && allCommentsWithAllEntries[i]['author'] !== "[deleted]") {
			bunch.push(allCommentsWithAllEntries[i]);
		}
	}
	return bunch;
}

function getViewSetterByIdAndTag(id, tag) {
	for (var j = 0; j < viewSetterBunch.length; j++) {
		//console.log("------------------------>" + viewSetterBunch[j]['id'] + " ; " + id + " ; " + viewSetterBunch[j]['tag'] + " ; " + tag);
		if (viewSetterBunch[j]['id'] === id && viewSetterBunch[j]['tag'] === tag) {
			//console.log("------------------------>FOUND");
			return viewSetterBunch[j];
		}
	}
	return null;
}

function getFirstViewSetterById(id) {
	for (var j = 0; j < viewSetterBunch.length; j++) {
		//console.log("2------------------------>" + viewSetterBunch[j]['id'] + " ; " + id);
		if (viewSetterBunch[j]['id'] === id) {
			//console.log("------------------------>FOUND2");
			return viewSetterBunch[j];
		}
	}
	return null;
}

function dumpLocal(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

   	//console.log(out);
}



function constructBranch(k) {
	var a = [];
	var i = 1;
	var c;
	a.push(k);
	while ((c = getParent(a[i-1]))) {
		if (c) a.push(c);	
		i++;
	}
	return a;
}

var parentC;
var commentIdToLookFor;

function getParent(k) {
	//console.log("base for search: " + k['id']);
	commentIdToLookFor = k['parent_id'];
	if (k['parent_id'] === allCommentsWithAllEntries[0]['id']) {
		return allCommentsWithAllEntries[0];
	}
	//console.log("looking for: " + commentIdToLookFor);
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (commentIdToLookFor === allCommentsWithAllEntries[i]['id']) {
			//console.log("Found!");
			return allCommentsWithAllEntries[i];
		}
	}
	////console.log("found: " + parentC);


	//console.log("Not found!");



	//k['parent_id'] = k['id']; // <--- mhh: special situation: k is main post
	return null; // <--- mhh: special situation: k is main post








}

var parentIdToLookFor;
var idsOfChildlessParents = [];
var isNotContainedInSomeParentIdOrOther;
// jeg kommer med et id (parentIdToLookFor). så skal vi bare tjekke om det findes blandt samtlige parent_id'er. true eller false

function isSomeOnesParent(commentWithAllEntries) {
	for (var i = 0; i < allCommentsWithAllEntries.length; i++) {
		if (commentWithAllEntries['id'] === allCommentsWithAllEntries[i]['parent_id']) {
			return true;
		}
	}
	return false;
}


//Since there is no 'built in' way to remove duplicate (ECMA-262 actually has Array.forEach which would be great for this..), so we do it manually:
// Merges both arrays and gets unique items
//var array3 = array1.concat(array2).unique(); 
Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};



function traverseH(x, level) {
  //toocplxcounter++;
  //if (toocplxcounter > 4000) return;
	////console.log("grobert");
  if (isArray(x)) {
    traverseArrayH(x, level);
  } else if ((typeof x === 'object') && (x !== null)) {
		////console.log("obby found!");
		//dumpLocal(x);






		if (x.id) {
			var parentIdPlain = null;
			var body = null;
			if (x.selftext) { // selftext: only exists for main post/link
				body = x.selftext;
			}
			else {
				body = x.body;
			}
			if (x.parent_id) {
				parentIdPlain = x.parent_id.substring(3);
			}
			if (!body || typeof body === "undefined") { // BUG7_ FIX
				body="";
			}
			////console.log("obby parent: " + parentIdPlain);
			if (x.id !== "_") { // BUG6_ FIX
				allCommentsWithAllEntries.push( { id: x.id, parent_id: parentIdPlain, created_utc: x.created_utc, created: x.created, body: body, edited: x.edited, ups: x.ups, downs: x.downs, author: x.author } );
			}

		}






		/*if (x.parent_id) {
			var parentIdPlain = x.parent_id.substring(3);
			////console.log("obby parent: " + parentIdPlain);
			allCommentsWithAllEntries.push( { id: x.id, parent_id: parentIdPlain, created_utc: x.created_utc, created: x.created, body: x.body, edited: x.edited, ups: x.ups, downs: x.downs, author: x.author } );

		}*/















    traverseObjectH(x, level);
  } else {
		////console.log("plobby found!");
		//dumpLocal(x);


		//if (x.id) { //console.log("plobby id: " + x.id); }


		//if (lookOut) { allCommentsWithAllEntries.push(x); lookOut = false;}
    //////console.log(level + x);
		/*if (lookOut) { if ( (x) && (typeof x === "string") && (startsWith(x, "t1_")) ) { idsOfCommentWhoHasTOneParent.push(rememberOThatIdYeah); lookOut = false; }} 			*/
		//if (lookOutForId) { rememberOThatIdYeah = x; lookOutForId = false; }
		//lookOut = false;
		//lookOutForId = false;
  }
}
 
function traverseArrayH(arr, level) {
  //////console.log(level + "<array>");
  arr.forEach(function(x) {
    traverseH(x, level + "  ");
  });
}

function traverseObjectH(obj, level) {
  //////console.log(level + "<object>");
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      //////console.log(level + "  " + key + ":");
			//if (key.id) { lookOut = true; }
    	traverseH(obj[key], level + "    ");
    }
  }
}




function traverseD(x, level) {
	//toocplxcounter++;
	//if (toocplxcounter > 4000) return;
	if (isArray(x)) {
		traverseArrayD(x, level);
	} else if ((typeof x === 'object') && (x !== null)) {
		traverseObjectD(x, level);
	} else {
		//////console.log(level + x);
		if (lookOut) { if ( (x) && (typeof x === "string") && (x.indexOf(codeOneTag) !== -1) ) { axeSpots.push(rememberOThatIdYeah); lookOut = false; }}
		if (lookOutForId) { rememberOThatIdYeah = x; lookOutForId = false; }
		lookOut = false;
		lookOutForId = false;
	}
}

function traverseArrayD(arr, level) {
	//////console.log(level + "<array>");
	arr.forEach(function(x) {
		traverseD(x, level + "  ");
	});
}

function traverseObjectD(obj, level) {
	//////console.log(level + "<object>");
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			//////console.log(level + "  " + key + ":");
			if ("body" === key) { lookOut = true; }
			if ("id" === key) { lookOutForId = true; }
			traverseD(obj[key], level + "    ");
		}
	}
}












function waitButtonHandler2() {
    //////console.log("p a s s AAAAq< ! !********************");
    ////console.log("start!");
    
    directChildrenIds = [];
	processedIds = [];
	commentsMarkedForRemoval = [];
    ////console.log("starting1234... codeOneTag: " + codeOneTag);

    //////console.log("p a s s AAA ! !********************");
    var data3;
		
	/*////console.log("kaplot!");
	$.getJSON( codeOneURL, function( dat ) {
		doLastOfWait(dat);
	});*/

	////console.log("gopda!");

    /*var xhr = new XMLHttpRequest();
	////console.log("kanut!");
    xhr.open("GET", codeOneURL, true);
	////console.log("grejse!");
    xhr.onreadystatechange = function() {
        //////console.log("s:" + xhr.readyState);
        if (xhr.readyState == 4) {
            //////console.log("start 1:" + xhr.responseText);
            // JSON.parse does not evaluate the attacker's scripts.
            //////console.log("p a s s AAA ! !********************");
            data3 = xhr.responseText;
            //////console.log("start 234");
            //////console.log("p a s s AA ! !********************");
            doLastOfWait(data3);
            //////console.log(resp);
        }
    }
	////console.log("diffen!");
    xhr.send();
	////console.log("klabauter!");
	*/

    //////console.log( "Data Loaded: " + data );



	doLastOfWait();
}

var axeSpots = [];

function doLastOfWait() {
	//console.log("saplatta!");
	
	
	if (axeSpots.length == 0) {
		//console.log("No axespots found!");
		return;
	
	}	

	
	var branchesWithAxeSpots = [];
	for (var w = 0; w < axeSpots.length; w++) {
		//console.log("klink!" + branches.length);
		for (var y = 0; y < branches.length; y++) {
			////console.log("badink!");
			for (var i = 0; i < branches[y].length; i++) {
				//////console.log("b1: " + branches[y][i] + " a1: " + axeSpots[w]);
				if (branches[y][i] === axeSpots[w]) {
					if (!contains(branchesWithAxeSpots, y)) { branchesWithAxeSpots.push(y); }
					//if (!contains(goldenBranchIdsToRemove, branches[y][i])) { goldenBranchIdsToRemove.push(branches[y][i]); }
				}
			}
		}
	}

	//console.log("1 branchesWithAxeSpots size: " + branchesWithAxeSpots.length);
	var stop;
	var currentBranchAxeSpotCount = 0;
	var goldenBranchIdsToRemove = [];
	for (var r = 0; r < axeSpots.length; r++) {
		for (var w = 0; w < branchesWithAxeSpots.length; w++) {
			stop = false;
			////console.log("klink2!---------------_>" + branchesWithAxeSpots[w] + " ------> " + branches[branchesWithAxeSpots[w]].length);
			//for (var y = 0; y < branches[branchesWithAxeSpots[w]].length; y++) {
				////console.log("badink2!");
				stop = false;

				var timbal = countMatches(branches[branchesWithAxeSpots[w]], axeSpots[r]);
				////console.log("UUUUUUUUUUUUUUUUUUUUUUUUU " + branchesWithAxeSpots[w] + " " + timbal);


				var toTimbalCounter = 0;
				for (var i = 0; i < branches[branchesWithAxeSpots[w]].length; i++) {
					//////console.log("b: " + branches[w][i] + " a: " + axeSpots[w]);
					//if (branches[w][i] === axeSpots[w]) {
						var t = branches[branchesWithAxeSpots[w]][i];


						if (t === axeSpots[r]) { toTimbalCounter++; }
						if (toTimbalCounter === timbal) { stop = true;}

						if (!contains(goldenBranchIdsToRemove, t) && !stop) { 
							goldenBranchIdsToRemove.push(t); 
							////console.log("1 scheduled for deletion: " + t);
						}
						
					//}
					//////console.log("caution!");
				}
			//}
		}
	}



	//console.log("goldenBranchIdsToRemove size: " + goldenBranchIdsToRemove.length);
	//goldenBranchIdsToRemove.unique();
	//////console.log("goldenBranchIdsToRemove size: " + goldenBranchIdsToRemove.length);
	for (var i = 0; i < goldenBranchIdsToRemove.length; i++) {
		////console.log("* scheduled for deletion: " + goldenBranchIdsToRemove[i]);
		
	}

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {funkodonko: "erase", directChildrenIds: goldenBranchIdsToRemove, type: "t1"}, function(response) {});
	});
	//console.log("Dunno. I dunno.");
}

var mustBeStandAloneTags = {
	"waits.for.anyone" : "mayNotStandAlone",
    "waits.for.your.reply.only" : "mayNotStandAlone",
    "i.find.this.unworthy.for.discussion" : "noStandAloneRule",
    "i.find.the.subject.unworthy.for.discussion" : "noStandAloneRule",
    "please.use.comment-tag.tags.from.here" : "noStandAloneRule",
    "i.will.not.reply.and.expect.apology" : "mustStandAlone",
    "i.apologize" : "mustStandAlone",
    "no.problem" : "mustStandAlone",
    "your.comment.inspired.me" : "takenCareOfElsewhere",
	"thanks" : "noStandAloneRule",
	"youre.welcome" : "noStandAloneRule",
    "i.dont.think.the.original.post.has.been.addressed.yet" : "noStandAloneRule",
    "i.dont.think.the.original.post.has.been.taken.seriously.yet" : "noStandAloneRule",
    "i.dont.think.the.original.post.has.been.treated.respectfully" : "noStandAloneRule",
    "guarded.apology" : "mayNotStandAlone",
    "explanation.why.i.was.angry" : "mayNotStandAlone",
    "dont.mind.its.ok.lets.move.on" : "noStandAloneRule",
    "i.was.being.careless" : "noStandAloneRule",
    "i.am.glad.you.said.that.to.me" : "noStandAloneRule",
    "its.fine.i.consider.the.case.closed" : "noStandAloneRule" ,
    "i.consider.this.comment.definitive.and.consider.any.reply.inappropriate" : "mayNotStandAlone",
    "interesting.will.write.more.in.a.few.days.time" : "noStandAloneRule",
    "i.am.one.of.the.strangest.people.youll.ever.meet" : "noStandAloneRule",
    "er.hi.what.kind.of.strange.presentation.is.that" : "noStandAloneRule",
    "youre.being.overly.ironic.and.are.violating.the.rules" : "noStandAloneRule",
    "awkward" : "takenCareOfElsewhere",
    "watch.me.playing.soccer.with.myself.in.this.video" : "noStandAloneRule",
	"that.pissed.me.off.but.please.dont.mind" : "takenCareOfElsewhere",
	"thanks.but.a.bit.off.topic" : "noStandAloneRule",
	"your.post.inspired.me" : "noStandAloneRule",
	"your.link.inspired.me" : "noStandAloneRule",
	"a.warning.from.one.intellectual.to.another" : "noStandAloneRule",
	"i.wont.comment.for.personal.reasons" : "mayNotStandAlone",
	"a.warm.welcome.to.my.world.without.a.naive.invitation.to.be.my.friend": "mayNotStandAlone"
};


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

var tagsKnownToWoman = [
	"waits.for.anyone",
    "waits.for.your.reply.only",
    "i.find.this.unworthy.for.discussion",
    "i.find.the.subject.unworthy.for.discussion",
    "i.will.not.reply.and.expect.apology",
    "i.apologize",
    "no.problem",
    "your.comment.inspired.me",
	"thanks",
	"youre.welcome",
    "i.dont.think.the.original.post.has.been.addressed.yet",
    "i.dont.think.the.original.post.has.been.taken.seriously.yet",
    "i.dont.think.the.original.post.has.been.treated.respectfully",
    "guarded.apology",
    "explanation.why.i.was.angry",
    "dont.mind.its.ok.lets.move.on",
    "i.was.being.careless",
    "i.am.glad.you.said.that.to.me",
    "its.fine.i.consider.the.case.closed",
    "i.consider.this.comment.definitive.and.consider.any.reply.inappropriate",
    "interesting.will.write.more.in.a.few.days.time",
    "i.am.one.of.the.strangest.people.youll.ever.meet",
    "er.hi.what.kind.of.strange.presentation.is.that",
    "youre.being.overly.ironic.and.are.violating.the.rules",
    "awkward",
    "watch.me.playing.soccer.with.myself.in.this.video",
	"that.pissed.me.off.but.please.dont.mind",
	"thanks.but.a.bit.off.topic",
	"your.post.inspired.me",
	"your.link.inspired.me",
	"a.warning.from.one.intellectual.to.another",
	"i.wont.comment.for.personal.reasons",
	"a.warm.welcome.to.my.world.without.a.naive.invitation.to.be.my.friend"
];
