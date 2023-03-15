import { ArtifactSets } from "../../class/artifactSets";
import { cssManager, optionLocale } from "../../myConst";
import { characterStat } from "../../util/characterStat";
import { getSvelteClassName } from "../../util/enkaUtil";
import { fmt } from "../../util/fmt";
import { CreateWriteRoutine } from "../createWriteRoutine";
import { EvaluationSelector } from "./evaluationSelectorRoutine";
import { RollValueMethodRoutine } from "./rollValueMethodRoutine";
import { SelectScoreType } from "./selectScoreType";

const EVALUATION_TEXT = "artifactEvaluateText";
const EXTRA_PARAMETER_TEXT = "extraParamText";

export class ArtifactEvaluateRoutine implements CreateWriteRoutine {
    static #instance: ArtifactEvaluateRoutine;

    public static get instance(): ArtifactEvaluateRoutine {
        if (!this.#instance) {
            this.#instance = new ArtifactEvaluateRoutine();
        }

        return this.#instance;
    }

    #artifactSets!: ArtifactSets;

    createText() {
        this.#artifactSets = new ArtifactSets(
            document.getElementsByClassName("section right")[0]
        );

        this.createEvaluationText();
        this.createExtraParameterText();
    }

    writeText() {
        const evaluationSelector = EvaluationSelector.instance;
        switch(evaluationSelector.getSelectMethodId()) {
            case "scoring": {
                this.writeScoringMethod();
                break;
            }
            case "rollValue":{
                this.writeRollValueMethod();
                break;
            }
        }
    }

    // 各聖遺物評価用テキスト設置
    private createEvaluationText() {
        for (const artifact of this.#artifactSets.artifacts) {
            const artifactElement = artifact.element;

            // 複数個作成防止
            let evaluationText =
                artifactElement.getElementsByClassName(EVALUATION_TEXT)[0];
            if (evaluationText) continue;

            evaluationText = document.createElement("div");
            evaluationText.classList.add(
                EVALUATION_TEXT,
                getSvelteClassName(artifactElement)
            );
            artifactElement.appendChild(evaluationText);
        }

        const cssStyle = [
            `.Artifact .${EVALUATION_TEXT}{ position: absolute; font-size: 0.7em; opacity: 0.6; right: 0.3em; }`,
        ];
        cssManager.addStyle(...cssStyle);
    }

    private createExtraParameterText() {
        let extraParameter = document.getElementById(EXTRA_PARAMETER_TEXT);
        if (extraParameter) return;

        extraParameter = document.createElement("div");
        extraParameter.id = EXTRA_PARAMETER_TEXT;
        extraParameter.style.right = "0.3em";
        extraParameter.style.marginTop = "-0.5em";
        extraParameter.style.textAlign = "right";
        extraParameter.style.fontSize = "0.8em";
        extraParameter.style.whiteSpace = "nowrap";
        extraParameter.classList.add(
            getSvelteClassName(this.#artifactSets.artifacts[0].element)
        );
        this.#artifactSets.element.appendChild(extraParameter);
    }

    // スコア評価方式
    private writeScoringMethod() {
        const selectScoreType = SelectScoreType.instance;
        const scoreTypeKey = selectScoreType.getScoreTypeKey();

        // 各聖遺物スコア
        for (const artifact of this.#artifactSets.artifacts) {
            const score = artifact.artifactScore(scoreTypeKey);
            const scoreBox =
                artifact.element.getElementsByClassName(EVALUATION_TEXT)[0];
            if (!scoreBox) continue;

            scoreBox.textContent = score.toFixed(1);
        }

        const extraText = document.getElementById(EXTRA_PARAMETER_TEXT);
        if (!extraText) return;

        const critRate = characterStat("CRITICAL");
        const critDMG = characterStat("CRITICAL_HURT");
        const critRatio = critDMG / critRate;

        const typeName = optionLocale.getLocaleSub(scoreTypeKey);
        const sumScore = this.#artifactSets.sumScore(scoreTypeKey);
        const avgScore = this.#artifactSets.avgScore(scoreTypeKey);

        extraText.textContent = this.getScoringInfoText(
            critRatio,
            typeName,
            sumScore,
            avgScore
        );
    }

    private writeRollValueMethod() {
        const rollValueMethod = RollValueMethodRoutine.instance;
        const scoreTypeKeys = rollValueMethod.getCheckedKeys();

        // 各聖遺物スコア
        for (const artifact of this.#artifactSets.artifacts) {
            const rv = artifact.rollValue(...scoreTypeKeys);
            const evaluateText =
                artifact.element.getElementsByClassName(EVALUATION_TEXT)[0];
            if (!evaluateText) continue;

            evaluateText.textContent = `${rv}%`;
        }

        const extraText = document.getElementById(EXTRA_PARAMETER_TEXT);
        if (!extraText) return;

        const critRate = characterStat("CRITICAL");
        const critDMG = characterStat("CRITICAL_HURT");
        const critRatio = critDMG / critRate;

        const statNames = scoreTypeKeys
            .map((key) => {
                const name = optionLocale.getLocaleSub(key);
                return name + (key.includes("PERCENT") ? "%" : "");
            });
        const sumRV = this.#artifactSets.sumRollValue(...scoreTypeKeys);

        extraText.textContent = this.getRVInfoText(
            critRatio,
            statNames,
            sumRV
        );
    }

    private getScoringInfoText(
        ratio: number,
        scoreTypeName: string,
        sumScore: number,
        avgScore: number
    ): string {
        const ratioFixed = ratio.toFixed(1);
        const sumScoreFixed = sumScore.toFixed(1);
        const avgScoreFixed = avgScore.toFixed(1);

        return fmt(optionLocale.getLocale("SCORE_EXTRA_INFO"), {
            critRatio: ratioFixed,
            selectStat: scoreTypeName,
            avgScore: avgScoreFixed,
            sumScore: sumScoreFixed,
        });
    }

    private getRVInfoText(
        ratio: number,
        statNames: string[],
        sumRV: number,
    ): string {
        const ratioFixed = ratio.toFixed(1);
        const sumRVFixed = sumRV.toFixed(0);

        return fmt(optionLocale.getLocale("RV_EXTRA_INFO"), {
            critRatio: ratioFixed,
            selectStats: statNames.join(" "),
            sumRV: sumRVFixed,
        });
    }
}
