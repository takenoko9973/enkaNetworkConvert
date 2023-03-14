import { ArtifactSets } from "../../class/artifactSets";
import { cssManager, optionLocale } from "../../myConst";
import { characterStat } from "../../util/characterStat";
import { getSvelteClassName } from "../../util/enkaUtil";
import { fmt } from "../../util/fmt";
import { CreateWriteRoutine } from "../createWriteRoutine";
import { SelectScoreType } from "./selectScoreType";

export class ArtifactScoring implements CreateWriteRoutine {
    private static _instance: ArtifactScoring;

    public static get instance(): ArtifactScoring {
        if (!this._instance) {
            this._instance = new ArtifactScoring();
        }

        return this._instance;
    }

    #artifactSets: ArtifactSets | undefined;

    createText() {
        this.#artifactSets = new ArtifactSets(
            document.getElementsByClassName("section right")[0]
        );

        for (const artifact of this.#artifactSets.artifacts) {
            const artifactElement = artifact.element;

            // スコア表示
            let scoreBox =
                artifactElement.getElementsByClassName("artifactScoreText")[0];
            if (scoreBox) continue;

            scoreBox = document.createElement("div");
            scoreBox.classList.add(
                "artifactScoreText",
                getSvelteClassName(artifactElement)
            );
            artifactElement.appendChild(scoreBox);
        }

        // その他情報を表示する枠
        if (document.getElementById("extraData")) return;

        const exParam = document.createElement("div");
        exParam.id = "extraData";
        exParam.style.right = "0.3em";
        exParam.style.marginTop = "-0.5em";
        exParam.style.textAlign = "right";
        exParam.style.fontSize = "0.8em";
        exParam.classList.add(
            getSvelteClassName(this.#artifactSets.artifacts[0].element)
        );
        this.#artifactSets.element.appendChild(exParam);

        const cssStyle = [
            ".Artifact .artifactScoreText{ position: absolute; font-size: 0.7em; opacity: 0.6; right: 0.3em; }",
        ];
        cssManager.addStyle(...cssStyle);
    }

    writeText() {
        if (!this.#artifactSets) return;

        const extraText = document.getElementById("extraData");
        const selectScoreType = SelectScoreType.instance;
        const artifacts = this.#artifactSets.artifacts;

        // スコア計算
        const scoreTypeKey = selectScoreType.getScoreTypeKey();
        for (const artifact of artifacts) {
            const score = artifact.artifactScore(scoreTypeKey);
            const scoreBox =
                artifact.element.getElementsByClassName("artifactScoreText")[0];

            scoreBox.textContent = score.toFixed(1);
        }

        const critRate = characterStat("CRITICAL");
        const critDMG = characterStat("CRITICAL_HURT");
        const critRatio = critDMG / critRate;

        const typeName = optionLocale.getLocaleSub(scoreTypeKey);
        const sumScore = this.#artifactSets.sumScore(scoreTypeKey);
        const avgScore = this.#artifactSets.avgScore(scoreTypeKey);

        if (!extraText) return;
        extraText.textContent = this.getExtraText(
            critRatio,
            typeName,
            sumScore,
            avgScore
        );
    }

    private getExtraText(
        ratio: number,
        scoreTypeName: string,
        sumScore: number,
        avgScore: number
    ): string {
        const ratioFixed = ratio.toFixed(1);
        const sumScoreFixed = sumScore.toFixed(1);
        const avgScoreFixed = avgScore.toFixed(1);

        return fmt(optionLocale.getLocale("CARD_EXTRA_INFO"), {
            critRatio: ratioFixed,
            scoreType: scoreTypeName,
            avgScore: avgScoreFixed,
            sumScore: sumScoreFixed,
        });
    }
}
