import { cssManager } from "../consts";
import { BuildCard } from "../exception";
import {
    ILocalize,
    LocalizeTimeStamp,
    LocalizeFriendship,
    LocalizeArtifact,
    LocalizeWeapon,
} from "./localize";

export class LocalizeBuildCardFacade implements ILocalize {
    localizeList: ILocalize[] = [];

    constructor() {
        this.localizeList.push(new LocalizeTimeStamp());
        this.localizeList.push(new LocalizeFriendship());
        this.localizeList.push(new LocalizeArtifact());
        this.localizeList.push(new LocalizeWeapon());
    }

    format() {
        // 各セクションの幅の調整
        const sections = BuildCard.getBuildCardSections();

        sections.left.style.width = "36%";
        sections.middle.style.width = "24%";
        sections.middle.style.left = "34%";
        sections.right.style.width = "43%";

        // アイコンの削除
        cssManager.addStyle(
            `.Card .card-host svg.Icon { display:none; }`
        );

        this.localizeList.forEach((localize) => localize.format());
    }

    localize() {
        this.localizeList.forEach((localize) => localize.localize());
    }
}
