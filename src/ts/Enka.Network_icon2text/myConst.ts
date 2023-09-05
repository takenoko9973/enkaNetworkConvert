import { localeKeys } from "./types/localeKeys";
import { CssStyleManager } from "./util/cssStyleManager";

export const VERSION = "v1.1.1";

export const BASE_ATK_CLASS: localeKeys = "BASE_ATTACK";
export const TIME_STAMP = "timeStamp";

export const EVALUATION_SELECTOR = "evaluationSelectorRow";
export const EVALUATION_SELECTOR_DIV = "evaluationSelectorDiv";
export const EVALUATION_SELECTOR_NAME = "evaluationSelector";

export const SCORE_SELECT_DIV = "scoreSelectDiv";
export const SCORE_RADIO_NAME = "sSource";

export const RV_SELECT_DIV = "rvSelectDiv";
export const RV_CHECKBOX_NAME = "rollValue";

export const cssManager = CssStyleManager.instance;
