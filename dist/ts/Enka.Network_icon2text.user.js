// ==UserScript==
// @name         Enka.Network_lang-jp_mod_by_takenoko
// @namespace    http://tampermonkey.net/
// @version      1.1.0
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

(function () {
    'use strict';

    class CardSection {
        constructor(cardSection) {
            if (!cardSection.classList.contains("section")) {
                throw new Error("not card section element");
            }
            this._cardSection = cardSection;
        }
        get element() {
            return this._cardSection;
        }
    }

    class CardSectionLeft extends CardSection {
        init() {
            throw new Error("Method not implemented.");
        }
    }

    class CardSectionMiddle extends CardSection {
        init() {
            throw new Error("Method not implemented.");
        }
    }

    class CardSectionRight extends CardSection {
        init() {
            throw new Error("Method not implemented.");
        }
    }

    class CardSections {
        constructor(cardSection) {
            this.cardSection = (locate) => {
                return this._cardSection[locate];
            };
            this._cardSection = {
                left: new CardSectionLeft(cardSection[0]),
                middle: new CardSectionMiddle(cardSection[1]),
                right: new CardSectionRight(cardSection[2])
            };
        }
    }

    class BuildCard {
        constructor(cardHost) {
            if (!cardHost.classList.contains("Card")) {
                throw new Error("not card element");
            }
            try {
                this._cardSections = new CardSections(cardHost.getElementsByClassName("section"));
            }
            catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                    throw new Error("could not create build card");
                }
            }
        }
        init() {
            this._cardSections.cardSection("left").element.style.width = "36%";
            this._cardSections.cardSection("middle").element.style.width = "24%";
            this._cardSections.cardSection("middle").element.style.left = "34%";
            this._cardSections.cardSection("right").element.style.width = "43%";
        }
    }

    class CssStyleManager {
        constructor() {
            this.css = [];
            this.style = document.createElement("style");
            const head = document.querySelector("head");
            head?.append(this.style);
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new CssStyleManager();
            }
            return this._instance;
        }
        addStyle(...css) {
            this.css.push(...css);
            this.css = [...new Set(this.css)];
            this.style.innerHTML = this.css.join(" ");
        }
    }

    const VERSION = "v1.1.0";
    const BASE_ATK_CLASS = "BASE_ATTACK";
    const TIME_STAMP = "timeStamp";
    const EVALUATION_SELECTOR = "evaluationSelectorRow";
    const EVALUATION_SELECTOR_DIV = "evaluationSelectorDiv";
    const EVALUATION_SELECTOR_NAME = "evaluationSelector";
    const SCORE_SELECT_DIV = "scoreSelectDiv";
    const SCORE_RADIO_NAME = "sSource";
    const RV_SELECT_DIV = "rvSelectDiv";
    const RV_CHECKBOX_NAME = "rollValue";
    const cssManager = CssStyleManager.instance;

    function getFormattedDate(date, format) {
        const symbol = {
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
        };
        const formatted = format.replace(/(M+|d+|h+|m+|s+)/g, (v) => {
            const num = symbol[v.slice(-1)].toString();
            if (v.length > 1) {
                return ("0" + num).slice(-2);
            }
            else {
                return num;
            }
        });
        return formatted.replace(/(y+)/g, (v) => date.getFullYear().toString().slice(-v.length));
    }

    class DateText {
        static get instance() {
            if (!this._instance) {
                this._instance = new DateText();
            }
            return this._instance;
        }
        createText() {
            if (document.getElementById(TIME_STAMP))
                return;
            const charaSection = document.getElementsByClassName("section")[0];
            if (!charaSection)
                return;
            const timeStamp = document.createElement("div");
            timeStamp.id = TIME_STAMP;
            timeStamp.innerText = "";
            timeStamp.style.fontSize = "60%";
            timeStamp.style.opacity = "0.4";
            charaSection.firstChild?.after(timeStamp);
            charaSection.style.paddingTop = "0.8%";
        }
        writeText() {
            const timeStamp = document.getElementById(TIME_STAMP);
            if (!timeStamp)
                return;
            const date = new Date();
            const timeString = getFormattedDate(date, "yyyy-MM-dd hh:mm:ss");
            timeStamp.textContent = `${VERSION}TE ${timeString}`;
        }
    }

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

    function getSeparateElement() {
        const separateElement = document.createElement("span");
        separateElement.classList.add("sep");
        return separateElement;
    }
    function getLocale() {
        const language = document.getElementsByClassName("Dropdown-selectedItem")[0];
        return language.innerText;
    }
    function getSvelteClassName(element) {
        return Array.from(element.classList).filter((val) => val.match(/svelte/))[0] ?? "";
    }
    function createStatTextElement(parentElement) {
        const className = getSvelteClassName(parentElement);
        const tag = parentElement.lastElementChild?.tagName ?? "div";
        const statText = document.createElement(tag);
        statText.classList.add("statText");
        statText.classList.add(className);
        return statText;
    }
    function addStatTextElement(parentElement, addSep = true) {
        if (parentElement.getElementsByClassName("statText").length >= 1)
            return null;
        const icon = parentElement.getElementsByClassName("ShadedSvgIcon")[0] ??
            parentElement.getElementsByClassName("Icon")[0];
        const statText = createStatTextElement(parentElement);
        if (addSep) {
            const sep = getSeparateElement();
            sep.classList.add(getSvelteClassName(parentElement));
            icon.after(sep);
        }
        icon.after(statText);
        parentElement.removeChild(icon);
        return statText;
    }
    function baseStat2characterStat(key) {
        switch (key) {
            case "BASE_HP": return "HP";
            case "BASE_ATTACK": return "ATTACK";
            case "BASE_DEFENSE": return "DEFENSE";
            case "UNKNOWN": return undefined;
        }
    }

    class TranslateKey2Word {
        static getTranslate() {
            const language = getLocale();
            switch (language) {
                case "EN":
                    return new EN();
                case "JA":
                    return new JA();
                default:
                    return new EN();
            }
        }
        isKey(checkKey) {
            return checkKey in this.translateArray;
        }
        getLocale(key) {
            if (!this.isKey(key))
                return this.translateArray["UNKNOWN"]["locale"];
            return this.translateArray[key]["locale"];
        }
        getLocaleSub(key) {
            if (!this.isKey(key))
                return this.translateArray["UNKNOWN"]["locale"];
            return (this.translateArray[key]["subOption"] ??
                this.translateArray[key]["locale"]);
        }
    }
    class EN extends TranslateKey2Word {
        constructor() {
            super(...arguments);
            this.translateArray = {
                BASE_HP: {
                    locale: "Base HP",
                    subOption: undefined,
                },
                BASE_ATTACK: {
                    locale: "Base ATK",
                    subOption: undefined,
                },
                BASE_DEFENSE: {
                    locale: "Base DEF",
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
                    locale: "CRIT Rate",
                    subOption: "CR",
                },
                CRITICAL_HURT: {
                    locale: "CRIT DMG",
                    subOption: "CD",
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
                EVALUATION_SELECTOR_INFO: {
                    locale: "Evaluation method",
                    subOption: undefined,
                },
                SCORING_METHOD: {
                    locale: "Scoring method",
                    subOption: undefined,
                },
                RV_METHOD: {
                    locale: "RV method",
                    subOption: undefined,
                },
                SCORE_EXTRA_INFO: {
                    locale: "Crit Ratio 1:${critRatio} / Score(${selectStat}) Avg. ${avgScore} Total ${sumScore}",
                    subOption: undefined,
                },
                RV_EXTRA_INFO: {
                    locale: "Crit Ratio 1:${critRatio} / RV(${scoreType}) Total ${sumScore}",
                    subOption: undefined,
                },
                UNKNOWN: {
                    locale: "Unknown",
                    subOption: undefined,
                },
            };
        }
    }
    class JA extends TranslateKey2Word {
        constructor() {
            super(...arguments);
            this.translateArray = {
                BASE_HP: {
                    locale: "基礎HP",
                    subOption: undefined,
                },
                BASE_ATTACK: {
                    locale: "基礎攻撃力",
                    subOption: undefined,
                },
                BASE_DEFENSE: {
                    locale: "基礎防御力",
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
                EVALUATION_SELECTOR_INFO: {
                    locale: "評価方式",
                    subOption: undefined,
                },
                SCORING_METHOD: {
                    locale: "スコア方式",
                    subOption: undefined,
                },
                RV_METHOD: {
                    locale: "RV方式",
                    subOption: undefined,
                },
                SCORE_EXTRA_INFO: {
                    locale: "会心比 1:${critRatio} / スコア方式(${selectStat}) 平均:${avgScore} 合計:${sumScore}",
                    subOption: undefined,
                },
                RV_EXTRA_INFO: {
                    locale: "会心比 1:${critRatio} / RV方式(${selectStats}) 合計:${sumRV}%",
                    subOption: undefined,
                },
                UNKNOWN: {
                    locale: "不明",
                    subOption: undefined,
                },
            };
        }
    }

    var _scoreType_id, _scoreType_key;
    class scoreType {
        constructor(id, key) {
            _scoreType_id.set(this, void 0);
            _scoreType_key.set(this, void 0);
            __classPrivateFieldSet(this, _scoreType_id, id, "f");
            __classPrivateFieldSet(this, _scoreType_key, key, "f");
        }
        get id() {
            return __classPrivateFieldGet(this, _scoreType_id, "f");
        }
        get key() {
            return __classPrivateFieldGet(this, _scoreType_key, "f");
        }
    }
    _scoreType_id = new WeakMap(), _scoreType_key = new WeakMap();
    const SCORE_TYPES = {
        HP: new scoreType("H", "HP_PERCENT"),
        ATTACK: new scoreType("A", "ATTACK_PERCENT"),
        DEFENSE: new scoreType("D", "DEFENSE_PERCENT"),
        EM: new scoreType("EM", "ELEMENT_MASTERY"),
        ER: new scoreType("ER", "CHARGE_EFFICIENCY"),
    };
    class SelectScoreType {
        static get instance() {
            if (!this._instance) {
                this._instance = new SelectScoreType();
            }
            return this._instance;
        }
        createText() {
            const evaluationRow = document.getElementById(EVALUATION_SELECTOR);
            if (document.getElementById(SCORE_SELECT_DIV))
                return;
            const scoreModeDiv = document.createElement("div");
            scoreModeDiv.id = SCORE_SELECT_DIV;
            scoreModeDiv.classList.add("Input", "svelte-1jzchrt");
            evaluationRow?.appendChild(scoreModeDiv);
            const scoreModeGroup = document.createElement("group");
            scoreModeGroup.style.marginTop = "-1em";
            scoreModeGroup.classList.add("scoreModeRadio");
            scoreModeDiv.appendChild(scoreModeGroup);
            for (const scoreType of Object.values(SCORE_TYPES)) {
                const id = `SCORE_${scoreType.id}_R`;
                const radio = document.createElement("input");
                radio.id = id;
                radio.name = SCORE_RADIO_NAME;
                radio.setAttribute("type", "radio");
                radio.value = scoreType.id;
                const label = document.createElement("label");
                label.setAttribute("for", id);
                label.setAttribute("type", "radio");
                label.setAttribute("data-type", "OUTLINE");
                label.classList.add(scoreType.key, "radbox", "Button", "label", "svelte-6y8083");
                scoreModeGroup.appendChild(radio);
                scoreModeGroup.appendChild(label);
            }
            const atkRadioId = `SCORE_${SCORE_TYPES.ATTACK.id}_R`;
            document.getElementById(atkRadioId)?.toggleAttribute("checked", true);
            const radioStyle = [
                `#${EVALUATION_SELECTOR}:not(:has(#evaluation_scoring_radio:checked)) #${SCORE_SELECT_DIV} { display:none }`,
                ".scoreModeRadio input { display:none }",
                ".scoreModeRadio label.radbox { opacity: 0.5; }",
                ".scoreModeRadio input:checked + label.radbox { opacity: 1; }",
            ];
            cssManager.addStyle(...radioStyle);
        }
        writeText() {
            const optionLocale = TranslateKey2Word.getTranslate();
            const scoreSelectDiv = document.getElementById(SCORE_SELECT_DIV);
            if (!scoreSelectDiv)
                return;
            const scoreButtons = scoreSelectDiv.getElementsByClassName("Button");
            for (const label of Array.from(scoreButtons)) {
                label.textContent = optionLocale.getLocaleSub(label.classList[0]);
            }
        }
        getScoreTypeId() {
            const checkedRadio = document.querySelector(`.scoreModeRadio input:checked[name=${SCORE_RADIO_NAME}]`);
            return checkedRadio?.value ?? SCORE_TYPES.ATTACK.id;
        }
        getScoreTypeKey() {
            const id = this.getScoreTypeId();
            for (const typeKey in SCORE_TYPES) {
                const scoreType = SCORE_TYPES[typeKey];
                if (id === scoreType.id)
                    return scoreType.key;
            }
            return "ATTACK_PERCENT";
        }
    }

    function fmt(template, values) {
        if (!values)
            return template;
        const format = new Function(...Object.keys(values), `return \`${template}\`;`);
        return format(...Object.values(values).map((value) => value ?? ""));
    }

    function innerOptionText(statElement, isSub = false) {
        const optionLocale = TranslateKey2Word.getTranslate();
        const statText = statElement?.getElementsByClassName("statText")[0];
        if (!statText)
            return null;
        const optionKey = statElement?.classList[1];
        statText.innerText = isSub
            ? optionLocale.getLocaleSub(optionKey)
            : optionLocale.getLocale(optionKey);
        return statText;
    }

    let Artifact$1 = class Artifact {
        constructor() {
            this.artifacts = document.getElementsByClassName("Artifact");
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new Artifact$1();
            }
            return this._instance;
        }
        createText() {
            for (const artifact of Array.from(this.artifacts)) {
                if (artifact.classList.contains("empty"))
                    continue;
                const mainStat = artifact.getElementsByClassName("mainstat")[0];
                addStatTextElement(mainStat, false);
                const subStatList = artifact.getElementsByClassName("Substat");
                for (const subStat of Array.from(subStatList)) {
                    addStatTextElement(subStat);
                }
            }
            const svelte = getSvelteClassName(this.artifacts[0]);
            const cssStyle = [
                ".Artifact.${svelte} .ArtifactIcon { top: -37%; left: -6%; width: 28%; }",
                ".substats.${svelte} > .Substat { display: flex; align-items: center; padding-right: 1.0em; white-space: nowrap; }",
                ".mainstat.${svelte} > div.${svelte}:nth-child(1) { display: flex; align-items: center; top: 5%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; justify-content: flex-end; align-self: unset; margin-left: unset;}",
                ".mainstat.${svelte} > div.${svelte}:nth-child(2) { padding: 4% 0%; }",
                ".mainstat.${svelte} > div.${svelte}:nth-child(3) { max-height: 25% }",
            ].map(css => fmt(css, { svelte: svelte }));
            cssManager.addStyle(...cssStyle);
        }
        writeText() {
            for (const artifact of Array.from(this.artifacts)) {
                if (artifact.classList.contains("empty"))
                    continue;
                const mainStat = artifact.getElementsByClassName("mainstat")[0];
                innerOptionText(mainStat);
                const subStatList = artifact.getElementsByClassName("Substat");
                for (const subStat of Array.from(subStatList)) {
                    innerOptionText(subStat, true);
                }
            }
        }
    };

    class Weapon {
        constructor() {
            this.weapon = document.getElementsByClassName("Weapon");
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new Weapon();
            }
            return this._instance;
        }
        createText() {
            const weaponImage = this.weapon[0].getElementsByTagName("figure")[0];
            const weaponInfo = this.weapon[0].getElementsByClassName("weapon-caption")[0];
            const weaponName = weaponInfo.getElementsByClassName("title")[0];
            const weaponStatsInfo = weaponInfo.getElementsByClassName("stats")[0];
            const weaponRefine = weaponInfo.getElementsByClassName("refine")[0];
            weaponImage.style.width = "30%";
            weaponInfo.style.paddingRight = "0%";
            weaponName.style.fontWeight = "bold";
            weaponRefine.after(getSeparateElement());
            const subStats = Array.from(weaponStatsInfo.getElementsByClassName("Substat"));
            for (const subStat of subStats) {
                addStatTextElement(subStat);
                subStat.style.display = "flex";
                subStat.style.alignItems = "center";
                subStat.style.marginRight = "0%";
                subStat.style.marginBottom = "1%";
                subStat.style.paddingTop = "3%";
            }
        }
        writeText() {
            const optionLocale = TranslateKey2Word.getTranslate();
            const subStat = this.weapon[0].getElementsByClassName("Substat");
            const statText = innerOptionText(subStat[0]);
            if (!statText)
                return;
            statText.innerHTML = optionLocale.getLocale(BASE_ATK_CLASS);
            if (!subStat[1])
                return;
            innerOptionText(subStat[1]);
        }
    }

    class Friend {
        static get instance() {
            if (!this._instance) {
                this._instance = new Friend();
            }
            return this._instance;
        }
        createText() {
            const friend = document.getElementsByClassName("fren")[0];
            if (!friend)
                return;
            friend.style.whiteSpace = "nowrap";
            const friendText = addStatTextElement(friend, false);
            if (!friendText)
                return;
            friendText.style.marginRight = "0.3em";
        }
        writeText() {
            const friend = document.getElementsByClassName("fren")[0];
            if (!friend)
                return;
            const friendClassName = "FRIEND";
            const friendText = innerOptionText(friend);
            if (!friendText)
                return;
            const optionLocale = TranslateKey2Word.getTranslate();
            friendText.innerText = optionLocale.getLocale(friendClassName);
        }
    }

    class Stat {
        constructor(statKey, _stat) {
            this.statKey = statKey;
            this._stat = _stat;
        }
        get stat() {
            return this._stat.stat;
        }
    }
    class StatNumber {
        constructor(stat) {
            if (typeof stat == "string") {
                stat = stat.replace(/[,%]/, "");
                this.stat = Number(stat);
            }
            else {
                this.stat = stat;
            }
        }
    }

    class ArtifactMainStat extends Stat {
        constructor(statKey, stat, level) {
            super(statKey, stat);
            this.level = level;
        }
    }

    class statRoll {
        constructor(roll) {
            this.rollValue = () => 100 - 10 * (4 - this.roll);
            if (1 <= roll && roll <= 4) {
                this.roll = roll;
            }
            else {
                throw "roll must be in range 1 to 4";
            }
        }
    }
    class statRolls {
        constructor(rolls) {
            this.rolls = [];
            this.eachRollValue = () => {
                return this.rolls.map((roll) => roll.rollValue());
            };
            this.sumRollValue = () => {
                const rollValues = this.eachRollValue();
                if (rollValues.length == 0) {
                    return 0;
                }
                else {
                    return rollValues.reduce((sum, rollValue) => sum + rollValue);
                }
            };
            try {
                rolls.forEach((roll) => this.rolls.push(new statRoll(roll)));
            }
            catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
            }
        }
    }

    class ArtifactSubStat extends Stat {
        constructor(statName, stat, rolls) {
            super(statName, stat);
            this.rolls = new statRolls(rolls);
        }
    }
    class ArtifactSubStats {
        constructor() {
            this._subStats = [];
            this.addSubStat = (subStat) => {
                this._subStats.push(subStat);
            };
        }
        get subStats() {
            return this._subStats;
        }
    }

    var _Artifact_element, _Artifact_star, _Artifact_mainStat, _Artifact_subStats, _Artifacts_element, _Artifacts_artifacts;
    const STATS_OPTION_RATE = {
        HP: Infinity,
        ATTACK: Infinity,
        DEFENSE: Infinity,
        HP_PERCENT: 3,
        ATTACK_PERCENT: 3,
        DEFENSE_PERCENT: 15 / 4,
        CRITICAL: 4,
        CRITICAL_HURT: 2,
        CHARGE_EFFICIENCY: 10 / 3,
        ELEMENT_MASTERY: 12,
        UNKNOWN: Infinity,
    };
    class Artifact {
        constructor(artifact) {
            _Artifact_element.set(this, void 0);
            _Artifact_star.set(this, 0);
            _Artifact_mainStat.set(this, new ArtifactMainStat("UNKNOWN", new StatNumber(0), 0));
            _Artifact_subStats.set(this, new ArtifactSubStats());
            this.artifactScoring = (key) => {
                const rate = STATS_OPTION_RATE.ATTACK_PERCENT / STATS_OPTION_RATE[key];
                let score = 0;
                for (const subStat of __classPrivateFieldGet(this, _Artifact_subStats, "f").subStats) {
                    switch (subStat.statKey) {
                        case "CRITICAL":
                            score += subStat.stat * 2;
                            break;
                        case "CRITICAL_HURT":
                            score += subStat.stat;
                            break;
                        case key:
                            score += subStat.stat * rate;
                            break;
                    }
                }
                return score;
            };
            this.artifactRollValue = (...keys) => {
                let rollValue = 0;
                for (const subStat of __classPrivateFieldGet(this, _Artifact_subStats, "f").subStats) {
                    if (!subStat.statKey)
                        continue;
                    if (keys.includes(subStat.statKey)) {
                        rollValue += subStat.rolls.sumRollValue();
                    }
                }
                return rollValue;
            };
            __classPrivateFieldSet(this, _Artifact_element, artifact, "f");
            if (!artifact.classList.contains("Artifact"))
                return;
            if (artifact.classList.contains("empty"))
                return;
            const elements = {};
            elements["mainStat"] = artifact.getElementsByClassName("mainstat")[0];
            elements["subStats"] = artifact.getElementsByClassName("substats")[0];
            elements["stars"] =
                elements["mainStat"].getElementsByClassName("Stars")[0];
            elements["level"] =
                elements["mainStat"].getElementsByClassName("level")[0];
            __classPrivateFieldSet(this, _Artifact_star, elements["stars"].childElementCount, "f");
            const mainStatKey = elements["mainStat"]
                .classList[1];
            const stat = new StatNumber(elements["mainStat"].children[1].textContent ?? "0");
            const level = Number(elements["level"].textContent ?? "0");
            __classPrivateFieldSet(this, _Artifact_mainStat, new ArtifactMainStat(mainStatKey, stat, level), "f");
            const subStats = elements["subStats"].getElementsByClassName("Substat");
            for (const subStat of Array.from(subStats)) {
                const statKey = subStat.classList[1];
                const stat = new StatNumber(subStat.lastChild?.textContent ?? "0");
                const rolls = Array.from(subStat.getElementsByClassName("rolls")[0].children).map((_roll) => _roll.childElementCount);
                __classPrivateFieldGet(this, _Artifact_subStats, "f").addSubStat(new ArtifactSubStat(statKey, stat, rolls));
            }
        }
        get element() {
            return __classPrivateFieldGet(this, _Artifact_element, "f");
        }
        get star() {
            return __classPrivateFieldGet(this, _Artifact_star, "f");
        }
        get mainStat() {
            return __classPrivateFieldGet(this, _Artifact_mainStat, "f");
        }
        get subStats() {
            return __classPrivateFieldGet(this, _Artifact_subStats, "f").subStats;
        }
    }
    _Artifact_element = new WeakMap(), _Artifact_star = new WeakMap(), _Artifact_mainStat = new WeakMap(), _Artifact_subStats = new WeakMap();
    class Artifacts {
        constructor(artifactSets) {
            _Artifacts_element.set(this, void 0);
            _Artifacts_artifacts.set(this, []);
            this.artifactNum = () => {
                const equippingArtifacts = __classPrivateFieldGet(this, _Artifacts_artifacts, "f").filter((_artifact) => !_artifact.element.classList.contains("empty"));
                return equippingArtifacts.length;
            };
            this.eachArtifactScoring = (key) => {
                return __classPrivateFieldGet(this, _Artifacts_artifacts, "f").map((_artifact) => _artifact.artifactScoring(key));
            };
            this.sumArtifactScoring = (key) => {
                return this.eachArtifactScoring(key).reduce((sum, score) => sum + score);
            };
            this.eachArtifactRollValue = (...keys) => {
                return __classPrivateFieldGet(this, _Artifacts_artifacts, "f").map((_artifact) => _artifact.artifactRollValue(...keys));
            };
            this.sumArtifactRollValue = (...keys) => {
                return this.eachArtifactRollValue(...keys).reduce((sum, rv) => sum + rv);
            };
            __classPrivateFieldSet(this, _Artifacts_element, artifactSets, "f");
            const artifacts = artifactSets.getElementsByClassName("Artifact");
            for (const artifact of Array.from(artifacts)) {
                __classPrivateFieldGet(this, _Artifacts_artifacts, "f").push(new Artifact(artifact));
            }
        }
        get element() {
            return __classPrivateFieldGet(this, _Artifacts_element, "f");
        }
        get artifacts() {
            return __classPrivateFieldGet(this, _Artifacts_artifacts, "f");
        }
    }
    _Artifacts_element = new WeakMap(), _Artifacts_artifacts = new WeakMap();

    class CharacterStat extends Stat {
        constructor(statKey, statRow) {
            const stat = new StatNumber(statRow.children[1]?.lastChild?.textContent ?? "0");
            super(statKey, stat);
        }
    }
    class CharacterBaseStat extends CharacterStat {
        constructor(statKey, statRow) {
            super(statKey, statRow);
            const stat = statRow.lastChild?.textContent ?? "0";
            this._statBase = new StatNumber(stat.split("+", 2)[0]);
        }
        get statAdd() {
            return this._stat.stat - this._statBase.stat;
        }
        get statBase() {
            return this._statBase.stat;
        }
    }
    class CharacterStats {
        constructor(statsTable) {
            this.characterStats = [];
            if (!statsTable.classList.contains("StatsTable"))
                return;
            const statRows = Array.from(statsTable.children).filter((row) => row.classList.contains("row"));
            for (const statRow of statRows) {
                const statKey = statRow.classList[1];
                if (["HP", "ATTACK", "DEFENSE"].includes(statKey)) {
                    this.characterStats.push(new CharacterBaseStat(statKey, statRow));
                }
                else {
                    this.characterStats.push(new CharacterStat(statKey, statRow));
                }
            }
        }
        getCharacterStatRow(key) {
            return this.characterStats
                .find((row) => row.statKey === key);
        }
        getCharacterStat(key) {
            const statRow = this.getCharacterStatRow(key);
            return statRow?.stat ?? 0;
        }
        getCharacterBaseStat(key) {
            const normalKey = baseStat2characterStat(key);
            if (!normalKey)
                return 0;
            const statRow = this.getCharacterStatRow(normalKey);
            return statRow?.statBase ?? 0;
        }
    }

    var _a$2, _EvaluationSelector_instance;
    const EVALUATION_METHOD = [
        { id: "scoring", key: "SCORING_METHOD" },
        { id: "rollValue", key: "RV_METHOD" },
    ];
    class EvaluationSelector {
        static get instance() {
            if (!__classPrivateFieldGet(this, _a$2, "f", _EvaluationSelector_instance)) {
                __classPrivateFieldSet(this, _a$2, new EvaluationSelector(), "f", _EvaluationSelector_instance);
            }
            return __classPrivateFieldGet(this, _a$2, "f", _EvaluationSelector_instance);
        }
        createText() {
            const cardToggles = document.getElementsByClassName("CardToggles")[0];
            if (document.getElementById(EVALUATION_SELECTOR))
                return;
            const rowElement = cardToggles
                .getElementsByClassName("row")[0]
                .cloneNode(false);
            rowElement.id = EVALUATION_SELECTOR;
            rowElement.style.display = "flex";
            rowElement.style.flexDirection = "column";
            rowElement.style.alignItems = "flex-start";
            cardToggles.getElementsByTagName("header")[2].before(rowElement);
            const methodSelectDiv = document.createElement("div");
            methodSelectDiv.id = EVALUATION_SELECTOR_DIV;
            methodSelectDiv.style.marginTop = "1em";
            methodSelectDiv.classList.add("svelte-1jzchrt");
            rowElement.appendChild(methodSelectDiv);
            const infoText = document.createElement("label");
            const evaluationSelectorInfo = "EVALUATION_SELECTOR_INFO";
            infoText.classList.add(evaluationSelectorInfo, getSvelteClassName(methodSelectDiv));
            methodSelectDiv.appendChild(infoText);
            const methodGroup = document.createElement("group");
            methodGroup.style.display = "flex";
            methodGroup.style.flexWrap = "wrap";
            methodGroup.style.marginTop = "-1em";
            methodGroup.classList.add("methodRadio", "svelte-1893j5");
            methodSelectDiv.appendChild(methodGroup);
            for (const evaluationMethod of Object.values(EVALUATION_METHOD)) {
                const id = `evaluation_${evaluationMethod.id}_radio`;
                const baseLabel = document.createElement("label");
                baseLabel.classList.add("Checkbox", "Control", "sm", getSvelteClassName(methodGroup));
                const radio = document.createElement("input");
                radio.id = id;
                radio.name = EVALUATION_SELECTOR_NAME;
                radio.style.display = "none";
                radio.setAttribute("type", "radio");
                radio.value = evaluationMethod.id;
                const toggle = document.createElement("div");
                toggle.classList.add("toggle", getSvelteClassName(methodGroup));
                const methodNameBase = document.createElement("span");
                methodNameBase.setAttribute("for", id);
                methodNameBase.setAttribute("type", "radio");
                methodNameBase.classList.add("info", getSvelteClassName(methodGroup));
                const methodName = document.createElement("span");
                methodName.classList.add(evaluationMethod.key, "label", getSvelteClassName(methodGroup));
                methodNameBase.appendChild(methodName);
                baseLabel.appendChild(radio);
                baseLabel.appendChild(toggle);
                baseLabel.appendChild(methodNameBase);
                methodGroup.appendChild(baseLabel);
            }
            const scoringSelectId = `evaluation_${EVALUATION_METHOD[0].id}_radio`;
            document.getElementById(scoringSelectId)
                ?.toggleAttribute("checked", true);
            const radioStyle = [
                ".methodRadio input:checked ~ .toggle.svelte-1893j5:before { content: ''; border-radius: 1px; transform: scale(1); }",
                ".methodRadio .Checkbox.svelte-1893j5.svelte-1893j5:has(> input:checked) { opacity: 1; }",
            ];
            cssManager.addStyle(...radioStyle);
        }
        writeText() {
            this._optionLocale = TranslateKey2Word.getTranslate();
            const methodSelectDiv = document.getElementById(EVALUATION_SELECTOR_DIV);
            if (!methodSelectDiv)
                return;
            const infoText = methodSelectDiv.children[0];
            infoText.textContent = this._optionLocale.getLocale(infoText.classList[0]);
            for (const method of EVALUATION_METHOD) {
                const methodLabel = methodSelectDiv.getElementsByClassName(method.key)[0];
                methodLabel.textContent = this._optionLocale.getLocale(methodLabel.classList[0]);
            }
        }
        getSelectMethodId() {
            const checkedRadio = document.querySelector(`.methodRadio input:checked[name=${EVALUATION_SELECTOR_NAME}]`);
            return checkedRadio.value ?? EVALUATION_METHOD[0].id;
        }
        getSelectMethodKey() {
            const id = this.getSelectMethodId();
            for (const method of EVALUATION_METHOD) {
                if (id === method.id)
                    return method.key;
            }
            return EVALUATION_METHOD[0].key;
        }
    }
    _a$2 = EvaluationSelector;
    _EvaluationSelector_instance = { value: void 0 };

    var _a$1, _RollValueMethodRoutine_instance;
    const STATS_OPTION_ID = {
        HP: "HP",
        ATTACK: "ATK",
        DEFENSE: "DEF",
        HP_PERCENT: "HP_P",
        ATTACK_PERCENT: "ATK_P",
        DEFENSE_PERCENT: "DEF_P",
        CRITICAL: "CR",
        CRITICAL_HURT: "CD",
        CHARGE_EFFICIENCY: "ER",
        ELEMENT_MASTERY: "EM",
        UNKNOWN: "UNKNOWN"
    };
    class RollValueMethodRoutine {
        static get instance() {
            if (!__classPrivateFieldGet(this, _a$1, "f", _RollValueMethodRoutine_instance)) {
                __classPrivateFieldSet(this, _a$1, new RollValueMethodRoutine(), "f", _RollValueMethodRoutine_instance);
            }
            return __classPrivateFieldGet(this, _a$1, "f", _RollValueMethodRoutine_instance);
        }
        createText() {
            const evaluationRow = document.getElementById(EVALUATION_SELECTOR);
            if (document.getElementById(RV_SELECT_DIV))
                return;
            const rvSelectDiv = document.createElement("div");
            rvSelectDiv.id = RV_SELECT_DIV;
            rvSelectDiv.classList.add("Input", "svelte-1jzchrt");
            evaluationRow?.appendChild(rvSelectDiv);
            const rvSelectGroup = document.createElement("group");
            rvSelectGroup.style.marginTop = "-1em";
            rvSelectGroup.classList.add("rvSelectCheckbox");
            rvSelectDiv.appendChild(rvSelectGroup);
            for (const scoreType in STATS_OPTION_ID) {
                const statId = STATS_OPTION_ID[scoreType];
                const checkboxId = `RV_${statId}_CHECKBOX`;
                const checkbox = document.createElement("input");
                checkbox.id = checkboxId;
                checkbox.name = RV_CHECKBOX_NAME;
                checkbox.setAttribute("type", "checkbox");
                checkbox.value = STATS_OPTION_ID[scoreType];
                const label = document.createElement("label");
                label.setAttribute("for", checkboxId);
                label.setAttribute("type", "checkbox");
                label.setAttribute("data-type", "OUTLINE");
                label.classList.add(scoreType, "radbox", "Button", "label", "svelte-6y8083");
                rvSelectGroup.appendChild(checkbox);
                rvSelectGroup.appendChild(label);
            }
            const crRadioId = `RV_${STATS_OPTION_ID.CRITICAL}_CHECKBOX`;
            const cdRadioId = `RV_${STATS_OPTION_ID.CRITICAL_HURT}_CHECKBOX`;
            const atkRadioId = `RV_${STATS_OPTION_ID.ATTACK_PERCENT}_CHECKBOX`;
            document.getElementById(crRadioId)?.toggleAttribute("checked", true);
            document.getElementById(cdRadioId)?.toggleAttribute("checked", true);
            document.getElementById(atkRadioId)?.toggleAttribute("checked", true);
            const radioStyle = [
                `#${EVALUATION_SELECTOR}:not(:has(#evaluation_rollValue_radio:checked)) #${RV_SELECT_DIV} { display:none }`,
                ".rvSelectCheckbox input { display:none }",
                ".rvSelectCheckbox label.radbox { opacity: 0.5; }",
                ".rvSelectCheckbox input:checked + label.radbox { opacity: 1; }",
            ];
            cssManager.addStyle(...radioStyle);
        }
        writeText() {
            const optionLocale = TranslateKey2Word.getTranslate();
            const rvSelectDiv = document.getElementById(RV_SELECT_DIV);
            if (!rvSelectDiv)
                return;
            const scoreButtons = rvSelectDiv.getElementsByClassName("Button");
            for (const label of Array.from(scoreButtons)) {
                const key = label.classList[0];
                if (key.includes("PERCENT")) {
                    label.textContent = optionLocale.getLocaleSub(key) + "%";
                }
                else {
                    label.textContent = optionLocale.getLocaleSub(key);
                }
            }
        }
        getCheckedIds() {
            const checkedIds = [];
            document
                .querySelectorAll(`.rvSelectCheckbox input:checked[name=${RV_CHECKBOX_NAME}]`)
                .forEach((element) => checkedIds.push(element.id));
            return checkedIds
                .map((id) => id.match("RV_(.+)_CHECKBOX")?.at(1) ?? "");
        }
        getCheckedKeys() {
            const checkedIds = this.getCheckedIds();
            return Object.keys(STATS_OPTION_ID).filter((key) => checkedIds.includes(STATS_OPTION_ID[key]));
        }
    }
    _a$1 = RollValueMethodRoutine;
    _RollValueMethodRoutine_instance = { value: void 0 };

    var _a, _ArtifactEvaluateRoutine_instance;
    const EVALUATION_TEXT = "artifactEvaluateText";
    const EXTRA_PARAMETER_TEXT = "extraParamText";
    class ArtifactEvaluateRoutine {
        static get instance() {
            if (!__classPrivateFieldGet(this, _a, "f", _ArtifactEvaluateRoutine_instance)) {
                __classPrivateFieldSet(this, _a, new ArtifactEvaluateRoutine(), "f", _ArtifactEvaluateRoutine_instance);
            }
            return __classPrivateFieldGet(this, _a, "f", _ArtifactEvaluateRoutine_instance);
        }
        createText() {
            this._artifacts = new Artifacts(document.getElementsByClassName("section right")[0]);
            this._characterStats = new CharacterStats(document.getElementsByClassName("StatsTable")[0]);
            this.createEvaluationText();
            this.createExtraParameterText();
        }
        writeText() {
            this._optionLocale = TranslateKey2Word.getTranslate();
            const evaluationSelector = EvaluationSelector.instance;
            switch (evaluationSelector.getSelectMethodId()) {
                case "scoring": {
                    this.writeScoringMethod();
                    break;
                }
                case "rollValue": {
                    this.writeRollValueMethod();
                    break;
                }
            }
        }
        createEvaluationText() {
            for (const artifact of this._artifacts.artifacts) {
                const artifactElement = artifact.element;
                let evaluationText = artifactElement.getElementsByClassName(EVALUATION_TEXT)[0];
                if (evaluationText)
                    continue;
                evaluationText = document.createElement("div");
                evaluationText.classList.add(EVALUATION_TEXT, getSvelteClassName(artifactElement));
                artifactElement.appendChild(evaluationText);
            }
            const cssStyle = [
                `.Artifact .${EVALUATION_TEXT}{ position: absolute; font-size: 0.7em; opacity: 0.6; right: 0.3em; }`,
            ];
            cssManager.addStyle(...cssStyle);
        }
        createExtraParameterText() {
            let extraParameter = document.getElementById(EXTRA_PARAMETER_TEXT);
            if (extraParameter)
                return;
            extraParameter = document.createElement("div");
            extraParameter.id = EXTRA_PARAMETER_TEXT;
            extraParameter.style.right = "0.3em";
            extraParameter.style.marginTop = "-0.5em";
            extraParameter.style.textAlign = "right";
            extraParameter.style.fontSize = "0.8em";
            extraParameter.style.whiteSpace = "nowrap";
            extraParameter.classList.add(getSvelteClassName(this._artifacts.artifacts[0].element));
            this._artifacts.element.appendChild(extraParameter);
        }
        writeScoringMethod() {
            const selectScoreType = SelectScoreType.instance;
            const scoreTypeKey = selectScoreType.getScoreTypeKey();
            for (const artifact of this._artifacts.artifacts) {
                const score = artifact.artifactScoring(scoreTypeKey);
                const scoreBox = artifact.element.getElementsByClassName(EVALUATION_TEXT)[0];
                if (!scoreBox)
                    continue;
                scoreBox.textContent = score.toFixed(1);
            }
            const extraText = document.getElementById(EXTRA_PARAMETER_TEXT);
            if (!extraText)
                return;
            const critRate = this._characterStats.getCharacterStat("CRITICAL");
            const critDMG = this._characterStats.getCharacterStat("CRITICAL_HURT");
            const critRatio = critDMG / critRate;
            const typeName = this._optionLocale.getLocaleSub(scoreTypeKey);
            const sumScore = this._artifacts.sumArtifactScoring(scoreTypeKey);
            const artifactNum = this._artifacts.artifactNum();
            const avgScore = artifactNum != 0 ? sumScore / artifactNum : 0;
            extraText.textContent = this.getScoringInfoText(critRatio, typeName, sumScore, avgScore);
        }
        writeRollValueMethod() {
            const rollValueMethod = RollValueMethodRoutine.instance;
            const scoreTypeKeys = rollValueMethod.getCheckedKeys();
            for (const artifact of this._artifacts.artifacts) {
                const rv = artifact.artifactRollValue(...scoreTypeKeys);
                const evaluateText = artifact.element.getElementsByClassName(EVALUATION_TEXT)[0];
                if (!evaluateText)
                    continue;
                evaluateText.textContent = `${rv}%`;
            }
            const extraText = document.getElementById(EXTRA_PARAMETER_TEXT);
            if (!extraText)
                return;
            const critRate = this._characterStats.getCharacterStat("CRITICAL");
            const critDMG = this._characterStats.getCharacterStat("CRITICAL_HURT");
            const critRatio = critDMG / critRate;
            const statNames = scoreTypeKeys.map((key) => {
                const name = this._optionLocale.getLocaleSub(key);
                return name + (key.includes("PERCENT") ? "%" : "");
            });
            const sumRV = this._artifacts.sumArtifactRollValue(...scoreTypeKeys);
            extraText.textContent = this.getRVInfoText(critRatio, statNames, sumRV);
        }
        getScoringInfoText(ratio, scoreTypeName, sumScore, avgScore) {
            const ratioFixed = ratio.toFixed(1);
            const sumScoreFixed = sumScore.toFixed(1);
            const avgScoreFixed = avgScore.toFixed(1);
            return fmt(this._optionLocale.getLocale("SCORE_EXTRA_INFO"), {
                critRatio: ratioFixed,
                selectStat: scoreTypeName,
                avgScore: avgScoreFixed,
                sumScore: sumScoreFixed,
            });
        }
        getRVInfoText(ratio, statNames, sumRV) {
            const ratioFixed = ratio.toFixed(1);
            const sumRVFixed = sumRV.toFixed(0);
            return fmt(this._optionLocale.getLocale("RV_EXTRA_INFO"), {
                critRatio: ratioFixed,
                selectStats: statNames.join(" "),
                sumRV: sumRVFixed,
            });
        }
    }
    _a = ArtifactEvaluateRoutine;
    _ArtifactEvaluateRoutine_instance = { value: void 0 };

    class CreateWriteManager {
        static get instance() {
            if (!this._instance) {
                this._instance = new CreateWriteManager();
            }
            return this._instance;
        }
        constructor() {
            this.createList = [];
            this.createList.push(DateText.instance);
            this.createList.push(Friend.instance);
            this.createList.push(EvaluationSelector.instance);
            this.createList.push(SelectScoreType.instance);
            this.createList.push(RollValueMethodRoutine.instance);
            this.createList.push(Weapon.instance);
            this.createList.push(Artifact$1.instance);
            this.createList.push(ArtifactEvaluateRoutine.instance);
        }
        createText() {
            this.createList.forEach((value) => {
                value.createText();
            });
        }
        writeText() {
            this.createList.forEach((value) => {
                value.writeText();
            });
        }
    }

    function isIOS() {
        const userAgent = navigator.userAgent.toLowerCase();
        const checkAgents = new RegExp(["iphone", "ipad", "macintosh"].join("|"));
        if (checkAgents.test(userAgent) && "ontouchend" in document) {
            return true;
        }
        else {
            return false;
        }
    }

    const cardBase = document.getElementsByClassName("CharacterList")[0].parentElement;
    const cardObserver = new MutationObserver(main);
    cardObserver.observe(cardBase, {
        attributes: true,
        childList: true,
        subtree: true,
    });
    let buildCard;
    function main() {
        cardObserver.disconnect();
        if (isIOS()) {
            cssManager.addStyle(".statText { font-weight: bold; font-size: 95%; }");
        }
        else {
            cssManager.addStyle(".statText { font-weight: bold; font-size: 100%; }");
        }
        const card = document.getElementsByClassName("Card")[0];
        buildCard = new BuildCard(card);
        buildCard.init();
        const cwManager = CreateWriteManager.instance;
        cwManager.createText();
        cwManager.writeText();
        const charaName = document.getElementsByClassName("name")[0];
        const language = document.getElementsByClassName("Dropdown-selectedItem")[0];
        const observeConf = {
            childList: true,
            attributes: true,
            characterData: true,
        };
        const observer = new MutationObserver(() => {
            cwManager.createText();
            cwManager.writeText();
        });
        observer.observe(charaName, observeConf);
        observer.observe(language, observeConf);
        document.getElementsByName(EVALUATION_SELECTOR_NAME).forEach(function (e) {
            e.addEventListener("click", function () {
                cwManager.writeText();
            });
        });
        document.getElementsByName(SCORE_RADIO_NAME).forEach(function (e) {
            e.addEventListener("click", function () {
                cwManager.writeText();
            });
        });
        document.getElementsByName(RV_CHECKBOX_NAME).forEach(function (e) {
            e.addEventListener("click", function () {
                cwManager.writeText();
            });
        });
    }

})();
