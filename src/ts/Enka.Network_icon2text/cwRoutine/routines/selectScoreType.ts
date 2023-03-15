import {
    EVALUATION_SELECTOR,
    SCORE_RADIO_NAME,
    SCORE_SELECT_DIV,
    cssManager,
    optionLocale,
} from "../../myConst";
import { statsSubOptionKey } from "../../types/characterStatKey";
import { CreateWriteRoutine } from "../createWriteRoutine";

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
const SCORE_TYPES: { [key: string]: scoreType } = {
    HP: new scoreType("H", "HP_PERCENT"),
    ATTACK: new scoreType("A", "ATTACK_PERCENT"),
    DEFENSE: new scoreType("D", "DEFENSE_PERCENT"),
    EM: new scoreType("EM", "ELEMENT_MASTERY"),
    ER: new scoreType("ER", "CHARGE_EFFICIENCY"),
};

export class SelectScoreType implements CreateWriteRoutine {
    private static _instance: SelectScoreType;

    public static get instance(): SelectScoreType {
        if (!this._instance) {
            this._instance = new SelectScoreType();
        }

        return this._instance;
    }

    createText() {
        const evaluationRow = document.getElementById(EVALUATION_SELECTOR);
        if (document.getElementById("scoreSelectRow")) return;

        // スコア選択欄を作成
        const scoreModeDiv = document.createElement("div");
        scoreModeDiv.id = SCORE_SELECT_DIV;
        scoreModeDiv.classList.add("Input", "svelte-1jzchrt");
        evaluationRow?.appendChild(scoreModeDiv);

        const scoreModeGroup = document.createElement("group");
        scoreModeGroup.style.marginTop = "-1em";
        scoreModeGroup.classList.add("scoreModeRadio");
        scoreModeDiv.appendChild(scoreModeGroup);

        for (const scoreType of Object.values(SCORE_TYPES)) {
            const id = `SCORE_${scoreType.id}_R`;

            // ボタン
            const radio = document.createElement("input");
            radio.id = id;
            radio.name = SCORE_RADIO_NAME;
            radio.setAttribute("type", "radio");
            radio.value = scoreType.id;

            // ラベル (ボタンとリンクさせる)
            const label = document.createElement("label");
            label.setAttribute("for", id);
            label.setAttribute("type", "radio");
            label.setAttribute("data-type", "OUTLINE");
            label.classList.add(
                scoreType.key,
                "radbox",
                "Button",
                "label",
                "svelte-6y8083"
            );

            scoreModeGroup.appendChild(radio);
            scoreModeGroup.appendChild(label);
        }

        // 攻撃をデフォルトにする
        const atkRadioId = `SCORE_${SCORE_TYPES.ATTACK.id}_R`;
        document.getElementById(atkRadioId)?.toggleAttribute("checked", true);

        const radioStyle = [
            `#${EVALUATION_SELECTOR}:not(:has(#evaluation_scoring_radio:checked)) #${SCORE_SELECT_DIV} { display:none }`,
            ".scoreModeRadio input { display:none }", // チェックボックスを隠す
            ".scoreModeRadio label.radbox { opacity: 0.5; }", // 普段は薄目
            ".scoreModeRadio input:checked + label.radbox { opacity: 1; }", // 選択しているボタンを強調
        ];
        cssManager.addStyle(...radioStyle);
    }

    writeText() {
        const scoreSelectDiv = document.getElementById(SCORE_SELECT_DIV);
        if (!scoreSelectDiv) return;

        // スコア方式選択ボタン
        const scoreButtons = scoreSelectDiv.getElementsByClassName("Button");
        for (const label of Array.from(scoreButtons)) {
            label.textContent = optionLocale.getLocaleSub(label.classList[0]);
        }
    }

    getScoreTypeId(): string {
        const checkedRadio = document.querySelector(
            `.scoreModeRadio input:checked[name=${SCORE_RADIO_NAME}]`
        ) as HTMLInputElement;
        return checkedRadio?.value ?? SCORE_TYPES.ATTACK.id;
    }

    getScoreTypeKey(): statsSubOptionKey {
        const id = this.getScoreTypeId();
        for (const typeKey in SCORE_TYPES) {
            const scoreType = SCORE_TYPES[typeKey];
            if (id === scoreType.id) return scoreType.key;
        }

        return "ATTACK_PERCENT";
    }
}
