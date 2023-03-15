import { RV_CHECKBOX_NAME, RV_SELECT_DIV, cssManager, optionLocale } from "../../myConst";
import { statsSubOptionKey } from "../../types/characterStatKey";
import { CreateWriteRoutine } from "../createWriteRoutine";

const STATS_OPTION_ID: { [key in statsSubOptionKey]: string } = {
    HP: "HP",
    ATTACK: "ATK",
    DEFENSE: "DEF",
    HP_PERCENT: "HP_P",
    ATTACK_PERCENT: "ATK_P",
    DEFENSE_PERCENT: "DEF_P",
    CRITICAL: "CR",
    CRITICAL_HURT: "CD",
    CHARGE_EFFICIENCY: "ER",
    ELEMENT_MASTERY: "EM",
} as const;


export class RollValueMethodRoutine implements CreateWriteRoutine {
    static #instance: RollValueMethodRoutine;

    public static get instance(): RollValueMethodRoutine {
        if (!this.#instance) {
            this.#instance = new RollValueMethodRoutine();
        }

        return this.#instance;
    }

    createText() {
        const cardToggles = document.getElementsByClassName("CardToggles")[0];
        if (document.getElementById("rvSelectRow")) return;

        // カードオプション枠に作成
        const rowElement = cardToggles
            .getElementsByClassName("row")[0]
            .cloneNode(false) as HTMLElement;
        rowElement.id = "rvSelectRow";
        cardToggles.getElementsByTagName("header")[2].before(rowElement);

        // スコア選択欄を作成
        const rvSelectDiv = document.createElement("div");
        rvSelectDiv.id = RV_SELECT_DIV;
        rvSelectDiv.classList.add("Input", "svelte-1jzchrt");
        rowElement.appendChild(rvSelectDiv);

        const rvSelectGroup = document.createElement("group");
        rvSelectGroup.style.marginTop = "-1em";
        rvSelectGroup.classList.add("rvSelectCheckbox");
        rvSelectDiv.appendChild(rvSelectGroup);

        for (const scoreType in STATS_OPTION_ID) {
            const statId = STATS_OPTION_ID[scoreType as statsSubOptionKey];
            const checkboxId = `RV_${statId}_CHECKBOX`;

            // ボタン
            const checkbox = document.createElement("input");
            checkbox.id = checkboxId;
            checkbox.name = RV_CHECKBOX_NAME;
            checkbox.setAttribute("type", "checkbox");
            checkbox.value = STATS_OPTION_ID[scoreType as statsSubOptionKey];

            // ラベル (ボタンとリンクさせる)
            const label = document.createElement("label");
            label.setAttribute("for", checkboxId);
            label.setAttribute("type", "checkbox");
            label.setAttribute("data-type", "OUTLINE");
            label.classList.add(
                scoreType,
                "radbox",
                "Button",
                "label",
                "svelte-6y8083"
            );

            rvSelectGroup.appendChild(checkbox);
            rvSelectGroup.appendChild(label);
        }

        // 攻撃をデフォルトにする
        const crRadioId = `RV_${STATS_OPTION_ID.CRITICAL}_CHECKBOX`;
        const cdRadioId = `RV_${STATS_OPTION_ID.CRITICAL_HURT}_CHECKBOX`;
        const atkRadioId = `RV_${STATS_OPTION_ID.ATTACK_PERCENT}_CHECKBOX`;
        document.getElementById(crRadioId)?.toggleAttribute("checked", true);
        document.getElementById(cdRadioId)?.toggleAttribute("checked", true);
        document.getElementById(atkRadioId)?.toggleAttribute("checked", true);

        const radioStyle = [
            '.rvSelectCheckbox input { display:none }', // チェックボックスを隠す
            '.rvSelectCheckbox label.radbox { opacity: 0.5; }', // 普段は薄目
            '.rvSelectCheckbox input:checked + label.radbox { opacity: 1; }', // 選択しているボタンを強調
        ];
        cssManager.addStyle(...radioStyle);
    }

    writeText() {
        const rvSelectDiv = document.getElementById(RV_SELECT_DIV);
        if (!rvSelectDiv) return;

        // スコア方式選択ボタン
        const scoreButtons = rvSelectDiv.getElementsByClassName("Button");
        for (const label of Array.from(scoreButtons)) {
            const key = label.classList[0];
            if (key.includes("PERCENT")) {
                label.textContent = optionLocale.getLocaleSub(key) + "%";
            } else {
                label.textContent = optionLocale.getLocaleSub(key);
            }
        }
    }

    getCheckedIds(): string[] {
        const checkedIds: string[] = [];

        document.querySelectorAll(
            `.scoreModeRadio input:checked[name=${RV_CHECKBOX_NAME}]`
        ).forEach((element) => checkedIds.push(element.id));
        return checkedIds;
    }

    getCheckedKeys(): statsSubOptionKey[] {
        const checkedIds = this.getCheckedIds();

        return (Object.keys(STATS_OPTION_ID) as statsSubOptionKey[])
            .filter((key) => checkedIds.includes(STATS_OPTION_ID[key]));
    }
}