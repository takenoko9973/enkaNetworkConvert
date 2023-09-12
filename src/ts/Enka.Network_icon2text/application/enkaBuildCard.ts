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
        this.localizeList.forEach((localize) => localize.format());
    }

    localize() {
        this.localizeList.forEach((localize) => localize.localize());
    }
}
