import { SCORE_RADIO_NAME, SCORE_SELECT_DIV, optionLocale } from "../myConst";
import { localeKeys } from "../types/localeKeys";
import { CreateWriteRoutine } from "./createWriteRoutine";

class scoreType {
    #id;
    #key;
    #correction;

    constructor(id: string, key: localeKeys, correction: number) {
        this.#id = id;
        this.#key = key;
        this.#correction = correction;
    }

    get id() {
        return this.#id;
    }
    get key() {
        return this.#key;
    }
    get correction() {
        return this.#correction;
    }
}

// スコア計算基準指定 H:HP, A:攻撃力, D:防御力
export const SCORE_TYPE: { [key: string]: scoreType } = {
    HP: new scoreType("H", "HP_PERCENT", 1),
    ATTACK: new scoreType("A", "ATTACK_PERCENT", 1),
    DEFENSE: new scoreType("D", "DEFENSE_PERCENT", 0.8),
    EM: new scoreType("EM", "ELEMENT_MASTERY", 0.25),
};

export class SelectScoreType implements CreateWriteRoutine {
    private static _instance: SelectScoreType;

    public static get instance(): SelectScoreType {
        if (!this._instance) {
            this._instance = new SelectScoreType();
        }

        return this._instance;
    }

    getScoreType(): string {
        const checkedRadio = document.querySelector(
            `input:checked[name=${SCORE_RADIO_NAME}]`
        ) as HTMLInputElement;
        return checkedRadio?.value ?? SCORE_TYPE.ATTACK.key;
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
        scoreModeGroup.classList.add("inline_radio");
        for (const key in SCORE_TYPE) {
            const id = `SCORE_${key}_R`;

            // ボタン
            const radio = document.createElement("input");
            radio.id = id;
            radio.name = SCORE_RADIO_NAME;
            radio.setAttribute("type", "radio");
            radio.value = SCORE_TYPE[key].id;

            // ラベル (ボタンとリンクさせる)
            const label = document.createElement("label");
            label.setAttribute("for", id);
            label.setAttribute("type", "radio");
            label.setAttribute("data-type", "OUTLINE");
            label.style.marginTop = "0em";
            label.classList.add(
                SCORE_TYPE[key].key,
                "radbox",
                "Button",
                "label",
                "svelte-1gbd2i6"
            );

            scoreModeGroup.appendChild(radio);
            scoreModeGroup.appendChild(label);
        }
        scoreSelectDiv.appendChild(infoText);
        scoreSelectDiv.appendChild(scoreModeGroup);
        rowElement.appendChild(scoreSelectDiv);

        // 攻撃をデフォルトにする
        const atkRadioId = scoreSelectDiv
            .getElementsByClassName(SCORE_TYPE.ATTACK.key)[0]
            .getAttribute("for") as string;
        document.getElementById(atkRadioId)?.toggleAttribute("checked", true);

        const radioStyle = [
            '.inline_radio input[type="radio"] { position: absolute; opacity: 0; }', // チェックボックスを隠す
            '.inline_radio label.radbox[type="radio"] { color: rgba(255,255,255,.5); }', // 普段は薄目
            '.inline_radio input[type="radio"]:checked + label.radbox[type="radio"] { color: rgba(255,255,255,1); }', // 選択しているボタンを強調
        ].join(" ");
        const style = document.createElement("style");
        style.innerHTML = radioStyle;
        document.querySelector("head")?.append(style);
    }

    writeText() {
        const scoreSelectDiv = document.getElementById(SCORE_SELECT_DIV);
        if (!scoreSelectDiv) return;

        // スコア方式選択説明テキスト
        const scoreSelectInfo = scoreSelectDiv.children[0] as HTMLElement;
        scoreSelectInfo.innerText = optionLocale.getLocale(
            scoreSelectInfo.classList[0]
        );

        // スコア方式選択ボタン
        const scoreButtons = scoreSelectDiv.getElementsByClassName(
            "Button"
        ) as HTMLCollectionOf<HTMLElement>;
        for (const label of Array.from(scoreButtons)) {
            label.innerText = optionLocale.getLocaleSub(label.classList[0]);
        }
    }
}
