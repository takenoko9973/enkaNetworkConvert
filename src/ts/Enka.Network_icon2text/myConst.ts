import { TranslateKey2Word } from "./enkaIcon2Text/translateKey2Word";
import { localeKeys } from "./types/localeKeys";

export const weapon = document.getElementsByClassName("Weapon");
export const artifact = document.getElementsByClassName("Artifact");

export const VERSION = "v0.50";

export const BASE_ATK_CLASS: localeKeys = "BASE_ATTACK";
export const TIME_STAMP = "timeStamp";
export const SCORE_SELECT_DIV = "scoreSelectDiv";
export const SCORE_RADIO_NAME = "sSource";

export const optionLocale: TranslateKey2Word = TranslateKey2Word.instance;
