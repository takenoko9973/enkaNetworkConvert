import { optionLocale } from "../myConst";

export function innerOptionText(statElement: Element, isSub = false): HTMLElement | null {
    const statText = statElement?.getElementsByClassName(
        "statText"
    )[0] as HTMLElement;

    if (!statText) return null;

    const optionKey = statElement?.classList[1];
    statText.innerText = (isSub)
        ? optionLocale.getLocaleSub(optionKey)
        : optionLocale.getLocale(optionKey);
    return statText;
}