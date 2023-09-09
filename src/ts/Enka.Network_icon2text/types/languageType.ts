export const Language = {
    english: "EN",
    german: "DE",
    spanish: "ES",
    french: "FR",
    indonesian: "ID",
    italian: "IT",
    japanese: "JA",
    portuguese: "PT",
    russian: "RU",
    thai: "TH",
    turkish: "TR",
    vietnamese: "VI",
    korean: "KO",
    khaenriah: "KH",
    simplifiedChinese: "ZH-CH",
    traditionalChinese: "ZH-TW",
} as const;
export type Language = (typeof Language)[keyof typeof Language];
