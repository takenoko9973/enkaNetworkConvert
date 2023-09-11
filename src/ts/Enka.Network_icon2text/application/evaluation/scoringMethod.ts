import { LocalizeKey } from "../../types";
import { IEvaluateMethod } from "./evaluationMethod";
import { SCORE_TYPE, STATS_OPTION_RATE, cssManager } from "../../consts";
import { SubOption } from "../../types";
import { EnkaNetworkUtil } from "../../exception";
import { Artifact } from "../artifact/artifact";

export class ScoringMethod implements IEvaluateMethod {
    methodName: string = "scoring";
    methodKey: LocalizeKey = LocalizeKey.scoring;

    private static radioId(name: string): string {
        return `SCORE_${name}_R`;
    }

    createSelector(): HTMLElement {
        const group = document.createElement("group");
        group.id = this.methodKey;
        group.classList.add("scoreModeRadio");

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
            label.classList.add(
                SCORE_TYPE[type],
                "radbox",
                "Button",
                "label",
                "svelte-6y8083"
            );

            // 攻撃をデフォルトにする
            if (SCORE_TYPE[type] == SubOption.atk_percent) {
                radio.toggleAttribute("checked", true);
            }

            group.appendChild(radio);
            group.appendChild(label);
        }

        cssManager.addStyle(
            ".scoreModeRadio input { display:none }", // チェックボックスを隠す
            ".scoreModeRadio label.radbox { opacity: 0.5; }", // 普段は薄目
            ".scoreModeRadio input:checked + label.radbox { opacity: 1; }"
        );

        return group;
    }

    localizeSelector(): void {
        const localizeData = EnkaNetworkUtil.getLocalizeData();

        const group = document.getElementById(this.methodKey)!;
        const labels = group.getElementsByTagName("label");

        for (const label of Array.from(labels)) {
            const key = label.classList[0];
            label.innerText = localizeData.getLocaleSub(key);
        }
    }

    formatEvaluate(num: number): string {
        return num.toFixed(1);
    }

    evaluateArtifact(artifact: Artifact): number {
        const selectedOption = this.selectedOption();
        const rate = STATS_OPTION_RATE[selectedOption] / STATS_OPTION_RATE.ATTACK_PERCENT;

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
        throw new Error("Method not implemented.");
    }

    selectedOption(): SubOption {
        const checked = document.querySelector(
            ".scoreModeRadio input:checked"
        ) as HTMLInputElement;

        return checked?.value as SubOption ?? SubOption.atk_percent;
    }
}
