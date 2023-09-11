import { EXTRA_PARAMETER_TEXT, EvaluationConst, cssManager } from "../consts";
import { EnkaNetworkUtil } from "../exception";
import { LocalizeKey } from "../types";
import { ScoringMethod, RollValueMethod } from "./evaluation";
import { BuildCard } from '../exception/enkaNetwork';
import { IEvaluateMethod } from "./evaluation/evaluationMethod";

export namespace EvaluationSelector {
    const evaluate_methods = [new ScoringMethod(), new RollValueMethod()];

    export const createSelector = () => {
        if (document.getElementById(EvaluationConst.SELECTOR_ROW)) return;

        const cardToggles = document.getElementsByClassName("CardToggles")[0];

        // カードオプション枠に作成
        const rowElement = cardToggles
            .getElementsByClassName("row")[0]
            .cloneNode(false) as HTMLElement;
        rowElement.id = EvaluationConst.SELECTOR_ROW;
        rowElement.style.marginTop = "1em";
        cardToggles.getElementsByTagName("header")[2].before(rowElement);

        // 評価方式選択欄を作成
        const methodSelectDiv = document.createElement("div");
        methodSelectDiv.id = EvaluationConst.SELECTOR_DIV;
        methodSelectDiv.style.display = "flex";
        methodSelectDiv.style.flexDirection = "column";
        methodSelectDiv.classList.add("svelte-1jzchrt");
        rowElement.appendChild(methodSelectDiv);

        // 説明テキストを追加
        const infoText = document.createElement("label");
        infoText.classList.add(
            LocalizeKey.evaluationInfo,
            EnkaNetworkUtil.getSvelteClassName(methodSelectDiv)
        );
        methodSelectDiv.appendChild(infoText);

        const methodGroup = document.createElement("group");
        methodGroup.style.display = "flex";
        methodGroup.style.flexWrap = "wrap";
        methodGroup.classList.add("methodRadio", "svelte-1893j5");
        methodSelectDiv.appendChild(methodGroup);

        for (const method of evaluate_methods) {
            const id = `evaluation_${method.methodName}_radio`;

            const baseLabel = document.createElement("label");
            baseLabel.style.marginTop = "0em";
            baseLabel.classList.add(
                "Checkbox",
                "Control",
                "sm",
                EnkaNetworkUtil.getSvelteClassName(methodGroup)
            );

            // ボタン
            const radio = document.createElement("input");
            radio.id = id;
            radio.name = EvaluationConst.SELECTOR_NAME;
            radio.style.display = "none";
            radio.setAttribute("type", "radio");
            radio.value = method.methodName;

            const toggle = document.createElement("div");
            toggle.classList.add(
                "toggle",
                EnkaNetworkUtil.getSvelteClassName(methodGroup)
            );

            // ラベル (ボタンとリンクさせる)
            const methodNameBase = document.createElement("span");
            methodNameBase.setAttribute("for", id);
            methodNameBase.setAttribute("type", "radio");
            methodNameBase.classList.add(
                "info",
                EnkaNetworkUtil.getSvelteClassName(methodGroup)
            );

            // ラベル (ボタンとリンクさせる)
            const methodName = document.createElement("span");
            methodName.classList.add(
                method.methodKey,
                "label",
                EnkaNetworkUtil.getSvelteClassName(methodGroup)
            );
            methodNameBase.appendChild(methodName);

            baseLabel.appendChild(radio);
            baseLabel.appendChild(toggle);
            baseLabel.appendChild(methodNameBase);
            methodGroup.appendChild(baseLabel);

            methodSelectDiv.appendChild(method.createSelector());
            cssManager.addStyle(
                `:not(:has(#${id}:checked)) #${method.methodKey} { display:none }`
            );
        }

        // デフォルトはスコア方式
        const scoringSelectId = `evaluation_${evaluate_methods[0].methodName}_radio`;
        document
            .getElementById(scoringSelectId)
            ?.toggleAttribute("checked", true);

        cssManager.addStyle(
            ".methodRadio input:checked ~ .toggle.svelte-1893j5:before { content: ''; border-radius: 1px; transform: scale(1); }",
            ".methodRadio .Checkbox.svelte-1893j5.svelte-1893j5:has(> input:checked) { opacity: 1; }"
        );

        // 聖遺物評価対象変更時に発火
        document
            .getElementsByName(EvaluationConst.SELECTOR_NAME)
            .forEach((e) => {
                e.addEventListener("click", evaluate);
            });
        for (const method of evaluate_methods) {
            document.getElementsByName(method.methodName).forEach((e) => {
                e.addEventListener("click", evaluate);
            });
        }
    };

    export const localize = () => {
        const localizeData = EnkaNetworkUtil.getLocalizeData();

        const methodSelectDiv = document.getElementById(
            EvaluationConst.SELECTOR_DIV
        );
        if (!methodSelectDiv) return;

        const infoText = methodSelectDiv.children[0];
        infoText.textContent = localizeData.getLocale(infoText.classList[0]);

        for (const method of evaluate_methods) {
            const methodLabel = methodSelectDiv.getElementsByClassName(
                method.methodKey
            )[0];

            methodLabel.textContent = localizeData.getLocale(
                methodLabel.classList[0]
            );

            method.localizeSelector();
        }
    };

    export const evaluate = () => {
        const method = getSelectedMethod();
        const artifacts = BuildCard.getArtifacts();

        for (const artifact of artifacts) {
            const text = artifact.element.getElementsByClassName("evaluateText")[0];

            const evaluate = method.evaluateArtifact(artifact);
            text.textContent = method.formatEvaluate(evaluate);
        }

        const extraText = document.getElementById(EXTRA_PARAMETER_TEXT)!;
        extraText.textContent = method.cardExtraText();
    };

    const getSelectedMethodId = (): string => {
        const checkedRadio = document.querySelector(
            `.methodRadio input:checked[name=${EvaluationConst.SELECTOR_NAME}]`
        ) as HTMLInputElement;
        return checkedRadio?.value ?? evaluate_methods[0].methodName;
    };

    const getSelectedMethod = (): IEvaluateMethod => {
        const id = getSelectedMethodId();
        for (const method of evaluate_methods) {
            if (id == method.methodName) return method;
        }

        return evaluate_methods[0];
    };

}
