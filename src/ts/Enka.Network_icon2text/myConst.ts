import { TranslateKey2Word } from "./translateKey2Word";
import { localeKeys } from "./types/localeKeys";
import { CssStyleManager } from "./util/cssStyleManager";

export const VERSION = "v0.50";

export const BASE_ATK_CLASS: localeKeys = "BASE_ATTACK";
export const TIME_STAMP = "timeStamp";
export const SCORE_SELECT_DIV = "scoreSelectDiv";
export const SCORE_RADIO_NAME = "sSource";

export const optionLocale = TranslateKey2Word.instance;
export const cssManager = CssStyleManager.instance;
