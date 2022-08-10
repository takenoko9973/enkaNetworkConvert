(function () {
    'use strict';
    const version = "v0.40";

    const $doc = document;
    const $weapon = $doc.getElementsByClassName("Weapon");
    const $charaStats = $doc.getElementsByClassName("StatsTable");
    const $artifact = $doc.getElementsByClassName("Artifact");

    const LANGUAGE = {
        EN: "EN",
        JA: "JA",
    };

    function getConvertJsonURL(language) {
        switch (language) {
            case LANGUAGE.EN:
                return "file:///D:/Users\\sapph\\Documents\\Genshin\\Userscript\\enkaNet\\en.json";
            case LANGUAGE.JA:
                return "file:///D:/Users\\sapph\\Documents\\Genshin\\Userscript\\enkaNet\\ja.json";
            default:
                return "file:///D:/Users\\sapph\\Documents\\Genshin\\Userscript\\enkaNet\\en.json";
        }
    }

    fetch(getConvertJsonURL("JA"))
        .then(response => {
            return response.json();
        })
        .then(jsondata => console.log(jsondata));

    window.onload = function () {
    };
})();
