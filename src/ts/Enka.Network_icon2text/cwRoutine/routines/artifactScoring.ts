import { cssManager, optionLocale } from "../../myConst";
import { localeKeys } from "../../types/localeKeys";
import { characterStat } from "../../util/characterStat";
import { fmt } from "../../util/fmt";
import { CreateWriteRoutine } from "../createWriteRoutine";
import { SelectScoreType } from "./selectScoreType";

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

    public static get instance(): ArtifactScoring {
        if (!this._instance) {
            this._instance = new ArtifactScoring();
        }

        return this._instance;
    }

    /**
     * 聖遺物のスコアを計算
     */
    private calcArtifactScore(artifact: Element): number {
        let score = 0;
        if (artifact.classList.contains("empty")) return score;

        const subStat = Array.from(artifact.getElementsByClassName("Substat"));
        const subStatName = subStat.map((sub) => sub.classList[1]);
        const subStatAmount = subStat.map((sub) =>
            (sub.lastChild as HTMLElement).innerText.replace(/[^0-9.]/g, "")
        );
        const subLen = subStat.length;

        const scoreH = SelectScoreType.instance.getScoreType();
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
        const artifacts = document.getElementsByClassName("Artifact");

        for (const artifact of Array.from(artifacts)) {
            // スコア表示
            let scoreBox = artifact.getElementsByClassName(
                "artifactScoreText"
            )[0] as HTMLElement;
            if (scoreBox) continue;

            scoreBox = document.createElement("div");
            scoreBox.classList.add("artifactScoreText", "svelte-1ujofp1");
            artifact.appendChild(scoreBox);
        }

        // その他情報を表示する枠
        if (document.getElementById("extraData")) return;

        const artifactSection = document.getElementsByClassName("section")[2];
        if (!artifactSection) return;

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

        // スコア計算
        for (const scoreBox of Array.from(scoreBoxes)) {
            let score = 0.0;

            const artifact = scoreBox.parentElement;
            if (!artifact) continue;

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
            if (scoreH != scoreType.id) continue;

            type = optionLocale.getLocaleSub(scoreType.key);
            break;
        }

        if (!extraText) return;
        extraText.textContent = this.getExtraText(
            critRatio,
            type,
            avgScore,
            sumScore
        );
    }
}
