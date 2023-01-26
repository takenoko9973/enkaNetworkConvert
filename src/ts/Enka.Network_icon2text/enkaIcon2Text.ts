import { getCharacterStats, getSeparateElement, isEquippingArtifact } from "./util/enkaUtil";
import { $scoreSelectDiv, SCORE_TYPE, calcArtifactScore, optionLocale, scoreH } from "./main";
import * as myConst from "./myConst";
import { localeKeys } from "./types/localeKeys";
import { fmt } from "./util/fmt";

function getExtraText(ratio: number, scoreType: string, avgScore: number, score: number) {
    const ratioFixed = ratio.toFixed(1);
    const avgScoreFixed = avgScore.toFixed(1);
    const scoreFixed = score.toFixed(1);

    return fmt(optionLocale.getConvertStatName("CARD_EXTRA_INFO"), {
        critRatio: ratioFixed,
        scoreType: scoreType,
        avgScore: avgScoreFixed,
        sumScore: scoreFixed
    });
}


export function createConvertTextElements() {
    // 好感度
    const $friend = myConst.$doc.getElementsByClassName("fren")[0];
    if ($friend) {
        // アイコン用の隙間を削除
        const $icon = $friend.getElementsByClassName("ShadedSvgIcon")[0];
        ($icon as HTMLElement).style.width = "0";

        const friendClassName: localeKeys = "FRIEND";
        if (!$friend.getElementsByClassName(friendClassName)[0]) {
            const $friendText = myConst.$doc.createElement("span");
            $friendText.classList.add(friendClassName, "svelte-1cfvxg7");
            $friendText.style.width = "auto";
            $friendText.style.height = "auto";
            $friendText.style.fontSize = "1em";
            $friendText.style.fontWeight = "bold";
            $friend.prepend($friendText);
        }
    }

    // サブステータス用のテキスト欄の作成
    const $statText = myConst.$doc.createElement("div");
    $statText.classList.add("svelte-1ut2kb8");
    $statText.style.fontWeight = "bold";

    // 武器
    const $weaponInfo = myConst.$weapon[0].getElementsByTagName("content")[0];
    const $subStat = $weaponInfo.getElementsByClassName("Substat");

    if (!myConst.$doc.getElementById(myConst.BASE_ATK_CLASS)) {
        const $baseAtk = $statText.cloneNode(true) as HTMLElement;
        $baseAtk.id = myConst.BASE_ATK_CLASS;
        $baseAtk.classList.add(myConst.BASE_ATK_CLASS);
        $subStat[0].prepend(getSeparateElement());
        $subStat[0].prepend($baseAtk);
    }

    // サブステがあるかどうか判定
    if ($subStat[1]) {
        if (!myConst.$doc.getElementById("weaponSubOP")) {
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
        const $mainStat = myConst.$artifact[i].getElementsByClassName("mainstat")[0];
        const mainOPId = `artifactMain${i}`;
        if (!myConst.$doc.getElementById(mainOPId)) {
            const $mainOPName = $statText.cloneNode(true) as HTMLElement;
            $mainOPName.id = mainOPId;
            $mainStat.prepend(getSeparateElement());
            $mainStat.prepend($mainOPName);
        }

        // サブOP
        const $subStat = myConst.$artifact[i].getElementsByClassName("Substat");
        const subLen = $subStat.length;
        for (let j = 0; j < subLen; j++) {
            const subOPId = `artifactSub${i}-${j}`;
            if (myConst.$doc.getElementById(subOPId)) continue;

            const $subOPName = $statText.cloneNode(true) as HTMLElement;
            $subOPName.id = subOPId;
            $subStat[j].prepend(getSeparateElement());
            $subStat[j].prepend($subOPName);
        }

        // スコア表示
        const scoreId = `score${i}`;
        if (myConst.$doc.getElementById(scoreId) === null) {
            const $scoreBox = myConst.$doc.createElement("div");
            $scoreBox.id = scoreId;
            $scoreBox.style.position = "absolute";
            $scoreBox.style.fontSize = "70%";
            $scoreBox.style.top = "-0.2em";
            $scoreBox.style.right = "0.3em";
            $scoreBox.style.textAlign = "right";
            $scoreBox.style.opacity = "0.6";
            myConst.$artifact[i].appendChild($scoreBox);
        }
    }
}

// 武器オプションの日本語化
function weaponOPIcon2Text() {
    const $subStat = myConst.$weapon[0].getElementsByClassName("Substat");

    const $baseAtk = myConst.$doc.getElementById(myConst.BASE_ATK_CLASS);
    if ($baseAtk) $baseAtk.innerText = optionLocale.getConvertStatName(myConst.BASE_ATK_CLASS);

    const $weaponSub = myConst.$doc.getElementById("weaponSubOP");
    if ($weaponSub) $weaponSub.innerText = optionLocale.getConvertStatName($subStat[1].classList[1]);
}

// 聖遺物の日本語化
function artifactIcon2Text() {
    for (let i = 0; i < 5; i++) {
        // 聖遺物を付けていない場合、スキップ
        if (!isEquippingArtifact(i)) continue;

        // メインOP
        const $mainStat = myConst.$artifact[i].getElementsByClassName("mainstat")[0];
        (myConst.$doc.getElementById(`artifactMain${i}`) as HTMLElement).innerText = optionLocale.getConvertStatName($mainStat.classList[1]);

        // サブOP
        const $subStat = myConst.$artifact[i].getElementsByClassName("Substat");
        const subLen = $subStat.length;
        for (let j = 0; j < subLen; j++) {
            const subOPId = `artifactSub${i}-${j}`;
            if (!myConst.$doc.getElementById(subOPId)) continue;

            (myConst.$doc.getElementById(subOPId) as HTMLElement).innerText = optionLocale.getConvertStatName($subStat[j].classList[1], true);
        }
    }
}

export function enkaIcon2Text() {
    weaponOPIcon2Text();
    artifactIcon2Text();

    // 好感度
    const $friend = myConst.$doc.getElementsByClassName("fren")[0];
    if ($friend) {
        const friendClassName: localeKeys = "FRIEND";
        const $friendText = $friend.getElementsByClassName(friendClassName)[0] as HTMLElement;
        $friendText.innerText = optionLocale.getConvertStatName(friendClassName);
    }

    // 情報取得日時を表示
    const date = new Date;
    date.setTime(date.getTime() - 60 * date.getTimezoneOffset() * 1000);
    const timeString = date.toISOString().replace("T", " ").substr(0, 19);
    (myConst.$doc.getElementById(myConst.TIME_STAMP) as HTMLElement).innerText = myConst.VERSION + "_" + timeString;

    // スコア方式選択説明テキスト
    const $scoreSelectInfo = $scoreSelectDiv?.children[0] as HTMLElement;
    $scoreSelectInfo.innerText = optionLocale.getConvertStatName($scoreSelectInfo.classList[0]);
    // スコア方式選択ボタン
    const $scoreButtons = $scoreSelectDiv?.getElementsByClassName("Button") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < $scoreButtons.length; i++) {
        const $label = $scoreButtons[i];
        $label.innerText = optionLocale.getConvertStatName($label.classList[0], true);
    }

    // ------ 追加情報
    let sumScore = 0;
    let avgScore = 0;
    const $extraText = myConst.$doc.getElementById("extraData");

    // スコア計算
    for (let i = 0; i < 5; i++) {
        let score = 0.0;

        const $scoreBox = myConst.$doc.getElementById(`score${i}`);
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

        type = optionLocale.getConvertStatName(scoreType.key, true);
        break;
    }

    ($extraText as HTMLElement).innerText = getExtraText(critRatio, type, avgScore, sumScore);
}
