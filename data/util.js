/**
 * Created by morten on 13-09-16.
 */
/*
 Assign listenOListenMyFriend() as a listener for messages from the extension.
 */

chrome.runtime.onMessage.addListener(listenOListenMyFriend2);

function listenOListenMyFriend2(request, sender, sendResponse) {
    if (request.funkodonko === "substituteWords") {
        var wordlist = request.wordlist;
        var html = $('html')[0].outerHTML;
        document.body.firstChild.remove();
        console.log("subst length: " + html.length);
        console.log("hej fra util.js! length:" + wordlist.length);
        for (var i = 0; i < wordlist.length - 2; i = i + 2) {
            //$(this).html().replace(wordlist[i],wordlist[i+1]);
            //$(this).html().split(wordlist[i]).join(wordlist[i+1]);



            /*$("#container").contents().each(function () {
                var reg = new RegExp(wordlist[i], "g");
                if (this.nodeType === 3) this.nodeValue = $.trim($(this).text()).replace(reg, wordlist[i+1]);
                if (this.nodeType === 1) $(this).html( $(this).html().replace(reg,wordlist[i+1]));
            })*/


            strReplaceAll(html,wordlist[i],wordlist[i+1]);
        }
        document.body.appendChild(html);
    }
    else if (request.funkodonko === "getRedditor") {
        var redditor = "---";
        var longString = $("span.user").html();
        console.log("span: " + longString);
        var i = longString.indexOf('>');
        var i2 = longString.substring(i+1,longString.indexOf("</span>"));
        console.log("i2:" + i2);
        if (longString.indexOf('class="login-required"') !== -1) {
            console.log("not logged in");
        }
        else {
            i = longString.indexOf(">");
            var j = longString.indexOf("</a>");
            console.log("i, j=" + i + ", " + j);
            redditor = longString.substring(i + 1, j);
            console.log("redditor: " + redditor);
        }
        sendResponse({redditor: redditor});
    }
	else if (request.funkodonko === "getTabURL") {
		console.log("a");
		var tabURL = window.location.toString();
		console.log("b:" + tabURL);
		sendResponse({tabURL: tabURL});
	}
	else if (request.funkodonko === "getDisqusThreadID") {
		/*console.log("a123");
		var disqusThreadObj = null;
		var disqusMain = $( '#disqus-thread' );
		var temp = $( '#disqus-thread' ).html();
		console.log("temp:" + temp);
		if (!disqusMain) {
			console.log("------------------------------->No diqus on this page!");
			sendResponse({found: false, disqusThreadID: disqusThreadID});
		}
		else {
			var b = $( '#disqus_thread' ).html();
			console.log("b: " + b);
			var a = $( '#disqus_thread' ).find( '#dsq-app1' ).contents().html();
			console.log("a: " + a);
			var disqusThreadJSON = $( '#disqus_thread' ).find( 'iframe#dsq-app1' ).contents().find("#disqus-threadData").html();
			console.log("disqusThreadJSON:" + disqusThreadJSON);
			var disqusThreadObj = JSON.parse(disqusThreadJSON);
			var disqusThreadID = disqusThreadObj.response.posts[0].thread;
			console.log("disqusThreadID" + disqusThreadID);
			sendResponse({found: found, disqusThreadID: disqusThreadID});
		}
		var disqusThreadJSON = $( '#disqus-threadData' ).text();
		console.log("b123:" + disqusThreadJSON);
		*/


		sendResponse({found: false, disqusThreadID: "a"});
		
	}
	
}

function strReplaceAll(string, Find, Replace) {
    try {
        return string.replace( new RegExp(Find, "gi"), Replace );
    } catch(ex) {
        return string;
    }
}

