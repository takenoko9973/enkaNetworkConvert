import { TranslateKey2Word } from "../../class/translate/translateKey2Word";
import { addStatTextElement } from "../../util/enkaUtil";
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
        // 好感度の有無(旅人)を確認
        const friend = document.getElementsByClassName("fren")[0];
        if (friend instanceof HTMLElement) {
            friend.style.whiteSpace = "nowrap";

            const friendText = addStatTextElement(friend, false);
            if (!friendText) return;

            // sepでは調整できないので、手動調整
            friendText.style.marginRight = "0.3em";
        }
    }

    writeText() {
        const friend = document.getElementsByClassName("fren")[0];
        const friendText = friend?.children[0];
        if (!friendText) return;

        const optionLocale = TranslateKey2Word.getTranslate();
        friendText.textContent = optionLocale.getLocale("FRIEND");
    }
}
