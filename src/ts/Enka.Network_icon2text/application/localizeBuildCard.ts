import { BuildCard, EnkaNetworkUtil } from "../exception";
import { LocalizeKey } from "../types";

export namespace LocalizeBuildCard {
    const isSubStat = (element: Element): boolean => {
        return element.classList.contains("sub");
    };

    const inputLocalize = (parentElement: Element) => {
        const localizeData = EnkaNetworkUtil.getLocalizeData();

        const statText = parentElement.getElementsByClassName("statText")[0] as HTMLElement;
        if (!statText) return;

        const statKey =
            (parentElement.classList[1] as LocalizeKey) ?? "UNKNOWN";

        statText.innerText = isSubStat(statText)
            ? localizeData.getLocaleSub(statKey)
            : localizeData.getLocale(statKey);
    };

    export const localize = () => {
        const buildCard = BuildCard.getBuildCard();

        const mainStats = buildCard.getElementsByClassName("mainstat");
        for (const mainStat of Array.from(mainStats)) {
            inputLocalize(mainStat);
        }

        const subStats = buildCard.getElementsByClassName("Substat");
        for (const subStat of Array.from(subStats)) {
            inputLocalize(subStat);
        }

        // 別枠
        const localizeData = EnkaNetworkUtil.getLocalizeData();
        // 基礎攻撃力
        const weapon = BuildCard.getWeapon();
        const baseAtkStatText = weapon.getElementsByClassName("statText")[0];
        baseAtkStatText.textContent = localizeData.getLocale(
            LocalizeKey.base_atk
        );

        // 好感度
        const friend = buildCard.getElementsByClassName("fren")[0];
        if (friend instanceof HTMLElement) {
            const statText = friend.firstChild!;

            statText.textContent = localizeData.getLocale(LocalizeKey.friend);
        }
    };
}
