import { SubOption } from "../types";

// 各ステータスの比率 (固定値はスコアに含まないようにするため inf)
export const STATS_OPTION_RATE: { [key in SubOption]: number } = {
    HP: Infinity,
    ATTACK: Infinity,
    DEFENSE: Infinity,
    HP_PERCENT: 3,
    ATTACK_PERCENT: 3,
    DEFENSE_PERCENT: 15 / 4,
    CRITICAL: 4,
    CRITICAL_HURT: 2,
    CHARGE_EFFICIENCY: 10 / 3,
    ELEMENT_MASTERY: 12,
    UNKNOWN: Infinity,
} as const;

// スコア計算基準指定 H:HP, A:攻撃力, D:防御力
export const SCORE_TYPE: { [key: string]: SubOption } = {
    HP: SubOption.hp_percent,
    ATTACK: SubOption.atk_percent,
    DEFENSE: SubOption.def_percent,
    EM: SubOption.em,
    ER: SubOption.er,
};
