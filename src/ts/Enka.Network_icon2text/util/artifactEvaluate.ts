import { Artifact } from "../class/artifact/artifact";
import { statsSubOptionKey } from "../types/characterStatKey";

// 各ステータスの比率 (固定値はスコアに含まないようにするため inf)
const STATS_OPTION_RATE: { [key in statsSubOptionKey]: number } = {
    HP: Infinity,
    ATTACK: Infinity,
    DEFENSE: Infinity,
    HP_PERCENT: 3,
    ATTACK_PERCENT: 3,
    DEFENSE_PERCENT: 15 / 4,
    CRITICAL: 4,
    CRITICAL_HURT: 2,
    CHARGE_EFFICIENCY: 10 / 3,
    ELEMENT_MASTERY: 12,
    UNKNOWN: Infinity
} as const;

export const artifactScoring = (artifact: Artifact, key: statsSubOptionKey): number => {
    const rate = STATS_OPTION_RATE.ATTACK_PERCENT / STATS_OPTION_RATE[key];

    let score = 0;
    for (const subStat of artifact.subStats) {
        switch (subStat.statKey) {
            case "CRITICAL":
                score += subStat.stat * 2;
                break;
            case "CRITICAL_HURT":
                score += subStat.stat;
                break;
            case key:
                score += subStat.stat * rate;
                break;
        }
    }
    return score;
};

export const artifactRollValue = (artifact: Artifact, ...keys: statsSubOptionKey[]) => {
    let rollValue = 0;

    for (const subStat of artifact.subStats) {
        if (!subStat.statKey) continue;

        if (keys.includes(subStat.statKey)) {
            rollValue += subStat.rolls.sumRollValue();
        }
    }
    return rollValue;
};
