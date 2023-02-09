import { TIME_STAMP, VERSION } from "../../myConst";
import { getFormattedDate } from "../../util/getFormattedDate";
import { CreateWriteRoutine } from "../createWriteRoutine";

/**
 * カード情報取得時間を表示
 */
export class DateText implements CreateWriteRoutine {
    private static _instance: DateText;

    public static get instance(): DateText {
        if (!this._instance) {
            this._instance = new DateText();
        }

        return this._instance;
    }

    createText() {
        if (document.getElementById(TIME_STAMP)) return;

        const charaSection = document.getElementsByClassName("section")[0];
        if (!charaSection) return;

        const timeStamp = document.createElement("div");
        timeStamp.id = TIME_STAMP;
        timeStamp.innerText = "";
        timeStamp.style.fontSize = "60%";
        timeStamp.style.opacity = "0.4";

        charaSection.firstChild?.after(timeStamp);
        (charaSection as HTMLElement).style.paddingTop = "0.8%";
    }

    writeText() {
        const timeStamp = document.getElementById(TIME_STAMP);
        if (!timeStamp) return;

        const date = new Date();
        const timeString = getFormattedDate(date, "yyyy-MM-dd hh:mm:ss");
        timeStamp.textContent = `${VERSION}TE ${timeString}`;
    }
}
