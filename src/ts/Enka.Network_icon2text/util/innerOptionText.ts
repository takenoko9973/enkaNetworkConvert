import { TranslateKey2Word } from "../class/translate/translateKey2Word";

export function innerOptionText(
    statElement: Element,
    isSub = false
): HTMLElement | null {
    const optionLocale = TranslateKey2Word.getTranslate();
    const statText = statElement?.getElementsByClassName(
        "statText"
    )[0] as HTMLElement;

    if (!statText) return null;

    const optionKey = statElement?.classList[1];
    // 改行も対応するため、innerTextで代入
    statText.innerText = isSub
        ? optionLocale.getLocaleSub(optionKey)
        : optionLocale.getLocale(optionKey);
    return statText;
}
