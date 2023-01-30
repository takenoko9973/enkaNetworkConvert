import { TranslateKey2Word } from "./TranslateKey2Word";
import { localeKeys } from "./types/localeKeys";
import * as myConst from "./myConst";
import { createConvertTextElements, enkaIcon2Text } from "./enkaIcon2Text/enkaIcon2Text";
import { getLanguage } from "./util/enkaUtil";
import { isEquippingArtifact } from "./enkaIcon2Text/artifacts";

export let optionLocale: TranslateKey2Word = new TranslateKey2Word("EN");

class scoreType {
    #id;
    #key;
    #correction;

    constructor(id: string, key: localeKeys, correction: number) {
        this.#id = id;
        this.#key = key;
        this.#correction = correction;
    }

    get id() { return this.#id; }
    get key() { return this.#key; }
    get correction() { return this.#correction; }
}


// スコア計算基準指定 H:HP, A:攻撃力, D:防御力
export let $scoreSelectDiv: HTMLDivElement | null = null;
const SCORE_RADIO_NAME = "sSource";
export const SCORE_TYPE: { [key: string]: scoreType } = {
    "HP": new scoreType("H", "HP_PERCENT", 1),
    "ATTACK": new scoreType("A", "ATTACK_PERCENT", 1),
    "DEFENSE": new scoreType("D", "DEFENSE_PERCENT", 0.8),
    "EM": new scoreType("EM", "ELEMENT_MASTERY", 0.25),
};
export let scoreH: string = SCORE_TYPE.ATTACK.id;


function createModeChangeBottom() {
    const $cardToggles = myConst.$doc.getElementsByClassName("CardToggles")[0];
    const $rowElement = $cardToggles.getElementsByClassName("row")[0].cloneNode(false);
    ($cardToggles.getElementsByClassName("Input")[0].parentNode as HTMLElement).after($rowElement);  // カードオプションの下に作成

    const radioStyle = [
        '.inline_radio input[type="radio"] { position: absolute; opacity: 0; }',  // チェックボックスを隠す
        '.inline_radio label.radbox[type="radio"] { color: rgba(255,255,255,.5);}',  // 普段は薄目
        '.inline_radio input[type="radio"]:checked + label.radbox[type="radio"] { color: rgba(255,255,255,1); border-color: rgba(255,255,255,1); }'  // 選択しているボタンを強調
    ];
    const $style = myConst.$doc.createElement("style");
    $style.innerHTML = radioStyle.join(" ");
    myConst.$doc.querySelector("head")?.append($style);

    // スコア選択欄を作成
    $scoreSelectDiv = myConst.$doc.createElement("div");
    $scoreSelectDiv.classList.add("Input", "svelte-nsdlaj");

    // 説明テキストを追加
    const scoreSelectClass: localeKeys = "SCORE_SELECT_INFO";
    const $text = myConst.$doc.createElement("label");
    $text.classList.add(scoreSelectClass, "svelte-nsdlaj");
    ($text as HTMLElement).style.marginLeft = "0.5em";

    // 計算方法変更用ボタン
    const $scoreModeGroup = myConst.$doc.createElement("group");
    $scoreModeGroup.classList.add("inline_radio");

    // ボタンの作成
    for (const key in SCORE_TYPE) {
        const id = `SCORE_${key}_R`;

        // ボタン
        const $radio = myConst.$doc.createElement("input");
        $radio.id = id;
        $radio.name = SCORE_RADIO_NAME;
        $radio.setAttribute("type", "radio");
        $radio.value = SCORE_TYPE[key].id;

        // ラベル (ボタンとリンクさせる)
        const $label = myConst.$doc.createElement("label");
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
    const atkRadioId = $scoreSelectDiv.getElementsByClassName(SCORE_TYPE.ATTACK.key)[0].getAttribute("for") as string;
    (myConst.$doc.getElementById(atkRadioId) as HTMLInputElement).toggleAttribute("checked", true);

    // スコア評価対象変更時に発火
    myConst.$doc.getElementsByName(SCORE_RADIO_NAME).forEach((function (e) {
        e.addEventListener("click", (function () {
            scoreH = (myConst.$doc.querySelector(`input:checked[name=${SCORE_RADIO_NAME}]`) as HTMLInputElement).value ?? "A";
            enkaIcon2Text();
        }));
    }));
}

/**
* 聖遺物のスコアを計算
*/
export function calcArtifactScore(index: number) {
    let score = 0;
    if (!isEquippingArtifact(index)) return score;

    const $subStat = Array.from(myConst.$artifact[index].getElementsByClassName("Substat"));
    const $subStatName = $subStat.map(sub => sub.classList[1]);
    const $subStatAmount = $subStat.map(sub => (sub.lastChild as HTMLElement).innerText.replace(/[^0-9.]/g, ''));
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

window.addEventListener("load", function() {
    optionLocale = new TranslateKey2Word(getLanguage());

    // 武器
    const $weaponInfo = myConst.$weapon[0].getElementsByTagName("content")[0] as HTMLElement;
    const $weaponName = $weaponInfo.getElementsByTagName("h3")[0] as HTMLElement;
    $weaponInfo.style.paddingRight = "0px";
    $weaponName.style.fontWeight = "bold";
    (myConst.$weapon[0].children[0] as HTMLElement).style.width = "30%";  // 武器画像

    // ###### キャラカードのデザイン変更 ######
    const $charaCard = myConst.$doc.getElementsByClassName("card-host")[0];

    // その他情報を表示する枠
    const $exParam = myConst.$doc.createElement("div");
    $exParam.id = "extraData";
    $exParam.innerText = "";
    $exParam.style.position = "absolute";
    $exParam.style.bottom = "0.2%";
    $exParam.style.right = "1.3%";
    $exParam.style.textAlign = "right";
    $exParam.style.fontSize = "80%";
    $exParam.classList.add("svelte-1ujofp1");
    $charaCard.appendChild($exParam);

    // 取得時間
    const $timeStamp = myConst.$doc.createElement("div");
    $timeStamp.id = myConst.TIME_STAMP;
    $timeStamp.innerText = "";
    $timeStamp.style.position = "absolute";
    $timeStamp.style.top = "1%";
    $timeStamp.style.left = "2%";
    $timeStamp.style.fontSize = "60%";
    $timeStamp.style.opacity = "0.4";
    $exParam.classList.add("svelte-1ujofp1");
    $charaCard.appendChild($timeStamp);

    // cssの全面的な変更
    const cssStyle = [
        '.Card .Icon{ display:none !important }',  // アイコンの削除
        '.stats.svelte-gp6viv .Substat { padding-top: 4%; }',  // 武器ステータスの枠を大きく
        '.Card .Substat.svelte-1ut2kb8.svelte-1ut2kb8 { display: flex; align-items: center; margin-right: 0em; line-height: 95%; font-size: 98%; }',  // サブステータスの枠を広げる
        '.substats.svelte-17qi811>.Substat { padding-right: 1.0em; }',  // 聖遺物のサブステータスが右に行きすぎるので調整
        '.Artifact.svelte-17qi811 .ArtifactIcon { top: -37%; left: -6%; width: 28%; }',  // 聖遺物画像の調整
        '.mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(1) { display: flex; align-items: center; top: 5%; font-size: 100%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; }',  // 聖遺物メインステータスの調整
        '.mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(2) { padding: 4% 0%; }',
        '.mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(3) { max-height: 25% }'
    ];
    const $style = myConst.$doc.createElement("style");
    $style.innerHTML = cssStyle.join(" ");
    myConst.$doc.querySelector("head")?.append($style);

    // 全体の配置の変更
    const $cardSection = myConst.$doc.getElementsByClassName("section") as HTMLCollectionOf<HTMLElement>;
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

    enkaIcon2Text();

    const $charaName = myConst.$doc.getElementsByClassName("name")[0];
    const $language = myConst.$doc.getElementsByClassName("Dropdown-selectedItem")[0];
    // 言語やキャラクター変更時に再翻訳
    const observeConf = { childList: true, attributes: true, characterData: true };
    const observer = new MutationObserver(() => {
        optionLocale = new TranslateKey2Word(getLanguage());
        createConvertTextElements();
        enkaIcon2Text();
    });
    observer.observe($charaName, observeConf); // キャラクター変更時
    observer.observe($language, observeConf); // 言語変更時
});

