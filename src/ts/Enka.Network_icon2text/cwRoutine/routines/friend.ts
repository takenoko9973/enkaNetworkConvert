import { optionLocale } from "../../myConst";
import { localeKeys } from "../../types/localeKeys";
import { addStatTextElement } from "../../util/enkaUtil";
import { innerOptionText } from "../../util/innerOptionText";
import { CreateWriteRoutine } from "../createWriteRoutine";

export class Friend implements CreateWriteRoutine {
    private static _instance: Friend;

    public static get instance(): Friend {
        if (!this._instance) {
            this._instance = new Friend();
        }

        return this._instance;
    }

    createText() {
        // 好感度
        const friend = document.getElementsByClassName("fren")[0];
        if (!friend) return;

        const friendText = addStatTextElement(friend, false);
        if (!friendText) return;

        friendText.style.marginRight = "0.3em"; // sepでは調整できないので、手動調整
    }

    writeText() {
        // 好感度
        const friend = document.getElementsByClassName("fren")[0];
        if (!friend) return;

        const friendClassName: localeKeys = "FRIEND";

        const friendText = innerOptionText(friend);
        if (!friendText) return;

        friendText.innerText = optionLocale.getLocale(friendClassName); // "fren"では登録されてないので、上書き
    }
}
