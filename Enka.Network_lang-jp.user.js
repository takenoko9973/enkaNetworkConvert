// ==UserScript==
// @name         Enka.Network_lang-jp_mod_by_takenoko
// @description  Enka.Network ���{�ꉻ�X�N���v�g
// @namespace    http://tampermonkey.net/
// @version      0.42
// @author       Takenoko-ya
// @match        https://enka.network/u/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shinshin.moe
// @grant        none
// @updateURL    https://github.com/takenoko9973/enkaNetworkConvert/raw/master/Enka.Network_lang-jp.user.js
// @downloadURL  https://github.com/takenoko9973/enkaNetworkConvert/raw/master/Enka.Network_lang-jp.user.js
// @supportURL   https://github.com/takenoko9973/enkaNetworkConvert
// @since        0.42T require�o�R���ƃL���b�V�������l�Ȃ̂ō폜 class���ύX�ɑΉ�
// @since        0.41T �X�R�A�I���̃{�^���̔z�u��ύX �h��I���̎��A�h��%��0.8�̕␳���|����悤��
// @since        0.40T enka.network�̃A�b�v�f�[�g�ɑΉ�
// @since        0.31T ���╨��5���� �܂��� �T�uOP��4�������܂��Ă��Ȃ��Ƃ��ɐ���ɕ\������Ȃ��s����C�� ��l����I�������Ƃ��A�D���x�����ŃG���[����������s��C��
// @since        0.30T �p��\���Ή�
// @since        0.21T URL�̏C��
// @since        0.20T �R�[�h�𐮗� �I�v�V�����l�̕\���ʒu���E�[�ɌŒ� �f�U�C���̒��� ���╨�摜�̃T�C�Y�𒲐� ����UID����͂����ہAusername�����X�V����Ȃ��s����C��
// ==/UserScript==
/*
* python��C#��format���\�b�h�I�ȋ@�\������
*/
String.prototype.format = function () {
    let formatted = this;
    for (let arg in arguments) {
        formatted = formatted.replaceAll("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

/**
 * �v�f��xPath�Ŏw��
 * @param expression xPath
 * @param parentElement �e�ƂȂ�v�f (�f�t�H���g��document)
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

    CONVERT_TEXT = {
        BASE_ATK: {
            key: "BASE_ATK",
            [LANGUAGE.EN]: "Base ATK",
            [LANGUAGE.JA]: "��b�U����",
        },
        HP: {
            key: "HP",
            [LANGUAGE.EN]: "HP",
            [LANGUAGE.JA]: "HP",
        },
        HP_P: {
            key: "HP_PERCENT",
            [LANGUAGE.EN]: "HP",
            [LANGUAGE.JA]: "HP",
        },
        ATK: {
            key: "ATTACK",
            [LANGUAGE.EN]: "ATK",
            [LANGUAGE.JA]: "�U����",
        },
        ATK_P: {
            key: "ATTACK_PERCENT",
            [LANGUAGE.EN]: "ATK",
            [LANGUAGE.JA]: "�U����",
        },
        DEF: {
            key: "DEFENSE",
            [LANGUAGE.EN]: "DEF",
            [LANGUAGE.JA]: "�h���",
        },
        DEF_P: {
            key: "DEFENSE_PERCENT",
            [LANGUAGE.EN]: "DEF",
            [LANGUAGE.JA]: "�h���",
        },
        CRIT_RATE: {
            key: "CRITICAL",
            [LANGUAGE.EN]: "CRIT Rate",
            [LANGUAGE.JA]: "��S��",
        },
        CRIT_DMG: {
            key: "CRITICAL_HURT",
            [LANGUAGE.EN]: "CRIT DMG",
            [LANGUAGE.JA]: "��S�_���[�W",
            sub: {
                [LANGUAGE.JA]: "��S�_��",
            }
        },
        EM: {
            key: "ELEMENT_MASTERY",
            [LANGUAGE.EN]: "Elemental Mastery",
            [LANGUAGE.JA]: "���f�n�m",
            sub: {
                [LANGUAGE.EN]: "EM",
            }
        },
        ENERGY_RECHARGE: {
            key: "CHARGE_EFFICIENCY",
            [LANGUAGE.EN]: "Energy Recharge",
            [LANGUAGE.JA]: "���f�`���[�W",
            sub: {
                [LANGUAGE.EN]: "ER",
                [LANGUAGE.JA]: "���f�`��",
            }
        },
        CRYO: {
            key: "ICE_ADD_HURT",
            [LANGUAGE.EN]: "Cryo DMG",
            [LANGUAGE.JA]: "�X���f�_���[�W",
        },
        ANEMO: {
            key: "WIND_ADD_HURT",
            [LANGUAGE.EN]: "Anemo DMG",
            [LANGUAGE.JA]: "�����f�_���[�W",
        },
        ELECTRO: {
            key: "ELEC_ADD_HURT",
            [LANGUAGE.EN]: "Electro DMG",
            [LANGUAGE.JA]: "�����f�_���[�W",
        },
        HYDRO: {
            key: "WATER_ADD_HURT",
            [LANGUAGE.EN]: "Hydro DMG",
            [LANGUAGE.JA]: "�����f�_���[�W",
        },
        PYRO: {
            key: "FIRE_ADD_HURT",
            [LANGUAGE.EN]: "Pyro DMG",
            [LANGUAGE.JA]: "�����f�_���[�W",
        },
        DENDRO: {
            key: "GRASS_ADD_HURT",
            [LANGUAGE.EN]: "Dendro DMG",
            [LANGUAGE.JA]: "�����f�_���[�W",
        },
        GEO: {
            key: "ROCK_ADD_HURT",
            [LANGUAGE.EN]: "Geo DMG",
            [LANGUAGE.JA]: "�⌳�f�_���[�W",
        },
        PHYS: {
            key: "PHYSICAL_ADD_HURT",
            [LANGUAGE.EN]: "Physical DMG",
            [LANGUAGE.JA]: "�����_���[�W",
        },
        HEAL_BNS: {
            key: "HEAL_ADD",
            [LANGUAGE.EN]: "Healing Bonus",
            [LANGUAGE.JA]: "�^���鎡������",
        },
        FRIEND: {
            key: "FRIEND",
            [LANGUAGE.EN]: "Friendship",
            [LANGUAGE.JA]: "�D���x",
        },
        SCORE_SELECT: {
            key: "SCORE_SELECT",
            [LANGUAGE.EN]: "Score type",
            [LANGUAGE.JA]: "�X�R�A�v�Z���@",
        },
        UNKNOWN: {
            key: "UNKNOWN",
            [LANGUAGE.EN]: "Unknown",
            [LANGUAGE.JA]: "�s��",
        }
    }

    getStatByClassName(className) {
        var array = Object.keys(this.CONVERT_TEXT).map((k) => (this.CONVERT_TEXT[k]));

        return array.find((s) => s.key === className);
    }

    getStatName(language, className, isSub) {
        // �Ή����Ă��Ȃ�����Ȃ�΁A�p��ɋ����I�ɕύX
        if (!(language in LANGUAGE)) language = LANGUAGE.EN;

        let stat = this.getStatByClassName(className);
        if (!stat) return this.CONVERT_TEXT.UNKNOWN[language];
        if (!isSub) return stat[language];

        // �T�u�X�e�[�^�X���̓���
        if (!("sub" in stat)) return stat[language];
        if (!(language in stat["sub"])) return stat[language];

        return stat["sub"][language];
    }

    getClassName(key) {
        if (key in this.CONVERT_TEXT) return this.CONVERT_TEXT[key].key;

        return this.CONVERT_TEXT["UNKNOWN"].key;
    }
}
(() => {
    'use strict';
    const version = "v0.42";

    const $doc = document;
    const $weapon = $doc.getElementsByClassName("Weapon");
    const $charaStats = $doc.getElementsByClassName("StatsTable");
    const $artifact = $doc.getElementsByClassName("Artifact");

    const converterInstance = new EnkaConverter();

    const BASE_ATK_CLASS = converterInstance.CONVERT_TEXT.BASE_ATK.key;
    const TIME_STAMP = "timeStamp"

    // �X�R�A�v�Z��w�� H:HP, A:�U����, D:�h���
    const SCORE_RADIO_NAME = "sSource"
    let $scoreSelectDiv = null;
    const SCORE_TYPE = {
        HP: "H",
        ATTACK: "A",
        DEFENSE: "D",
    }
    let scoreH = SCORE_TYPE.ATTACK;


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
     * �\�������Ă���v���C���[��UID�Ɩ��O���擾
     */
    function getPlayerInfo() {
        const playerUID = location.pathname.split("/")[2]; // url����UID���擾
        const $playerInfo = $doc.getElementsByClassName("PlayerInfo")[0];
        const playerName = $playerInfo.getElementsByTagName("h1")[0].innerText; // �v���C���[�����擾

        return [playerUID, playerName];
    }

    /**
     * �L�����N�^�[�̍��v�X�e�[�^�X���擾
     */
    function getCharacterStats(key) {
        let index = -1;
        const $statsList = $charaStats[0].children;
        if ((index = Array.from($statsList).map(stat => stat.classList[1]).indexOf(key)) === -1) return 0;

        const stat = $statsList[index].children[1].children[2].innerText;
        return Number(stat.replace(/[^0-9.]/g, ''));
    }

    /**
     * ���╨�𑕔����Ă��邩�ǂ���
     */
    function isEquippingArtifact(index) {
        if (index < 0 || 4 < index) return false;

        return Array.from($artifact[index].classList).indexOf("empty") === -1;
    }

    // �]���p�v�f��Ԃ�
    function getSeparateElement() {
        const $separateElement = $doc.createElement("span");
        $separateElement.classList.add("sep");

        return $separateElement;
    }

    function createConvertTextElements() {
        // �D���x
        const $friend = $doc.getElementsByClassName("fren")[0];
        if ($friend) {
            // �A�C�R���p�̌��Ԃ��폜
            const $icon = $friend.getElementsByClassName("ShadedSvgIcon")[0];
            $icon.style.width = "0";

            const friendClassName = converterInstance.CONVERT_TEXT.FRIEND.key;
            if (!$friend.getElementsByClassName(friendClassName)[0]) {
                const $frenText = $doc.createElement("span");
                $frenText.classList.add(friendClassName, "svelte-1cfvxg7");
                $frenText.style.cssText = "width:auto; height:auto; font-size:1em; font-weight:bold";
                $friend.prepend($frenText);
            }
        }

        // �T�u�X�e�[�^�X�p�̃e�L�X�g���̍쐬
        const $statText = $doc.createElement("div");
        $statText.classList.add("svelte-1ut2kb8");
        $statText.style.fontWeight = "bold";

        // ����
        const $weaponInfo = $weapon[0].getElementsByTagName("content")[0];
        const $subStat = $weaponInfo.getElementsByClassName("Substat");

        const baseAtkClass = converterInstance.CONVERT_TEXT.BASE_ATK.key;
        if (!$doc.getElementById(baseAtkClass)) {
            const $baseAtk = $statText.cloneNode(true);
            $baseAtk.id = baseAtkClass;
            $baseAtk.classList.add(baseAtkClass);
            $subStat[0].prepend(getSeparateElement());
            $subStat[0].prepend($baseAtk);
        }

        // �T�u�X�e�����邩�ǂ�������
        if ($subStat[1]) {
            if (!$doc.getElementById("weaponSubOP")) {
                const $subOPName = $statText.cloneNode(true);
                $subOPName.id = "weaponSubOP";
                $subStat[1].prepend(getSeparateElement());
                $subStat[1].prepend($subOPName);
            }
        }

        // ���╨
        for (let i = 0; i < 5; i++) {
            if (!isEquippingArtifact(i)) continue;

            // ���C��OP
            const $mainStat = $artifact[i].getElementsByClassName("mainstat")[0];
            if (!$doc.getElementById("artifactMain" + i)) {
                const $mainOPName = $statText.cloneNode(true);
                $mainOPName.id = "artifactMain" + i;
                $mainStat.prepend(getSeparateElement());
                $mainStat.prepend($mainOPName);
            }

            // �T�uOP
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

            // �X�R�A�\��
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
        $cardToggles.getElementsByClassName("Input")[0].parentNode.after($rowElement);  // �J�[�h�I�v�V�����̉��ɍ쐬

        const radioStyle = [
            '.inline_radio input[type="radio"] { position: absolute; opacity: 0; }',  // �`�F�b�N�{�b�N�X���B��
            '.inline_radio label.radbox[type="radio"] { color: rgba(255,255,255,.5);}',  // ���i�͔���
            '.inline_radio input[type="radio"]:checked + label.radbox[type="radio"] { color: rgba(255,255,255,1); border-color: rgba(255,255,255,1); }'  // �I�����Ă���{�^��������
        ];
        const $style = $doc.createElement("style");
        $style.innerHTML = radioStyle.join(" ");
        $doc.querySelector("head").append($style);

        // �X�R�A�I�𗓂��쐬
        $scoreSelectDiv = $doc.createElement("div");
        $scoreSelectDiv.classList.add("Input", "svelte-nsdlaj");

        // �����e�L�X�g��ǉ�
        const $text = $doc.createElement("label");
        $text.classList.add("SCORE_SELECT", "svelte-nsdlaj");
        $text.cssStyle = "margin-left: 0.5em;";

        // �v�Z���@�ύX�p�{�^��
        const $scoreModeGroup = $doc.createElement("group");
        $scoreModeGroup.classList.add("inline_radio");

        // �{�^���̍쐬
        const keys = Object.keys(SCORE_TYPE);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const id = "SCORE_{0}_R".format(key);

            // �{�^��
            const $radio = $doc.createElement("input");
            $radio.id = id;
            $radio.name = SCORE_RADIO_NAME;
            $radio.setAttribute("type", "radio");
            $radio.value = SCORE_TYPE[key];

            // ���x�� (�{�^���ƃ����N������)
            const $label = $doc.createElement("label");
            $label.setAttribute("for", id);
            $label.setAttribute("type", "radio");
            $label.setAttribute("data-type", "OUTLINE");
            $label.setAttribute("data-variant", "HALF");
            $label.style.marginTop = "0em";
            $label.classList.add(key, "radbox", "Button", "svelte-1dpa14o", "label");

            $scoreModeGroup.appendChild($radio);
            $scoreModeGroup.appendChild($label);
        }
        $scoreSelectDiv.appendChild($text);
        $scoreSelectDiv.appendChild($scoreModeGroup);
        $rowElement.appendChild($scoreSelectDiv);

        // �U�����f�t�H���g�ɂ���
        const atkRadioId = $scoreSelectDiv.getElementsByClassName("ATTACK")[0].getAttribute("for");
        $doc.getElementById(atkRadioId).checked = true;

        // �X�R�A�]���ΏەύX���ɔ���
        $doc.getElementsByName(SCORE_RADIO_NAME).forEach((function (e) {
            e.addEventListener("click", (function () {
                scoreH = $doc.querySelector("input:checked[name={0}]".format(SCORE_RADIO_NAME)).value;
                enkaConvertStat();
            }))
        }));
    }

    // ����I�v�V�����̓��{�ꉻ
    function weaponOPConvert() {
        const $subStat = $weapon[0].getElementsByClassName("Substat");

        const $baseAtk = $doc.getElementById(BASE_ATK_CLASS);
        if ($baseAtk) $baseAtk.innerText = getConvertStatName(BASE_ATK_CLASS);

        const $weaponSub = $doc.getElementById("weaponSubOP");
        if ($weaponSub) $weaponSub.innerText = getConvertStatName($subStat[1].classList[1]);
    }

    // ���╨�̓��{�ꉻ
    function artifactConvert() {
        for (let i = 0; i < 5; i++) {
            // ���╨��t���Ă��Ȃ��ꍇ�A�X�L�b�v
            if (!isEquippingArtifact(i)) continue;

            // ���C��OP
            const $mainStat = $artifact[i].getElementsByClassName("mainstat")[0];
            $doc.getElementById("artifactMain" + i).innerText = getConvertStatName($mainStat.classList[1])

            // �T�uOP
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
 * ���╨�̃X�R�A���v�Z
 */
    function calcArtifactScore(index) {
        let score = 0;
        if (!isEquippingArtifact(index)) return score;

        const $subStat = Array.from($artifact[index].getElementsByClassName("Substat"));
        const $subStatName = $subStat.map(sub => sub.classList[1]);
        const $subStatAmount = $subStat.map(sub => sub.lastChild.innerText.replace(/[^0-9.]/g, ''));
        const subLen = $subStat.length;

        for (let i = 0; i < subLen; i++) {
            switch ($subStatName[i]) {
                case converterInstance.CONVERT_TEXT.CRIT_RATE.key:
                    score += Number($subStatAmount[i]) * 2;
                    break;
                case converterInstance.CONVERT_TEXT.CRIT_DMG.key:
                    score += Number($subStatAmount[i]);
                    break;
                case converterInstance.CONVERT_TEXT.HP_P.key:
                    if (scoreH !== SCORE_TYPE.HP) break;
                    score += Number($subStatAmount[i]);
                    break;
                case converterInstance.CONVERT_TEXT.ATK_P.key:
                    if (scoreH !== SCORE_TYPE.ATTACK) break;
                    score += Number($subStatAmount[i]);
                    break;
                case converterInstance.CONVERT_TEXT.DEF_P.key:
                    if (scoreH !== SCORE_TYPE.DEFENSE) break;
                    score += Number($subStatAmount[i]) * 0.8;
                    break;
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
                return "��S���_���� 1:{0} / ���╨�X�R�A({1}) ����:{2} ���v:{3}";
            default:
                return "Crit Ratio 1:{0} / Score({1}) Avg. {2} Total {3}";
        }
    }

    function enkaConvertStat() {
        weaponOPConvert();
        artifactConvert();

        // �D���x
        const $friend = $doc.getElementsByClassName("fren")[0];
        if ($friend) {
            const friendClassName = converterInstance.CONVERT_TEXT.FRIEND.key;
            const $friendText = $friend.getElementsByClassName(friendClassName)[0];
            $friendText.innerText = getConvertStatName(friendClassName);
        }

        // ���擾������\��
        const date = new Date;
        date.setTime(date.getTime() - 60 * date.getTimezoneOffset() * 1000);
        const timeString = date.toISOString().replace("T", " ").substr(0, 19);
        $doc.getElementById(TIME_STAMP).innerText = version + "_" + timeString;

        // �X�R�A�����I���{�^��
        const $scoreSelectInfo = $scoreSelectDiv.children[0];
        $scoreSelectInfo.innerText = getConvertStatName($scoreSelectInfo.classList[0]);

        const $scoreButtons = $scoreSelectDiv.getElementsByClassName("Button");
        for (let i = 0; i < $scoreButtons.length; i++) {
            const $labet = $scoreButtons[i];
            $labet.innerText = getConvertStatName($labet.classList[0]);
        }

        // ------ �ǉ����
        let sumScore = 0;
        let avgScore = 0;
        const $extraText = $doc.getElementById("extraData");

        // �X�R�A�v�Z
        for (let i = 0; i < 5; i++) {
            let score = 0.0;

            const $scoreBox = $doc.getElementById("score" + i);
            if ($scoreBox === null) continue;

            $scoreBox.setAttribute("class", "svelte-1ujofp1");

            // ���╨��t���Ă���ꍇ�A�v�Z
            if (isEquippingArtifact(i)) {
                score = calcArtifactScore(i);
                sumScore += score;

                $scoreBox.innerText = score.toFixed(1);
            } else {
                $scoreBox.innerText = "";
            }
        }
        avgScore = sumScore / 5;

        const critRate = getCharacterStats(converterInstance.CONVERT_TEXT.CRIT_RATE.key);
        const critDMG = getCharacterStats(converterInstance.CONVERT_TEXT.CRIT_DMG.key);
        const critRatio = critDMG / critRate;

        let type = "";
        switch (scoreH) {
            case SCORE_TYPE.HP:
                type = getConvertStatName(converterInstance.CONVERT_TEXT.HP_P.key);
                break;
            case SCORE_TYPE.ATTACK:
                type = getConvertStatName(converterInstance.CONVERT_TEXT.ATK_P.key);
                break;
            case SCORE_TYPE.DEFENSE:
                type = getConvertStatName(converterInstance.CONVERT_TEXT.DEF_P.key);
                break;
        }

        $extraText.innerText = getExtraText().format(critRatio.toFixed(1), type, avgScore.toFixed(1), sumScore.toFixed(1));
    }

    window.onload = function () {
        // ����
        const $weaponInfo = $weapon[0].getElementsByTagName("content")[0];
        const $weaponName = $weaponInfo.getElementsByTagName("h3")[0];
        $weaponInfo.style.paddingRight = "0px";
        $weaponName.style.fontWeight = "bold";
        $weapon[0].children[0].style.width = "30%";  // ����摜

        // ###### �L�����J�[�h�̃f�U�C���ύX ######
        const $charaCard = $doc.getElementsByClassName("card-host")[0];

        // ���̑�����\������g
        const $exParam = $doc.createElement("div");
        $exParam.id = "extraData";
        $exParam.innerText = "";
        $exParam.style.cssText = "position: absolute; bottom: .2%; right: 1.3%; text-align: right; font-size: 80%;";
        $exParam.classList.add("svelte-1ujofp1")
        $charaCard.appendChild($exParam);

        // �擾����
        const $timeStamp = $doc.createElement("div");
        $timeStamp.id = TIME_STAMP;
        $timeStamp.innerText = "";
        $timeStamp.style.cssText = "position: absolute; top: 1%; left: 2%; font-size: 60%; opacity: 0.4;";
        $exParam.classList.add("svelte-1ujofp1")
        $charaCard.appendChild($timeStamp);

        // css�̑S�ʓI�ȕύX
        const cssStyle = [
            '.Card .Icon{ display:none !important }',  // �A�C�R���̍폜
            '.stats.svelte-gp6viv .Substat { padding-top: 4%; }',  // ����X�e�[�^�X�̘g��傫��
            '.Card .Substat.svelte-1ut2kb8.svelte-1ut2kb8 { display: flex; align-items: center; margin-right: 0em; line-height: 95%; font-size: 98%; }',  // �T�u�X�e�[�^�X�̘g���L����
            '.substats.svelte-17qi811>.Substat { padding-right: 1.0em; }',  // ���╨�̃T�u�X�e�[�^�X���E�ɍs��������̂Œ���
            '.Artifact.svelte-17qi811 .ArtifactIcon { top: -37%; left: -6%; width: 28%; }',  // ���╨�摜�̒���
            '.mainstat.svelte-17qi811 > div:nth-child(1) { display: flex; align-items: center; top: 3px; max-height: 100%; font-size: 110%; line-height: 90%; width: auto; height: 50em; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; }',  // ���╨���C���X�e�[�^�X�̒���
            '.mainstat.svelte-17qi811 > div:nth-child(4) { display: flex; align-items: center; margin-left: auto; margin-bottom: -0.3em; }'  // ���╨���C���X�e�[�^�X�̒���
        ];
        const $style = $doc.createElement("style");
        $style.innerHTML = cssStyle.join(" ");
        $doc.querySelector("head").append($style);

        // �S�̂̔z�u�̕ύX
        const $cardSection = $doc.getElementsByClassName("section");
        // ��
        $cardSection[0].style.width = "36%";
        // ����
        $cardSection[1].style.width = "24%";
        $cardSection[1].style.left = "34%";
        // �E
        $cardSection[2].style.width = "43%";
        $cardSection[2].style.height = "97%";

        createConvertTextElements();
        createModeChangeBottom();

        enkaConvertStat();

        const $charaName = $doc.getElementsByClassName("name")[0];
        const $language = $doc.getElementsByXPath('//div[@data-icon="language"]')[0];
        // �����L�����N�^�[�ύX���ɍĖ|��
        const observeConf = { childList: true, attributes: true, characterData: true };
        const observer = new MutationObserver(mutations => {
            createConvertTextElements();
            enkaConvertStat();
        })
        observer.observe($charaName, observeConf); // �L�����N�^�[�ύX��
        observer.observe($language, observeConf); // ����ύX��
    };
})();
