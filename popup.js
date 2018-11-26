

    function _log(str, obj) { chrome.extension.getBackgroundPage().console.log(str, obj || null); };
    function _save(obj) {
        
    };


    var lastFmAuthBaseUrl = "http://www.last.fm/api/auth/?api_key";
    var publicApiKey = "9f046188eba9b6abcc122d822799c46d";

    var connectButton = document.getElementById("connectButton");

    connectButton.onclick = function () {
        


        chrome.tabs.create({ url: lastFmAuthBaseUrl + "=" + publicApiKey }, function (tab) {
         
            _log("Tab created (" + tab.url + ")");
        });
    };


