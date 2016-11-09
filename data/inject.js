$.fn.exists = function () {
	return this.length !== 0;
}

$(document).ready(function() {
	/*$( ".save" ).click(function() {
		//alert( "Handler for .click() called." );
		if (confirm('Reload now?')) {
			setTimeout(function() {
				location.reload();
			}, 3000);
		} else {
			// Do nothing!
		}
	});*/
	/*document.dispatchEvent(new CustomEvent("select_an_opt", {
		detail: {
			commentId: cid,
			targetThing: sel.target,
			value: value
		}
	}));*/
});

function rADropdownSelect(sel, cid, isMainPost) {
	var value = sel.value;
	if (value !== "Please select a Reddit Awkward Tag:" && value !== "No Reddit Awkward Tags available") {
		console.log();
		var linkCheckboxId = "ra_link_chkbx_" + cid;
		var chkbx = $( sel ).parent().parent().parent().find("#" + linkCheckboxId);
		var ta = $( sel ).parent().parent().parent().parent().find("textarea");
		if (isMainPost) {
			ta = $( sel ).parent().parent().find("textarea").first();
		}
		var textAreaIsEmpty = false;
		var yourCommentHere = "";
		if (!$.trim( ta.val())) {
    		// Here: textarea is empty or contains only white-space
			// Therefore: Append text			
			yourCommentHere = "[Your comment here]";
			textAreaIsEmpty = true;
		}
		var lineBreaks = "\n\n";
		if (mustBeStandAloneTags[value] === "mustStandAlone") {
			lineBreaks = "";
		}
		var ins_text = yourCommentHere + lineBreaks + '[reddit.awkward{' + value + '}](https://redditawkward.com/rules/' + value + '.php)';
		if (!chkbx.prop('checked')) {
			ins_text = yourCommentHere + lineBreaks + 'reddit.awkward{' + value + '}';
		}
		console.log("appended:" + ins_text);
		ta.val( ta.val() + ins_text);
		var myDDL =  $( sel );
		myDDL[0].selectedIndex = 0;
		setTimeout(function() {
			/* Example: Send data to your Chrome extension*/
			document.dispatchEvent(new CustomEvent("select_an_opt", {
				detail: {
					commentId: cid,
					value: value
				},
				bubbles: true,
				cancelable: true
			}));
		}, 0);
		ta.focus();
		if (textAreaIsEmpty) {
			ta.prop({
				'selectionStart': 0,
				'selectionEnd': 19
			});
		}
	}
}

$(document).ready(function() {
	$( ".reply-button" ).click(function(event) {
		var parentElementId = $( event.target ).parent().parent().parent().parent().attr( "id" );
		var n = parentElementId.lastIndexOf("_") + 1;
		var commentId = parentElementId.substring(n);
		console.log("commentId------------------------------->" + commentId);
		var selectId = "ra_select_" + commentId;
		// Fix for BUG4_:
		setTimeout(function() {
			//$( "div" ).remove( ".ra_inserted_div" ); // BUG2_ FIX FAILED
			document.dispatchEvent(new CustomEvent("bug4_fix_event", {
				detail: {
					commentId: commentId,
					parentElementId: parentElementId
				},
				bubbles: true,
				cancelable: true
			}));
		}, 0);
		setTimeout( function() {
			
			//if (!$( "#" + selectId ).exists()) {
				setTimeout(function() {
					//$( "div" ).remove( ".ra_inserted_div" ); // BUG2_ FIX FAILED
					document.dispatchEvent(new CustomEvent("small_reply_link_clicked", {
						detail: {
							commentId: commentId,
							parentElementId: parentElementId
						},
						bubbles: true,
						cancelable: true
					}));
				}, 0);
			//}
		}, 2000);
	});
});

var mustBeStandAloneTags = {
	"waits.for.anyone" : "mayNotStandAlone",
    "waits.for.your.reply.only" : "mayNotStandAlone",
    "i.find.this.unworthy.for.discussion" : "noStandAloneRule",
    "i.find.the.subject.unworthy.for.discussion" : "noStandAloneRule",
    "please.use.reddit.awkward.tags.from.here" : "noStandAloneRule",
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
    "doorslam" : "noStandAloneRule",
    "i.am.glad.you.said.that.to.me" : "noStandAloneRule",
    "its.fine.i.consider.the.case.closed" : "noStandAloneRule" ,
    "i.consider.this.comment.definitive.and.consider.any.reply.inappropriate" : "mayNotStandAlone",
    "interesting.will.write.more.in.a.few.days.time" : "noStandAloneRule",
    "i.am.one.of.the.strangest.people.youll.ever.meet" : "noStandAloneRule",
    "er.hi.what.kind.of.strange.presentation.is.that" : "noStandAloneRule",
    "youre.being.overly.ironic.and.are.violating.the.rules" : "noStandAloneRule",
    "awkward" : "takenCareOfElsewhere",
    "watch.me.playing.soccer.with.myself.in.this.video" : "noStandAloneRule",
	"no.i.mean.it" : "mustStandAlone",
	"that.pissed.me.off.but.please.dont.mind" : "takenCareOfElsewhere"
};
