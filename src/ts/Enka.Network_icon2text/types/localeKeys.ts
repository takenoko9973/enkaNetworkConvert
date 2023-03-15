import { characterBaseStatKey } from "./characterBaseStatKey";
import { characterStatKey } from "./characterStatKey";

export type localeKeys
    = characterBaseStatKey
    | characterStatKey
    | "UNKNOWN"
    | "FRIEND"
    | "EVALUATION_SELECTOR_INFO"
    | "SCORING_METHOD"
    | "RV_METHOD"
    | "CARD_EXTRA_INFO";
