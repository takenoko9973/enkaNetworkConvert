import { EXTRA_PARAMETER_TEXT, EvaluationConst, cssManager } from '../consts';
import { EnkaNetworkUtil, BuildCard } from "../exception";

export namespace FormatBuildCard {
    const formatArtifacts = () => {
        // 聖遺物
        const artifacts = BuildCard.getArtifacts();

        // 聖遺物評価表示欄
        for (const artifact of Array.from(artifacts)) {
            // 複数個作成防止
            let evaluationText = artifact.element.getElementsByClassName(
                EvaluationConst.EVALUATION_TEXT
            )[0];
            if (evaluationText) continue;

            evaluationText = document.createElement("div");
            evaluationText.classList.add(
                EvaluationConst.EVALUATION_TEXT,
                EnkaNetworkUtil.getSvelteClassName(artifact.element)
            );
            artifact.element.appendChild(evaluationText);
        }
        cssManager.addStyle(
            `.Artifact .${EvaluationConst.EVALUATION_TEXT}{ position: absolute; font-size: 0.7em; opacity: 0.6; right: 0.3em; }`
        );
    };

    const createExtraText = () => {
        const sections = BuildCard.getBuildCardSections();

        if (document.getElementById(EXTRA_PARAMETER_TEXT)) return;

        const extraParameter = document.createElement("div");
        extraParameter.id = EXTRA_PARAMETER_TEXT;
        extraParameter.style.right = "0.3em";
        extraParameter.style.marginTop = "-0.5em";
        extraParameter.style.textAlign = "right";
        extraParameter.style.fontSize = "0.8em";
        extraParameter.style.whiteSpace = "nowrap";
        sections.right.appendChild(extraParameter);
    };

    export const formatBuildCard = () => {
        const sections = BuildCard.getBuildCardSections();

        // 各セクションの幅の調整
        sections.left.style.width = "36%";
        sections.middle.style.width = "24%";
        sections.middle.style.left = "34%";
        sections.right.style.width = "43%";

        formatArtifacts();

        createExtraText();
    };
}
