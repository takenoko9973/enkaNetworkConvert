import { LocalizeKey } from "../../types";
import { IEvaluateMethod } from "./evaluationMethod";
import { SCORE_TYPE, STATS_OPTION_RATE, cssManager } from "../../consts";
import { SubOption } from "../../types";
import { BuildCard, EnkaNetworkUtil } from "../../exception";
import { Artifact } from "../artifact/artifact";
import { fmt } from "../../utils/format";

export class ScoringMethod implements IEvaluateMethod {
    methodName: string = "scoring";
    methodKey: LocalizeKey = LocalizeKey.scoring;

    private static radioId(name: string): string {
        return `SCORE_${name}_R`;
    }

    createSelector(baseElement: HTMLElement) {
        baseElement.classList.add("scoreModeRadio");

        for (const type in SCORE_TYPE) {
            const id = ScoringMethod.radioId(type);

            // ボタン
            const radio = document.createElement("input");
            radio.id = id;
            radio.name = "scoring";
            radio.setAttribute("type", "radio");
            radio.value = SCORE_TYPE[type];

            // ラベル (ボタンとリンクさせる)
            const label = document.createElement("label");
            label.setAttribute("for", id);
            label.setAttribute("data-type", "OUTLINE");
            label.classList.add("radbox", "Button", "label", "svelte-7wwvqf");

            // 攻撃をデフォルトにする
            if (SCORE_TYPE[type] == SubOption.atk_percent) {
                radio.toggleAttribute("checked", true);
            }

            baseElement.appendChild(radio);
            baseElement.appendChild(label);
        }

        cssManager.addStyle(
            ".scoreModeRadio input { display:none }", // チェックボックスを隠す
            ".scoreModeRadio label.radbox { opacity: 0.5; }", // 普段は薄目
            ".scoreModeRadio input:checked + label.radbox { opacity: 1; }"
        );
    }

    localizeSelector(baseElement: HTMLElement): void {
        const localizeData = EnkaNetworkUtil.getLocalizeData();

        const labels = baseElement.getElementsByTagName("label");

        for (const label of Array.from(labels)) {
            const radioId = label.getAttribute("for")!;
            const radio = document.getElementById(radioId)! as HTMLInputElement;
            const key = radio.value;

            if (key == SubOption.unknown) {
                label.innerText = localizeData.getLocaleSub(LocalizeKey.critOnly);
            } else {
                label.innerText = localizeData.getLocaleSub(key);
            }
        }
    }

    formatEvaluate(num: number): string {
        return num.toFixed(1);
    }

    evaluateArtifact(artifact: Artifact): number {
        const selectedOption = this.selectedOption();
        const rate = STATS_OPTION_RATE.ATTACK_PERCENT / STATS_OPTION_RATE[selectedOption];

        let sumScore = 0;
        for (const subStat of artifact.subStats) {
            let score = 0;

            switch (subStat.statKey) {
                case SubOption.crit_rate:
                    score = subStat.stat * 2;
                    break;
                case SubOption.crit_dmg:
                    score = subStat.stat;
                    break;
                case selectedOption:
                    score = subStat.stat * rate;
                    break;
            }

            sumScore += score;
        }
        return sumScore;
    }

    cardExtraText(): string {
        const localizeData = EnkaNetworkUtil.getLocalizeData();

        const artifacts = BuildCard.getArtifacts();
        const artifactCount = artifacts.filter(
            (artifact) => !artifact.element.classList.contains("empty")
        ).length;

        const selectedOption = this.selectedOption();
        let selectedStat = "";
        if (selectedOption == SubOption.unknown) {
            selectedStat = localizeData.getLocaleSub(LocalizeKey.critOnly);
        } else {
            selectedStat = localizeData.getLocaleSub(selectedOption);
        }

        const sumScore = artifacts
            .map((artifact) => this.evaluateArtifact(artifact))
            .reduce((sum, rv) => sum + rv);
        const avgScore = sumScore / artifactCount;

        return fmt(localizeData.getLocale(LocalizeKey.scoreExtra), {
            selectStat: selectedStat,
            avgScore: this.formatEvaluate(avgScore),
            sumScore: this.formatEvaluate(sumScore),
        });
    }

    selectedOption(): SubOption {
        const checked = document.querySelector(".scoreModeRadio input:checked") as HTMLInputElement;

        const option = checked?.value;
        return (option as SubOption) ?? SubOption.atk_percent;
    }
}
