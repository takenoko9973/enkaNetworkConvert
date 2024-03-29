export const StatsKey = {
    base_hp: "BASE_HP",
    base_atk: "BASE_ATTACK",
    base_def: "BASE_DEFENSE",
    hp: "HP",
    atk: "ATTACK",
    def: "DEFENSE",
    hp_percent: "HP_PERCENT",
    atk_percent: "ATTACK_PERCENT",
    def_percent: "DEFENSE_PERCENT",
    crit_rate: "CRITICAL",
    crit_dmg: "CRITICAL_HURT",
    er: "CHARGE_EFFICIENCY",
    em: "ELEMENT_MASTERY",
    heal: "HEAL_ADD",
    physical: "PHYSICAL_ADD_HURT",
    pyro: "FIRE_ADD_HURT",
    electro: "ELEC_ADD_HURT",
    hydro: "WATER_ADD_HURT",
    anemo: "WIND_ADD_HURT",
    cryo: "ICE_ADD_HURT",
    geo: "ROCK_ADD_HURT",
    dendro: "GRASS_ADD_HURT",
    unknown: "UNKNOWN",
} as const;
export type StatsKey = (typeof StatsKey)[keyof typeof StatsKey];

export const MainOption = {
    hp: StatsKey.hp,
    atk: StatsKey.atk,
    hp_percent: StatsKey.hp_percent,
    atk_percent: StatsKey.atk_percent,
    def_percent: StatsKey.def_percent,
    crit_rate: StatsKey.crit_rate,
    crit_dmg: StatsKey.crit_dmg,
    er: StatsKey.er,
    em: StatsKey.em,
    heal: StatsKey.heal,
    physical: StatsKey.physical,
    pyro: StatsKey.pyro,
    electro: StatsKey.electro,
    hydro: StatsKey.hydro,
    anemo: StatsKey.anemo,
    cryo: StatsKey.cryo,
    geo: StatsKey.geo,
    dendro: StatsKey.dendro,
    unknown: StatsKey.unknown,
} as const;
export type MainOption = (typeof MainOption)[keyof typeof MainOption];

export const SubOption = {
    hp: StatsKey.hp,
    atk: StatsKey.atk,
    def: StatsKey.def,
    hp_percent: StatsKey.hp_percent,
    atk_percent: StatsKey.atk_percent,
    def_percent: StatsKey.def_percent,
    crit_rate: StatsKey.crit_rate,
    crit_dmg: StatsKey.crit_dmg,
    er: StatsKey.er,
    em: StatsKey.em,
    unknown: StatsKey.unknown,
} as const;
export type SubOption = (typeof SubOption)[keyof typeof SubOption];
