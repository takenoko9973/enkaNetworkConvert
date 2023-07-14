import { artifactMainOptionKey, artifactSubOptionKey } from "./artifactOptionKey";
import { characterBaseStatKey } from "./characterStatKey";
import { characterStatKey } from "./characterStatKey";

export type localeKeys
    = characterBaseStatKey
    | characterStatKey
    | artifactMainOptionKey
    | artifactSubOptionKey
    | "UNKNOWN"
    | "FRIEND"
    | "EVALUATION_SELECTOR_INFO"
    | "SCORING_METHOD"
    | "RV_METHOD"
    | "SCORE_EXTRA_INFO"
    | "RV_EXTRA_INFO";
