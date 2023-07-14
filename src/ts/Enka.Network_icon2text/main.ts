import { BuildCard } from "./class/buildCard";
import { CreateWriteManager } from "./cwRoutine/cwManager";
import { EVALUATION_SELECTOR_NAME, RV_CHECKBOX_NAME, SCORE_RADIO_NAME, cssManager } from "./myConst";
import { isIOS } from "./util/ios";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const cardBase = document.getElementsByClassName("CharacterList")[0].parentElement!;
const cardObserver = new MutationObserver(main);
cardObserver.observe(cardBase, {
    attributes: true,
    childList: true,
    subtree: true,
});

let buildCard: BuildCard;

function main() {
    cardObserver.disconnect();

    // ###### キャラカードのデザイン変更 ######
    // cssの全面的な変更
    if (isIOS()) {
        cssManager.addStyle(".statText { font-weight: bold; font-size: 95%; }");
    } else {
        cssManager.addStyle(".statText { font-weight: bold; font-size: 100%; }");
    }

    const card = document.getElementsByClassName("Card")[0];
    buildCard = new BuildCard(card);
    buildCard.init();
    buildCard.update();

    const cwManager = CreateWriteManager.instance;
    cwManager.createText();
    cwManager.writeText();

    const charaName = document.getElementsByClassName("name")[0];
    const language = document.getElementsByClassName(
        "Dropdown-selectedItem"
    )[0];
    // 言語やキャラクター変更時に再翻訳
    const observeConf = {
        childList: true,
        attributes: true,
        characterData: true,
    };
    const observer = new MutationObserver(() => {
        buildCard.init();
        buildCard.update();
        cwManager.writeText();
    });
    observer.observe(charaName, observeConf); // キャラクター変更時
    observer.observe(language, observeConf); // 言語変更時

    // 聖遺物評価対象変更時に発火
    document.getElementsByName(EVALUATION_SELECTOR_NAME).forEach(function (e) {
        e.addEventListener("click", function () {
            buildCard.update();
            cwManager.writeText();
        });
    });
    document.getElementsByName(SCORE_RADIO_NAME).forEach(function (e) {
        e.addEventListener("click", function () {
            buildCard.update();
            cwManager.writeText();
        });
    });
    document.getElementsByName(RV_CHECKBOX_NAME).forEach(function (e) {
        e.addEventListener("click", function () {
            buildCard.update();
            cwManager.writeText();
        });
    });
}
