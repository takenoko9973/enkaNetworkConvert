import { EnkaNetworkUtil, BuildCard } from "../../exception";
import { LocalizeKey } from "../../types";
import { ILocalize } from "./localize";

export class LocalizeWeapon implements ILocalize {
    element: HTMLElement;

    constructor() {
        this.element = BuildCard.getWeapon();
    }

    format() {
        // 武器画像
        const weaponImage = this.element.getElementsByTagName("figure")[0];
        weaponImage.style.width = "30%";

        // ステータス部分を広げる
        const weaponInfo =
            this.element.getElementsByClassName("weapon-caption")[0];
        (weaponInfo as HTMLElement).style.paddingRight = "0%";

        // 凸数とレベル
        const weaponSub = this.element.getElementsByClassName("sub")[0];
        (weaponSub as HTMLElement).style.display = "flex";
        if (weaponSub.getElementsByClassName("sep").length <= 0) {
            // sepを複数個生成しないように
            const refine = weaponSub.firstElementChild!;
            refine.after(EnkaNetworkUtil.getSeparateElement());
        }

        // ステータス名を左寄せ、数値を右寄せにする
        const subStats = this.element.getElementsByClassName("Substat");
        for (const subStat of Array.from(subStats) as HTMLElement[]) {
            EnkaNetworkUtil.addStatTextElement(subStat);
            subStat.style.display = "flex";
            subStat.style.alignItems = "center";
            subStat.style.marginRight = "0%";
            subStat.style.marginBottom = "1%";
            subStat.style.paddingTop = "3%";
        }
    }

    localize() {
        const localizeData = EnkaNetworkUtil.getLocalizeData();

        const statTexts = this.element.getElementsByClassName("statText");

        // 基礎攻撃力
        const baseAtkStatText = statTexts[0];
        baseAtkStatText.textContent = localizeData.getLocale(
            LocalizeKey.base_atk
        );

        // サブステータス
        const subStatText = statTexts[1];
        if (subStatText instanceof HTMLElement) {
            const subStat = subStatText.parentElement!;
            subStatText.textContent = localizeData.getLocale(
                subStat.classList[1]
            );
        }
    }
}
