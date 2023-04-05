import { TranslateKey2Word } from "../../class/translate/translateKey2Word";
import {
    EVALUATION_SELECTOR,
    EVALUATION_SELECTOR_DIV,
    EVALUATION_SELECTOR_NAME,
    cssManager,
} from "../../myConst";
import { localeKeys } from "../../types/localeKeys";
import { getSvelteClassName } from "../../util/enkaUtil";
import { CreateWriteRoutine } from "../createWriteRoutine";

// スコア計算基準指定 H:HP, A:攻撃力, D:防御力
const EVALUATION_METHOD = [
    { id: "scoring", key: "SCORING_METHOD" },
    { id: "rollValue", key: "RV_METHOD" },
];

export class EvaluationSelector implements CreateWriteRoutine {
    static #instance: EvaluationSelector;

    public static get instance(): EvaluationSelector {
        if (!this.#instance) {
            this.#instance = new EvaluationSelector();
        }

        return this.#instance;
    }

    private _optionLocale!: TranslateKey2Word;

    createText() {
        const cardToggles = document.getElementsByClassName("CardToggles")[0];
        if (document.getElementById(EVALUATION_SELECTOR)) return;

        // カードオプション枠に作成
        const rowElement = cardToggles
            .getElementsByClassName("row")[0]
            .cloneNode(false) as HTMLElement;
        rowElement.id = EVALUATION_SELECTOR;
        rowElement.style.display = "flex";
        rowElement.style.flexDirection = "column";
        rowElement.style.alignItems = "flex-start";
        cardToggles.getElementsByTagName("header")[2].before(rowElement);

        // 評価方式選択欄を作成
        const methodSelectDiv = document.createElement("div");
        methodSelectDiv.id = EVALUATION_SELECTOR_DIV;
        methodSelectDiv.style.marginTop = "1em";
        methodSelectDiv.classList.add("svelte-1jzchrt");
        rowElement.appendChild(methodSelectDiv);

        // 説明テキストを追加
        const infoText = document.createElement("label");
        const evaluationSelectorInfo: localeKeys = "EVALUATION_SELECTOR_INFO";
        infoText.classList.add(
            evaluationSelectorInfo,
            getSvelteClassName(methodSelectDiv)
        );
        methodSelectDiv.appendChild(infoText);

        const methodGroup = document.createElement("group");
        methodGroup.style.display = "flex";
        methodGroup.style.flexWrap = "wrap";
        methodGroup.style.marginTop = "-1em";
        methodGroup.classList.add("methodRadio", "svelte-1893j5");
        methodSelectDiv.appendChild(methodGroup);

        for (const evaluationMethod of Object.values(EVALUATION_METHOD)) {
            const id = `evaluation_${evaluationMethod.id}_radio`;

            const baseLabel = document.createElement("label");
            baseLabel.classList.add(
                "Checkbox",
                "Control",
                "sm",
                getSvelteClassName(methodGroup)
            );

            // ボタン
            const radio = document.createElement("input");
            radio.id = id;
            radio.name = EVALUATION_SELECTOR_NAME;
            radio.style.display = "none";
            radio.setAttribute("type", "radio");
            radio.value = evaluationMethod.id;

            const toggle = document.createElement("div");
            toggle.classList.add("toggle", getSvelteClassName(methodGroup));

            // ラベル (ボタンとリンクさせる)
            const methodNameBase = document.createElement("span");
            methodNameBase.setAttribute("for", id);
            methodNameBase.setAttribute("type", "radio");
            methodNameBase.classList.add(
                "info",
                getSvelteClassName(methodGroup)
            );

            // ラベル (ボタンとリンクさせる)
            const methodName = document.createElement("span");
            methodName.classList.add(
                evaluationMethod.key,
                "label",
                getSvelteClassName(methodGroup)
            );
            methodNameBase.appendChild(methodName);

            baseLabel.appendChild(radio);
            baseLabel.appendChild(toggle);
            baseLabel.appendChild(methodNameBase);
            methodGroup.appendChild(baseLabel);
        }

        // デフォルトはスコア方式
        const scoringSelectId = `evaluation_${EVALUATION_METHOD[0].id}_radio`;
        document.getElementById(scoringSelectId)
            ?.toggleAttribute("checked", true);

        const radioStyle = [
            ".methodRadio input:checked ~ .toggle.svelte-1893j5:before { content: ''; border-radius: 1px; transform: scale(1); }",
            ".methodRadio .Checkbox.svelte-1893j5.svelte-1893j5:has(> input:checked) { opacity: 1; }",
        ];
        cssManager.addStyle(...radioStyle);
    }

    writeText() {
        this._optionLocale = TranslateKey2Word.getTranslate();

        const methodSelectDiv = document.getElementById(
            EVALUATION_SELECTOR_DIV
        );
        if (!methodSelectDiv) return;

        const infoText = methodSelectDiv.children[0];
        infoText.textContent = this._optionLocale.getLocale(infoText.classList[0]);

        for (const method of EVALUATION_METHOD) {
            const methodLabel = methodSelectDiv.getElementsByClassName(
                method.key
            )[0];
            methodLabel.textContent = this._optionLocale.getLocale(
                methodLabel.classList[0]
            );
        }
    }

    getSelectMethodId(): string {
        const checkedRadio = document.querySelector(
            `.methodRadio input:checked[name=${EVALUATION_SELECTOR_NAME}]`
        ) as HTMLInputElement;
        return checkedRadio?.value ?? EVALUATION_METHOD[0].id;
    }

    getSelectMethodKey(): localeKeys {
        const id = this.getSelectMethodId();
        for (const method of EVALUATION_METHOD) {
            if (id === method.id) return method.key as localeKeys;
        }

        return EVALUATION_METHOD[0].key as localeKeys;
    }
}
