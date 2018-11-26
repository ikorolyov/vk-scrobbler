chrome.runtime.onInstalled.addListener(function () {
    //alert('Oi!');

    function _log(str, obj) { chrome.extension.getBackgroundPage().console.log(str, obj || null); };
    function _save(obj) { chrome.storage.local.set(obj, function () { _log("Data saved! (background) ", obj); }); }; 

    // 1. Ruls initialization
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
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

        chrome.storage.local.set({"a": "b"}, function () {

            _log("bl");
          });
          
        _log("-- tabs update", { changeInfo: changeInfo, tab: tab });

        if (!changeInfo.url || !tab.id || !tab.url) return;

        _log("-- valid tabs update");

        chrome.storage.local.get(["lastFmAuthUrl", "lastFmAuthTabId"], function (data) {
            
            _log("-- try get data", data);

            if (!data.lastFmAuthUrl || !data.lastFmAuthTabId || tab.id != data.lastFmAuthTabId) return;

            _log("Last fm auth page data found (background)!");
            
            var authUrl = data.lastFmAuthUrl;
            var tokenStartInd = authUrl.lastIndexOf("?token=");
            if (tokenStartInd > 0) {
                var token = authUrl.substring(tokenStartInd + 7);
                if (token) _save({ lastFmUserToken: token });
            }


        });

    });


});