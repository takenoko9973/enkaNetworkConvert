import { TIME_STAMP, VERSION } from "../myConst";
import { CreateWriteRoutine } from "./createWriteRoutine";

/**
 * カード情報取得時間を表示
 */
export class DateText implements CreateWriteRoutine {
    private static _instance: DateText;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static get instance(): DateText {
        if (!this._instance) {
            this._instance = new DateText();
        }

        return this._instance;
    }

    createText() {
        const charaCard = document.getElementsByClassName("card-host")[0];

        const timeStamp = document.createElement("span");
        timeStamp.id = TIME_STAMP;
        timeStamp.innerText = "";
        timeStamp.style.position = "absolute";
        timeStamp.style.top = "1%";
        timeStamp.style.left = "2%";
        timeStamp.style.fontSize = "60%";
        timeStamp.style.opacity = "0.4";
        charaCard.appendChild(timeStamp);
    }

    writeText() {
        // 情報取得日時を表示
        const date = new Date;
        date.setTime(date.getTime() - 60 * date.getTimezoneOffset() * 1000);

        const timeString = date.toISOString().replace("T", " ").substr(0, 19);
        (document.getElementById(TIME_STAMP) as HTMLElement).innerText = VERSION + "_" + timeString;
    }
}