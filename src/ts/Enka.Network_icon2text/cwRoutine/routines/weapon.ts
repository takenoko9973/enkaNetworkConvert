import { TranslateKey2Word } from "../../class/translate/translateKey2Word";
import { BASE_ATK_CLASS } from "../../myConst";
import { addStatTextElement, getSeparateElement } from "../../util/enkaUtil";
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
        const weaponImage = this.weapon[0].getElementsByTagName("figure")[0]; // 武器画像
        const weaponInfo = this.weapon[0].getElementsByClassName(
            "weapon-caption"
        )[0] as HTMLElement;

        const weaponName = weaponInfo.getElementsByClassName(
            "title"
        )[0] as HTMLElement;
        const weaponStatsInfo = weaponInfo.getElementsByClassName(
            "stats"
        )[0] as HTMLElement;
        const weaponRefine = weaponInfo.getElementsByClassName(
            "refine"
        )[0] as HTMLElement;

        weaponImage.style.width = "30%";

        weaponInfo.style.paddingRight = "0%";
        weaponName.style.fontWeight = "bold";

        weaponRefine.after(getSeparateElement());

        const subStats = Array.from(
            weaponStatsInfo.getElementsByClassName("Substat")
        ) as HTMLElement[];
        for (const subStat of subStats) {
            addStatTextElement(subStat);
            subStat.style.display = "flex";
            subStat.style.alignItems = "center";
            subStat.style.marginRight = "0%";
            subStat.style.marginBottom = "1%";
            subStat.style.paddingTop = "3%";
        }
    }

    writeText() {
        const optionLocale = TranslateKey2Word.getTranslate();
        const subStat = this.weapon[0].getElementsByClassName("Substat");

        const statText = innerOptionText(subStat[0]);
        if (!statText) return;
        // このままでは「攻撃力」となってしまうため、「基礎攻撃力」に上書き
        statText.innerHTML = optionLocale.getLocale(BASE_ATK_CLASS);

        if (!subStat[1]) return;
        innerOptionText(subStat[1]);
    }
}
