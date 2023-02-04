import { charaStats } from "../myConst";

/**
 * キャラクターの合計ステータスを取得
 */
export function characterStats(key: string): number {
    const statsList = charaStats[0].children;
    const index = Array.from(statsList)
        .map((stat) => stat.classList[1])
        .indexOf(key);
    if (index === -1) return 0;

    const stat = (statsList[index].children[1].children[2] as HTMLElement)
        .innerText;
    return Number(stat.replace(/[^0-9.]/g, ""));
}
