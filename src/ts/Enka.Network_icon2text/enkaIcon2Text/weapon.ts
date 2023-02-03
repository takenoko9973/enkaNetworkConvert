import { weapon, BASE_ATK_CLASS, optionLocale } from "../myConst";
import { addStatTextElement } from "../util/enkaUtil";

export function createTextInWeapon() {
    // 武器
    const weaponInfo = weapon[0].getElementsByTagName("content")[0];
    const subStat = weaponInfo.getElementsByClassName("Substat") as HTMLCollectionOf<HTMLElement>;

    addStatTextElement(subStat[0]);

    // サブステータス
    if (!subStat[1]) return;
    addStatTextElement(subStat[1]);
}

// 武器オプションの日本語化
export function weaponOPIcon2Text() {
    const subStat = weapon[0].getElementsByClassName("Substat");

    const baseAtk = subStat[0].getElementsByClassName("statText")[0] as HTMLElement;
    if (baseAtk) {
        baseAtk.innerText = optionLocale.getLocale(BASE_ATK_CLASS);
    }

    if (!subStat[1]) return;

    const weaponSub = subStat[1].getElementsByClassName("statText")[0] as HTMLElement;
    if (weaponSub) {
        weaponSub.innerText = optionLocale.getLocale(subStat[1].classList[1]);
    }
}
