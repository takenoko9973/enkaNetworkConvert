import { StatsKey } from "./statsKeyType";

export const LocalizeKey = {
    ...StatsKey,
    friend: "FRIEND",
    critOnly: "CRIT_ONLY",
    evaluationInfo: "EVALUATION_SELECTOR_INFO",
    scoring: "SCORING_METHOD",
    rollValue: "RV_METHOD",
    scoreExtra: "SCORE_EXTRA_INFO",
    rollValueExtra: "RV_EXTRA_INFO",
} as const;
export type LocalizeKey = (typeof LocalizeKey)[keyof typeof LocalizeKey];
