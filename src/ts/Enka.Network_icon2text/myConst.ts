import { localeKeys } from "./types/localeKeys";

export namespace myConst.element {
    export const $doc = document;
    export const $weapon = $doc.getElementsByClassName("Weapon");
    export const $charaStats = $doc.getElementsByClassName("StatsTable");
    export const $artifact = $doc.getElementsByClassName("Artifact");
}


export namespace myConst {
    export const VERSION = "v0.50";
}

export namespace myConst.className {
    export const BASE_ATK_CLASS: localeKeys = "BASE_ATTACK";
    export const TIME_STAMP = "timeStamp"
}