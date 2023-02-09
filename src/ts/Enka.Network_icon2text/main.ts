import { CreateWriteManager } from "./cwRoutine/cwManager";
import { SCORE_RADIO_NAME, cssManager } from "./myConst";

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
    const cssStyle = [
        ".Card .Icon{ display:none !important }", // アイコンの削除
        ".stats.svelte-j8ec66 .Substat { display: flex; margin-right: 0em; padding-top: 3%; margin-bottom: 1%; white-space: nowrap; }", // 武器ステータスの枠を大きく
        ".substats.svelte-17qi811 > .Substat { display: flex; align-items: center; padding-right: 1.0em; white-space: nowrap; }", // 聖遺物のサブステータスが右に行きすぎるので調整
        ".Artifact.svelte-17qi811 .ArtifactIcon { top: -37%; left: -6%; width: 28%; }", // 聖遺物画像の調整
        ".statText { font-weight: bold; }",
        ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(1) { display: flex; align-items: center; top: 5%; font-size: 100%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; justify-content: flex-end; align-self: unset; margin-left: unset;}", // 聖遺物メインステータスの調整
        ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(2) { padding: 4% 0%; }",
        ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(3) { max-height: 25% }",
    ];
    cssManager.addStyle(...cssStyle);

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
    cwManager.init();
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
