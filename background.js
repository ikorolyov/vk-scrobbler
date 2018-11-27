(function () {

    var lastFmAuthUrl = "www.last.fm/api/auth?api_key=0e593acc98ed557d04c6e931b9d3bea5";

    chrome.runtime.onInstalled.addListener(function () {

        // 1. Ruls initialization (if 'page_action')
        /*   var declarativeContentRules = [{
               conditions: [
                   new chrome.declarativeContent.PageStateMatcher({
                       pageUrl: { hostEquals: "vk.com" }
                   })
               ],
               actions: [new chrome.declarativeContent.ShowPageAction()]
           }];
       
           chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
               chrome.declarativeContent.onPageChanged.addRules(declarativeContentRules);
           });*/

        // 2. Tabs update listening
        var authPageOpened = false;
        var token = null;
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            
            if (changeInfo.url && tab.url &&
                changeInfo.url.indexOf(lastFmAuthUrl) > 0 && tab.url.indexOf(lastFmAuthUrl) > 0) authPageOpened = true;
            if (authPageOpened == true && token == null) {
                var tokenUrl = changeInfo.url || "";
                var tokenStartInd = tokenUrl.lastIndexOf("?token=");
                if (tokenStartInd > 0 && tokenStartInd + 8 < tokenUrl.length) token = tokenUrl.substring(tokenStartInd + 7);
                if (token != null) {
                    chrome.storage.local.set({ lastFmToken: token }, function() {
                        console.log("Token saved: ", token);

                    });
                }
            }
        });


    });

})();