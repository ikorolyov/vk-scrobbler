(function () {


    var lastfmApiBaseUrl = "http://ws.audioscrobbler.com/2.0/";

    










    function post(json, successCallback, errorCallback) {

        var xhr = new XMLHttpRequest();
        xhr.setRequestHeader("Content-Type", json ? "application/json" : "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.status == 200) {
                console.log("responseText:", xhr.responseText);
                if (successCallback) successCallback();
            } else {
                console.log("ERROR responseText:", xhr.responseText);
                if (errorCallback) errorCallback(xhr.status);
            }

        };

        xhr.open("POST", lastfmApiBaseUrl, true);
        xhr.send(form);



    };









})();
