// ==UserScript==
// @name         Enka.Network_lang-jp_mod_by_takenoko
// @namespace    http://tampermonkey.net/
// @version      1.0.2
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
        static get instance() {
            if (!this._instance) {
                this._instance = new TranslateKey2Word();
            }
            return this._instance;
        }
        updatedLocate() {
            const locale = getLocale();
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

    const VERSION = "v1.0.2";
    const BASE_ATK_CLASS = "BASE_ATTACK";
    const TIME_STAMP = "timeStamp";
    const SCORE_SELECT_DIV = "scoreSelectDiv";
    const SCORE_RADIO_NAME = "sSource";
    const optionLocale = TranslateKey2Word.instance;
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

    function characterStats() {
        const charaStatsTable = document.getElementsByClassName("StatsTable")[0];
        const statsList = Array.from(charaStatsTable.children).filter((row) => Array.from(row.classList).indexOf("row") !== -1);
        return statsList;
    }
    function characterStatRow(key) {
        const statsList = characterStats();
        const index = statsList.map((stat) => stat.classList[1]).indexOf(key);
        if (index === -1)
            return null;
        return statsList[index];
    }
    function characterStat(key) {
        const statRow = characterStatRow(key);
        if (!statRow)
            return 0;
        const stat = statRow.children[1].children[2].innerText;
        return Number(stat.replace(/[^0-9.-]/g, ""));
    }

    function fmt(template, values) {
        if (!values)
            return template;
        const format = new Function(...Object.keys(values), `return \`${template}\`;`);
        return format(...Object.values(values).map((value) => value ?? ""));
    }

    var _scoreType_id$1, _scoreType_key$1, _scoreType_correction$1;
    let scoreType$1 = class scoreType {
        constructor(id, key, correction) {
            _scoreType_id$1.set(this, void 0);
            _scoreType_key$1.set(this, void 0);
            _scoreType_correction$1.set(this, void 0);
            __classPrivateFieldSet(this, _scoreType_id$1, id, "f");
            __classPrivateFieldSet(this, _scoreType_key$1, key, "f");
            __classPrivateFieldSet(this, _scoreType_correction$1, correction, "f");
        }
        get id() {
            return __classPrivateFieldGet(this, _scoreType_id$1, "f");
        }
        get key() {
            return __classPrivateFieldGet(this, _scoreType_key$1, "f");
        }
        get correction() {
            return __classPrivateFieldGet(this, _scoreType_correction$1, "f");
        }
    };
    _scoreType_id$1 = new WeakMap(), _scoreType_key$1 = new WeakMap(), _scoreType_correction$1 = new WeakMap();
    const SCORE_TYPES = {
        HP: new scoreType$1("H", "HP_PERCENT", 1),
        ATTACK: new scoreType$1("A", "ATTACK_PERCENT", 1),
        DEFENSE: new scoreType$1("D", "DEFENSE_PERCENT", 0.8),
        EM: new scoreType$1("EM", "ELEMENT_MASTERY", 0.25),
    };
    class SelectScoreType {
        static get instance() {
            if (!this._instance) {
                this._instance = new SelectScoreType();
            }
            return this._instance;
        }
        getScoreType() {
            const checkedRadio = document.querySelector(`input:checked[name=${SCORE_RADIO_NAME}]`);
            return checkedRadio?.value ?? SCORE_TYPES.ATTACK.key;
        }
        createText() {
            const cardToggles = document.getElementsByClassName("CardToggles")[0];
            if (document.getElementById("scoreSelectRow"))
                return;
            const rowElement = cardToggles
                .getElementsByClassName("row")[0]
                .cloneNode(false);
            rowElement.id = "scoreSelectRow";
            cardToggles.getElementsByTagName("header")[2].before(rowElement);
            const scoreSelectClass = "SCORE_SELECT_INFO";
            const infoText = document.createElement("label");
            infoText.classList.add(scoreSelectClass, "svelte-1jzchrt");
            const scoreSelectDiv = document.createElement("div");
            scoreSelectDiv.id = SCORE_SELECT_DIV;
            scoreSelectDiv.classList.add("Input", "svelte-1jzchrt");
            const scoreModeGroup = document.createElement("group");
            scoreModeGroup.style.marginTop = "-1em";
            scoreModeGroup.classList.add("inline_radio");
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
                label.classList.add(scoreType.key, "radbox", "Button", "label", "svelte-1gbd2i6");
                scoreModeGroup.appendChild(radio);
                scoreModeGroup.appendChild(label);
            }
            scoreSelectDiv.appendChild(infoText);
            scoreSelectDiv.appendChild(scoreModeGroup);
            rowElement.appendChild(scoreSelectDiv);
            const atkRadioId = `SCORE_${SCORE_TYPES.ATTACK.id}_R`;
            document.getElementById(atkRadioId)?.toggleAttribute("checked", true);
            const radioStyle = [
                '.inline_radio input[type="radio"] { position: absolute; opacity: 0; }',
                '.inline_radio label.radbox[type="radio"] { color: rgba(255,255,255,.5); }',
                '.inline_radio input[type="radio"]:checked + label.radbox[type="radio"] { color: rgba(255,255,255,1); }',
            ];
            cssManager.addStyle(...radioStyle);
        }
        writeText() {
            const scoreSelectDiv = document.getElementById(SCORE_SELECT_DIV);
            if (!scoreSelectDiv)
                return;
            const scoreSelectInfo = scoreSelectDiv.children[0];
            scoreSelectInfo.innerText = optionLocale.getLocale(scoreSelectInfo.classList[0]);
            const scoreButtons = scoreSelectDiv.getElementsByClassName("Button");
            for (const label of Array.from(scoreButtons)) {
                label.innerText = optionLocale.getLocaleSub(label.classList[0]);
            }
        }
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
    class ArtifactScoring {
        static get instance() {
            if (!this._instance) {
                this._instance = new ArtifactScoring();
            }
            return this._instance;
        }
        calcArtifactScore(artifact) {
            let score = 0;
            if (artifact.classList.contains("empty"))
                return score;
            const subStat = Array.from(artifact.getElementsByClassName("Substat"));
            const subStatName = subStat.map((sub) => sub.classList[1]);
            const subStatAmount = subStat.map((sub) => sub.lastChild.innerText.replace(/[^0-9.]/g, ""));
            const subLen = subStat.length;
            const scoreH = SelectScoreType.instance.getScoreType();
            for (let i = 0; i < subLen; i++) {
                const key = subStatName[i];
                switch (key) {
                    case "CRITICAL":
                        score += Number(subStatAmount[i]) * 2;
                        break;
                    case "CRITICAL_HURT":
                        score += Number(subStatAmount[i]);
                        break;
                    default:
                        for (const typeKey in SCORE_TYPE) {
                            const scoreType = SCORE_TYPE[typeKey];
                            if (key != scoreType.key)
                                continue;
                            if (scoreH != scoreType.id)
                                continue;
                            score +=
                                Number(subStatAmount[i]) * scoreType.correction;
                            break;
                        }
                }
            }
            return score;
        }
        getExtraText(ratio, scoreType, avgScore, score) {
            const ratioFixed = ratio.toFixed(1);
            const avgScoreFixed = avgScore.toFixed(1);
            const scoreFixed = score.toFixed(1);
            return fmt(optionLocale.getLocale("CARD_EXTRA_INFO"), {
                critRatio: ratioFixed,
                scoreType: scoreType,
                avgScore: avgScoreFixed,
                sumScore: scoreFixed,
            });
        }
        createText() {
            const artifacts = document.getElementsByClassName("Artifact");
            for (const artifact of Array.from(artifacts)) {
                let scoreBox = artifact.getElementsByClassName("artifactScoreText")[0];
                if (scoreBox)
                    continue;
                scoreBox = document.createElement("div");
                scoreBox.classList.add("artifactScoreText", "svelte-1ujofp1");
                artifact.appendChild(scoreBox);
            }
            if (document.getElementById("extraData"))
                return;
            const artifactSection = document.getElementsByClassName("section")[2];
            if (!artifactSection)
                return;
            const exParam = document.createElement("div");
            exParam.id = "extraData";
            exParam.style.right = "0.3em";
            exParam.style.marginTop = "-0.5em";
            exParam.style.textAlign = "right";
            exParam.style.fontSize = "0.8em";
            exParam.classList.add("svelte-17qi811");
            artifactSection.appendChild(exParam);
            const cssStyle = [
                ".Artifact > .artifactScoreText{ position: absolute; font-size: 0.7em; opacity: 0.6; right: 0.3em; }"
            ];
            cssManager.addStyle(...cssStyle);
        }
        writeText() {
            let sumScore = 0;
            let avgScore = 0;
            const scoreBoxes = document.getElementsByClassName("artifactScoreText");
            const extraText = document.getElementById("extraData");
            for (const scoreBox of Array.from(scoreBoxes)) {
                let score = 0.0;
                const artifact = scoreBox.parentElement;
                if (!artifact)
                    continue;
                score = this.calcArtifactScore(artifact);
                scoreBox.textContent = score.toFixed(1);
                sumScore += score;
            }
            avgScore = sumScore / 5;
            const critRate = characterStat("CRITICAL");
            const critDMG = characterStat("CRITICAL_HURT");
            const critRatio = critDMG / critRate;
            let type = "";
            const scoreH = SelectScoreType.instance.getScoreType();
            for (const typeKey in SCORE_TYPE) {
                const scoreType = SCORE_TYPE[typeKey];
                if (scoreH != scoreType.id)
                    continue;
                type = optionLocale.getLocaleSub(scoreType.key);
                break;
            }
            if (!extraText)
                return;
            extraText.textContent = this.getExtraText(critRatio, type, avgScore, sumScore);
        }
    }

    function innerOptionText(statElement, isSub = false) {
        const statText = statElement?.getElementsByClassName("statText")[0];
        if (!statText)
            return null;
        const optionKey = statElement?.classList[1];
        statText.innerText = (isSub)
            ? optionLocale.getLocaleSub(optionKey)
            : optionLocale.getLocale(optionKey);
        return statText;
    }

    class Artifact {
        constructor() {
            this.artifacts = document.getElementsByClassName("Artifact");
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new Artifact();
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
    }

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
            friendText.innerText = optionLocale.getLocale(friendClassName);
        }
    }

    class CreateWriteManager {
        constructor() {
            this.createList = [];
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new CreateWriteManager();
            }
            return this._instance;
        }
        init() {
            this.createList.push(DateText.instance);
            this.createList.push(Friend.instance);
            this.createList.push(SelectScoreType.instance);
            this.createList.push(Weapon.instance);
            this.createList.push(Artifact.instance);
            this.createList.push(ArtifactScoring.instance);
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
    function main() {
        cardObserver.disconnect();
        if (isIOS()) {
            cssManager.addStyle(".statText { font-weight: bold; font-size: 95%; }");
        }
        else {
            cssManager.addStyle(".statText { font-weight: bold; font-size: 100%; }");
        }
        const cssStyle = [
            ".substats.svelte-17qi811 > .Substat { display: flex; align-items: center; padding-right: 1.0em; white-space: nowrap; }",
            ".Artifact.svelte-17qi811 .ArtifactIcon { top: -37%; left: -6%; width: 28%; }",
            ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(1) { display: flex; align-items: center; top: 5%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; justify-content: flex-end; align-self: unset; margin-left: unset;}",
            ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(2) { padding: 4% 0%; }",
            ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(3) { max-height: 25% }",
        ];
        cssManager.addStyle(...cssStyle);
        const cardSection = document.getElementsByClassName("section");
        cardSection[0].style.width = "36%";
        cardSection[1].style.width = "24%";
        cardSection[1].style.left = "34%";
        cardSection[2].style.width = "43%";
        const cwManager = CreateWriteManager.instance;
        cwManager.init();
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
        document.getElementsByName(SCORE_RADIO_NAME).forEach(function (e) {
            e.addEventListener("click", function () {
                cwManager.writeText();
            });
        });
    }

})();
