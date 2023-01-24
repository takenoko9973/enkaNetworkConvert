import { TranslateKey2Word } from "./TranslateKey2Word";
import { languages } from "./types/languages";
import { localeKeys } from "./types/localeKeys";

class scoreType {
    #id;
    #key;
    #correction;

    constructor(id: any, key: localeKeys, correction: any) {
        this.#id = id;
        this.#key = key;
        this.#correction = correction;
    }

    get id() { return this.#id }
    get key() { return this.#key }
    get correction() { return this.#correction }
}

const version = "v0.50";

const $doc = document;
const $weapon = $doc.getElementsByClassName("Weapon");
const $charaStats = $doc.getElementsByClassName("StatsTable");
const $artifact = $doc.getElementsByClassName("Artifact");

let optionLocale: TranslateKey2Word = new TranslateKey2Word("EN");

const BASE_ATK_CLASS: localeKeys = "BASE_ATTACK";
const TIME_STAMP = "timeStamp"

// スコア計算基準指定 H:HP, A:攻撃力, D:防御力
const SCORE_RADIO_NAME = "sSource"
let $scoreSelectDiv: any = null;
const SCORE_TYPE: {[key: string]: scoreType} = {
    "HP": new scoreType("H", "HP_PERCENT", 1),
    "ATTACK": new scoreType("A", "ATTACK_PERCENT", 1),
    "DEFENSE": new scoreType("D", "DEFENSE_PERCENT", 0.8),
    "EM": new scoreType("EM", "ELEMENT_MASTERY", 0.25),
}
let scoreH: string = SCORE_TYPE.ATTACK.id;


function getLanguage(): languages {
    const $language = $doc.getElementsByClassName("Dropdown-selectedItem")[0] as HTMLElement;
    return $language.innerText as languages;
}

function getConvertStatName(key: string, isSub: boolean = false) {
    const name = isSub ? optionLocale.getLocaleSub(key) : optionLocale.getLocale(key);

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
function getCharacterStats(key: any) {
    let index = -1;
    const $statsList = $charaStats[0].children;
    if ((index = Array.from($statsList).map(stat => stat.classList[1]).indexOf(key)) === -1) return 0;

    const stat = ($statsList[index].children[1].children[2] as HTMLElement).innerText;
    return Number(stat.replace(/[^0-9.]/g, ''));
}

/**
 * 聖遺物を装備しているかどうか
 */
function isEquippingArtifact(index: any) {
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
        ($icon as HTMLElement).style.width = "0";

        const friendClassName = "FRIEND";
        if (!$friend.getElementsByClassName(friendClassName)[0]) {
            const $friendText = $doc.createElement("span");
            $friendText.classList.add(friendClassName, "svelte-1cfvxg7");
            $friendText.style.width = "auto";
            $friendText.style.height = "auto";
            $friendText.style.fontSize = "1em";
            $friendText.style.fontWeight = "bold";
            $friend.prepend($friendText);
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
        const $baseAtk = $statText.cloneNode(true) as HTMLElement;
        $baseAtk.id = BASE_ATK_CLASS;
        $baseAtk.classList.add(BASE_ATK_CLASS);
        $subStat[0].prepend(getSeparateElement());
        $subStat[0].prepend($baseAtk);
    }

    // サブステがあるかどうか判定
    if ($subStat[1]) {
        if (!$doc.getElementById("weaponSubOP")) {
            const $subOPName = $statText.cloneNode(true) as HTMLElement;
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
            const $mainOPName = $statText.cloneNode(true) as HTMLElement;
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

            const $subOPName = $statText.cloneNode(true) as HTMLElement;
            $subOPName.id = subOPId;
            $subStat[j].prepend(getSeparateElement());
            $subStat[j].prepend($subOPName);
        }

        // スコア表示
        if ($doc.getElementById("score" + i) === null) {
            const $scoreBox = $doc.createElement("div");
            $scoreBox.id = "score" + i;
            $scoreBox.style.position = "absolute";
            $scoreBox.style.fontSize = "70%";
            $scoreBox.style.top = "-0.2em";
            $scoreBox.style.right = "0.3em";
            $scoreBox.style.textAlign = "right";
            $scoreBox.style.opacity = "0.6";
            $artifact[i].appendChild($scoreBox);
        }
    }
}

function createModeChangeBottom() {
    const $cardToggles = $doc.getElementsByClassName("CardToggles")[0];
    const $rowElement = $cardToggles.getElementsByClassName("row")[0].cloneNode(false);
    ($cardToggles!.getElementsByClassName("Input")[0]!.parentNode! as HTMLElement).after($rowElement);  // カードオプションの下に作成

    const radioStyle = [
        '.inline_radio input[type="radio"] { position: absolute; opacity: 0; }',  // チェックボックスを隠す
        '.inline_radio label.radbox[type="radio"] { color: rgba(255,255,255,.5);}',  // 普段は薄目
        '.inline_radio input[type="radio"]:checked + label.radbox[type="radio"] { color: rgba(255,255,255,1); border-color: rgba(255,255,255,1); }'  // 選択しているボタンを強調
    ];
    const $style = $doc.createElement("style");
    $style.innerHTML = radioStyle.join(" ");
    $doc.querySelector("head")!.append($style);

    // スコア選択欄を作成
    $scoreSelectDiv = $doc.createElement("div");
    $scoreSelectDiv.classList.add("Input", "svelte-nsdlaj");

    // 説明テキストを追加
    const scoreSelectClass: localeKeys = "SCORE_SELECT_INFO"
    const $text = $doc.createElement("label");
    $text.classList.add(scoreSelectClass, "svelte-nsdlaj");
    ($text as HTMLElement).style.marginLeft = "0.5em";

    // 計算方法変更用ボタン
    const $scoreModeGroup = $doc.createElement("group");
    $scoreModeGroup.classList.add("inline_radio");

    // ボタンの作成
    for (const key in SCORE_TYPE) {
        const id = `SCORE_${key}_R`;

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
    $doc.getElementById(atkRadioId)!.toggleAttribute("checked", true);

    // スコア評価対象変更時に発火
    $doc.getElementsByName(SCORE_RADIO_NAME).forEach((function (e) {
        e.addEventListener("click", (function () {
            scoreH = ($doc.querySelector(`input:checked[name=${SCORE_RADIO_NAME}]`)! as HTMLInputElement).value;
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
        $doc.getElementById(`artifactMain${i}`)!.innerText = getConvertStatName($mainStat.classList[1])

        // サブOP
        const $subStat = $artifact[i].getElementsByClassName("Substat");
        const subLen = $subStat.length;
        for (let j = 0; j < subLen; j++) {
            const subOPId = "artifactSub" + i + "-" + j
            if (!$doc.getElementById(subOPId)) continue;

            $doc.getElementById(subOPId)!.innerText = getConvertStatName($subStat[j].classList[1], true);
        }
    }
}

/**
* 聖遺物のスコアを計算
*/
function calcArtifactScore(index: any) {
    let score = 0;
    if (!isEquippingArtifact(index)) return score;

    const $subStat = Array.from($artifact[index].getElementsByClassName("Substat"));
    const $subStatName = $subStat.map(sub => sub.classList[1]);
    const $subStatAmount = $subStat.map(sub => (sub.lastChild! as HTMLElement).innerText.replace(/[^0-9.]/g, ''));
    const subLen = $subStat.length;

    for (let i = 0; i < subLen; i++) {
        const key = $subStatName[i] as localeKeys;
        switch (key) {
            case "CRITICAL":
                score += Number($subStatAmount[i]) * 2;
                break;
            case "CRITICAL_HURT":
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

function getExtraText(ratio: number, scoreType: string, avgScore: number, score: number) {
    const language = getLanguage() as languages;

    const ratioFixed = ratio.toFixed(1);
    const avgScoreFixed = avgScore.toFixed(1);
    const scoreFixed = score.toFixed(1);

    switch (language) {
        case "EN":
            return `Crit Ratio 1:${ratioFixed} / Score(${scoreType}) Avg. ${avgScoreFixed} Total ${scoreFixed}`;
        case "JA":
            return `会心率ダメ比 1:${ratioFixed} / 聖遺物スコア(${scoreType}) 平均:${avgScoreFixed} 合計:${scoreFixed}`;
        default:
            return `Crit Ratio 1:${ratioFixed} / Score(${scoreType}) Avg. ${avgScoreFixed} Total ${scoreFixed}`;
    }
}

function enkaConvertStat() {
    weaponOPConvert();
    artifactConvert();

    // 好感度
    const $friend = $doc.getElementsByClassName("fren")[0];
    if ($friend) {
        const friendClassName: localeKeys = "FRIEND";
        const $friendText = $friend.getElementsByClassName(friendClassName)[0] as HTMLElement;
        $friendText.innerText = getConvertStatName(friendClassName);
    }

    // 情報取得日時を表示
    const date = new Date;
    date.setTime(date.getTime() - 60 * date.getTimezoneOffset() * 1000);
    const timeString = date.toISOString().replace("T", " ").substr(0, 19);
    $doc.getElementById(TIME_STAMP)!.innerText = version + "_" + timeString;

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

    const critRate = getCharacterStats("CRITICAL");
    const critDMG = getCharacterStats("CRITICAL_HURT");
    const critRatio = critDMG / critRate;

    let type = "";
    for (const typeKey in SCORE_TYPE) {
        const scoreType = SCORE_TYPE[typeKey];
        if (scoreH != scoreType.id) continue;

        type = getConvertStatName(scoreType.key, true);
        break;
    }

    $extraText!.innerText = getExtraText(critRatio, type, avgScore, sumScore);
}

$doc.addEventListener("DOMContentLoaded", (function () { }))
window.onload = function () {
    optionLocale = new TranslateKey2Word(getLanguage());

    // 武器
    const $weaponInfo = $weapon[0].getElementsByTagName("content")[0] as HTMLElement;
    const $weaponName = $weaponInfo.getElementsByTagName("h3")[0] as HTMLElement;
    $weaponInfo.style.paddingRight = "0px";
    $weaponName.style.fontWeight = "bold";
    ($weapon[0].children[0] as HTMLElement).style.width = "30%";  // 武器画像

    // ###### キャラカードのデザイン変更 ######
    const $charaCard = $doc.getElementsByClassName("card-host")[0];

    // その他情報を表示する枠
    const $exParam = $doc.createElement("div");
    $exParam.id = "extraData";
    $exParam.innerText = "";
    $exParam.style.position = "absolute";
    $exParam.style.bottom = "0.2%";
    $exParam.style.right = "1.3%";
    $exParam.style.textAlign = "right";
    $exParam.style.fontSize = "80%";
    $exParam.classList.add("svelte-1ujofp1")
    $charaCard.appendChild($exParam);

    // 取得時間
    const $timeStamp = $doc.createElement("div");
    $timeStamp.id = TIME_STAMP;
    $timeStamp.innerText = "";
    $timeStamp.style.position = "absolute";
    $timeStamp.style.top = "1%";
    $timeStamp.style.left = "2%";
    $timeStamp.style.fontSize = "60%";
    $timeStamp.style.opacity = "0.4";
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
    $doc.querySelector("head")!.append($style);

    // 全体の配置の変更
    const $cardSection = $doc.getElementsByClassName("section") as HTMLCollectionOf<HTMLElement>;
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
    const $language = $doc.getElementsByClassName("Dropdown-selectedItem")[0];
    // 言語やキャラクター変更時に再翻訳
    const observeConf = { childList: true, attributes: true, characterData: true };
    const observer = new MutationObserver(_mutations => {
        optionLocale = new TranslateKey2Word(getLanguage());
        createConvertTextElements();
        enkaConvertStat();
    })
    observer.observe($charaName, observeConf); // キャラクター変更時
    observer.observe($language, observeConf); // 言語変更時
};

