import { EvaluationSelector } from "./evaluationBuildCard";
import { FormatBuildCard } from "./formatBuildCard";
import { LocalizeBuildCardFacade } from "./enkaBuildCard";

export namespace EnkaNetworkObserver {
    const enkaNetworkObserver = new MutationObserver(
        (mutations: MutationRecord[]) => {
            for (const mutation of mutations) {
                let element = mutation.target as HTMLElement;
                // characterDataによる検出では、classListを持たない#textが帰ってくるため、親elementに置き換え
                if (element.nodeName == "#text") {
                    element = element.parentElement!;
                }

                if (
                    element.classList.contains("Card") || // ビルドカードの出現確認
                    element.classList.contains("name") || // キャラ名
                    element.classList.contains("Dropdown-selectedItem") || // 言語
                    element.classList.contains("Tab") || // ビルドの種類
                    element.classList.contains("svelte-grjiuv") // ユーザー変更
                ) {
                    const localizeBuildCard = new LocalizeBuildCardFacade();

                    localizeBuildCard.format();
                    FormatBuildCard.formatBuildCard();
                    EvaluationSelector.createSelector();

                    localizeBuildCard.localize();
                    EvaluationSelector.localize();
                    EvaluationSelector.evaluate();
                    break;
                }
            }
        }
    );

    export function active() {
        enkaNetworkObserver.observe(document, {
            childList: true,
            characterData: true,
            subtree: true,
        });
    }
}
