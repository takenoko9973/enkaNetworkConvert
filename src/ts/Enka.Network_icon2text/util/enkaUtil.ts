import { $charaStats, SCORE_RADIO_NAME } from "../myConst";
import { languages } from "../types/languages";

/**
 * 表示させているプレイヤーのUIDと名前を取得
 */
export function getPlayerInfo(): [string, string] {
    const pathname = location.pathname.split("/")[2] ?? "";
    const playerUID = pathname.split("/")[2]; // urlからUIDを取得
    const $playerInfo = document.getElementsByClassName("PlayerInfo")[0];
    const playerName = $playerInfo.getElementsByTagName("h1")[0].innerText; // プレイヤー名を取得

    return [playerUID, playerName];
}

/**
 * キャラクターの合計ステータスを取得
 */
export function getCharacterStats(key: string): number {
    const $statsList = $charaStats[0].children;
    const index = Array.from($statsList)
        .map((stat) => stat.classList[1])
        .indexOf(key);
    if (index === -1) return 0;

    const stat = ($statsList[index].children[1].children[2] as HTMLElement)
        .innerText;
    return Number(stat.replace(/[^0-9.]/g, ""));
}

/**
 * 余白用要素を返す
 */
export function getSeparateElement(): HTMLSpanElement {
    const $separateElement = document.createElement("span");
    $separateElement.classList.add("sep");

    return $separateElement;
}

export function getLanguage(): languages {
    const $language = document.getElementsByClassName(
        "Dropdown-selectedItem"
    )[0] as HTMLElement;
    return $language.innerText as languages;
}

export function getScoreType(): string {
    return (
        (
            document.querySelector(
                `input:checked[name=${SCORE_RADIO_NAME}]`
            ) as HTMLInputElement
        ).value ?? "A"
    );
}

/**
 * 親要素から、適切なステータステキスト要素を生成
 */
export function createStatTextElement(parentElement: Element): Element {
    const className =
        Array.from(parentElement.classList).filter((val) =>
            val.match(/svelte/)
        )[0] ?? "";
    const tag = parentElement.lastElementChild?.tagName ?? "div";

    const statText = document.createElement(tag);
    statText.classList.add("statText");
    statText.classList.add(className);
    statText.style.fontWeight = "bold";

    return statText;
}

/**
 * statTextを設置してIconを消す
 * @param parentElement 設置したい親要素
 * @param addSep 分割要素を追加するか (default: true)
 * @returns 設置したstatText
 */
export function addStatTextElement(parentElement: Element, addSep = true): Element | null {
    if (parentElement.getElementsByClassName("statText").length >= 1)
        return null;

    const icon =
        parentElement.getElementsByClassName("ShadedSvgIcon")[0] ?? // 影付きアイコン
        parentElement.getElementsByClassName("Icon")[0];

    const statText = createStatTextElement(parentElement);
    if (addSep) icon.after(getSeparateElement());
    icon.after(statText);

    parentElement.removeChild(icon);

    return statText;
}
