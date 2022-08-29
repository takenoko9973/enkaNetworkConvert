(function () {
    'use strict';
    const version = "v0.40";

    const $doc = document;
    const $weapon = $doc.getElementsByClassName("Weapon");
    const $charaStats = $doc.getElementsByClassName("StatsTable");
    const $artifact = $doc.getElementsByClassName("Artifact");

    const converterInstance = new EnkaConverter();

    function getLanguage() {
        const $language = $doc.getElementsByXPath('//div[@data-icon="language"]')[0];
        return $language.innerText;
    }

    function getConvertStatName(key, isSub) {
        const language = getLanguage();
        const name = converterInstance.getStatName(language, key, isSub);

        return name;
    }

    /**
     * 表示させているプレイヤーのUIDと名前を取得
     */
    function getPlayerInfo() {
        const playerUID = location.pathname.split("/")[2]; // urlからUIDを取得
        const $playerInfo = $doc.getElementsByClassName("PlayerInfo")[0];
        const playerName = $playerInfo.getElementsByTagName("h1")[0].innerText; // プレイヤー名を取得

        return [playerUID, playerName];
    }

    /**
     * キャラクターの合計ステータスを取得
     */
    function getCharacterStats(key) {
        let index = -1;
        const $statsList = $charaStats[0].children;
        if ((index = Array.from($statsList).map(stat => stat.classList[1]).indexOf(key)) === -1) return 0;

        const stat = $statsList[index].children[1].children[2].innerText;
        return Number(stat.replace(/[^0-9.]/g, ''));
    }

    window.onload = function () {
    };
})();
