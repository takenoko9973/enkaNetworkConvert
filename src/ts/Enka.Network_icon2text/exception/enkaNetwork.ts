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

/**
 * 要素から、"svelte"から始まるクラス名を取得
 */
export function getSvelteClassName(element: Element): string {
    return (
        Array.from(element.classList).filter((val) => val.match(/svelte/))[0] ??
        ""
    );
}

/**
 * 親要素から、適切なステータステキスト要素を生成
 */
export function createStatTextElement(parentElement: Element): HTMLElement {
    const className = getSvelteClassName(parentElement); // svelteを抽出
    const tag = parentElement.lastElementChild?.tagName ?? "div"; // 親要素と同じタグを抽出

    const statText = document.createElement(tag);
    statText.classList.add("statText");
    statText.classList.add(className);

    return statText;
}

/**
 * statTextを設置してIconを消す
 * @param parentElement 設置したい親要素
 * @param addSep 分割要素を追加するか (default: true)
 * @returns 設置したstatText
 */
export function addStatTextElement(parentElement: Element, addSep = true): HTMLElement | null {
    if (parentElement.getElementsByClassName("statText").length >= 1)
        return null;

    const icon =
        parentElement.getElementsByClassName("ShadedSvgIcon")[0] ?? // 影付きアイコン
        parentElement.getElementsByClassName("Icon")[0];

    if (addSep) {
        // 空白挿入
        const sep = getSeparateElement();
        sep.classList.add(getSvelteClassName(parentElement));
        icon.after(sep);
    }
    const statText = createStatTextElement(parentElement);
    icon.after(statText);

    parentElement.removeChild(icon);

    return statText;
}
