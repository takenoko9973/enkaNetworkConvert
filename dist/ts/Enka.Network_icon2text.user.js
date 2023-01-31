// ==UserScript==
// @name         Enka.Network_lang-jp_mod_by_takenoko
// @namespace    http://tampermonkey.net/
// @version      0.50
// @description  Enka.Network 日本語化スクリプト
// @author       Takenoko-ya
// @updateURL    https://github.com/takenoko9973/enkaNetworkConvert/raw/master/dist/ts/Enka.Network_icon2text.user.js
// @downloadURL  https://github.com/takenoko9973/enkaNetworkConvert/raw/master/dist/ts/Enka.Network_icon2text.user.js
// @supportURL   https://github.com/takenoko9973/enkaNetworkConvert/issues
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shinshin.moe
// @match        https://enka.network/u/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function (exports) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    function getCharacterStats(key) {
        const $statsList = $charaStats[0].children;
        const index = Array.from($statsList).map(stat => stat.classList[1]).indexOf(key);
        if (index === -1)
            return 0;
        const stat = $statsList[index].children[1].children[2].innerText;
        return Number(stat.replace(/[^0-9.]/g, ''));
    }
    function getSeparateElement() {
        const $separateElement = document.createElement("span");
        $separateElement.classList.add("sep");
        return $separateElement;
    }
    function getLanguage() {
        const $language = document.getElementsByClassName("Dropdown-selectedItem")[0];
        return $language.innerText;
    }
    function getScoreType() {
        return document.querySelector(`input:checked[name=${SCORE_RADIO_NAME}]`).value ?? "A";
    }

    const localeArray = {
        "": undefined,
        DE: undefined,
        EN: undefined,
        ES: undefined,
        FR: undefined,
        ID: undefined,
        IT: undefined,
        PT: undefined,
        RU: undefined,
        TH: undefined,
        TR: undefined,
        VI: undefined,
        JA: undefined,
        KO: undefined,
        "ZH-CH": undefined,
        "ZH-TW": undefined,
    };
    localeArray["EN"] = {
        BASE_ATTACK: {
            locale: "Base ATK",
            subOption: undefined,
        },
        HP: {
            locale: "HP",
            subOption: undefined,
        },
        ATTACK: {
            locale: "ATK",
            subOption: undefined,
        },
        DEFENSE: {
            locale: "DEF",
            subOption: undefined,
        },
        HP_PERCENT: {
            locale: "HP",
            subOption: undefined,
        },
        ATTACK_PERCENT: {
            locale: "ATK",
            subOption: undefined,
        },
        DEFENSE_PERCENT: {
            locale: "DEF",
            subOption: undefined,
        },
        CRITICAL: {
            locale: "Crit Rate",
            subOption: undefined,
        },
        CRITICAL_HURT: {
            locale: "Crit DMG",
            subOption: undefined,
        },
        CHARGE_EFFICIENCY: {
            locale: "Energy Recharge",
            subOption: "ER",
        },
        HEAL_ADD: {
            locale: "Healing Bonus",
            subOption: undefined,
        },
        ELEMENT_MASTERY: {
            locale: "Elemental Mastery",
            subOption: "EM",
        },
        PHYSICAL_ADD_HURT: {
            locale: "Physical DMG\nBonus",
            subOption: undefined,
        },
        FIRE_ADD_HURT: {
            locale: "Pyro DMG\nBonus",
            subOption: undefined,
        },
        ELEC_ADD_HURT: {
            locale: "Electro DMG\nBonus",
            subOption: undefined,
        },
        WATER_ADD_HURT: {
            locale: "Hydro DMG\nBonus",
            subOption: undefined,
        },
        WIND_ADD_HURT: {
            locale: "Anemo DMG\nBonus",
            subOption: undefined,
        },
        ICE_ADD_HURT: {
            locale: "Cryo DMG\nBonus",
            subOption: undefined,
        },
        ROCK_ADD_HURT: {
            locale: "Geo DMG\nBonus",
            subOption: undefined,
        },
        GRASS_ADD_HURT: {
            locale: "Dendro DMG\nBonus",
            subOption: undefined,
        },
        FRIEND: {
            locale: "Friendship",
            subOption: undefined,
        },
        SCORE_SELECT_INFO: {
            locale: "Score type",
            subOption: undefined,
        },
        CARD_EXTRA_INFO: {
            locale: "Crit Ratio 1:${critRatio} / Score(${scoreType}) Avg. ${avgScore} Total ${sumScore}",
            subOption: undefined,
        },
        UNKNOWN: {
            locale: "Unknown",
            subOption: undefined,
        },
    };
    localeArray["JA"] = {
        BASE_ATTACK: {
            locale: "基礎攻撃力",
            subOption: undefined,
        },
        HP: {
            locale: "HP",
            subOption: undefined,
        },
        ATTACK: {
            locale: "攻撃力",
            subOption: undefined,
        },
        DEFENSE: {
            locale: "防御力",
            subOption: undefined,
        },
        HP_PERCENT: {
            locale: "HP",
            subOption: undefined,
        },
        ATTACK_PERCENT: {
            locale: "攻撃力",
            subOption: undefined,
        },
        DEFENSE_PERCENT: {
            locale: "防御力",
            subOption: undefined,
        },
        CRITICAL: {
            locale: "会心率",
            subOption: undefined,
        },
        CRITICAL_HURT: {
            locale: "会心ダメージ",
            subOption: "会心ダメ",
        },
        CHARGE_EFFICIENCY: {
            locale: "元素チャージ効率",
            subOption: "元チャ",
        },
        HEAL_ADD: {
            locale: "与える治癒効果",
            subOption: "与治癒",
        },
        ELEMENT_MASTERY: {
            locale: "元素熟知",
            subOption: undefined,
        },
        PHYSICAL_ADD_HURT: {
            locale: "物理ダメージ",
            subOption: undefined,
        },
        FIRE_ADD_HURT: {
            locale: "炎元素ダメージ",
            subOption: undefined,
        },
        ELEC_ADD_HURT: {
            locale: "雷元素ダメージ",
            subOption: undefined,
        },
        WATER_ADD_HURT: {
            locale: "水元素ダメージ",
            subOption: undefined,
        },
        WIND_ADD_HURT: {
            locale: "風元素ダメージ",
            subOption: undefined,
        },
        ICE_ADD_HURT: {
            locale: "氷元素ダメージ",
            subOption: undefined,
        },
        ROCK_ADD_HURT: {
            locale: "岩元素ダメージ",
            subOption: undefined,
        },
        GRASS_ADD_HURT: {
            locale: "草元素ダメージ",
            subOption: undefined,
        },
        FRIEND: {
            locale: "好感度",
            subOption: undefined,
        },
        SCORE_SELECT_INFO: {
            locale: "スコア計算方法",
            subOption: undefined,
        },
        CARD_EXTRA_INFO: {
            locale: "会心率ダメ比 1:${critRatio} / 聖遺物スコア(${scoreType}) 平均:${avgScore} 合計:${sumScore}",
            subOption: undefined,
        },
        UNKNOWN: {
            locale: "不明",
            subOption: undefined,
        },
    };
    class TranslateKey2Word {
        constructor() { }
        static get instance() {
            if (!this._instance) {
                this._instance = new TranslateKey2Word();
            }
            return this._instance;
        }
        updatedLocate() {
            const locale = getLanguage();
            this.translateArray = localeArray[locale];
            if (this.translateArray === undefined) {
                this.translateArray = localeArray["EN"];
            }
        }
        isKey(checkKey) {
            if (this.translateArray === undefined)
                return false;
            return checkKey in this.translateArray;
        }
        getLocale(key) {
            this.updatedLocate();
            if (this.translateArray === undefined)
                return "";
            if (!this.isKey(key))
                return this.translateArray["UNKNOWN"]["locale"];
            return this.translateArray[key]["locale"];
        }
        getLocaleSub(key) {
            this.updatedLocate();
            if (this.translateArray === undefined)
                return "";
            if (!this.isKey(key))
                return this.translateArray["UNKNOWN"]["locale"];
            return (this.translateArray[key]["subOption"] ??
                this.translateArray[key]["locale"]);
        }
    }

    const $weapon = document.getElementsByClassName("Weapon");
    const $charaStats = document.getElementsByClassName("StatsTable");
    const $artifact = document.getElementsByClassName("Artifact");
    const VERSION = "v0.50";
    const BASE_ATK_CLASS = "BASE_ATTACK";
    const TIME_STAMP = "timeStamp";
    const SCORE_SELECT_DIV = "scoreSelectDiv";
    const SCORE_RADIO_NAME = "sSource";
    const optionLocale = TranslateKey2Word.instance;

    function fmt(template, values) {
        if (!values)
            return template;
        const format = new Function(...Object.keys(values), `return \`${template}\`;`);
        return format(...Object.values(values).map((value) => value ?? ""));
    }

    const artifacts = document.getElementsByClassName("Artifact");
    function isEquippingArtifact(index) {
        if (index < 0 || 4 < index)
            return false;
        return Array.from(artifacts[index].classList).indexOf("empty") === -1;
    }
    function createStatTextElement() {
        const statText = document.createElement("div");
        statText.classList.add("svelte-17qi811");
        statText.style.fontWeight = "bold";
        return statText;
    }
    function createTextInArtifact() {
        for (const [i, artifact] of Array.from(artifacts).entries()) {
            if (artifact.classList.contains("empty"))
                continue;
            const mainStat = artifact.getElementsByClassName("mainstat")[0];
            const mainOPId = `artifactMain${i}`;
            if (document.getElementById(mainOPId) === null) {
                const $statIcon = mainStat.children[0];
                mainStat.removeChild($statIcon);
                const mainOPText = createStatTextElement();
                mainOPText.id = mainOPId;
                mainStat.prepend(mainOPText);
            }
            const subStatList = artifact.getElementsByClassName("Substat");
            for (const [j, subStat] of Array.from(subStatList).entries()) {
                const subOPId = `artifactSub${i}-${j}`;
                if (document.getElementById(subOPId))
                    continue;
                const subOPText = createStatTextElement();
                subOPText.id = subOPId;
                subStat.prepend(getSeparateElement());
                subStat.prepend(subOPText);
            }
            const scoreId = `score${i}`;
            if (document.getElementById(scoreId) === null) {
                const scoreBox = document.createElement("div");
                scoreBox.id = scoreId;
                scoreBox.style.position = "absolute";
                scoreBox.style.fontSize = "70%";
                scoreBox.style.top = "-0.2em";
                scoreBox.style.right = "0.3em";
                scoreBox.style.textAlign = "right";
                scoreBox.style.opacity = "0.6";
                artifact.appendChild(scoreBox);
            }
        }
    }
    function artifactsIcon2Text() {
        for (const artifact of Array.from(artifacts)) {
            if (artifact.classList.contains("empty"))
                continue;
            const mainStat = artifact.getElementsByClassName("mainstat")[0];
            mainStat.children[0].innerText =
                optionLocale.getLocale(mainStat.classList[1]);
            const subStatList = artifact.getElementsByClassName("Substat");
            for (const $subStat of Array.from(subStatList)) {
                $subStat.children[0].innerText =
                    optionLocale.getLocaleSub($subStat.classList[1]);
            }
        }
    }

    function getExtraText(ratio, scoreType, avgScore, score) {
        const ratioFixed = ratio.toFixed(1);
        const avgScoreFixed = avgScore.toFixed(1);
        const scoreFixed = score.toFixed(1);
        return fmt(optionLocale.getLocale("CARD_EXTRA_INFO"), {
            critRatio: ratioFixed,
            scoreType: scoreType,
            avgScore: avgScoreFixed,
            sumScore: scoreFixed
        });
    }
    function createConvertTextElements() {
        const $friend = document.getElementsByClassName("fren")[0];
        if ($friend) {
            const $icon = $friend.getElementsByClassName("ShadedSvgIcon")[0];
            $icon.style.width = "0";
            const friendClassName = "FRIEND";
            if (!$friend.getElementsByClassName(friendClassName)[0]) {
                const $friendText = document.createElement("span");
                $friendText.classList.add(friendClassName, "svelte-1cfvxg7");
                $friendText.style.width = "auto";
                $friendText.style.height = "auto";
                $friendText.style.fontSize = "1em";
                $friendText.style.fontWeight = "bold";
                $friend.prepend($friendText);
            }
        }
        const $statText = document.createElement("div");
        $statText.classList.add("svelte-1ut2kb8");
        $statText.style.fontWeight = "bold";
        const $weaponInfo = $weapon[0].getElementsByTagName("content")[0];
        const $subStat = $weaponInfo.getElementsByClassName("Substat");
        if (!document.getElementById(BASE_ATK_CLASS)) {
            const $baseAtk = $statText.cloneNode(true);
            $baseAtk.id = BASE_ATK_CLASS;
            $baseAtk.classList.add(BASE_ATK_CLASS);
            $subStat[0].prepend(getSeparateElement());
            $subStat[0].prepend($baseAtk);
        }
        if ($subStat[1]) {
            if (!document.getElementById("weaponSubOP")) {
                const $subOPName = $statText.cloneNode(true);
                $subOPName.id = "weaponSubOP";
                $subStat[1].prepend(getSeparateElement());
                $subStat[1].prepend($subOPName);
            }
        }
        createTextInArtifact();
    }
    function weaponOPIcon2Text() {
        const $subStat = $weapon[0].getElementsByClassName("Substat");
        const $baseAtk = document.getElementById(BASE_ATK_CLASS);
        if ($baseAtk)
            $baseAtk.innerText = optionLocale.getLocale(BASE_ATK_CLASS);
        const $weaponSub = document.getElementById("weaponSubOP");
        if ($weaponSub)
            $weaponSub.innerText = optionLocale.getLocale($subStat[1].classList[1]);
    }
    function enkaIcon2Text() {
        weaponOPIcon2Text();
        artifactsIcon2Text();
        const $friend = document.getElementsByClassName("fren")[0];
        if ($friend) {
            const friendClassName = "FRIEND";
            const $friendText = $friend.getElementsByClassName(friendClassName)[0];
            $friendText.innerText = optionLocale.getLocale(friendClassName);
        }
        const date = new Date;
        date.setTime(date.getTime() - 60 * date.getTimezoneOffset() * 1000);
        const timeString = date.toISOString().replace("T", " ").substr(0, 19);
        document.getElementById(TIME_STAMP).innerText = VERSION + "_" + timeString;
        const $scoreSelectDiv = document.getElementById(SCORE_SELECT_DIV);
        const $scoreSelectInfo = $scoreSelectDiv?.children[0];
        $scoreSelectInfo.innerText = optionLocale.getLocale($scoreSelectInfo.classList[0]);
        const $scoreButtons = $scoreSelectDiv?.getElementsByClassName("Button");
        for (const $label of Array.from($scoreButtons)) {
            $label.innerText = optionLocale.getLocaleSub($label.classList[0]);
        }
        let sumScore = 0;
        let avgScore = 0;
        const $extraText = document.getElementById("extraData");
        for (let i = 0; i < 5; i++) {
            let score = 0.0;
            const $scoreBox = document.getElementById(`score${i}`);
            if ($scoreBox === null)
                continue;
            $scoreBox.setAttribute("class", "svelte-1ujofp1");
            if (isEquippingArtifact(i)) {
                score = calcArtifactScore(i);
                sumScore += score;
                $scoreBox.innerText = score.toFixed(1);
            }
            else {
                $scoreBox.innerText = "";
            }
        }
        avgScore = sumScore / 5;
        const critRate = getCharacterStats("CRITICAL");
        const critDMG = getCharacterStats("CRITICAL_HURT");
        const critRatio = critDMG / critRate;
        let type = "";
        const scoreH = getScoreType();
        for (const typeKey in SCORE_TYPE) {
            const scoreType = SCORE_TYPE[typeKey];
            if (scoreH != scoreType.id)
                continue;
            type = optionLocale.getLocaleSub(scoreType.key);
            break;
        }
        $extraText.innerText = getExtraText(critRatio, type, avgScore, sumScore);
    }

    var _scoreType_id, _scoreType_key, _scoreType_correction;
    class scoreType {
        constructor(id, key, correction) {
            _scoreType_id.set(this, void 0);
            _scoreType_key.set(this, void 0);
            _scoreType_correction.set(this, void 0);
            __classPrivateFieldSet(this, _scoreType_id, id, "f");
            __classPrivateFieldSet(this, _scoreType_key, key, "f");
            __classPrivateFieldSet(this, _scoreType_correction, correction, "f");
        }
        get id() {
            return __classPrivateFieldGet(this, _scoreType_id, "f");
        }
        get key() {
            return __classPrivateFieldGet(this, _scoreType_key, "f");
        }
        get correction() {
            return __classPrivateFieldGet(this, _scoreType_correction, "f");
        }
    }
    _scoreType_id = new WeakMap(), _scoreType_key = new WeakMap(), _scoreType_correction = new WeakMap();
    const SCORE_TYPE = {
        HP: new scoreType("H", "HP_PERCENT", 1),
        ATTACK: new scoreType("A", "ATTACK_PERCENT", 1),
        DEFENSE: new scoreType("D", "DEFENSE_PERCENT", 0.8),
        EM: new scoreType("EM", "ELEMENT_MASTERY", 0.25),
    };
    function createModeChangeBottom() {
        const $cardToggles = document.getElementsByClassName("CardToggles")[0];
        const $rowElement = $cardToggles
            .getElementsByClassName("row")[0]
            .cloneNode(false);
        $cardToggles.getElementsByClassName("Input")[0]
            .parentNode.after($rowElement);
        const radioStyle = [
            '.inline_radio input[type="radio"] { position: absolute; opacity: 0; }',
            '.inline_radio label.radbox[type="radio"] { color: rgba(255,255,255,.5);}',
            '.inline_radio input[type="radio"]:checked + label.radbox[type="radio"] { color: rgba(255,255,255,1); border-color: rgba(255,255,255,1); }',
        ];
        const $style = document.createElement("style");
        $style.innerHTML = radioStyle.join(" ");
        document.querySelector("head")?.append($style);
        const $scoreSelectDiv = document.createElement("div");
        $scoreSelectDiv.id = SCORE_SELECT_DIV;
        $scoreSelectDiv.classList.add("Input", "svelte-nsdlaj");
        const scoreSelectClass = "SCORE_SELECT_INFO";
        const $text = document.createElement("label");
        $text.classList.add(scoreSelectClass, "svelte-nsdlaj");
        $text.style.marginLeft = "0.5em";
        const $scoreModeGroup = document.createElement("group");
        $scoreModeGroup.classList.add("inline_radio");
        for (const key in SCORE_TYPE) {
            const id = `SCORE_${key}_R`;
            const $radio = document.createElement("input");
            $radio.id = id;
            $radio.name = SCORE_RADIO_NAME;
            $radio.setAttribute("type", "radio");
            $radio.value = SCORE_TYPE[key].id;
            const $label = document.createElement("label");
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
        const atkRadioId = $scoreSelectDiv
            .getElementsByClassName(SCORE_TYPE.ATTACK.key)[0]
            .getAttribute("for");
        document.getElementById(atkRadioId).toggleAttribute("checked", true);
        document.getElementsByName(SCORE_RADIO_NAME).forEach(function (e) {
            e.addEventListener("click", function () {
                enkaIcon2Text();
            });
        });
    }
    function calcArtifactScore(index) {
        let score = 0;
        if (!isEquippingArtifact(index))
            return score;
        const $subStat = Array.from($artifact[index].getElementsByClassName("Substat"));
        const $subStatName = $subStat.map((sub) => sub.classList[1]);
        const $subStatAmount = $subStat.map((sub) => sub.lastChild.innerText.replace(/[^0-9.]/g, ""));
        const subLen = $subStat.length;
        const scoreH = getScoreType();
        for (let i = 0; i < subLen; i++) {
            const key = $subStatName[i];
            switch (key) {
                case "CRITICAL":
                    score += Number($subStatAmount[i]) * 2;
                    break;
                case "CRITICAL_HURT":
                    score += Number($subStatAmount[i]);
                    break;
                default:
                    for (const typeKey in SCORE_TYPE) {
                        const scoreType = SCORE_TYPE[typeKey];
                        if (key != scoreType.key)
                            continue;
                        if (scoreH != scoreType.id)
                            continue;
                        score += Number($subStatAmount[i]) * scoreType.correction;
                        break;
                    }
            }
        }
        return score;
    }
    window.addEventListener("load", function () {
        const $weaponInfo = $weapon[0].getElementsByTagName("content")[0];
        const $weaponName = $weaponInfo.getElementsByTagName("h3")[0];
        $weaponInfo.style.paddingRight = "0px";
        $weaponName.style.fontWeight = "bold";
        $weapon[0].children[0].style.width = "30%";
        const $charaCard = document.getElementsByClassName("card-host")[0];
        const $exParam = document.createElement("div");
        $exParam.id = "extraData";
        $exParam.innerText = "";
        $exParam.style.position = "absolute";
        $exParam.style.bottom = "0.2%";
        $exParam.style.right = "1.3%";
        $exParam.style.textAlign = "right";
        $exParam.style.fontSize = "80%";
        $exParam.classList.add("svelte-1ujofp1");
        $charaCard.appendChild($exParam);
        const $timeStamp = document.createElement("div");
        $timeStamp.id = TIME_STAMP;
        $timeStamp.innerText = "";
        $timeStamp.style.position = "absolute";
        $timeStamp.style.top = "1%";
        $timeStamp.style.left = "2%";
        $timeStamp.style.fontSize = "60%";
        $timeStamp.style.opacity = "0.4";
        $exParam.classList.add("svelte-1ujofp1");
        $charaCard.appendChild($timeStamp);
        const cssStyle = [
            ".Card .Icon{ display:none !important }",
            ".stats.svelte-gp6viv .Substat { padding-top: 4%; }",
            ".Card .Substat.svelte-1ut2kb8.svelte-1ut2kb8 { display: flex; align-items: center; margin-right: 0em; line-height: 95%; font-size: 98%; }",
            ".substats.svelte-17qi811>.Substat { padding-right: 1.0em; }",
            ".Artifact.svelte-17qi811 .ArtifactIcon { top: -37%; left: -6%; width: 28%; }",
            ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(1) { display: flex; align-items: center; top: 5%; font-size: 100%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; }",
            ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(2) { padding: 4% 0%; }",
            ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(3) { max-height: 25% }",
        ];
        const $style = document.createElement("style");
        $style.innerHTML = cssStyle.join(" ");
        document.querySelector("head")?.append($style);
        const $cardSection = document.getElementsByClassName("section");
        $cardSection[0].style.width = "36%";
        $cardSection[1].style.width = "24%";
        $cardSection[1].style.left = "34%";
        $cardSection[2].style.width = "43%";
        $cardSection[2].style.height = "97%";
        createConvertTextElements();
        createModeChangeBottom();
        enkaIcon2Text();
        const $charaName = document.getElementsByClassName("name")[0];
        const $language = document.getElementsByClassName("Dropdown-selectedItem")[0];
        const observeConf = {
            childList: true,
            attributes: true,
            characterData: true,
        };
        const observer = new MutationObserver(() => {
            createConvertTextElements();
            enkaIcon2Text();
        });
        observer.observe($charaName, observeConf);
        observer.observe($language, observeConf);
    });

    exports.SCORE_TYPE = SCORE_TYPE;
    exports.calcArtifactScore = calcArtifactScore;

    return exports;

})({});
