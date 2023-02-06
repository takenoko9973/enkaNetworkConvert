import { isEquippingArtifact } from "../enkaIcon2Text/artifacts";
import { SCORE_RADIO_NAME, artifact, optionLocale } from "../myConst";
import { localeKeys } from "../types/localeKeys";
import { characterStat } from "../util/characterStat";
import { fmt } from "../util/fmt";
import { CreateWriteRoutine } from "./createWriteRoutine";

class scoreType {
    #id;
    #key;
    #correction;

    constructor(id: string, key: localeKeys, correction: number) {
        this.#id = id;
        this.#key = key;
        this.#correction = correction;
    }

    get id() {
        return this.#id;
    }
    get key() {
        return this.#key;
    }
    get correction() {
        return this.#correction;
    }
}

// スコア計算基準指定 H:HP, A:攻撃力, D:防御力
export const SCORE_TYPE: { [key: string]: scoreType } = {
    HP: new scoreType("H", "HP_PERCENT", 1),
    ATTACK: new scoreType("A", "ATTACK_PERCENT", 1),
    DEFENSE: new scoreType("D", "DEFENSE_PERCENT", 0.8),
    EM: new scoreType("EM", "ELEMENT_MASTERY", 0.25),
};

export class ArtifactScoring implements CreateWriteRoutine {
    private static _instance: ArtifactScoring;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static get instance(): ArtifactScoring {
        if (!this._instance) {
            this._instance = new ArtifactScoring();
        }

        return this._instance;
    }

    getScoreType(): string {
        return (
            (
                document.querySelector(
                    `input:checked[name=${SCORE_RADIO_NAME}]`
                ) as HTMLInputElement
            ).value ?? "A"
        );
    }

    /**
     * 聖遺物のスコアを計算
     */
    private calcArtifactScore(index: number) {
        let score = 0;
        if (!isEquippingArtifact(index)) return score;

        const subStat = Array.from(
            artifact[index].getElementsByClassName("Substat")
        );
        const subStatName = subStat.map((sub) => sub.classList[1]);
        const subStatAmount = subStat.map((sub) =>
            (sub.lastChild as HTMLElement).innerText.replace(/[^0-9.]/g, "")
        );
        const subLen = subStat.length;

        const scoreH = this.getScoreType();
        for (let i = 0; i < subLen; i++) {
            const key = subStatName[i] as localeKeys;
            switch (key) {
                case "CRITICAL":
                    score += Number(subStatAmount[i]) * 2;
                    break;
                case "CRITICAL_HURT":
                    score += Number(subStatAmount[i]);
                    break;
                default:
                    // 指定のステータスをスコア換算
                    for (const typeKey in SCORE_TYPE) {
                        const scoreType = SCORE_TYPE[typeKey];
                        if (key != scoreType.key) continue;
                        if (scoreH != scoreType.id) continue;

                        score +=
                            Number(subStatAmount[i]) * scoreType.correction;
                        break;
                    }
            }
        }

        return score;
    }

    private getExtraText(
        ratio: number,
        scoreType: string,
        avgScore: number,
        score: number
    ): string {
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
        const charaCard = document.getElementsByClassName("card-host")[0];

        // その他情報を表示する枠
        const exParam = document.createElement("div");
        exParam.id = "extraData";
        exParam.innerText = "";
        exParam.style.position = "absolute";
        exParam.style.bottom = "0.2%";
        exParam.style.right = "1.3%";
        exParam.style.textAlign = "right";
        exParam.style.fontSize = "80%";
        exParam.classList.add("svelte-1ujofp1");
        charaCard.appendChild(exParam);
    }

    writeText() {
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
                score = this.calcArtifactScore(i);
                sumScore += score;

                scoreBox.innerText = score.toFixed(1);
            } else {
                scoreBox.innerText = "";
            }
        }
        avgScore = sumScore / 5;

        const critRate = characterStat("CRITICAL");
        const critDMG = characterStat("CRITICAL_HURT");
        const critRatio = critDMG / critRate;

        let type = "";
        const scoreH = this.getScoreType();
        for (const typeKey in SCORE_TYPE) {
            const scoreType = SCORE_TYPE[typeKey];
            if (scoreH != scoreType.id) continue;

            type = optionLocale.getLocaleSub(scoreType.key);
            break;
        }

        extraText.innerText = this.getExtraText(
            critRatio,
            type,
            avgScore,
            sumScore
        );
    }
}
