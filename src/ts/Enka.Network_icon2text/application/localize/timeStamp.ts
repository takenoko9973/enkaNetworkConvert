import { BuildCard } from "../../exception";
import { TIME_STAMP, VERSION } from "../../consts";
import { getFormattedDate } from '../../utils/date';
import { ILocalize } from "./localize";

export class LocalizeTimeStamp implements ILocalize {
    constructor() {}

    format() {
        const sections = BuildCard.getBuildCardSections();

        if (document.getElementById(TIME_STAMP)) return;

        const timeStamp = document.createElement("div");
        timeStamp.id = TIME_STAMP;
        timeStamp.innerText = "";
        timeStamp.style.fontSize = "60%";
        timeStamp.style.opacity = "0.4";

        sections.left.firstChild?.after(timeStamp);
        sections.left.style.paddingTop = "0.8%";
    }

    localize() {
        const timeStamp = document.getElementById(TIME_STAMP);
        if (timeStamp instanceof HTMLElement) {
            const date = new Date();
            const timeString = getFormattedDate(date, "yyyy-MM-dd hh:mm:ss");

            timeStamp.textContent = `v${VERSION}TE ${timeString}`;
        }
    }
}
