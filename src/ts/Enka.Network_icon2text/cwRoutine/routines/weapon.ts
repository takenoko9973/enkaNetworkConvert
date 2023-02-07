import { BASE_ATK_CLASS, optionLocale } from "../../myConst";
import { addStatTextElement } from "../../util/enkaUtil";
import { innerOptionText } from "../../util/innerOptionText";
import { CreateWriteRoutine } from "../createWriteRoutine";

export class Weapon implements CreateWriteRoutine {
    private static _instance: Weapon;
    private weapon = document.getElementsByClassName("Weapon");

    public static get instance(): Weapon {
        if (!this._instance) {
            this._instance = new Weapon();
        }

        return this._instance;
    }

    createText() {
        // 武器
        const weaponInfo = this.weapon[0].getElementsByTagName("content")[0];
        const subStat = weaponInfo.getElementsByClassName(
            "Substat"
        ) as HTMLCollectionOf<HTMLElement>;

        addStatTextElement(subStat[0]);

        // サブステータス
        if (!subStat[1]) return;
        addStatTextElement(subStat[1]);
    }

    writeText() {
        const subStat = this.weapon[0].getElementsByClassName("Substat");

        const statText = innerOptionText(subStat[0]);
        if (!statText) return;
        // このままでは「攻撃力」となってしまうため、「基礎攻撃力」に上書き
        statText.innerHTML = optionLocale.getLocale(BASE_ATK_CLASS);

        if (!subStat[1]) return;
        innerOptionText(subStat[1]);
    }
}
