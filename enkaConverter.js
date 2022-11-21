const LANGUAGE = {
    EN: "EN",
    JA: "JA",
};

class EnkaConverter {
    constructor() { }

    #CONVERT_TEXT = {
        BASE_ATK: {
            className: "BASE_ATK",
            [LANGUAGE.EN]: "Base ATK",
            [LANGUAGE.JA]: "基礎攻撃力",
        },
        HP: {
            className: "HP",
            [LANGUAGE.EN]: "HP",
            [LANGUAGE.JA]: "HP",
        },
        HP_P: {
            className: "HP_PERCENT",
            [LANGUAGE.EN]: "HP",
            [LANGUAGE.JA]: "HP",
        },
        ATK: {
            className: "ATTACK",
            [LANGUAGE.EN]: "ATK",
            [LANGUAGE.JA]: "攻撃力",
        },
        ATK_P: {
            className: "ATTACK_PERCENT",
            [LANGUAGE.EN]: "ATK",
            [LANGUAGE.JA]: "攻撃力",
        },
        DEF: {
            className: "DEFENSE",
            [LANGUAGE.EN]: "DEF",
            [LANGUAGE.JA]: "防御力",
        },
        DEF_P: {
            className: "DEFENSE_PERCENT",
            [LANGUAGE.EN]: "DEF",
            [LANGUAGE.JA]: "防御力",
        },
        CRIT_RATE: {
            className: "CRITICAL",
            [LANGUAGE.EN]: "CRIT Rate",
            [LANGUAGE.JA]: "会心率",
        },
        CRIT_DMG: {
            className: "CRITICAL_HURT",
            [LANGUAGE.EN]: "CRIT DMG",
            [LANGUAGE.JA]: "会心ダメージ",
            sub: {
                [LANGUAGE.JA]: "会心ダメ",
            }
        },
        EM: {
            className: "ELEMENT_MASTERY",
            [LANGUAGE.EN]: "Elemental Mastery",
            [LANGUAGE.JA]: "元素熟知",
            sub: {
                [LANGUAGE.EN]: "EM",
            }
        },
        ENERGY_RECHARGE: {
            className: "CHARGE_EFFICIENCY",
            [LANGUAGE.EN]: "Energy Recharge",
            [LANGUAGE.JA]: "元素チャージ",
            sub: {
                [LANGUAGE.EN]: "ER",
                [LANGUAGE.JA]: "元素チャ",
            }
        },
        CRYO: {
            className: "ICE_ADD_HURT",
            [LANGUAGE.EN]: "Cryo DMG",
            [LANGUAGE.JA]: "氷元素ダメージ",
        },
        ANEMO: {
            className: "WIND_ADD_HURT",
            [LANGUAGE.EN]: "Anemo DMG",
            [LANGUAGE.JA]: "風元素ダメージ",
        },
        ELECTRO: {
            className: "ELEC_ADD_HURT",
            [LANGUAGE.EN]: "Electro DMG",
            [LANGUAGE.JA]: "雷元素ダメージ",
        },
        HYDRO: {
            className: "WATER_ADD_HURT",
            [LANGUAGE.EN]: "Hydro DMG",
            [LANGUAGE.JA]: "水元素ダメージ",
        },
        PYRO: {
            className: "FIRE_ADD_HURT",
            [LANGUAGE.EN]: "Pyro DMG",
            [LANGUAGE.JA]: "炎元素ダメージ",
        },
        DENDRO: {
            className: "GRASS_ADD_HURT",
            [LANGUAGE.EN]: "Dendro DMG",
            [LANGUAGE.JA]: "草元素ダメージ",
        },
        GEO: {
            className: "ROCK_ADD_HURT",
            [LANGUAGE.EN]: "Geo DMG",
            [LANGUAGE.JA]: "岩元素ダメージ",
        },
        PHYS: {
            className: "PHYSICAL_ADD_HURT",
            [LANGUAGE.EN]: "Physical DMG",
            [LANGUAGE.JA]: "物理ダメージ",
        },
        HEAL_BNS: {
            className: "HEAL_ADD",
            [LANGUAGE.EN]: "Healing Bonus",
            [LANGUAGE.JA]: "与える治癒効果",
        },
        FRIEND: {
            className: "FRIEND",
            [LANGUAGE.EN]: "Friendship",
            [LANGUAGE.JA]: "好感度",
        },
        SCORE_SELECT: {
            className: "SCORE_SELECT",
            [LANGUAGE.EN]: "Score type",
            [LANGUAGE.JA]: "スコア計算方法",
        },
        UNKNOWN: {
            className: "UNKNOWN",
            [LANGUAGE.EN]: "Unknown",
            [LANGUAGE.JA]: "不明",
        }
    }

    /**
     * クラス名から、翻訳テーブルを取得
     * @param {String} className
     */
    getStatByClassName(className) {
        const array = Object.keys(this.#CONVERT_TEXT).map((k) => (this.#CONVERT_TEXT[k]));

        return array.find((s) => s.className === className);
    }

    /**
     * ステータス翻訳を返す
     * @param {String} language 
     * @param {String} className 
     * @param {Boolean} isSub サブOP用テキストを返すかどうか
     */
    getStatName(language, className, isSub) {
        // 対応していない言語ならば、英語に強制的に変更
        if (!(language in LANGUAGE)) language = LANGUAGE.EN;

        let stat = this.getStatByClassName(className);
        if (!stat) return this.#CONVERT_TEXT.UNKNOWN[language];
        if (!isSub) return stat[language];

        // サブステータス時の動作
        if (!("sub" in stat)) return stat[language];
        if (!(language in stat["sub"])) return stat[language];

        return stat["sub"][language];
    }

    /**
     * キーに対するステータスクラス名を取得
     * @param {String} key 
     */
    getClassName(key) {
        if (key in this.#CONVERT_TEXT)
            return this.#CONVERT_TEXT[key].className;
        else
            return this.#CONVERT_TEXT["UNKNOWN"].className;
    }
}
