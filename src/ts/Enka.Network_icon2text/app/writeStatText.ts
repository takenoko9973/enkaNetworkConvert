import { TranslateKey2Word } from "../class/translate/translateKey2Word";
import { localeKeys } from "../types/localeKeys";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace WriteStatText {
    export function writeStatText(statText: HTMLElement) {
        const optionLocale = TranslateKey2Word.getTranslate();

        const parentElement = statText.parentElement;
        const statKey =
            (parentElement?.classList[1] as localeKeys) ?? "UNKNOWN";

        // 改行に対応するため、innerText
        statText.innerText = isSub(statText)
            ? optionLocale.getLocaleSub(statKey)
            : optionLocale.getLocale(statKey);
    }

    export function writeStatTextAll() {
        const statTexts = document.getElementsByClassName(
            "statText"
        ) as HTMLCollectionOf<HTMLElement>;

        for (const statText of Array.from(statTexts)) {
            writeStatText(statText);
        }
    }
}

function isSub(statText: HTMLElement) {
    return statText.classList.contains("sub");
}
