// ==UserScript==
// @name         Enka.Network_lang-jp_mod_by_takenoko
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Enka.Network 日本語化スクリプト
// @author       Takenoko-ya
// @updateURL    https://github.com/takenoko9973/enkaNetworkConvert/raw/master/dist/ts/Enka.Network_icon2text.user.js
// @downloadURL  https://github.com/takenoko9973/enkaNetworkConvert/raw/master/dist/ts/Enka.Network_icon2text.user.js
// @supportURL   https://github.com/takenoko9973/enkaNetworkConvert/issues
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shinshin.moe
// @match        https://enka.network/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

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

    const cssManager = CssStyleManager.instance;

    const VERSION = "1.2.0";

    const StatsKey = {
        base_hp: "BASE_HP",
        base_atk: "BASE_ATTACK",
        base_def: "BASE_DEFENSE",
        hp: "HP",
        atk: "ATTACK",
        def: "DEFENSE",
        hp_percent: "HP_PERCENT",
        atk_percent: "ATTACK_PERCENT",
        def_percent: "DEFENSE_PERCENT",
        crit_rate: "CRITICAL",
        crit_dmg: "CRITICAL_HURT",
        er: "CHARGE_EFFICIENCY",
        em: "ELEMENT_MASTERY",
        heal: "HEAL_ADD",
        physical: "PHYSICAL_ADD_HURT",
        pyro: "FIRE_ADD_HURT",
        electro: "ELEC_ADD_HURT",
        hydro: "WATER_ADD_HURT",
        anemo: "WIND_ADD_HURT",
        cryo: "ICE_ADD_HURT",
        geo: "ROCK_ADD_HURT",
        dendro: "GRASS_ADD_HURT",
        unknown: "UNKNOWN",
    };
    const SubOption = {
        hp: StatsKey.hp,
        atk: StatsKey.atk,
        def: StatsKey.def,
        hp_percent: StatsKey.hp_percent,
        atk_percent: StatsKey.atk_percent,
        def_percent: StatsKey.def_percent,
        crit_rate: StatsKey.crit_rate,
        crit_dmg: StatsKey.crit_dmg,
        er: StatsKey.er,
        em: StatsKey.em,
        unknown: StatsKey.unknown,
    };

    const LocalizeKey = {
        ...StatsKey,
        friend: "FRIEND",
        evaluationInfo: "EVALUATION_SELECTOR_INFO",
        scoring: "SCORING_METHOD",
        rollValue: "RV_METHOD",
        scoreExtra: "SCORE_EXTRA_INFO",
        rollValueExtra: "RV_EXTRA_INFO",
    };

    const Language = {
        english: "EN",
        german: "DE",
        spanish: "ES",
        french: "FR",
        indonesian: "ID",
        italian: "IT",
        japanese: "JA",
        portuguese: "PT",
        russian: "RU",
        thai: "TH",
        turkish: "TR",
        vietnamese: "VI",
        korean: "KO",
        khaenriah: "KH",
        simplifiedChinese: "ZH-CH",
        traditionalChinese: "ZH-TW",
    };

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
    const SCORE_TYPE = {
        HP: SubOption.hp_percent,
        ATTACK: SubOption.atk_percent,
        DEFENSE: SubOption.def_percent,
        ER: SubOption.er,
        EM: SubOption.em,
    };

    const TIME_STAMP = "timeStamp";
    const EXTRA_PARAMETER_TEXT = "extraParamText";
    var ScoreClassName;
    (function (ScoreClassName) {
        ScoreClassName.SELECT_DIV = "scoreSelectDiv";
        ScoreClassName.RADIO_NAME = "sSource";
    })(ScoreClassName || (ScoreClassName = {}));
    var RollValueClassName;
    (function (RollValueClassName) {
        RollValueClassName.SELECT_DIV = "rvSelectDiv";
        RollValueClassName.CHECKBOX_NAME = "rollValue";
    })(RollValueClassName || (RollValueClassName = {}));

    var EvaluationConst;
    (function (EvaluationConst) {
        EvaluationConst.EVALUATION_TEXT = "evaluateText";
        EvaluationConst.SELECTOR_ROW = "evaluationSelectorRow";
        EvaluationConst.SELECTOR_DIV = "evaluationSelectorDiv";
        EvaluationConst.METHOD_SELECTOR_NAME = "methodSelector";
        EvaluationConst.METHOD_SELECTOR_SVELTE = "svelte-1893j5";
    })(EvaluationConst || (EvaluationConst = {}));

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
    class ArtifactMainStat {
        constructor(statKey, stat) {
            this.statKey = statKey;
            this.stat = stat;
        }
    }
    class ArtifactSubStat {
        constructor(statKey, _stat, rolls) {
            this.statKey = statKey;
            this._stat = _stat;
            this.rolls = rolls;
        }
        get stat() {
            return this._stat.stat;
        }
    }
    class Artifact {
        constructor(element) {
            this.mainStat = new ArtifactMainStat("UNKNOWN", new StatNumber(0));
            this.subStats = [];
            this.element = element;
            if (!this.element.classList.contains("Artifact"))
                return;
            if (this.element.classList.contains("empty"))
                return;
            const elements = {
                mainStat: this.element.getElementsByClassName("mainstat")[0],
                subStats: this.element.getElementsByClassName("substats")[0],
            };
            const mainStatKey = elements.mainStat.classList[1];
            const mainStatNum = new StatNumber(elements.mainStat.children[1].textContent ?? "0");
            this.mainStat = new ArtifactMainStat(mainStatKey, mainStatNum);
            const subStats = elements["subStats"].getElementsByClassName("Substat");
            this.subStats = Array.from(subStats).map((subStat) => {
                const subStatKey = subStat.classList[1];
                const subStatNum = new StatNumber(subStat.lastChild?.textContent ?? "0");
                const rolls = Array.from(subStat.getElementsByClassName("rolls")[0].children).map((roll) => roll.childElementCount);
                return new ArtifactSubStat(subStatKey, subStatNum, rolls);
            });
        }
    }

    class LocalizeData {
        isKey(checkKey) {
            return checkKey in this.translateArray;
        }
        getLocale(key) {
            if (this.isKey(key))
                return this.translateArray[key].locale;
            else
                return this.translateArray["UNKNOWN"].locale;
        }
        getLocaleSub(key) {
            if (this.isKey(key))
                return (this.translateArray[key].sub ??
                    this.translateArray[key].locale);
            else
                return (this.translateArray["UNKNOWN"].sub ??
                    this.translateArray["UNKNOWN"].locale);
        }
    }

    class EN extends LocalizeData {
        constructor() {
            super(...arguments);
            this.translateArray = {
                BASE_HP: {
                    locale: "Base HP",
                    sub: undefined,
                },
                BASE_ATTACK: {
                    locale: "Base ATK",
                    sub: undefined,
                },
                BASE_DEFENSE: {
                    locale: "Base DEF",
                    sub: undefined,
                },
                HP: {
                    locale: "HP",
                    sub: undefined,
                },
                ATTACK: {
                    locale: "ATK",
                    sub: undefined,
                },
                DEFENSE: {
                    locale: "DEF",
                    sub: undefined,
                },
                HP_PERCENT: {
                    locale: "HP",
                    sub: undefined,
                },
                ATTACK_PERCENT: {
                    locale: "ATK",
                    sub: undefined,
                },
                DEFENSE_PERCENT: {
                    locale: "DEF",
                    sub: undefined,
                },
                CRITICAL: {
                    locale: "CRIT Rate",
                    sub: "CR",
                },
                CRITICAL_HURT: {
                    locale: "CRIT DMG",
                    sub: "CD",
                },
                CHARGE_EFFICIENCY: {
                    locale: "Energy Recharge",
                    sub: "ER",
                },
                HEAL_ADD: {
                    locale: "Healing Bonus",
                    sub: undefined,
                },
                ELEMENT_MASTERY: {
                    locale: "Elemental Mastery",
                    sub: "EM",
                },
                PHYSICAL_ADD_HURT: {
                    locale: "Physical DMG\nBonus",
                    sub: undefined,
                },
                FIRE_ADD_HURT: {
                    locale: "Pyro DMG\nBonus",
                    sub: undefined,
                },
                ELEC_ADD_HURT: {
                    locale: "Electro DMG\nBonus",
                    sub: undefined,
                },
                WATER_ADD_HURT: {
                    locale: "Hydro DMG\nBonus",
                    sub: undefined,
                },
                WIND_ADD_HURT: {
                    locale: "Anemo DMG\nBonus",
                    sub: undefined,
                },
                ICE_ADD_HURT: {
                    locale: "Cryo DMG\nBonus",
                    sub: undefined,
                },
                ROCK_ADD_HURT: {
                    locale: "Geo DMG\nBonus",
                    sub: undefined,
                },
                GRASS_ADD_HURT: {
                    locale: "Dendro DMG\nBonus",
                    sub: undefined,
                },
                FRIEND: {
                    locale: "Friendship",
                    sub: undefined,
                },
                EVALUATION_SELECTOR_INFO: {
                    locale: "Evaluation method",
                    sub: undefined,
                },
                SCORING_METHOD: {
                    locale: "Scoring method",
                    sub: undefined,
                },
                RV_METHOD: {
                    locale: "RV method",
                    sub: undefined,
                },
                SCORE_EXTRA_INFO: {
                    locale: "Score(${selectStat}) Avg. ${avgScore} Total ${sumScore}",
                    sub: undefined,
                },
                RV_EXTRA_INFO: {
                    locale: "RV(${selectStats}) Total ${sumRV}",
                    sub: undefined,
                },
                UNKNOWN: {
                    locale: "Unknown",
                    sub: undefined,
                },
            };
        }
    }

    class JA extends LocalizeData {
        constructor() {
            super(...arguments);
            this.translateArray = {
                BASE_HP: {
                    locale: "基礎HP",
                    sub: undefined,
                },
                BASE_ATTACK: {
                    locale: "基礎攻撃力",
                    sub: undefined,
                },
                BASE_DEFENSE: {
                    locale: "基礎防御力",
                    sub: undefined,
                },
                HP: {
                    locale: "HP",
                    sub: undefined,
                },
                ATTACK: {
                    locale: "攻撃力",
                    sub: undefined,
                },
                DEFENSE: {
                    locale: "防御力",
                    sub: undefined,
                },
                HP_PERCENT: {
                    locale: "HP",
                    sub: undefined,
                },
                ATTACK_PERCENT: {
                    locale: "攻撃力",
                    sub: undefined,
                },
                DEFENSE_PERCENT: {
                    locale: "防御力",
                    sub: undefined,
                },
                CRITICAL: {
                    locale: "会心率",
                    sub: undefined,
                },
                CRITICAL_HURT: {
                    locale: "会心ダメージ",
                    sub: "会心ダメ",
                },
                CHARGE_EFFICIENCY: {
                    locale: "元素チャージ効率",
                    sub: "元チャ",
                },
                HEAL_ADD: {
                    locale: "与える治癒効果",
                    sub: "与治癒",
                },
                ELEMENT_MASTERY: {
                    locale: "元素熟知",
                    sub: undefined,
                },
                PHYSICAL_ADD_HURT: {
                    locale: "物理ダメージ",
                    sub: undefined,
                },
                FIRE_ADD_HURT: {
                    locale: "炎元素ダメージ",
                    sub: undefined,
                },
                ELEC_ADD_HURT: {
                    locale: "雷元素ダメージ",
                    sub: undefined,
                },
                WATER_ADD_HURT: {
                    locale: "水元素ダメージ",
                    sub: undefined,
                },
                WIND_ADD_HURT: {
                    locale: "風元素ダメージ",
                    sub: undefined,
                },
                ICE_ADD_HURT: {
                    locale: "氷元素ダメージ",
                    sub: undefined,
                },
                ROCK_ADD_HURT: {
                    locale: "岩元素ダメージ",
                    sub: undefined,
                },
                GRASS_ADD_HURT: {
                    locale: "草元素ダメージ",
                    sub: undefined,
                },
                FRIEND: {
                    locale: "好感度",
                    sub: undefined,
                },
                EVALUATION_SELECTOR_INFO: {
                    locale: "評価方式",
                    sub: undefined,
                },
                SCORING_METHOD: {
                    locale: "スコア方式",
                    sub: undefined,
                },
                RV_METHOD: {
                    locale: "RV方式",
                    sub: undefined,
                },
                SCORE_EXTRA_INFO: {
                    locale: "スコア方式(${selectStat}) 平均:${avgScore} 合計:${sumScore}",
                    sub: undefined,
                },
                RV_EXTRA_INFO: {
                    locale: "RV方式(${selectStats}) 合計:${sumRV}",
                    sub: undefined,
                },
                UNKNOWN: {
                    locale: "不明",
                    sub: undefined,
                },
            };
        }
    }

    var EnkaNetworkUtil;
    (function (EnkaNetworkUtil) {
        EnkaNetworkUtil.getPlayerInfo = () => {
            const pathname = location.pathname.split("/")[2] ?? "";
            const playerUID = pathname.split("/")[2];
            const playerInfo = document.getElementsByClassName("PlayerInfo")[0];
            const playerName = playerInfo.getElementsByTagName("h1")[0].innerText;
            return [playerUID, playerName];
        };
        EnkaNetworkUtil.getSeparateElement = () => {
            const separateElement = document.createElement("span");
            separateElement.classList.add("sep");
            return separateElement;
        };
        function getLanguage() {
            const language = document.getElementsByClassName("Dropdown-selectedItem")[0];
            return language.textContent;
        }
        EnkaNetworkUtil.getLanguage = getLanguage;
        EnkaNetworkUtil.getSvelteClassName = (element) => {
            return (Array.from(element.classList).filter((val) => val.match(/svelte/))[0] ?? "");
        };
        EnkaNetworkUtil.createStatTextElement = (parentElement) => {
            const className = EnkaNetworkUtil.getSvelteClassName(parentElement);
            const tag = parentElement.lastElementChild?.tagName ?? "div";
            const statText = document.createElement(tag);
            statText.classList.add("statText");
            statText.classList.add(className);
            return statText;
        };
        EnkaNetworkUtil.addStatTextElement = (parentElement, addSep = true) => {
            if (parentElement.getElementsByClassName("statText").length >= 1)
                return parentElement.getElementsByClassName("statText")[0];
            const icon = parentElement.getElementsByClassName("ShadedSvgIcon")[0] ??
                parentElement.getElementsByClassName("Icon")[0];
            if (addSep) {
                const sep = EnkaNetworkUtil.getSeparateElement();
                sep.classList.add(EnkaNetworkUtil.getSvelteClassName(parentElement));
                icon.after(sep);
            }
            const statText = EnkaNetworkUtil.createStatTextElement(parentElement);
            icon.after(statText);
            parentElement.removeChild(icon);
            return statText;
        };
        EnkaNetworkUtil.getLocalizeData = () => {
            const language = EnkaNetworkUtil.getLanguage();
            switch (language) {
                case Language.english:
                    return new EN();
                case Language.japanese:
                    return new JA();
                default:
                    return new EN();
            }
        };
    })(EnkaNetworkUtil || (EnkaNetworkUtil = {}));
    var BuildCard;
    (function (BuildCard) {
        BuildCard.getBuildCard = () => {
            const buildCard = document.getElementsByClassName("Card")[0];
            if (buildCard == null) {
                throw new Error("not card element");
            }
            return buildCard;
        };
        BuildCard.getBuildCardSections = () => {
            const buildCard = BuildCard.getBuildCard();
            const cardSections = buildCard.getElementsByClassName("section");
            return {
                left: cardSections[0],
                middle: cardSections[1],
                right: cardSections[2],
            };
        };
        BuildCard.getWeapon = () => {
            const buildCard = BuildCard.getBuildCard();
            return buildCard.getElementsByClassName("Weapon")[0];
        };
        BuildCard.getArtifacts = () => {
            const buildCard = BuildCard.getBuildCard();
            const artifacts = buildCard.getElementsByClassName("Artifact");
            return Array.from(artifacts).map((artifact) => new Artifact(artifact));
        };
    })(BuildCard || (BuildCard = {}));

    function fmt(template, values) {
        if (!values)
            return template;
        const format = new Function(...Object.keys(values), `return \`${template}\`;`);
        return format(...Object.values(values).map((value) => value ?? ""));
    }

    class ScoringMethod {
        constructor() {
            this.methodName = "scoring";
            this.methodKey = LocalizeKey.scoring;
        }
        static radioId(name) {
            return `SCORE_${name}_R`;
        }
        createSelector(baseElement) {
            baseElement.classList.add("scoreModeRadio");
            for (const type in SCORE_TYPE) {
                const id = ScoringMethod.radioId(type);
                const radio = document.createElement("input");
                radio.id = id;
                radio.name = "scoring";
                radio.setAttribute("type", "radio");
                radio.value = SCORE_TYPE[type];
                const label = document.createElement("label");
                label.setAttribute("for", id);
                label.setAttribute("data-type", "OUTLINE");
                label.classList.add(SCORE_TYPE[type], "radbox", "Button", "label", "svelte-6y8083");
                if (SCORE_TYPE[type] == SubOption.atk_percent) {
                    radio.toggleAttribute("checked", true);
                }
                baseElement.appendChild(radio);
                baseElement.appendChild(label);
            }
            cssManager.addStyle(".scoreModeRadio input { display:none }", ".scoreModeRadio label.radbox { opacity: 0.5; }", ".scoreModeRadio input:checked + label.radbox { opacity: 1; }");
        }
        localizeSelector(baseElement) {
            const localizeData = EnkaNetworkUtil.getLocalizeData();
            const labels = baseElement.getElementsByTagName("label");
            for (const label of Array.from(labels)) {
                const key = label.classList[0];
                label.innerText = localizeData.getLocaleSub(key);
            }
        }
        formatEvaluate(num) {
            return num.toFixed(1);
        }
        evaluateArtifact(artifact) {
            const selectedOption = this.selectedOption();
            const rate = STATS_OPTION_RATE.ATTACK_PERCENT /
                STATS_OPTION_RATE[selectedOption];
            let sumScore = 0;
            for (const subStat of artifact.subStats) {
                let score = 0;
                switch (subStat.statKey) {
                    case SubOption.crit_rate:
                        score = subStat.stat * 2;
                        break;
                    case SubOption.crit_dmg:
                        score = subStat.stat;
                        break;
                    case selectedOption:
                        score = subStat.stat * rate;
                        break;
                }
                sumScore += score;
            }
            return sumScore;
        }
        cardExtraText() {
            const localizeData = EnkaNetworkUtil.getLocalizeData();
            const artifacts = BuildCard.getArtifacts();
            const artifactCount = artifacts.filter((artifact) => !artifact.element.classList.contains("empty")).length;
            const selectedStat = localizeData.getLocaleSub(this.selectedOption());
            const sumScore = artifacts
                .map((artifact) => this.evaluateArtifact(artifact))
                .reduce((sum, rv) => sum + rv);
            const avgScore = sumScore / artifactCount;
            return fmt(localizeData.getLocale(LocalizeKey.scoreExtra), {
                selectStat: selectedStat,
                avgScore: this.formatEvaluate(avgScore),
                sumScore: this.formatEvaluate(sumScore),
            });
        }
        selectedOption() {
            const checked = document.querySelector(".scoreModeRadio input:checked");
            return checked?.value ?? SubOption.atk_percent;
        }
    }

    class RollValueMethod {
        constructor() {
            this.methodName = "rollValue";
            this.methodKey = LocalizeKey.rollValue;
        }
        static checkboxId(name) {
            return `RV_${name}_CHECKBOX`;
        }
        createSelector(baseElement) {
            baseElement.classList.add("rvSelectCheckbox");
            for (const statKey of Object.values(SubOption)) {
                if (statKey == SubOption.unknown)
                    continue;
                const checkboxId = RollValueMethod.checkboxId(statKey);
                const checkbox = document.createElement("input");
                checkbox.id = checkboxId;
                checkbox.name = "rollValue";
                checkbox.setAttribute("type", "checkbox");
                checkbox.value = statKey;
                const label = document.createElement("label");
                label.setAttribute("for", checkboxId);
                label.setAttribute("type", "checkbox");
                label.setAttribute("data-type", "OUTLINE");
                label.classList.add(statKey, "radbox", "Button", "label", "svelte-6y8083");
                if (statKey == SubOption.crit_rate ||
                    statKey == SubOption.crit_dmg ||
                    statKey == SubOption.atk_percent) {
                    checkbox.toggleAttribute("checked", true);
                }
                baseElement.appendChild(checkbox);
                baseElement.appendChild(label);
            }
            cssManager.addStyle(".rvSelectCheckbox input { display:none }", ".rvSelectCheckbox label.radbox { opacity: 0.5; }", ".rvSelectCheckbox input:checked + label.radbox { opacity: 1; }");
        }
        localizeSelector(baseElement) {
            const localizeData = EnkaNetworkUtil.getLocalizeData();
            const labels = baseElement.getElementsByTagName("label");
            for (const label of Array.from(labels)) {
                const key = label.classList[0];
                if (key.includes("PERCENT")) {
                    label.innerText = localizeData.getLocaleSub(key) + "%";
                }
                else {
                    label.innerText = localizeData.getLocaleSub(key);
                }
            }
        }
        formatEvaluate(num) {
            return `${num}%`;
        }
        evaluateArtifact(artifact) {
            const selectedOptions = this.selectedOptions();
            let rollValue = 0;
            for (const subStat of artifact.subStats) {
                if (selectedOptions.includes(subStat.statKey)) {
                    rollValue += subStat.rolls
                        .map((roll) => 100 - 10 * (4 - roll))
                        .reduce((sum, rv) => sum + rv);
                }
            }
            return rollValue;
        }
        cardExtraText() {
            const localizeData = EnkaNetworkUtil.getLocalizeData();
            const artifacts = BuildCard.getArtifacts();
            const selectedStats = this.selectedOptions().map((option) => {
                if (option.includes("PERCENT")) {
                    return localizeData.getLocaleSub(option) + "%";
                }
                else {
                    return localizeData.getLocaleSub(option);
                }
            });
            const sumRollValue = artifacts
                .map((artifact) => this.evaluateArtifact(artifact))
                .reduce((sum, rv) => sum + rv);
            return fmt(localizeData.getLocale(LocalizeKey.rollValueExtra), {
                selectStats: selectedStats.join(" "),
                sumRV: this.formatEvaluate(sumRollValue),
            });
        }
        selectedOptions() {
            const checkedBoxes = document.querySelectorAll(".rvSelectCheckbox input:checked");
            return Array.from(checkedBoxes).map((checked) => checked.value);
        }
    }

    class EvaluateBuildCard {
        constructor() {
            this.evaluateMethods = [];
            this.evaluateMethods.push(new ScoringMethod());
            this.evaluateMethods.push(new RollValueMethod());
        }
        createSelector() {
            if (this.evaluateMethods.length == 0)
                return;
            if (document.getElementById(EvaluationConst.SELECTOR_ROW))
                return;
            this.createEvaluationText();
            this.createExtraText();
            const cardToggles = document.getElementsByClassName("CardToggles")[0];
            const rowElement = cardToggles
                .getElementsByClassName("row")[0]
                .cloneNode(false);
            rowElement.id = EvaluationConst.SELECTOR_ROW;
            rowElement.style.marginTop = "1em";
            cardToggles.getElementsByTagName("header")[2].before(rowElement);
            const methodSelectDiv = document.createElement("div");
            methodSelectDiv.id = EvaluationConst.SELECTOR_DIV;
            methodSelectDiv.style.display = "flex";
            methodSelectDiv.style.flexDirection = "column";
            rowElement.appendChild(methodSelectDiv);
            const infoText = document.createElement("label");
            infoText.classList.add(LocalizeKey.evaluationInfo, "svelte-1jzchrt");
            methodSelectDiv.appendChild(infoText);
            const methodSelectDev = document.createElement("dev");
            methodSelectDev.style.display = "flex";
            methodSelectDev.style.flexWrap = "wrap";
            methodSelectDev.classList.add("methodRadio", EvaluationConst.METHOD_SELECTOR_SVELTE);
            methodSelectDiv.appendChild(methodSelectDev);
            for (const method of this.evaluateMethods) {
                const id = this.getMethodRadioId(method);
                methodSelectDev.appendChild(this.methodRadio(method));
                const methodModeSelect = document.createElement("dev");
                methodModeSelect.id = method.methodName;
                cssManager.addStyle(`:not(:has(#${id}:checked)) #${method.methodName} { display:none }`);
                method.createSelector(methodModeSelect);
                methodSelectDiv.appendChild(methodModeSelect);
            }
            const defaultMethodRadioId = this.getMethodRadioId(this.evaluateMethods[0]);
            document
                .getElementById(defaultMethodRadioId)
                ?.toggleAttribute("checked", true);
            cssManager.addStyle(".methodRadio input:checked ~ .toggle.svelte-1893j5:before { content: ''; border-radius: 1px; transform: scale(1); }", ".methodRadio .Checkbox.svelte-1893j5.svelte-1893j5:has(> input:checked) { opacity: 1; }");
            methodSelectDiv.addEventListener("click", () => {
                this.evaluate();
            });
        }
        localize() {
            const localizeData = EnkaNetworkUtil.getLocalizeData();
            const methodSelectDiv = document.getElementById(EvaluationConst.SELECTOR_DIV);
            if (!methodSelectDiv)
                return;
            const infoText = methodSelectDiv.children[0];
            infoText.textContent = localizeData.getLocale(infoText.classList[0]);
            for (const method of this.evaluateMethods) {
                const methodLabel = methodSelectDiv.getElementsByClassName(method.methodKey)[0];
                methodLabel.textContent = localizeData.getLocale(methodLabel.classList[0]);
                const methodModeSelect = document.getElementById(method.methodName);
                method.localizeSelector(methodModeSelect);
            }
        }
        evaluate() {
            const method = this.getSelectedMethod();
            const artifacts = BuildCard.getArtifacts();
            for (const artifact of artifacts) {
                const text = artifact.element.getElementsByClassName("evaluateText")[0];
                const evaluate = method.evaluateArtifact(artifact);
                text.textContent = method.formatEvaluate(evaluate);
            }
            const extraText = document.getElementById(EXTRA_PARAMETER_TEXT);
            extraText.textContent = method.cardExtraText();
        }
        getSelectedMethodId() {
            const checkedRadio = document.querySelector(`.methodRadio input:checked[name=${EvaluationConst.METHOD_SELECTOR_NAME}]`);
            return checkedRadio?.value ?? this.evaluateMethods[0].methodName;
        }
        getSelectedMethod() {
            const id = this.getSelectedMethodId();
            for (const method of this.evaluateMethods) {
                if (id == method.methodName)
                    return method;
            }
            return this.evaluateMethods[0];
        }
        getMethodRadioId(method) {
            return `method_${method.methodName}_radio`;
        }
        createEvaluationText() {
            const artifacts = BuildCard.getArtifacts();
            for (const artifact of Array.from(artifacts)) {
                let evaluationText = artifact.element.getElementsByClassName(EvaluationConst.EVALUATION_TEXT)[0];
                if (evaluationText)
                    continue;
                evaluationText = document.createElement("div");
                evaluationText.classList.add(EvaluationConst.EVALUATION_TEXT, EnkaNetworkUtil.getSvelteClassName(artifact.element));
                artifact.element.appendChild(evaluationText);
            }
            cssManager.addStyle(`.Artifact .${EvaluationConst.EVALUATION_TEXT}{ position: absolute; font-size: 0.7em; opacity: 0.6; right: 0.3em; }`);
        }
        createExtraText() {
            const sections = BuildCard.getBuildCardSections();
            if (document.getElementById(EXTRA_PARAMETER_TEXT))
                return;
            const extraParameter = document.createElement("div");
            extraParameter.id = EXTRA_PARAMETER_TEXT;
            extraParameter.style.right = "0.3em";
            extraParameter.style.marginTop = "-0.5em";
            extraParameter.style.textAlign = "right";
            extraParameter.style.fontSize = "0.8em";
            extraParameter.style.whiteSpace = "nowrap";
            sections.right.appendChild(extraParameter);
        }
        methodRadio(method) {
            const id = this.getMethodRadioId(method);
            const baseLabel = document.createElement("label");
            baseLabel.style.marginTop = "0em";
            baseLabel.classList.add("Checkbox", "Control", "sm", EvaluationConst.METHOD_SELECTOR_SVELTE);
            const radio = document.createElement("input");
            radio.id = id;
            radio.name = EvaluationConst.METHOD_SELECTOR_NAME;
            radio.value = method.methodName;
            radio.style.display = "none";
            radio.setAttribute("type", "radio");
            const toggle = document.createElement("div");
            toggle.classList.add("toggle", EvaluationConst.METHOD_SELECTOR_SVELTE);
            const methodNameBase = document.createElement("span");
            methodNameBase.classList.add("info", EvaluationConst.METHOD_SELECTOR_SVELTE);
            const methodName = document.createElement("span");
            methodName.classList.add(method.methodKey, "label", EvaluationConst.METHOD_SELECTOR_SVELTE);
            methodNameBase.appendChild(methodName);
            baseLabel.appendChild(radio);
            baseLabel.appendChild(toggle);
            baseLabel.appendChild(methodNameBase);
            return baseLabel;
        }
    }

    class LocalizeWeapon {
        constructor() {
            this.element = BuildCard.getWeapon();
        }
        format() {
            const weaponImage = this.element.getElementsByTagName("figure")[0];
            weaponImage.style.width = "30%";
            const weaponInfo = this.element.getElementsByClassName("weapon-caption")[0];
            weaponInfo.style.paddingRight = "0%";
            const weaponSub = this.element.getElementsByClassName("sub")[0];
            weaponSub.style.display = "flex";
            if (weaponSub.getElementsByClassName("sep").length <= 0) {
                const refine = weaponSub.firstElementChild;
                refine.after(EnkaNetworkUtil.getSeparateElement());
            }
            const subStats = this.element.getElementsByClassName("Substat");
            for (const subStat of Array.from(subStats)) {
                EnkaNetworkUtil.addStatTextElement(subStat);
                subStat.style.display = "flex";
                subStat.style.alignItems = "center";
                subStat.style.marginRight = "0%";
                subStat.style.marginBottom = "1%";
                subStat.style.paddingTop = "3%";
            }
        }
        localize() {
            const localizeData = EnkaNetworkUtil.getLocalizeData();
            const statTexts = this.element.getElementsByClassName("statText");
            const baseAtkStatText = statTexts[0];
            baseAtkStatText.textContent = localizeData.getLocale(LocalizeKey.base_atk);
            const subStatText = statTexts[1];
            if (subStatText instanceof HTMLElement) {
                const subStat = subStatText.parentElement;
                subStatText.textContent = localizeData.getLocale(subStat.classList[1]);
            }
        }
    }

    class LocalizeArtifact {
        constructor() {
            this.artifacts = [];
            this.artifacts = BuildCard.getArtifacts();
        }
        format() {
            for (const artifact of this.artifacts) {
                if (artifact.element.classList.contains("empty"))
                    continue;
                const mainStat = artifact.element.getElementsByClassName("mainstat")[0];
                EnkaNetworkUtil.addStatTextElement(mainStat, false);
                const subStats = artifact.element.getElementsByClassName("Substat");
                for (const subStat of Array.from(subStats)) {
                    const statText = EnkaNetworkUtil.addStatTextElement(subStat);
                    statText.classList.add("sub");
                }
            }
            const svelte = EnkaNetworkUtil.getSvelteClassName(this.artifacts[0].element);
            cssManager.addStyle(`.Artifact.${svelte} canvas.ArtifactIcon { top: -37%; left: -6%; width: 28%; }`, `.substats.${svelte} > .Substat { display: flex; align-items: center; padding-right: 1.0em; white-space: nowrap; }`, `.mainstat.${svelte} > div.${svelte}:nth-child(1) { display: flex; align-items: center; top: 5%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; justify-content: flex-end; align-self: unset; margin-left: unset;}`, `.mainstat.${svelte} > div.${svelte}:nth-child(2) { padding: 4% 0%; }`, `.mainstat.${svelte} > div.${svelte}:nth-child(3) { max-height: 25% }`);
        }
        localize() {
            for (const artifact of this.artifacts) {
                if (artifact.element.classList.contains("empty"))
                    continue;
                const mainStat = artifact.element.getElementsByClassName("mainstat")[0];
                this.inputLocalize(mainStat);
                const subStats = artifact.element.getElementsByClassName("Substat");
                for (const subStat of Array.from(subStats)) {
                    this.inputLocalize(subStat);
                }
            }
        }
        inputLocalize(parentElement) {
            const localizeData = EnkaNetworkUtil.getLocalizeData();
            const statText = parentElement.getElementsByClassName("statText")[0];
            if (!statText)
                return;
            const statKey = parentElement.classList[1] ?? "UNKNOWN";
            statText.innerText = this.isSubStat(statText)
                ? localizeData.getLocaleSub(statKey)
                : localizeData.getLocale(statKey);
        }
        isSubStat(element) {
            return element.classList.contains("sub");
        }
    }

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

    class LocalizeTimeStamp {
        constructor() { }
        format() {
            const sections = BuildCard.getBuildCardSections();
            if (document.getElementById(TIME_STAMP))
                return;
            const timeStamp = document.createElement("div");
            timeStamp.id = TIME_STAMP;
            timeStamp.innerText = "";
            timeStamp.style.fontSize = "60%";
            timeStamp.style.opacity = "0.4";
            sections.left.firstChild?.after(timeStamp);
            sections.left.style.paddingTop = "0.8%";
        }
        localize() {
            const timeStamp = document.getElementById(TIME_STAMP);
            if (timeStamp instanceof HTMLElement) {
                const date = new Date();
                const timeString = getFormattedDate(date, "yyyy-MM-dd hh:mm:ss");
                timeStamp.textContent = `v${VERSION}TE ${timeString}`;
            }
        }
    }

    class LocalizeFriendship {
        constructor() { }
        format() {
            const buildCard = BuildCard.getBuildCard();
            const friend = buildCard.getElementsByClassName("fren")[0];
            if (friend instanceof HTMLElement) {
                const friendText = EnkaNetworkUtil.addStatTextElement(friend, false);
                friendText.style.marginRight = "0.3em";
            }
        }
        localize() {
            const localizeData = EnkaNetworkUtil.getLocalizeData();
            const buildCard = BuildCard.getBuildCard();
            const friend = buildCard.getElementsByClassName("fren")[0];
            if (friend instanceof HTMLElement) {
                const statText = friend.firstChild;
                statText.textContent = localizeData.getLocale(LocalizeKey.friend);
            }
        }
    }

    class LocalizeBuildCardFacade {
        constructor() {
            this.localizeList = [];
            this.localizeList.push(new LocalizeTimeStamp());
            this.localizeList.push(new LocalizeFriendship());
            this.localizeList.push(new LocalizeArtifact());
            this.localizeList.push(new LocalizeWeapon());
        }
        format() {
            const sections = BuildCard.getBuildCardSections();
            sections.left.style.width = "36%";
            sections.middle.style.width = "24%";
            sections.middle.style.left = "34%";
            sections.right.style.width = "43%";
            this.localizeList.forEach((localize) => localize.format());
        }
        localize() {
            this.localizeList.forEach((localize) => localize.localize());
        }
    }

    var EnkaNetworkObserver;
    (function (EnkaNetworkObserver) {
        const enkaNetworkObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                let element = mutation.target;
                if (element.nodeName == "#text") {
                    element = element.parentElement;
                }
                if (element.classList.contains("Card") ||
                    element.classList.contains("name") ||
                    element.classList.contains("Dropdown-selectedItem") ||
                    element.classList.contains("Tab") ||
                    element.classList.contains("svelte-grjiuv")) {
                    const localizeBuildCard = new LocalizeBuildCardFacade();
                    const evaluateBuildCard = new EvaluateBuildCard();
                    localizeBuildCard.format();
                    evaluateBuildCard.createSelector();
                    localizeBuildCard.localize();
                    evaluateBuildCard.localize();
                    evaluateBuildCard.evaluate();
                    break;
                }
            }
        });
        function active() {
            enkaNetworkObserver.observe(document, {
                childList: true,
                characterData: true,
                subtree: true,
            });
        }
        EnkaNetworkObserver.active = active;
    })(EnkaNetworkObserver || (EnkaNetworkObserver = {}));

    function init() {
        if (isIOS()) {
            cssManager.addStyle(".statText { font-weight: bold; font-size: 95%; }");
        }
        else {
            cssManager.addStyle(".statText { font-weight: bold; font-size: 100%; }");
        }
        EnkaNetworkObserver.active();
    }
    init();

})();
