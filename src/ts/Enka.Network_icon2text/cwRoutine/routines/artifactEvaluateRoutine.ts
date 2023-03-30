import { Artifacts } from "../../class/artifact/artifact";
import { cssManager, optionLocale } from "../../myConst";
import { artifactScoring, artifactRollValue } from "../../util/artifactEvaluate";
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

    #artifacts!: Artifacts;

    createText() {
        this.#artifacts = new Artifacts(
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
        for (const artifact of this.#artifacts.artifacts) {
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
            getSvelteClassName(this.#artifacts.artifacts[0].element)
        );
        this.#artifacts.element.appendChild(extraParameter);
    }

    // スコア評価方式
    private writeScoringMethod() {
        const selectScoreType = SelectScoreType.instance;
        const scoreTypeKey = selectScoreType.getScoreTypeKey();

        // 各聖遺物スコア
        for (const artifact of this.#artifacts.artifacts) {
            const score = artifactScoring(artifact, scoreTypeKey);
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
        const sumScore = this.#artifacts.artifacts
            .map((_artifact) => artifactScoring(_artifact, scoreTypeKey))
            .reduce((_sum, _score) => _sum + _score);
        const artifactNum = this.#artifacts.artifactNum();
        const avgScore = (artifactNum != 0)
            ? sumScore / artifactNum
            : 0;

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
        for (const artifact of this.#artifacts.artifacts) {
            const rv = artifactRollValue(artifact, ...scoreTypeKeys);
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
        const sumRV = this.#artifacts.artifacts
            .map((_artifact) => artifactRollValue(_artifact, ...scoreTypeKeys))
            .reduce((_sum, _score) => _sum + _score);

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
