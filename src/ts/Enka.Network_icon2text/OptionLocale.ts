import type { ILocale } from './interface/ILocale';
import type { optionKeys, otherKeys } from './interface/localeKeys';
import type { artifactOptionLocale } from "./interface/IArtifactOption"
import { languages } from './interface/languages';

type LocaleArray = {
    [option in optionKeys | otherKeys]: artifactOptionLocale;
}

type LanguageArray = {
    [lang in languages]: LocaleArray | undefined;
}

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
    "ZH-TW": undefined
};

localeArray["EN"] = {
    "BASE_ATTACK": {
        "locale": "Base ATK",
        "subOption": undefined
    },
    "HP": {
        "locale": "HP",
        "subOption": undefined
    },
    "ATTACK": {
        "locale": "ATK",
        "subOption": undefined
    },
    "DEFENSE": {
        "locale": "DEF",
        "subOption": undefined
    },
    "HP_PERCENT": {
        "locale": "HP",
        "subOption": undefined
    },
    "ATTACK_PERCENT": {
        "locale": "ATK",
        "subOption": undefined
    },
    "DEFENSE_PERCENT": {
        "locale": "DEF",
        "subOption": undefined
    },
    "CRITICAL": {
        "locale": "Crit Rate",
        "subOption": undefined
    },
    "CRITICAL_HURT": {
        "locale": "Crit DMG",
        "subOption": undefined
    },
    "CHARGE_EFFICIENCY": {
        "locale": "Energy Recharge",
        "subOption": "ER"
    },
    "HEAL_ADD": {
        "locale": "Healing Bonus",
        "subOption": undefined
    },
    "ELEMENT_MASTERY": {
        "locale": "Elemental Mastery",
        "subOption": "EM"
    },
    "PHYSICAL_ADD_HURT": {
        "locale": "Physical DMG Bonus",
        "subOption": undefined
    },
    "FIRE_ADD_HURT": {
        "locale": "Pyro DMG Bonus",
        "subOption": undefined
    },
    "ELEC_ADD_HURT": {
        "locale": "Electro DMG Bonus",
        "subOption": undefined
    },
    "WATER_ADD_HURT": {
        "locale": "Hydro DMG Bonus",
        "subOption": undefined
    },
    "WIND_ADD_HURT": {
        "locale": "Anemo DMG Bonus",
        "subOption": undefined
    },
    "ICE_ADD_HURT": {
        "locale": "Cryo DMG Bonus",
        "subOption": undefined
    },
    "ROCK_ADD_HURT": {
        "locale": "Geo DMG Bonus",
        "subOption": undefined
    },
    "GRASS_ADD_HURT": {
        "locale": "Dendro DMG Bonus",
        "subOption": undefined
    },
    "FRIEND": {
        "locale": "Friendship",
        "subOption": undefined
    },
    "SCORE_SELECT_INFO": {
        "locale": "Score type",
        "subOption": undefined
    },
    "UNKNOWN": {
        "locale": "Unknown",
        "subOption": undefined
    },
} as const;

localeArray["JA"] = {
    "BASE_ATTACK": {
        "locale": "基礎攻撃力",
        "subOption": undefined
    },
    "HP": {
        "locale": "HP",
        "subOption": undefined
    },
    "ATTACK": {
        "locale": "攻撃力",
        "subOption": undefined
    },
    "DEFENSE": {
        "locale": "防御力",
        "subOption": undefined
    },
    "HP_PERCENT": {
        "locale": "HP",
        "subOption": undefined
    },
    "ATTACK_PERCENT": {
        "locale": "攻撃力",
        "subOption": undefined
    },
    "DEFENSE_PERCENT": {
        "locale": "防御力",
        "subOption": undefined
    },
    "CRITICAL": {
        "locale": "会心率",
        "subOption": undefined
    },
    "CRITICAL_HURT": {
        "locale": "会心ダメージ",
        "subOption": "会心ダメ"
    },
    "CHARGE_EFFICIENCY": {
        "locale": "元素チャージ効率",
        "subOption": "元チャ"
    },
    "HEAL_ADD": {
        "locale": "与える治癒効果",
        "subOption": "与治癒"
    },
    "ELEMENT_MASTERY": {
        "locale": "元素熟知",
        "subOption": undefined
    },
    "PHYSICAL_ADD_HURT": {
        "locale": "物理ダメージ",
        "subOption": undefined
    },
    "FIRE_ADD_HURT": {
        "locale": "炎元素ダメージ",
        "subOption": undefined
    },
    "ELEC_ADD_HURT": {
        "locale": "雷元素ダメージ",
        "subOption": undefined
    },
    "WATER_ADD_HURT": {
        "locale": "水元素ダメージ",
        "subOption": undefined
    },
    "WIND_ADD_HURT": {
        "locale": "風元素ダメージ",
        "subOption": undefined
    },
    "ICE_ADD_HURT": {
        "locale": "氷元素ダメージ",
        "subOption": undefined
    },
    "ROCK_ADD_HURT": {
        "locale": "岩元素ダメージ",
        "subOption": undefined
    },
    "GRASS_ADD_HURT": {
        "locale": "草元素ダメージ",
        "subOption": undefined
    },
    "FRIEND": {
        "locale": "好感度",
        "subOption": undefined
    },
    "SCORE_SELECT_INFO": {
        "locale": "スコア計算方法",
        "subOption": undefined
    },
    "UNKNOWN": {
        "locale": "不明",
        "subOption": undefined
    },
} as const;

export class OptionLocale implements ILocale {
    private language: languages = ""
    private localeArray: LocaleArray | undefined;

    constructor(language: languages) {
        this.language = language;
        this.localeArray = localeArray[this.language];

        if (this.localeArray === undefined) {
            console.warn(`"${this.language}" is undefined. Set language "EN"`);
            this.localeArray = localeArray["EN"];
        }
    }

    private isKey(check: string): boolean {
        if (this.localeArray === undefined) return false;

        return check in this.localeArray;
    }

    getLocale(key: string): string {
        if (this.localeArray === undefined) return "";
        if (!this.isKey(key)) return this.localeArray["UNKNOWN"]["locale"];

        return this.localeArray[key as optionKeys | otherKeys]["locale"];
    }

    getLocaleSub(key: string): string {
        if (this.localeArray === undefined) return "";
        if (!this.isKey(key)) return this.localeArray["UNKNOWN"]["locale"];

        return this.localeArray[key as optionKeys | otherKeys]["subOption"]
            ?? this.localeArray[key as optionKeys | otherKeys]["locale"];
    }
}
