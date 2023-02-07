import type { ILocale } from "../types/ILocale";
import type { localeKeys } from "../types/localeKeys";
import type { TranslateWordSet } from "../types/TranslateWordSet";
import { languages } from "../types/languages";
import { getLocale } from "../util/enkaUtil";

type TranslateArray = {
    [option in localeKeys]: TranslateWordSet;
};

type LanguageArray = {
    [lang in languages]: TranslateArray | undefined;
};

const localeArray: LanguageArray = {
    "": undefined,
    DE: undefined,
    EN: undefined,
    ES: undefined,
    FR: undefined,
    ID: undefined,
    IT: undefined,
    PT: undefined,
    RU: undefined,
    TH: undefined,
    TR: undefined,
    VI: undefined,
    JA: undefined,
    KO: undefined,
    "ZH-CH": undefined,
    "ZH-TW": undefined,
};

localeArray["EN"] = {
    BASE_HP: {
        locale: "Base HP",
        subOption: undefined,
    },
    BASE_ATTACK: {
        locale: "Base ATK",
        subOption: undefined,
    },
    BASE_DEFENSE: {
        locale: "Base DEF",
        subOption: undefined,
    },
    HP: {
        locale: "HP",
        subOption: undefined,
    },
    ATTACK: {
        locale: "ATK",
        subOption: undefined,
    },
    DEFENSE: {
        locale: "DEF",
        subOption: undefined,
    },
    HP_PERCENT: {
        locale: "HP",
        subOption: undefined,
    },
    ATTACK_PERCENT: {
        locale: "ATK",
        subOption: undefined,
    },
    DEFENSE_PERCENT: {
        locale: "DEF",
        subOption: undefined,
    },
    CRITICAL: {
        locale: "Crit Rate",
        subOption: undefined,
    },
    CRITICAL_HURT: {
        locale: "Crit DMG",
        subOption: undefined,
    },
    CHARGE_EFFICIENCY: {
        locale: "Energy Recharge",
        subOption: "ER",
    },
    HEAL_ADD: {
        locale: "Healing Bonus",
        subOption: undefined,
    },
    ELEMENT_MASTERY: {
        locale: "Elemental Mastery",
        subOption: "EM",
    },
    PHYSICAL_ADD_HURT: {
        locale: "Physical DMG\nBonus",
        subOption: undefined,
    },
    FIRE_ADD_HURT: {
        locale: "Pyro DMG\nBonus",
        subOption: undefined,
    },
    ELEC_ADD_HURT: {
        locale: "Electro DMG\nBonus",
        subOption: undefined,
    },
    WATER_ADD_HURT: {
        locale: "Hydro DMG\nBonus",
        subOption: undefined,
    },
    WIND_ADD_HURT: {
        locale: "Anemo DMG\nBonus",
        subOption: undefined,
    },
    ICE_ADD_HURT: {
        locale: "Cryo DMG\nBonus",
        subOption: undefined,
    },
    ROCK_ADD_HURT: {
        locale: "Geo DMG\nBonus",
        subOption: undefined,
    },
    GRASS_ADD_HURT: {
        locale: "Dendro DMG\nBonus",
        subOption: undefined,
    },
    FRIEND: {
        locale: "Friendship",
        subOption: undefined,
    },
    SCORE_SELECT_INFO: {
        locale: "Score type",
        subOption: undefined,
    },
    CARD_EXTRA_INFO: {
        locale: "Crit Ratio 1:${critRatio} / Score(${scoreType}) Avg. ${avgScore} Total ${sumScore}",
        subOption: undefined,
    },
    UNKNOWN: {
        locale: "Unknown",
        subOption: undefined,
    },
} as const;

localeArray["JA"] = {
    BASE_HP: {
        locale: "基礎HP",
        subOption: undefined,
    },
    BASE_ATTACK: {
        locale: "基礎攻撃力",
        subOption: undefined,
    },
    BASE_DEFENSE: {
        locale: "基礎防御力",
        subOption: undefined,
    },
    HP: {
        locale: "HP",
        subOption: undefined,
    },
    ATTACK: {
        locale: "攻撃力",
        subOption: undefined,
    },
    DEFENSE: {
        locale: "防御力",
        subOption: undefined,
    },
    HP_PERCENT: {
        locale: "HP",
        subOption: undefined,
    },
    ATTACK_PERCENT: {
        locale: "攻撃力",
        subOption: undefined,
    },
    DEFENSE_PERCENT: {
        locale: "防御力",
        subOption: undefined,
    },
    CRITICAL: {
        locale: "会心率",
        subOption: undefined,
    },
    CRITICAL_HURT: {
        locale: "会心ダメージ",
        subOption: "会心ダメ",
    },
    CHARGE_EFFICIENCY: {
        locale: "元素チャージ効率",
        subOption: "元チャ",
    },
    HEAL_ADD: {
        locale: "与える治癒効果",
        subOption: "与治癒",
    },
    ELEMENT_MASTERY: {
        locale: "元素熟知",
        subOption: undefined,
    },
    PHYSICAL_ADD_HURT: {
        locale: "物理ダメージ",
        subOption: undefined,
    },
    FIRE_ADD_HURT: {
        locale: "炎元素ダメージ",
        subOption: undefined,
    },
    ELEC_ADD_HURT: {
        locale: "雷元素ダメージ",
        subOption: undefined,
    },
    WATER_ADD_HURT: {
        locale: "水元素ダメージ",
        subOption: undefined,
    },
    WIND_ADD_HURT: {
        locale: "風元素ダメージ",
        subOption: undefined,
    },
    ICE_ADD_HURT: {
        locale: "氷元素ダメージ",
        subOption: undefined,
    },
    ROCK_ADD_HURT: {
        locale: "岩元素ダメージ",
        subOption: undefined,
    },
    GRASS_ADD_HURT: {
        locale: "草元素ダメージ",
        subOption: undefined,
    },
    FRIEND: {
        locale: "好感度",
        subOption: undefined,
    },
    SCORE_SELECT_INFO: {
        locale: "スコア計算方法",
        subOption: undefined,
    },
    CARD_EXTRA_INFO: {
        locale: "会心率ダメ比 1:${critRatio} / 聖遺物スコア(${scoreType}) 平均:${avgScore} 合計:${sumScore}",
        subOption: undefined,
    },
    UNKNOWN: {
        locale: "不明",
        subOption: undefined,
    },
} as const;

export class TranslateKey2Word implements ILocale {
    private static _instance: TranslateKey2Word;
    private translateArray: TranslateArray | undefined;

    public static get instance(): TranslateKey2Word {
        if (!this._instance) {
            this._instance = new TranslateKey2Word();
        }

        return this._instance;
    }

    private updatedLocate() {
        const locale = getLocale();
        this.translateArray = localeArray[locale];

        if (this.translateArray === undefined) {
            this.translateArray = localeArray["EN"];
        }
    }

    private isKey(checkKey: string): boolean {
        if (this.translateArray === undefined) return false;

        return checkKey in this.translateArray;
    }

    getLocale(key: string): string {
        this.updatedLocate();

        if (this.translateArray === undefined) return "";
        if (!this.isKey(key)) return this.translateArray["UNKNOWN"]["locale"];

        return this.translateArray[key as localeKeys]["locale"];
    }

    getLocaleSub(key: string): string {
        this.updatedLocate();

        if (this.translateArray === undefined) return "";
        if (!this.isKey(key)) return this.translateArray["UNKNOWN"]["locale"];

        return (
            this.translateArray[key as localeKeys]["subOption"] ??
            this.translateArray[key as localeKeys]["locale"]
        );
    }
}
