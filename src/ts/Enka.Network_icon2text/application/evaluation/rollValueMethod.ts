import { cssManager } from "../../consts";
import { BuildCard, EnkaNetworkUtil } from "../../exception";
import { SubOption } from "../../types";
import { LocalizeKey } from "../../types";
import { Artifact } from "../artifact/artifact";
import { IEvaluateMethod } from "./evaluationMethod";
import { fmt } from "../../utils/format";

export class RollValueMethod implements IEvaluateMethod {
    methodName = "rollValue";
    methodKey = LocalizeKey.rollValue;

    private static checkboxId(name: string): string {
        return `RV_${name}_CHECKBOX`;
    }

    createSelector(baseElement: HTMLElement) {
        baseElement.classList.add("rvSelectCheckbox");

        for (const statKey of Object.values(SubOption)) {
            if (statKey == SubOption.unknown) continue;

            const checkboxId = RollValueMethod.checkboxId(statKey);

            // ボタン
            const checkbox = document.createElement("input");
            checkbox.id = checkboxId;
            checkbox.name = "rollValue";
            checkbox.setAttribute("type", "checkbox");
            checkbox.value = statKey;

            // ラベル (ボタンとリンクさせる)
            const label = document.createElement("label");
            label.setAttribute("for", checkboxId);
            label.setAttribute("type", "checkbox");
            label.setAttribute("data-type", "OUTLINE");
            label.classList.add(
                statKey,
                "radbox",
                "Button",
                "label",
                "svelte-6y8083"
            );

            if (
                statKey == SubOption.crit_rate ||
                statKey == SubOption.crit_dmg ||
                statKey == SubOption.atk_percent
            ) {
                checkbox.toggleAttribute("checked", true);
            }

            baseElement.appendChild(checkbox);
            baseElement.appendChild(label);
        }

        cssManager.addStyle(
            ".rvSelectCheckbox input { display:none }", // チェックボックスを隠す
            ".rvSelectCheckbox label.radbox { opacity: 0.5; }", // 普段は薄目
            ".rvSelectCheckbox input:checked + label.radbox { opacity: 1; }" // 選択しているボタンを強調
        );
    }

    localizeSelector(baseElement: HTMLElement): void {
        const localizeData = EnkaNetworkUtil.getLocalizeData();

        const labels = baseElement.getElementsByTagName("label");

        for (const label of Array.from(labels)) {
            const key = label.classList[0];
            if (key.includes("PERCENT")) {
                label.innerText = localizeData.getLocaleSub(key) + "%";
            } else {
                label.innerText = localizeData.getLocaleSub(key);
            }
        }
    }

    formatEvaluate(num: number): string {
        return `${num}%`;
    }

    evaluateArtifact(artifact: Artifact): number {
        const selectedOptions = this.selectedOptions();

        let rollValue = 0;
        for (const subStat of artifact.subStats) {
            if (selectedOptions.includes(subStat.statKey)) {
                rollValue += subStat.rolls
                    .map((roll) => 100 - 10 * (4 - roll))
                    .reduce((sum, rv) => sum + rv);
            }
        }
        return rollValue;
    }

    cardExtraText(): string {
        const localizeData = EnkaNetworkUtil.getLocalizeData();

        const artifacts = BuildCard.getArtifacts();
        const selectedStats = this.selectedOptions().map((option) => {
            if (option.includes("PERCENT")) {
                return localizeData.getLocaleSub(option) + "%";
            } else {
                return localizeData.getLocaleSub(option);
            }
        });
        const sumRollValue = artifacts
            .map((artifact) => this.evaluateArtifact(artifact))
            .reduce((sum, rv) => sum + rv);

        return fmt(localizeData.getLocale(LocalizeKey.rollValueExtra), {
            selectStats: selectedStats.join(" "),
            sumRV: this.formatEvaluate(sumRollValue),
        });
    }

    selectedOptions(): SubOption[] {
        const checkedBoxes = document.querySelectorAll(
            ".rvSelectCheckbox input:checked"
        );

        return Array.from(checkedBoxes).map(
            (checked) => (checked as HTMLInputElement).value as SubOption
        );
    }
}
