import { characterBaseStatKey } from "./characterBaseStatKey";
import { characterStatKey } from "./characterStatKey";

export type localeKeys
    = characterBaseStatKey
    | characterStatKey
    | "UNKNOWN"
    | "FRIEND"
    | "SCORE_SELECT_INFO"
    | "CARD_EXTRA_INFO";
