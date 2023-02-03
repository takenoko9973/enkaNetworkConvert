import { getCharacterStats, getScoreType } from "../util/enkaUtil";
import { SCORE_TYPE, calcArtifactScore } from "../main";
import { SCORE_SELECT_DIV, TIME_STAMP, VERSION, optionLocale } from "../myConst";
import { fmt } from "../util/fmt";
import { artifactsIcon2Text, createTextInArtifact, isEquippingArtifact } from "./artifacts";
import { createTextInWeapon, weaponOPIcon2Text } from "./weapon";
import { createTextInFriend, friendIcon2Text } from "./friend";

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
    createTextInFriend();
    createTextInWeapon();
    createTextInArtifact();
}


export function enkaIcon2Text() {
    weaponOPIcon2Text();
    artifactsIcon2Text();
    friendIcon2Text();

    // 情報取得日時を表示
    const date = new Date;
    date.setTime(date.getTime() - 60 * date.getTimezoneOffset() * 1000);
    const timeString = date.toISOString().replace("T", " ").substr(0, 19);
    (document.getElementById(TIME_STAMP) as HTMLElement).innerText = VERSION + "_" + timeString;

    // スコア方式選択説明テキスト
    const scoreSelectDiv = document.getElementById(SCORE_SELECT_DIV);
    const scoreSelectInfo = scoreSelectDiv?.children[0] as HTMLElement;
    scoreSelectInfo.innerText = optionLocale.getLocale(scoreSelectInfo.classList[0]);
    // スコア方式選択ボタン
    const scoreButtons = scoreSelectDiv?.getElementsByClassName("Button") as HTMLCollectionOf<HTMLElement>;
    for (const label of Array.from(scoreButtons)) {
        label.innerText = optionLocale.getLocaleSub(label.classList[0]);
    }

    // ------ 追加情報
    let sumScore = 0;
    let avgScore = 0;
    const extraText = document.getElementById("extraData") as HTMLElement;

    // スコア計算
    for (let i = 0; i < 5; i++) {
        let score = 0.0;

        const scoreBox = document.getElementById(`score${i}`);
        if (scoreBox === null) continue;

        scoreBox.setAttribute("class", "svelte-1ujofp1");

        // 聖遺物を付けている場合、計算
        if (isEquippingArtifact(i)) {
            score = calcArtifactScore(i);
            sumScore += score;

            scoreBox.innerText = score.toFixed(1);
        } else {
            scoreBox.innerText = "";
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
        if (scoreH != scoreType.id) continue;

        type = optionLocale.getLocaleSub(scoreType.key);
        break;
    }

    extraText.innerText = getExtraText(critRatio, type, avgScore, sumScore);
}
