/*
 Assign listenOListenMyFriend() as a listener for messages from the extension.
 */
chrome.runtime.onMessage.addListener(listenOListenMyFriend);


function listenOListenMyFriend(request, sender, sendResponse) {
    //console.log("I'm listening...");
    if (request.funkodonko === "erase") {
        var directChildrenIds = request.directChildrenIds;
        var type = request.type;
        console.log("hej fra erase.js! length:" + directChildrenIds.length);
        for(var i=0, len=directChildrenIds.length; i < len; i++) {
            var id = directChildrenIds[i];
            var dut = type + "_" + id;
            $('div')
                .filter(function() {
                    return $(this).data("fullname") == dut
                })
                .remove()
            ;
        }

    }


}
