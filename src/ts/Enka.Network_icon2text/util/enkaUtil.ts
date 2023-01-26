import * as myConst from "../myConst";
import { languages } from "../types/languages";

/**
 * 表示させているプレイヤーのUIDと名前を取得
 */
export function getPlayerInfo(): [string, string] {
    const pathname = location.pathname.split("/")[2] ?? "";
    const playerUID = pathname.split("/")[2]; // urlからUIDを取得
    const $playerInfo = myConst.$doc.getElementsByClassName("PlayerInfo")[0];
    const playerName = $playerInfo.getElementsByTagName("h1")[0].innerText; // プレイヤー名を取得

    return [playerUID, playerName];
}

/**
 * キャラクターの合計ステータスを取得
 */
export function getCharacterStats(key: string): number {
    const $statsList = myConst.$charaStats[0].children;
    const index = Array.from($statsList).map(stat => stat.classList[1]).indexOf(key);
    if (index === -1) return 0;

    const stat = ($statsList[index].children[1].children[2] as HTMLElement).innerText;
    return Number(stat.replace(/[^0-9.]/g, ''));
}

/**
 * 聖遺物を装備しているかどうか
 */
export function isEquippingArtifact(index: number): boolean {
    if (index < 0 || 4 < index) return false;

    return Array.from(myConst.$artifact[index].classList).indexOf("empty") === -1;
}

// 余白用要素を返す
export function getSeparateElement(): HTMLSpanElement {
    const $separateElement = myConst.$doc.createElement("span");
    $separateElement.classList.add("sep");

    return $separateElement;
}

export function getLanguage(): languages {
    const $language = myConst.$doc.getElementsByClassName("Dropdown-selectedItem")[0] as HTMLElement;
    return $language.innerText as languages;
}
