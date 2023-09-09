import { LocalizeData, translateArray } from "./localizeData";

export class EN extends LocalizeData {
    protected translateArray: translateArray = {
        BASE_HP: {
            locale: "Base HP",
            sub: undefined,
        },
        BASE_ATTACK: {
            locale: "Base ATK",
            sub: undefined,
        },
        BASE_DEFENSE: {
            locale: "Base DEF",
            sub: undefined,
        },
        HP: {
            locale: "HP",
            sub: undefined,
        },
        ATTACK: {
            locale: "ATK",
            sub: undefined,
        },
        DEFENSE: {
            locale: "DEF",
            sub: undefined,
        },
        HP_PERCENT: {
            locale: "HP",
            sub: undefined,
        },
        ATTACK_PERCENT: {
            locale: "ATK",
            sub: undefined,
        },
        DEFENSE_PERCENT: {
            locale: "DEF",
            sub: undefined,
        },
        CRITICAL: {
            locale: "CRIT Rate",
            sub: "CR",
        },
        CRITICAL_HURT: {
            locale: "CRIT DMG",
            sub: "CD",
        },
        CHARGE_EFFICIENCY: {
            locale: "Energy Recharge",
            sub: "ER",
        },
        HEAL_ADD: {
            locale: "Healing Bonus",
            sub: undefined,
        },
        ELEMENT_MASTERY: {
            locale: "Elemental Mastery",
            sub: "EM",
        },
        PHYSICAL_ADD_HURT: {
            locale: "Physical DMG\nBonus",
            sub: undefined,
        },
        FIRE_ADD_HURT: {
            locale: "Pyro DMG\nBonus",
            sub: undefined,
        },
        ELEC_ADD_HURT: {
            locale: "Electro DMG\nBonus",
            sub: undefined,
        },
        WATER_ADD_HURT: {
            locale: "Hydro DMG\nBonus",
            sub: undefined,
        },
        WIND_ADD_HURT: {
            locale: "Anemo DMG\nBonus",
            sub: undefined,
        },
        ICE_ADD_HURT: {
            locale: "Cryo DMG\nBonus",
            sub: undefined,
        },
        ROCK_ADD_HURT: {
            locale: "Geo DMG\nBonus",
            sub: undefined,
        },
        GRASS_ADD_HURT: {
            locale: "Dendro DMG\nBonus",
            sub: undefined,
        },
        FRIEND: {
            locale: "Friendship",
            sub: undefined,
        },
        UNKNOWN: {
            locale: "Unknown",
            sub: undefined,
        },
    } as const;
}
