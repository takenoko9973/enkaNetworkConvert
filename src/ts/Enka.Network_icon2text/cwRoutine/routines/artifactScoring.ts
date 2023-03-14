import { Artifact } from "../../class/artifact";
import { cssManager, optionLocale } from "../../myConst";
import { statsSubOptionKey } from "../../types/characterStatKey";
import { characterStat } from "../../util/characterStat";
import { getSvelteClassName } from "../../util/enkaUtil";
import { fmt } from "../../util/fmt";
import { CreateWriteRoutine } from "../createWriteRoutine";
import { SelectScoreType } from "./selectScoreType";

class scoreType {
    #id;
    #key;

    constructor(id: string, key: statsSubOptionKey) {
        this.#id = id;
        this.#key = key;
    }

    get id() {
        return this.#id;
    }
    get key() {
        return this.#key;
    }
}

// スコア計算基準指定 H:HP, A:攻撃力, D:防御力
export const SCORE_TYPES: { [key: string]: scoreType } = {
    HP: new scoreType("H", "HP_PERCENT"),
    ATTACK: new scoreType("A", "ATTACK_PERCENT"),
    DEFENSE: new scoreType("D", "DEFENSE_PERCENT"),
    EM: new scoreType("EM", "ELEMENT_MASTERY"),
    ER: new scoreType("ER", "CHARGE_EFFICIENCY"),
};

export class ArtifactScoring implements CreateWriteRoutine {
    private static _instance: ArtifactScoring;

    public static get instance(): ArtifactScoring {
        if (!this._instance) {
            this._instance = new ArtifactScoring();
        }

        return this._instance;
    }

    #artifacts: Artifact[] = [];

    private getExtraText(
        ratio: number,
        scoreType: string,
        score: number
    ): string {
        const ratioFixed = ratio.toFixed(1);
        const avgScoreFixed = (score / this.#artifacts.length).toFixed(1);
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
        this.#artifacts = [];

        for (const artifact of Array.from(artifacts)) {
            this.#artifacts.push(new Artifact(artifact));

            // スコア表示
            let scoreBox = artifact.getElementsByClassName(
                "artifactScoreText"
            )[0] as HTMLElement;
            if (scoreBox) continue;

            scoreBox = document.createElement("div");
            scoreBox.classList.add(
                "artifactScoreText",
                getSvelteClassName(artifact)
            );
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
        exParam.classList.add(getSvelteClassName(artifacts[0]));
        artifactSection.appendChild(exParam);

        const cssStyle = [
            ".Artifact .artifactScoreText{ position: absolute; font-size: 0.7em; opacity: 0.6; right: 0.3em; }",
        ];
        cssManager.addStyle(...cssStyle);
    }

    writeText() {
        let sumScore = 0;
        const extraText = document.getElementById("extraData");
        const selectScoreType = SelectScoreType.instance;

        // スコア計算
        const scoreTypeKey = selectScoreType.getScoreTypeKey();
        for (const artifact of this.#artifacts) {
            const score = artifact.artifactScore(scoreTypeKey);
            const scoreBox = artifact.element.getElementsByClassName("artifactScoreText")[0];

            scoreBox.textContent = score.toFixed(1);
            sumScore += score;
        }

        const critRate = characterStat("CRITICAL");
        const critDMG = characterStat("CRITICAL_HURT");
        const critRatio = critDMG / critRate;

        const type = optionLocale.getLocaleSub(selectScoreType.getScoreTypeKey());

        if (!extraText) return;
        extraText.textContent = this.getExtraText(
            critRatio,
            type,
            sumScore
        );
    }
}
