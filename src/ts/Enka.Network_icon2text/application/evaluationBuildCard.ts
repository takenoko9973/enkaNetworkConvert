import { EXTRA_PARAMETER_TEXT, EvaluationConst, cssManager } from "../consts";
import { EnkaNetworkUtil } from "../exception";
import { LocalizeKey } from "../types";
import { ScoringMethod, RollValueMethod } from "./evaluation";
import { BuildCard } from "../exception/enkaNetwork";
import { IEvaluateMethod } from "./evaluation/evaluationMethod";

export class EvaluateBuildCard {
    evaluateMethods: IEvaluateMethod[] = [];

    constructor() {
        this.evaluateMethods.push(new ScoringMethod());
        this.evaluateMethods.push(new RollValueMethod());
    }

    createSelector() {
        if (this.evaluateMethods.length == 0) return;
        if (document.getElementById(EvaluationConst.SELECTOR_ROW)) return;

        this.createEvaluationText();
        this.createExtraText();

        const svelte = EvaluationConst.METHOD_SELECTOR_SVELTE;
        const additions = document.getElementsByClassName("additions")[0];

        // 説明ヘッダーを追加
        const evaluateHeader = additions
            .getElementsByTagName("header")[0]
            .cloneNode(false) as HTMLElement;
        evaluateHeader.id = EvaluationConst.SELECTOR_HEADER;

        const textRow = additions.getElementsByTagName("header")[1];
        if (textRow) {
            textRow.before(evaluateHeader);
        } else {
            additions.appendChild(evaluateHeader);
        }

        // カードオプション枠に作成
        const rowElement = additions
            .getElementsByClassName("row")[0]
            .cloneNode(false) as HTMLElement;
        rowElement.id = EvaluationConst.SELECTOR_ROW;
        evaluateHeader.after(rowElement);

        // 評価方式選択欄を作成
        const evaluateDiv = this.methodSelector();
        rowElement.appendChild(this.methodSelector());

        cssManager.addStyle(
            `.methodRadio input:checked ~ .toggle.${svelte}:before { content: ''; border-radius: 1px; transform: scale(1); }`,
            `.methodRadio label.Checkbox.${svelte}:has(> input:checked) { opacity: 1; }`
        );

        // 聖遺物評価対象変更時に発火
        evaluateDiv.addEventListener("click", () => {
            this.evaluate();
        });
    }

    localize() {
        const localizeData = EnkaNetworkUtil.getLocalizeData();

        const evaluateHeader = document.getElementById(
            EvaluationConst.SELECTOR_HEADER
        );
        const methodSelectDiv = document.getElementById(
            EvaluationConst.SELECTOR_DIV
        );
        if (!evaluateHeader || !methodSelectDiv) return;

        evaluateHeader.innerText = localizeData.getLocale(
            LocalizeKey.evaluationInfo
        );
        for (const method of this.evaluateMethods) {
            const methodLabel = methodSelectDiv.getElementsByClassName(
                method.methodKey
            )[0];

            methodLabel.textContent = localizeData.getLocale(
                methodLabel.classList[0]
            );

            const methodModeSelect = document.getElementById(
                method.methodName
            )!;
            method.localizeSelector(methodModeSelect);
        }
    }

    evaluate() {
        const method = this.getSelectedMethod();
        const artifacts = BuildCard.getArtifacts();

        for (const artifact of artifacts) {
            const text =
                artifact.element.getElementsByClassName("evaluateText")[0];

            const evaluate = method.evaluateArtifact(artifact);
            text.textContent = method.formatEvaluate(evaluate);
        }

        const extraText = document.getElementById(EXTRA_PARAMETER_TEXT)!;
        extraText.textContent = method.cardExtraText();
    }

    getSelectedMethodId(): string {
        const checkedRadio = document.querySelector(
            `.methodRadio input:checked[name=${EvaluationConst.METHOD_SELECTOR_NAME}]`
        ) as HTMLInputElement;
        return checkedRadio?.value ?? this.evaluateMethods[0].methodName;
    }

    getSelectedMethod(): IEvaluateMethod {
        const id = this.getSelectedMethodId();
        for (const method of this.evaluateMethods) {
            if (id == method.methodName) return method;
        }

        return this.evaluateMethods[0];
    }

    getMethodRadioId(method: IEvaluateMethod): string {
        return `method_${method.methodName}_radio`;
    }

    private createEvaluationText() {
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
    }

    private createExtraText() {
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
    }

    private methodSelector(): HTMLDivElement {
        const methodDiv = document.createElement("div");
        methodDiv.id = EvaluationConst.SELECTOR_DIV;
        methodDiv.style.display = "flex";
        methodDiv.style.flexDirection = "column";

        // 評価方式選択Div
        const methodSelectDiv = document.createElement("div");
        methodSelectDiv.style.display = "flex";
        methodSelectDiv.style.flexWrap = "wrap";
        methodSelectDiv.style.gap = "0.5em";
        methodSelectDiv.style.paddingBottom = "0.6em";
        methodSelectDiv.classList.add(
            "methodRadio",
            EvaluationConst.METHOD_SELECTOR_SVELTE
        );
        methodDiv.appendChild(methodSelectDiv);

        // 方式選択
        const methodRadios = this.evaluateMethods.map((method) =>
            this.methodRadio(method)
        );
        methodRadios.forEach((radio) => methodSelectDiv.appendChild(radio));

        // デフォルト
        methodRadios[0]
            ?.getElementsByTagName("input")[0]
            ?.toggleAttribute("checked", true);

        for (const method of this.evaluateMethods) {
            const id = this.getMethodRadioId(method);

            const methodModeSelect = document.createElement("div");
            methodModeSelect.id = method.methodName;

            cssManager.addStyle(
                `:not(:has(#${id}:checked)) #${method.methodName} { display:none }`
            );

            method.createSelector(methodModeSelect);
            methodDiv.appendChild(methodModeSelect);
        }

        return methodDiv;
    }

    private methodRadio(method: IEvaluateMethod): HTMLElement {
        const id = this.getMethodRadioId(method);

        // 評価方式選択ボタンべーズ
        const baseLabel = document.createElement("label");
        baseLabel.style.marginTop = "0em";
        baseLabel.classList.add(
            "Checkbox",
            "Control",
            "sm",
            EvaluationConst.METHOD_SELECTOR_SVELTE
        );

        // radio
        const radio = document.createElement("input");
        radio.id = id;
        radio.name = EvaluationConst.METHOD_SELECTOR_NAME;
        radio.value = method.methodName;
        radio.toggleAttribute("hidden", true);
        radio.setAttribute("type", "radio");

        // 選択・非選択表示用
        const toggle = document.createElement("div");
        toggle.classList.add("toggle", EvaluationConst.METHOD_SELECTOR_SVELTE);

        // ラベル貼り付け先
        const methodNameBase = document.createElement("span");
        methodNameBase.classList.add(
            "info",
            EvaluationConst.METHOD_SELECTOR_SVELTE
        );
        // ラベル
        const methodName = document.createElement("span");
        methodName.classList.add(
            method.methodKey,
            "label",
            EvaluationConst.METHOD_SELECTOR_SVELTE
        );
        methodNameBase.appendChild(methodName);

        baseLabel.appendChild(radio);
        baseLabel.appendChild(toggle);
        baseLabel.appendChild(methodNameBase);

        return baseLabel;
    }
}
