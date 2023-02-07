import * as myConst from "./myConst";
import {
    createConvertTextElements,
    enkaIcon2Text,
} from "./enkaIcon2Text/enkaIcon2Text";
import { CreateWriteManager } from "./cwRoutine/cwManager";

const cwManager = CreateWriteManager.instance;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const cardBase = document.getElementsByClassName("CharacterList")[0].parentElement!;
const observer = new MutationObserver(hoge);
observer.observe(cardBase, { attributes: true, childList: true, subtree: true });

function hoge() {
    observer.disconnect();
    main();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function main() {
    // 武器
    const weaponInfo = myConst.weapon[0].getElementsByTagName(
        "content"
    )[0] as HTMLElement;
    const weaponName = weaponInfo.getElementsByTagName("h3")[0] as HTMLElement;
    weaponInfo.style.paddingRight = "0px";
    weaponName.style.fontWeight = "bold";
    (myConst.weapon[0].children[0] as HTMLElement).style.width = "30%"; // 武器画像

    // ###### キャラカードのデザイン変更 ######

    // cssの全面的な変更
    const cssStyle = [
        ".Card .Icon{ display:none !important }", // アイコンの削除
        ".stats.svelte-gp6viv .Substat { padding-top: 4%; }", // 武器ステータスの枠を大きく
        ".Card .Substat.svelte-1ut2kb8.svelte-1ut2kb8 { display: flex; align-items: center; margin-right: 0em; line-height: 95%; font-size: 98%; }", // サブステータスの枠を広げる
        ".substats.svelte-17qi811>.Substat { padding-right: 1.0em; }", // 聖遺物のサブステータスが右に行きすぎるので調整
        ".Artifact.svelte-17qi811 .ArtifactIcon { top: -37%; left: -6%; width: 28%; }", // 聖遺物画像の調整
        ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(1) { display: flex; align-items: center; top: 5%; font-size: 100%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; }", // 聖遺物メインステータスの調整
        ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(2) { padding: 4% 0%; }",
        ".mainstat.svelte-17qi811 > div.svelte-17qi811:nth-child(3) { max-height: 25% }",
    ];
    const style = document.createElement("style");
    style.innerHTML = cssStyle.join(" ");
    document.querySelector("head")?.append(style);

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
    cardSection[2].style.height = "97%";

    cwManager.init();
    cwManager.createText();
    createConvertTextElements();

    cwManager.writeText();
    enkaIcon2Text();

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
        createConvertTextElements();
        cwManager.writeText();
        enkaIcon2Text();
    });
    observer.observe(charaName, observeConf); // キャラクター変更時
    observer.observe(language, observeConf); // 言語変更時

    // スコア評価対象変更時に発火
    document.getElementsByName(myConst.SCORE_RADIO_NAME).forEach(function (e) {
        e.addEventListener("click", function () {
            cwManager.writeText();
            enkaIcon2Text();
        });
    });
}
