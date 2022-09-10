const LANGUAGE = {
    EN: "EN",
    JA: "JA",
};

class EnkaConverter {
    constructor() {}

    CONVERT_TEXT = {
        BASE_ATK: {
            key: "BASE_ATK",
            [LANGUAGE.EN]: "Base ATK",
            [LANGUAGE.JA]: "基礎攻撃力",
        },
        HP: {
            key: "HP",
            [LANGUAGE.EN]: "HP",
            [LANGUAGE.JA]: "HP",
        },
        HP_P: {
            key: "HP_PERCENT",
            [LANGUAGE.EN]: "HP",
            [LANGUAGE.JA]: "HP",
        },
        ATK: {
            key: "ATTACK",
            [LANGUAGE.EN]: "ATK",
            [LANGUAGE.JA]: "攻撃力",
        },
        ATK_P: {
            key: "ATTACK_PERCENT",
            [LANGUAGE.EN]: "ATK",
            [LANGUAGE.JA]: "攻撃力",
        },
        DEF: {
            key: "DEFENSE",
            [LANGUAGE.EN]: "DEF",
            [LANGUAGE.JA]: "防御力",
        },
        DEF_P: {
            key: "DEFENSE_PERCENT",
            [LANGUAGE.EN]: "DEF",
            [LANGUAGE.JA]: "防御力",
        },
        CRIT_RATE: {
            key: "CRITICAL",
            [LANGUAGE.EN]: "CRIT Rate",
            [LANGUAGE.JA]: "会心率",
        },
        CRIT_DMG: {
            key: "CRITICAL_HURT",
            [LANGUAGE.EN]: "CRIT DMG",
            [LANGUAGE.JA]: "会心ダメージ",
            sub: {
                [LANGUAGE.JA]: "会心ダメ",
            }
        },
        EM: {
            key: "ELEMENT_MASTERY",
            [LANGUAGE.EN]: "Elemental Mastery",
            [LANGUAGE.JA]: "元素熟知",
            sub: {
                [LANGUAGE.EN]: "EM",
            }
        },
        ENERGY_RECHARGE: {
            key: "CHARGE_EFFICIENCY",
            [LANGUAGE.EN]: "Energy Recharge",
            [LANGUAGE.JA]: "元素チャージ",
            sub: {
                [LANGUAGE.EN]: "ER",
                [LANGUAGE.JA]: "元素チャ",
            }
        },
        CRYO: {
            key: "ICE_ADD_HURT",
            [LANGUAGE.EN]: "Cryo DMG",
            [LANGUAGE.JA]: "氷元素ダメージ",
        },
        ANEMO: {
            key: "WIND_ADD_HURT",
            [LANGUAGE.EN]: "Anemo DMG",
            [LANGUAGE.JA]: "風元素ダメージ",
        },
        ELECTRO: {
            key: "ELEC_ADD_HURT",
            [LANGUAGE.EN]: "Electro DMG",
            [LANGUAGE.JA]: "雷元素ダメージ",
        },
        HYDRO: {
            key: "WATER_ADD_HURT",
            [LANGUAGE.EN]: "Hydro DMG",
            [LANGUAGE.JA]: "水元素ダメージ",
        },
        PYRO: {
            key: "FIRE_ADD_HURT",
            [LANGUAGE.EN]: "Pyro DMG",
            [LANGUAGE.JA]: "炎元素ダメージ",
        },
        DENDRO: {
            key: "GRASS_ADD_HURT",
            [LANGUAGE.EN]: "Dendro DMG",
            [LANGUAGE.JA]: "草元素ダメージ",
        },
        GEO: {
            key: "ROCK_ADD_HURT",
            [LANGUAGE.EN]: "Geo DMG",
            [LANGUAGE.JA]: "岩元素ダメージ",
        },
        PHYS: {
            key: "PHYSICAL_ADD_HURT",
            [LANGUAGE.EN]: "Physical DMG",
            [LANGUAGE.JA]: "物理ダメージ",
        },
        HEAL_BNS: {
            key: "HEAL_ADD",
            [LANGUAGE.EN]: "Healing Bonus",
            [LANGUAGE.JA]: "与える治癒効果",
        },
        FRIEND: {
            key: "FRIEND",
            [LANGUAGE.EN]: "Friendship",
            [LANGUAGE.JA]: "好感度",
        },
        SCORE_SELECT: {
            key: "SCORE_SELECT",
            [LANGUAGE.EN]: "Score type",
            [LANGUAGE.JA]: "スコア計算方法",
        },
        UNKNOWN: {
            key: "UNKNOWN",
            [LANGUAGE.EN]: "Unknown",
            [LANGUAGE.JA]: "不明",
        }
    }

    getStatByClassName(className) {
        var array = Object.keys(this.CONVERT_TEXT).map((k)=>(this.CONVERT_TEXT[k]));

        return array.find((s) => s.key === className);
    }

    getStatName(language, className, isSub) {
        // 対応していない言語ならば、英語に強制的に変更
        if (!(language in LANGUAGE)) language = LANGUAGE.EN;

        let stat = this.getStatByClassName(className);
        if (!stat) return this.CONVERT_TEXT.UNKNOWN[language];
        if (!isSub) return stat[language];

        // サブステータス時の動作
        if (!("sub" in stat)) return stat[language];
        if (!(language in stat["sub"])) return stat[language];

        return stat["sub"][language];
    }

    getClassName(key) {
        if (key in this.CONVERT_TEXT) return this.CONVERT_TEXT[key].key;

        return this.CONVERT_TEXT["UNKNOWN"].key;
    }
}
