Number.prototype.padLeft = function(base,chr){
   var  len = (String(base || 10).length - String(this).length)+1;
   return len > 0? new Array(len).join(chr || '0')+this : this;
}

$.fn.exists = function () {
	return this.length !== 0;
}

function getKeyByValueRA(arr, value) {
    for (var key in arr) {
        if (arr[key] == value) return key;
    }
    return false;
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
	if (value !== "Please select a Comment Tag:" && value !== "No Comment Tag Tags available") {
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
			// Therefore: Append snippet			
			yourCommentHere = "[Your comment here]";
			textAreaIsEmpty = true;
		}
		var lineBreaks = "\n\n";
		var nonIntuitiveValue = getKeyByValueRA(intuitiveTagNames, value);
		if (mustBeStandAloneTags[nonIntuitiveValue] === "mustStandAlone") {
			lineBreaks = "";
			yourCommentHere = "";
		}
		
		var d = new Date, datePlusTime = [
                    d.getFullYear(),d.getDate().padLeft(), (d.getMonth()+1).padLeft()].join('/')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');

		var r1 = Math.floor(Math.random()*900) + 100;
		var r2 = Math.floor(Math.random()*9000) + 1000;
		var r3 = Math.floor(Math.random()*900) + 100;
		var cert = "CTC-" + r1 + "-" + r2 + "-" + r3;

		var ins_text = yourCommentHere + lineBreaks + 'C O M M E N T - T A G - C E R T I F I C A T E - B E G I N' + lineBreaks + 'Comment Tag: ' + value + lineBreaks + 'Issued to: The Submitter' + lineBreaks + 'Issuer: The Non-Profit Comment Tag Organization, on: ' + datePlusTime + '.' + lineBreaks + 'Value: USD10' + lineBreaks + 'Acquisition Status: *)' + lineBreaks + '*) Please install the Comment Tag Browser Extension (Available for Chrome and Opera) to view Acquisition Status.' + lineBreaks + 'Unique Certificate Id: ' + cert + lineBreaks + 'This Comment Tag Certificate certifies that this Comment Tag is used in compliance with the Comment Tag License, version 1.0. Until such Time as The Certificate is acquired by a Comment Tag Sponsor, the Rightful Owner of this Certificate is the Submitter.' + lineBreaks + 'Authors: Else Andersen and Morten Hjerl-Hansen\nDecember 2016, Faarevejle, DENMARK' + lineBreaks + 'C O M M E N T - T A G - C E R T I F I C A T E - E N D';












		
		/*var ins_text = yourCommentHere + lineBreaks + '[Ye-Ye Youbeeya: ' + value + '](http://comment-tag.com/rules/' + nonIntuitiveValue + '.php) This is a road-sign. Where? Right here! The internet needs road-signs. You don\'t ask car-drivers if you can put up road-signs. You don\'t even ask the prime-minister or the queen. You just ask a specialist in safe driving and a road sign maker. And they\'ll say no. :-) Btw: I earned ten bucks for using this tag.';
		if (!chkbx.prop('checked')) {
			ins_text = yourCommentHere + lineBreaks + 'Ye-Ye Youbeeya: ' + value + ' This is a road-sign. Where? Right here! The internet needs road-signs. You don\'t ask car-drivers if you can put up road-signs. You don\'t even ask the prime-minister or the queen. You just ask a specialist in safe driving and a road sign maker. And they\'ll say no. :-) Btw: I earned ten bucks for using this tag.';
		}*/
		console.log("appended:" + ins_text);
		ta.val( ta.val() + ins_text );
		var myDDL =  $( sel );
		myDDL[0].selectedIndex = 0;
		setTimeout(function() {
			/* Example: Send data to your Chrome extension*/
			document.dispatchEvent(new CustomEvent("select_an_opt", {
				detail: {
					commentId: cid,
					value: nonIntuitiveValue
				},
				bubbles: true,
				cancelable: true
			}));
		}, 0);
		ta.focus();
		if (textAreaIsEmpty) {
			if (mustBeStandAloneTags[nonIntuitiveValue] !== "mustStandAlone") {
				ta.prop({
					'selectionStart': 0,
					'selectionEnd': 19
				});
			}
		}
	}
}

function addEventHandlersForSmallReplyButtons() {
$( ".reply-button" ).click(function(event) {
		var parentElementId = $( event.target ).parent().parent().parent().parent().attr( "id" );
		if (!parentElementId) { // FIX for BUG8_
			parentElementId = $( event.target ).parent().parent().parent().attr( "id" );
			console.log("Applied FIX for BUG8_ (1)");
		}
		if (!parentElementId) { // FIX for BUG8_
			parentElementId = $( event.target ).parent().parent().parent().parent().parent().attr( "id" );
			console.log("Applied FIX for BUG8_ (2)");
		}
		if (!parentElementId) { // FIX for BUG8_
			console.log("BUG8_ FIX failed.");
		}
		else {
			console.log("BUG8_ FIX apparently worked.");
		}
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
}



$(document).ready(function() {
	addEventHandlersForSmallReplyButtons();
	$( "[id^=more_]" ).click(function(event) { // FIX for BUG8_
		console.log("Applying fix for BUG8_ (1)");
		setTimeout(function() {
			console.log("Applying fix for BUG8_ (2)");
			addEventHandlersForSmallReplyButtons();
		}, 3000);
	});
});

// Copied from myscriptw.js:
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
