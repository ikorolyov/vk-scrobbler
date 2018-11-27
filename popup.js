(function () {
    
    function _log(str) { chrome.extension.getBackgroundPage().console.log(str); };

    var lastFmAuthUrl = "http://www.last.fm/api/auth?api_key=0e593acc98ed557d04c6e931b9d3bea5";
    var connectButton = document.getElementById("connectButton");
    connectButton.onclick = function () {
        chrome.tabs.create({ url: lastFmAuthUrl }, function (tab) {
            _log("Tab created (" + tab.url + ")");
        });
    };
})();



