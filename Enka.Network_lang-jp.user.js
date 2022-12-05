// ==UserScript==
// @name         Enka.Network_lang-jp_mod_by_takenoko
// @description  Enka.Network 日本語化スクリプト
// @namespace    http://tampermonkey.net/
// @version      0.44
// @author       Takenoko-ya
// @match        https://enka.network/u/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shinshin.moe
// @grant        none
// @updateURL    https://github.com/takenoko9973/enkaNetworkConvert/raw/master/Enka.Network_lang-jp.user.js
// @downloadURL  https://github.com/takenoko9973/enkaNetworkConvert/raw/master/Enka.Network_lang-jp.user.js
// @supportURL   https://github.com/takenoko9973/enkaNetworkConvert
// @since        0.44T スコア用クラスを追加 converter配列の要素名を変更 直接クラス名を取得している部分を書き換え
// @since        0.43T 熟知のスコア計算を追加
// @since        0.42T require経由だとキャッシュされる様なので削除 class名変更に対応
// @since        0.41T スコア選択のボタンの配置を変更 防御選択の時、防御%に0.8の補正を掛けるように
// @since        0.40T enka.networkのアップデートに対応
// @since        0.31T 聖遺物が5か所 または サブOPが4か所埋まっていないときに正常に表示されない不具合を修正 主人公を選択したとき、好感度部分でエラーが発生する不具合修正
// @since        0.30T 英語表示対応
// @since        0.21T URLの修正
// @since        0.20T コードを整理 オプション値の表示位置を右端に固定 デザインの調整 聖遺物画像のサイズを調整 他のUIDを入力した際、username欄が更新されない不具合を修正
// ==/UserScript==

/*
* pythonやC#のformatメソッド的な機能を実現
*/
String.prototype.format = function () {
    let formatted = this;
    for (let arg in arguments) {
        formatted = formatted.replaceAll("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

/**
 * 要素をxPathで指定
 * @param expression xPath
 * @param parentElement 親となる要素 (デフォルトはdocument)
 */
document.getElementsByXPath = function (expression, parentElement) {
    var r = []
    var x = document.evaluate(expression, parentElement || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    for (var i = 0, l = x.snapshotLength; i < l; i++) {
        r.push(x.snapshotItem(i))
    }
    return r;
}

const LANGUAGE = {
    EN: "EN",
    JA: "JA",
};

class EnkaConverter {
    constructor() { }

    #CONVERT_TEXT = {
        BASE_ATK: {
            className: "BASE_ATK",
            [LANGUAGE.EN]: "Base ATK",
            [LANGUAGE.JA]: "基礎攻撃力",
        },
        HP: {
            className: "HP",
            [LANGUAGE.EN]: "HP",
            [LANGUAGE.JA]: "HP",
        },
        HP_P: {
            className: "HP_PERCENT",
            [LANGUAGE.EN]: "HP",
            [LANGUAGE.JA]: "HP",
        },
        ATK: {
            className: "ATTACK",
            [LANGUAGE.EN]: "ATK",
            [LANGUAGE.JA]: "攻撃力",
        },
        ATK_P: {
            className: "ATTACK_PERCENT",
            [LANGUAGE.EN]: "ATK",
            [LANGUAGE.JA]: "攻撃力",
        },
        DEF: {
            className: "DEFENSE",
            [LANGUAGE.EN]: "DEF",
            [LANGUAGE.JA]: "防御力",
        },
        DEF_P: {
            className: "DEFENSE_PERCENT",
            [LANGUAGE.EN]: "DEF",
            [LANGUAGE.JA]: "防御力",
        },
        CRIT_RATE: {
            className: "CRITICAL",
            [LANGUAGE.EN]: "CRIT Rate",
            [LANGUAGE.JA]: "会心率",
        },
        CRIT_DMG: {
            className: "CRITICAL_HURT",
            [LANGUAGE.EN]: "CRIT DMG",
            [LANGUAGE.JA]: "会心ダメージ",
            sub: {
                [LANGUAGE.JA]: "会心ダメ",
            }
        },
        EM: {
            className: "ELEMENT_MASTERY",
            [LANGUAGE.EN]: "Elemental Mastery",
            [LANGUAGE.JA]: "元素熟知",
            sub: {
                [LANGUAGE.EN]: "EM",
            }
        },
        ENERGY_RECHARGE: {
            className: "CHARGE_EFFICIENCY",
            [LANGUAGE.EN]: "Energy Recharge",
            [LANGUAGE.JA]: "元素チャージ",
            sub: {
                [LANGUAGE.EN]: "ER",
                [LANGUAGE.JA]: "元素チャ",
            }
        },
        CRYO: {
            className: "ICE_ADD_HURT",
            [LANGUAGE.EN]: "Cryo DMG",
            [LANGUAGE.JA]: "氷元素ダメージ",
        },
        ANEMO: {
            className: "WIND_ADD_HURT",
            [LANGUAGE.EN]: "Anemo DMG",
            [LANGUAGE.JA]: "風元素ダメージ",
        },
        ELECTRO: {
            className: "ELEC_ADD_HURT",
            [LANGUAGE.EN]: "Electro DMG",
            [LANGUAGE.JA]: "雷元素ダメージ",
        },
        HYDRO: {
            className: "WATER_ADD_HURT",
            [LANGUAGE.EN]: "Hydro DMG",
            [LANGUAGE.JA]: "水元素ダメージ",
        },
        PYRO: {
            className: "FIRE_ADD_HURT",
            [LANGUAGE.EN]: "Pyro DMG",
            [LANGUAGE.JA]: "炎元素ダメージ",
        },
        DENDRO: {
            className: "GRASS_ADD_HURT",
            [LANGUAGE.EN]: "Dendro DMG",
            [LANGUAGE.JA]: "草元素ダメージ",
        },
        GEO: {
            className: "ROCK_ADD_HURT",
            [LANGUAGE.EN]: "Geo DMG",
            [LANGUAGE.JA]: "岩元素ダメージ",
        },
        PHYS: {
            className: "PHYSICAL_ADD_HURT",
            [LANGUAGE.EN]: "Physical DMG",
            [LANGUAGE.JA]: "物理ダメージ",
        },
        HEAL_BNS: {
            className: "HEAL_ADD",
            [LANGUAGE.EN]: "Healing Bonus",
            [LANGUAGE.JA]: "与える治癒効果",
        },
        FRIEND: {
            className: "FRIEND",
            [LANGUAGE.EN]: "Friendship",
            [LANGUAGE.JA]: "好感度",
        },
        SCORE_SELECT: {
            className: "SCORE_SELECT",
            [LANGUAGE.EN]: "Score type",
            [LANGUAGE.JA]: "スコア計算方法",
        },
        UNKNOWN: {
            className: "UNKNOWN",
            [LANGUAGE.EN]: "Unknown",
            [LANGUAGE.JA]: "不明",
        }
    }

    /**
     * クラス名から、翻訳テーブルを取得
     * @param {String} className
     */
    getStatByClassName(className) {
        const array = Object.keys(this.#CONVERT_TEXT).map((k) => (this.#CONVERT_TEXT[k]));

        return array.find((s) => s.className === className);
    }

    /**
     * ステータス翻訳を返す
     * @param {String} language 
     * @param {String} className 
     * @param {Boolean} isSub サブOP用テキストを返すかどうか
     */
    getStatName(language, className, isSub) {
        // 対応していない言語ならば、英語に強制的に変更
        if (!(language in LANGUAGE)) language = LANGUAGE.EN;

        let stat = this.getStatByClassName(className);
        if (!stat) return this.#CONVERT_TEXT.UNKNOWN[language];
        if (!isSub) return stat[language];

        // サブステータス時の動作
        if (!("sub" in stat)) return stat[language];
        if (!(language in stat["sub"])) return stat[language];

        return stat["sub"][language];
    }

    /**
     * キーに対するステータスクラス名を取得
     * @param {String} key 
     */
    getClassName(key) {
        if (key in this.#CONVERT_TEXT)
            return this.#CONVERT_TEXT[key].className;
        else
            return this.#CONVERT_TEXT["UNKNOWN"].className;
    }
}

class scoreType {
    #id;
    #key;
    #correction;

    constructor(id, key, correction) {
        this.#id = id;
        this.#key = key;
        this.#correction = correction;
    }

    get id() { return this.#id }
    get key() { return this.#key }
    get correction() { return this.#correction }
}

(() => {
    'use strict';
    const version = "v0.44";

    const $doc = document;
    const $weapon = $doc.getElementsByClassName("Weapon");
    const $charaStats = $doc.getElementsByClassName("StatsTable");
    const $artifact = $doc.getElementsByClassName("Artifact");

    const converterInstance = new EnkaConverter();

    const BASE_ATK_CLASS = converterInstance.getClassName("BASE_ATK");
    const TIME_STAMP = "timeStamp"

    // スコア計算基準指定 H:HP, A:攻撃力, D:防御力
    const SCORE_RADIO_NAME = "sSource"
    let $scoreSelectDiv = null;
    const SCORE_TYPE = {
        HP: new scoreType("H", converterInstance.getClassName("HP_P"), 1),
        ATTACK: new scoreType("A", converterInstance.getClassName("ATK_P"), 1),
        DEFENSE: new scoreType("D", converterInstance.getClassName("DEF_P"), 0.8),
        EM: new scoreType("EM", converterInstance.getClassName("EM"), 0.25),
    }
    let scoreH = SCORE_TYPE.ATTACK.id;


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

    /**
     * 聖遺物を装備しているかどうか
     */
    function isEquippingArtifact(index) {
        if (index < 0 || 4 < index) return false;

        return Array.from($artifact[index].classList).indexOf("empty") === -1;
    }

    // 余白用要素を返す
    function getSeparateElement() {
        const $separateElement = $doc.createElement("span");
        $separateElement.classList.add("sep");

        return $separateElement;
    }

    function createConvertTextElements() {
        // 好感度
        const $friend = $doc.getElementsByClassName("fren")[0];
        if ($friend) {
            // アイコン用の隙間を削除
            const $icon = $friend.getElementsByClassName("ShadedSvgIcon")[0];
            $icon.style.width = "0";

            const friendClassName = converterInstance.getClassName("FRIEND");
            if (!$friend.getElementsByClassName(friendClassName)[0]) {
                const $frenText = $doc.createElement("span");
                $frenText.classList.add(friendClassName, "svelte-1cfvxg7");
                $frenText.style.cssText = "width:auto; height:auto; font-size:1em; font-weight:bold";
                $friend.prepend($frenText);
            }
        }

        // サブステータス用のテキスト欄の作成
        const $statText = $doc.createElement("div");
        $statText.classList.add("svelte-1ut2kb8");
        $statText.style.fontWeight = "bold";

        // 武器
        const $weaponInfo = $weapon[0].getElementsByTagName("content")[0];
        const $subStat = $weaponInfo.getElementsByClassName("Substat");

        if (!$doc.getElementById(BASE_ATK_CLASS)) {
            const $baseAtk = $statText.cloneNode(true);
            $baseAtk.id = BASE_ATK_CLASS;
            $baseAtk.classList.add(BASE_ATK_CLASS);
            $subStat[0].prepend(getSeparateElement());
            $subStat[0].prepend($baseAtk);
        }

        // サブステがあるかどうか判定
        if ($subStat[1]) {
            if (!$doc.getElementById("weaponSubOP")) {
                const $subOPName = $statText.cloneNode(true);
                $subOPName.id = "weaponSubOP";
                $subStat[1].prepend(getSeparateElement());
                $subStat[1].prepend($subOPName);
            }
        }

        // 聖遺物
        for (let i = 0; i < 5; i++) {
            if (!isEquippingArtifact(i)) continue;

            // メインOP
            const $mainStat = $artifact[i].getElementsByClassName("mainstat")[0];
            if (!$doc.getElementById("artifactMain" + i)) {
                const $mainOPName = $statText.cloneNode(true);
                $mainOPName.id = "artifactMain" + i;
                $mainStat.prepend(getSeparateElement());
                $mainStat.prepend($mainOPName);
            }

            // サブOP
            const $subStat = $artifact[i].getElementsByClassName("Substat");
            const subLen = $subStat.length;
            for (let j = 0; j < subLen; j++) {
                const subOPId = "artifactSub" + i + "-" + j
                if ($doc.getElementById(subOPId)) continue;

                const $subOPName = $statText.cloneNode(true);
                $subOPName.id = subOPId;
                $subStat[j].prepend(getSeparateElement());
                $subStat[j].prepend($subOPName);
            }

            // スコア表示
            if ($doc.getElementById("score" + i) === null) {
                const $scoreBox = $doc.createElement("div");
                $scoreBox.id = "score" + i;
                $scoreBox.style.cssText = "position: absolute; font-size: 70%; top: -0.2em; right: 0.3em; text-align: right; opacity: .6;";
                $artifact[i].appendChild($scoreBox);
            }
        }
    }

    function createModeChangeBottom() {
        const $cardToggles = $doc.getElementsByClassName("CardToggles")[0];
        const $rowElement = $cardToggles.getElementsByClassName("row")[0].cloneNode(false);
        $cardToggles.getElementsByClassName("Input")[0].parentNode.after($rowElement);  // カードオプションの下に作成

        const radioStyle = [
            '.inline_radio input[type="radio"] { position: absolute; opacity: 0; }',  // チェックボックスを隠す
            '.inline_radio label.radbox[type="radio"] { color: rgba(255,255,255,.5);}',  // 普段は薄目
            '.inline_radio input[type="radio"]:checked + label.radbox[type="radio"] { color: rgba(255,255,255,1); border-color: rgba(255,255,255,1); }'  // 選択しているボタンを強調
        ];
        const $style = $doc.createElement("style");
        $style.innerHTML = radioStyle.join(" ");
        $doc.querySelector("head").append($style);

        // スコア選択欄を作成
        $scoreSelectDiv = $doc.createElement("div");
        $scoreSelectDiv.classList.add("Input", "svelte-nsdlaj");

        // 説明テキストを追加
        const $text = $doc.createElement("label");
        $text.classList.add("SCORE_SELECT", "svelte-nsdlaj");
        $text.cssStyle = "margin-left: 0.5em;";

        // 計算方法変更用ボタン
        const $scoreModeGroup = $doc.createElement("group");
        $scoreModeGroup.classList.add("inline_radio");

        // ボタンの作成
        for (const key in SCORE_TYPE) {
            const id = "SCORE_{0}_R".format(key);

            // ボタン
            const $radio = $doc.createElement("input");
            $radio.id = id;
            $radio.name = SCORE_RADIO_NAME;
            $radio.setAttribute("type", "radio");
            $radio.value = SCORE_TYPE[key].id;

            // ラベル (ボタンとリンクさせる)
            const $label = $doc.createElement("label");
            $label.setAttribute("for", id);
            $label.setAttribute("type", "radio");
            $label.setAttribute("data-type", "OUTLINE");
            $label.setAttribute("data-variant", "HALF");
            $label.style.marginTop = "0em";
            $label.classList.add(SCORE_TYPE[key].key, "radbox", "Button", "svelte-1dpa14o", "label");

            $scoreModeGroup.appendChild($radio);
            $scoreModeGroup.appendChild($label);
        }
        $scoreSelectDiv.appendChild($text);
        $scoreSelectDiv.appendChild($scoreModeGroup);
        $rowElement.appendChild($scoreSelectDiv);

        // 攻撃をデフォルトにする
        const atkRadioId = $scoreSelectDiv.getElementsByClassName(SCORE_TYPE.ATTACK.key)[0].getAttribute("for");
        $doc.getElementById(atkRadioId).checked = true;

        // スコア評価対象変更時に発火
        $doc.getElementsByName(SCORE_RADIO_NAME).forEach((function (e) {
            e.addEventListener("click", (function () {
                scoreH = $doc.querySelector("input:checked[name={0}]".format(SCORE_RADIO_NAME)).value;
                enkaConvertStat();
            }))
        }));
    }

    // 武器オプションの日本語化
    function weaponOPConvert() {
        const $subStat = $weapon[0].getElementsByClassName("Substat");

        const $baseAtk = $doc.getElementById(BASE_ATK_CLASS);
        if ($baseAtk) $baseAtk.innerText = getConvertStatName(BASE_ATK_CLASS);

        const $weaponSub = $doc.getElementById("weaponSubOP");
        if ($weaponSub) $weaponSub.innerText = getConvertStatName($subStat[1].classList[1]);
    }

    // 聖遺物の日本語化
    function artifactConvert() {
        for (let i = 0; i < 5; i++) {
            // 聖遺物を付けていない場合、スキップ
            if (!isEquippingArtifact(i)) continue;

            // メインOP
            const $mainStat = $artifact[i].getElementsByClassName("mainstat")[0];
            $doc.getElementById("artifactMain" + i).innerText = getConvertStatName($mainStat.classList[1])

            // サブOP
            const $subStat = $artifact[i].getElementsByClassName("Substat");
            const subLen = $subStat.length;
            for (let j = 0; j < subLen; j++) {
                const subOPId = "artifactSub" + i + "-" + j
                if (!$doc.getElementById(subOPId)) continue;

                $doc.getElementById(subOPId).innerText = getConvertStatName($subStat[j].classList[1], true);
            }
        }
    }

    /**
    * 聖遺物のスコアを計算
    */
    function calcArtifactScore(index) {
        let score = 0;
        if (!isEquippingArtifact(index)) return score;

        const $subStat = Array.from($artifact[index].getElementsByClassName("Substat"));
        const $subStatName = $subStat.map(sub => sub.classList[1]);
        const $subStatAmount = $subStat.map(sub => sub.lastChild.innerText.replace(/[^0-9.]/g, ''));
        const subLen = $subStat.length;

        for (let i = 0; i < subLen; i++) {
            const key = $subStatName[i];
            switch (key) {
                case converterInstance.getClassName("CRIT_RATE"):
                    score += Number($subStatAmount[i]) * 2;
                    break;
                case converterInstance.getClassName("CRIT_DMG"):
                    score += Number($subStatAmount[i]);
                    break;
                default:
                    // 指定のステータスをスコア換算
                    for (const typeKey in SCORE_TYPE) {
                        const scoreType = SCORE_TYPE[typeKey];
                        if (key != scoreType.key) continue;
                        if (scoreH != scoreType.id) continue;

                        score += Number($subStatAmount[i]) * scoreType.correction;
                        break;
                    }
            }
        }

        return score;
    }

    function getExtraText() {
        const language = getLanguage();

        switch (language) {
            case LANGUAGE.EN:
                return "Crit Ratio 1:{0} / Score({1}) Avg. {2} Total {3}";
            case LANGUAGE.JA:
                return "会心率ダメ比 1:{0} / 聖遺物スコア({1}) 平均:{2} 合計:{3}";
            default:
                return "Crit Ratio 1:{0} / Score({1}) Avg. {2} Total {3}";
        }
    }

    function enkaConvertStat() {
        weaponOPConvert();
        artifactConvert();

        // 好感度
        const $friend = $doc.getElementsByClassName("fren")[0];
        if ($friend) {
            const friendClassName = converterInstance.getClassName("FRIEND");
            const $friendText = $friend.getElementsByClassName(friendClassName)[0];
            $friendText.innerText = getConvertStatName(friendClassName);
        }

        // 情報取得日時を表示
        const date = new Date;
        date.setTime(date.getTime() - 60 * date.getTimezoneOffset() * 1000);
        const timeString = date.toISOString().replace("T", " ").substr(0, 19);
        $doc.getElementById(TIME_STAMP).innerText = version + "_" + timeString;

        // スコア方式選択説明テキスト
        const $scoreSelectInfo = $scoreSelectDiv.children[0];
        $scoreSelectInfo.innerText = getConvertStatName($scoreSelectInfo.classList[0]);
        // スコア方式選択ボタン
        const $scoreButtons = $scoreSelectDiv.getElementsByClassName("Button");
        for (let i = 0; i < $scoreButtons.length; i++) {
            const $label = $scoreButtons[i];
            $label.innerText = getConvertStatName($label.classList[0], true);
        }

        // ------ 追加情報
        let sumScore = 0;
        let avgScore = 0;
        const $extraText = $doc.getElementById("extraData");

        // スコア計算
        for (let i = 0; i < 5; i++) {
            let score = 0.0;

            const $scoreBox = $doc.getElementById("score" + i);
            if ($scoreBox === null) continue;

            $scoreBox.setAttribute("class", "svelte-1ujofp1");

            // 聖遺物を付けている場合、計算
            if (isEquippingArtifact(i)) {
                score = calcArtifactScore(i);
                sumScore += score;

                $scoreBox.innerText = score.toFixed(1);
            } else {
                $scoreBox.innerText = "";
            }
        }
        avgScore = sumScore / 5;

        const critRate = getCharacterStats(converterInstance.getClassName("CRIT_RATE"));
        const critDMG = getCharacterStats(converterInstance.getClassName("CRIT_DMG"));
        const critRatio = critDMG / critRate;

        let type = "";
        for (const typeKey in SCORE_TYPE) {
            const scoreType = SCORE_TYPE[typeKey];
            if (scoreH != scoreType.id) continue;

            type = getConvertStatName(scoreType.key, true);
            break;
        }

        $extraText.innerText = getExtraText().format(critRatio.toFixed(1), type, avgScore.toFixed(1), sumScore.toFixed(1));
    }

    window.onload = function () {
        // 武器
        const $weaponInfo = $weapon[0].getElementsByTagName("content")[0];
        const $weaponName = $weaponInfo.getElementsByTagName("h3")[0];
        $weaponInfo.style.paddingRight = "0px";
        $weaponName.style.fontWeight = "bold";
        $weapon[0].children[0].style.width = "30%";  // 武器画像

        // ###### キャラカードのデザイン変更 ######
        const $charaCard = $doc.getElementsByClassName("card-host")[0];

        // その他情報を表示する枠
        const $exParam = $doc.createElement("div");
        $exParam.id = "extraData";
        $exParam.innerText = "";
        $exParam.style.cssText = "position: absolute; bottom: .2%; right: 1.3%; text-align: right; font-size: 80%;";
        $exParam.classList.add("svelte-1ujofp1")
        $charaCard.appendChild($exParam);

        // 取得時間
        const $timeStamp = $doc.createElement("div");
        $timeStamp.id = TIME_STAMP;
        $timeStamp.innerText = "";
        $timeStamp.style.cssText = "position: absolute; top: 1%; left: 2%; font-size: 60%; opacity: 0.4;";
        $exParam.classList.add("svelte-1ujofp1")
        $charaCard.appendChild($timeStamp);

        // cssの全面的な変更
        const cssStyle = [
            '.Card .Icon{ display:none !important }',  // アイコンの削除
            '.stats.svelte-gp6viv .Substat { padding-top: 4%; }',  // 武器ステータスの枠を大きく
            '.Card .Substat.svelte-1ut2kb8.svelte-1ut2kb8 { display: flex; align-items: center; margin-right: 0em; line-height: 95%; font-size: 98%; }',  // サブステータスの枠を広げる
            '.substats.svelte-17qi811>.Substat { padding-right: 1.0em; }',  // 聖遺物のサブステータスが右に行きすぎるので調整
            '.Artifact.svelte-17qi811 .ArtifactIcon { top: -37%; left: -6%; width: 28%; }',  // 聖遺物画像の調整
            '.mainstat.svelte-17qi811 > div:nth-child(1) { display: flex; align-items: center; top: 3px; max-height: 100%; font-size: 110%; line-height: 90%; width: auto; height: 50em; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; }',  // 聖遺物メインステータスの調整
            '.mainstat.svelte-17qi811 > div:nth-child(4) { display: flex; align-items: center; margin-left: auto; margin-bottom: -0.3em; }'  // 聖遺物メインステータスの調整
        ];
        const $style = $doc.createElement("style");
        $style.innerHTML = cssStyle.join(" ");
        $doc.querySelector("head").append($style);

        // 全体の配置の変更
        const $cardSection = $doc.getElementsByClassName("section");
        // 左
        $cardSection[0].style.width = "36%";
        // 中央
        $cardSection[1].style.width = "24%";
        $cardSection[1].style.left = "34%";
        // 右
        $cardSection[2].style.width = "43%";
        $cardSection[2].style.height = "97%";

        createConvertTextElements();
        createModeChangeBottom();

        enkaConvertStat();

        const $charaName = $doc.getElementsByClassName("name")[0];
        const $language = $doc.getElementsByXPath('//div[@data-icon="language"]')[0];
        // 言語やキャラクター変更時に再翻訳
        const observeConf = { childList: true, attributes: true, characterData: true };
        const observer = new MutationObserver(mutations => {
            createConvertTextElements();
            enkaConvertStat();
        })
        observer.observe($charaName, observeConf); // キャラクター変更時
        observer.observe($language, observeConf); // 言語変更時
    };
})();

