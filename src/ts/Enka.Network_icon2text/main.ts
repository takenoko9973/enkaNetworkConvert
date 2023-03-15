import { CreateWriteManager } from "./cwRoutine/cwManager";
import { SCORE_RADIO_NAME, cssManager } from "./myConst";
import { isIOS } from "./util/ios";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const cardBase = document.getElementsByClassName("CharacterList")[0].parentElement!;
const cardObserver = new MutationObserver(main);
cardObserver.observe(cardBase, {
    attributes: true,
    childList: true,
    subtree: true,
});

function main() {
    cardObserver.disconnect();

    // ###### キャラカードのデザイン変更 ######
    // cssの全面的な変更
    if (isIOS()) {
        cssManager.addStyle(".statText { font-weight: bold; font-size: 95%; }");
    } else {
        cssManager.addStyle(".statText { font-weight: bold; font-size: 100%; }");
    }

    // 全体の配置の変更
    const cardSection = document.getElementsByClassName(
        "section"
    ) as HTMLCollectionOf<HTMLElement>;
    // 左
    cardSection[0].style.width = "36%";
    // 中央
    cardSection[1].style.width = "24%";
    cardSection[1].style.left = "34%";
    // 右
    cardSection[2].style.width = "43%";

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
        cwManager.createText();
        cwManager.writeText();
    });
    observer.observe(charaName, observeConf); // キャラクター変更時
    observer.observe(language, observeConf); // 言語変更時

    // スコア評価対象変更時に発火
    document.getElementsByName(SCORE_RADIO_NAME).forEach(function (e) {
        e.addEventListener("click", function () {
            cwManager.writeText();
        });
    });
}
