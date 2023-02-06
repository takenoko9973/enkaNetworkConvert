import { characterBaseStatKey } from "../types/characterBaseStatKey";
import { characterStatKey } from "../types/characterStatKey";
import { languages } from "../types/languages";

/**
 * 表示させているプレイヤーのUIDと名前を取得
 */
export function getPlayerInfo(): [string, string] {
    const pathname = location.pathname.split("/")[2] ?? "";
    const playerUID = pathname.split("/")[2]; // urlからUIDを取得
    const playerInfo = document.getElementsByClassName("PlayerInfo")[0];
    const playerName = playerInfo.getElementsByTagName("h1")[0].innerText; // プレイヤー名を取得

    return [playerUID, playerName];
}

/**
 * 余白用要素を返す
 */
export function getSeparateElement(): HTMLSpanElement {
    const separateElement = document.createElement("span");
    separateElement.classList.add("sep");

    return separateElement;
}

export function getLocale(): languages {
    const language = document.getElementsByClassName(
        "Dropdown-selectedItem"
    )[0] as HTMLElement;
    return language.innerText as languages;
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

/**
 * BaseStat用Keyを通常ステータスKeyに変換
 */
export function baseKey2Normal(key: characterBaseStatKey): characterStatKey {
    return key.replace(/BASE_/g, "") as characterStatKey;
}
