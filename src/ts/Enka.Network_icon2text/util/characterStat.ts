import { characterBaseStatKey } from "../types/characterStatKey";
import { characterStatKey } from "../types/characterStatKey";
import { baseStat2characterStat } from "./enkaUtil";

function characterStats(): Element[] {
    const charaStatsTable = document.getElementsByClassName("StatsTable")[0];
    const statsList = Array.from(charaStatsTable.children).filter(
        (row) => Array.from(row.classList).indexOf("row") !== -1
    );
    return statsList;
}

export function characterStatRow(key: characterStatKey): Element | undefined {
    const statsList = characterStats();
    const index = statsList.map((stat) => stat.classList[1]).indexOf(key);

    if (index === -1) return undefined;
    return statsList[index];
}

/**
 * キャラクターの合計ステータスを取得
 */
export function characterStat(key: characterStatKey): number {
    const statRow = characterStatRow(key);
    if (!statRow) return 0;

    const stat = (statRow.children[1].children[2] as HTMLElement).innerText;
    return Number(stat.replace(/[^0-9.-]/g, ""));
}

/**
 * キャラクターの基礎ステータスと増加分を取得
 * @returns [number, number]: [基礎ステータス, 増加量]
 */
export function characterBaseStat(key: characterBaseStatKey): [number, number] {
    const key2 = baseStat2characterStat(key);
    if (!key2) return [0, 0];
    const statRow = characterStatRow(key2);
    if (!statRow) return [0, 0];

    const stat = (statRow.children[2].children[0].children[1] as HTMLElement)
        .innerText;
    const statArray = stat
        .split("+", 2)
        .map((stat) => Number(stat.replace(/[^0-9.-]/g, "")));

    return [statArray[0], statArray[1]];
}
