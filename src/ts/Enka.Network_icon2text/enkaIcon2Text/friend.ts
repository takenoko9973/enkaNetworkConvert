import { optionLocale } from "../myConst";
import { localeKeys } from "../types/localeKeys";
import { addStatTextElement } from "../util/enkaUtil";

export function createTextInFriend() {
    // 好感度
    const friend = document.getElementsByClassName("fren")[0];
    if (!friend) return;

    const statText = addStatTextElement(friend, false) as HTMLElement | null;
    if (statText) {
        statText.style.marginRight = "0.3em";  // sepでは調整できないので、手動調整
    }
}

export function friendIcon2Text() {
    // 好感度
    const friend = document.getElementsByClassName("fren")[0];
    if (!friend) return;

    const friendClassName: localeKeys = "FRIEND";
    const friendText = friend.getElementsByClassName("statText")[0] as HTMLElement | null;
    if (friendText){
        friendText.innerText = optionLocale.getLocale(friendClassName);
    }
}
