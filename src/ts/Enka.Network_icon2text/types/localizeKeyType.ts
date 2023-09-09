import { StatsKey } from "./statsKeyType";

export const LocalizeKey = {
    ...StatsKey,
    friend: "FRIEND",
} as const;
export type LocalizeKey = (typeof LocalizeKey)[keyof typeof LocalizeKey];
