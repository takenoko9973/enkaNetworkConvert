import { getCharacterStats, getSeparateElement } from "../util/enkaUtil";
import { $scoreSelectDiv, SCORE_TYPE, calcArtifactScore, scoreH } from "../main";
import { $weapon, BASE_ATK_CLASS, TIME_STAMP, VERSION, optionLocale } from "../myConst";
import { localeKeys } from "../types/localeKeys";
import { fmt } from "../util/fmt";
import { artifactsIcon2Text, createTextInArtifact, isEquippingArtifact } from "./artifacts";

function getExtraText(ratio: number, scoreType: string, avgScore: number, score: number): string {
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

export function createConvertTextElements() {
    // 好感度
    const $friend = document.getElementsByClassName("fren")[0];
    if ($friend) {
        // アイコン用の隙間を削除
        const $icon = $friend.getElementsByClassName("ShadedSvgIcon")[0] as HTMLElement;
        $icon.style.width = "0";

        const friendClassName: localeKeys = "FRIEND";
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

    // サブステータス用のテキスト欄の作成
    const $statText = document.createElement("div");
    $statText.classList.add("svelte-1ut2kb8");
    $statText.style.fontWeight = "bold";

    // 武器
    const $weaponInfo = $weapon[0].getElementsByTagName("content")[0];
    const $subStat = $weaponInfo.getElementsByClassName("Substat");

    if (!document.getElementById(BASE_ATK_CLASS)) {
        const $baseAtk = $statText.cloneNode(true) as HTMLElement;
        $baseAtk.id = BASE_ATK_CLASS;
        $baseAtk.classList.add(BASE_ATK_CLASS);
        $subStat[0].prepend(getSeparateElement());
        $subStat[0].prepend($baseAtk);
    }

    // サブステがあるかどうか判定
    if ($subStat[1]) {
        if (!document.getElementById("weaponSubOP")) {
            const $subOPName = $statText.cloneNode(true) as HTMLElement;
            $subOPName.id = "weaponSubOP";
            $subStat[1].prepend(getSeparateElement());
            $subStat[1].prepend($subOPName);
        }
    }

    createTextInArtifact();
}

// 武器オプションの日本語化
function weaponOPIcon2Text() {
    const $subStat = $weapon[0].getElementsByClassName("Substat");

    const $baseAtk = document.getElementById(BASE_ATK_CLASS);
    if ($baseAtk) $baseAtk.innerText = optionLocale.getLocale(BASE_ATK_CLASS);

    const $weaponSub = document.getElementById("weaponSubOP");
    if ($weaponSub) $weaponSub.innerText = optionLocale.getLocale($subStat[1].classList[1]);
}

export function enkaIcon2Text() {
    weaponOPIcon2Text();
    artifactsIcon2Text();

    // 好感度
    const $friend = document.getElementsByClassName("fren")[0];
    if ($friend) {
        const friendClassName: localeKeys = "FRIEND";
        const $friendText = $friend.getElementsByClassName(friendClassName)[0] as HTMLElement;
        $friendText.innerText = optionLocale.getLocale(friendClassName);
    }

    // 情報取得日時を表示
    const date = new Date;
    date.setTime(date.getTime() - 60 * date.getTimezoneOffset() * 1000);
    const timeString = date.toISOString().replace("T", " ").substr(0, 19);
    (document.getElementById(TIME_STAMP) as HTMLElement).innerText = VERSION + "_" + timeString;

    // スコア方式選択説明テキスト
    const $scoreSelectInfo = $scoreSelectDiv?.children[0] as HTMLElement;
    $scoreSelectInfo.innerText = optionLocale.getLocale($scoreSelectInfo.classList[0]);
    // スコア方式選択ボタン
    const $scoreButtons = $scoreSelectDiv?.getElementsByClassName("Button") as HTMLCollectionOf<HTMLElement>;
    for (const $label of Array.from($scoreButtons)) {
        $label.innerText = optionLocale.getLocaleSub($label.classList[0]);
    }

    // ------ 追加情報
    let sumScore = 0;
    let avgScore = 0;
    const $extraText = document.getElementById("extraData");

    // スコア計算
    for (let i = 0; i < 5; i++) {
        let score = 0.0;

        const $scoreBox = document.getElementById(`score${i}`);
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

        type = optionLocale.getLocaleSub(scoreType.key);
        break;
    }

    ($extraText as HTMLElement).innerText = getExtraText(critRatio, type, avgScore, sumScore);
}
