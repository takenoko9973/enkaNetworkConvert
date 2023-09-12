import { BuildCard, EnkaNetworkUtil } from "../../exception";
import { LocalizeKey } from "../../types";
import { ILocalize } from "./localize";

export class LocalizeFriendship implements ILocalize {
    constructor() {}

    format(): void {
        const buildCard = BuildCard.getBuildCard();
        const friend = buildCard.getElementsByClassName("fren")[0];

        // 好感度の存在を確認 (旅人のみ存在しない)
        if (friend instanceof HTMLElement) {
            const friendText = EnkaNetworkUtil.addStatTextElement(
                friend,
                false
            )!;
            friendText.style.marginRight = "0.3em";
        }
    }
    localize(): void {
        const localizeData = EnkaNetworkUtil.getLocalizeData();
        const buildCard = BuildCard.getBuildCard();

        const friend = buildCard.getElementsByClassName("fren")[0];
        if (friend instanceof HTMLElement) {
            const statText = friend.firstChild!;

            statText.textContent = localizeData.getLocale(LocalizeKey.friend);
        }
    }
}
