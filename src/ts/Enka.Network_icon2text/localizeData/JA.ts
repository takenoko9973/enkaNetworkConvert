import { LocalizeData, translateArray } from "./localizeData";

export class JA extends LocalizeData {
    protected translateArray: translateArray = {
        BASE_HP: {
            locale: "基礎HP",
            sub: undefined,
        },
        BASE_ATTACK: {
            locale: "基礎攻撃力",
            sub: undefined,
        },
        BASE_DEFENSE: {
            locale: "基礎防御力",
            sub: undefined,
        },
        HP: {
            locale: "HP",
            sub: undefined,
        },
        ATTACK: {
            locale: "攻撃力",
            sub: undefined,
        },
        DEFENSE: {
            locale: "防御力",
            sub: undefined,
        },
        HP_PERCENT: {
            locale: "HP",
            sub: undefined,
        },
        ATTACK_PERCENT: {
            locale: "攻撃力",
            sub: undefined,
        },
        DEFENSE_PERCENT: {
            locale: "防御力",
            sub: undefined,
        },
        CRITICAL: {
            locale: "会心率",
            sub: undefined,
        },
        CRITICAL_HURT: {
            locale: "会心ダメージ",
            sub: "会心ダメ",
        },
        CHARGE_EFFICIENCY: {
            locale: "元素チャージ効率",
            sub: "元チャ",
        },
        HEAL_ADD: {
            locale: "与える治癒効果",
            sub: "与治癒",
        },
        ELEMENT_MASTERY: {
            locale: "元素熟知",
            sub: undefined,
        },
        PHYSICAL_ADD_HURT: {
            locale: "物理ダメージ",
            sub: undefined,
        },
        FIRE_ADD_HURT: {
            locale: "炎元素ダメージ",
            sub: undefined,
        },
        ELEC_ADD_HURT: {
            locale: "雷元素ダメージ",
            sub: undefined,
        },
        WATER_ADD_HURT: {
            locale: "水元素ダメージ",
            sub: undefined,
        },
        WIND_ADD_HURT: {
            locale: "風元素ダメージ",
            sub: undefined,
        },
        ICE_ADD_HURT: {
            locale: "氷元素ダメージ",
            sub: undefined,
        },
        ROCK_ADD_HURT: {
            locale: "岩元素ダメージ",
            sub: undefined,
        },
        GRASS_ADD_HURT: {
            locale: "草元素ダメージ",
            sub: undefined,
        },
        FRIEND: {
            locale: "好感度",
            sub: undefined,
        },
        EVALUATION_SELECTOR_INFO: {
            locale: "評価方式",
            sub: undefined,
        },
        SCORING_METHOD: {
            locale: "スコア方式",
            sub: undefined,
        },
        RV_METHOD: {
            locale: "RV方式",
            sub: undefined,
        },
        SCORE_EXTRA_INFO: {
            locale: "会心比 1:${critRatio} / スコア方式(${selectStat}) 平均:${avgScore} 合計:${sumScore}",
            sub: undefined,
        },
        RV_EXTRA_INFO: {
            locale: "会心比 1:${critRatio} / RV方式(${selectStats}) 合計:${sumRV}%",
            sub: undefined,
        },
        UNKNOWN: {
            locale: "不明",
            sub: undefined,
        },
    } as const;
}
