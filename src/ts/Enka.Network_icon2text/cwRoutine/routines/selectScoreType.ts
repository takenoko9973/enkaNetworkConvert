import {
    SCORE_RADIO_NAME,
    SCORE_SELECT_DIV,
    cssManager,
    optionLocale,
} from "../../myConst";
import { statsSubOptionKey } from "../../types/characterStatKey";
import { localeKeys } from "../../types/localeKeys";
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
        const cardToggles = document.getElementsByClassName("CardToggles")[0];
        if (document.getElementById("scoreSelectRow")) return;

        // カードオプション枠に作成
        const rowElement = cardToggles
            .getElementsByClassName("row")[0]
            .cloneNode(false) as HTMLElement;
        rowElement.id = "scoreSelectRow";
        cardToggles.getElementsByTagName("header")[2].before(rowElement);

        // 説明テキストを追加
        const scoreSelectClass: localeKeys = "SCORE_SELECT_INFO";
        const infoText = document.createElement("label");
        infoText.classList.add(scoreSelectClass, "svelte-1jzchrt");

        // スコア選択欄を作成
        const scoreSelectDiv = document.createElement("div");
        scoreSelectDiv.id = SCORE_SELECT_DIV;
        scoreSelectDiv.classList.add("Input", "svelte-1jzchrt");

        const scoreModeGroup = document.createElement("group");
        scoreModeGroup.style.marginTop = "-1em";
        scoreModeGroup.classList.add("inline_radio");
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
        scoreSelectDiv.appendChild(infoText);
        scoreSelectDiv.appendChild(scoreModeGroup);
        rowElement.appendChild(scoreSelectDiv);

        // 攻撃をデフォルトにする
        const atkRadioId = `SCORE_${SCORE_TYPES.ATTACK.id}_R`;
        document.getElementById(atkRadioId)?.toggleAttribute("checked", true);

        const radioStyle = [
            '.inline_radio input[type="radio"] { position: absolute; opacity: 0; }', // チェックボックスを隠す
            '.inline_radio label.radbox[type="radio"] { color: rgba(255,255,255,.5); }', // 普段は薄目
            '.inline_radio input[type="radio"]:checked + label.radbox[type="radio"] { color: rgba(255,255,255,1); }', // 選択しているボタンを強調
        ];
        cssManager.addStyle(...radioStyle);
    }

    writeText() {
        const scoreSelectDiv = document.getElementById(SCORE_SELECT_DIV);
        if (!scoreSelectDiv) return;

        // スコア方式選択説明テキスト
        const scoreSelectInfo = scoreSelectDiv.children[0];
        scoreSelectInfo.textContent = optionLocale.getLocale(
            scoreSelectInfo.classList[0]
        );

        // スコア方式選択ボタン
        const scoreButtons = scoreSelectDiv.getElementsByClassName("Button");
        for (const label of Array.from(scoreButtons)) {
            label.textContent = optionLocale.getLocaleSub(label.classList[0]);
        }
    }

    getScoreTypeId(): string {
        const checkedRadio = document.querySelector(
            `input:checked[name=${SCORE_RADIO_NAME}]`
        ) as HTMLInputElement;
        return checkedRadio?.value ?? SCORE_TYPES.ATTACK.key;
    }

    getScoreTypeKey(): statsSubOptionKey {
        const scoreH = this.getScoreTypeId();
        for (const typeKey in SCORE_TYPES) {
            const scoreType = SCORE_TYPES[typeKey];
            if (scoreH != scoreType.id) continue;

            return scoreType.key;
        }

        return "ATTACK_PERCENT";
    }
}
