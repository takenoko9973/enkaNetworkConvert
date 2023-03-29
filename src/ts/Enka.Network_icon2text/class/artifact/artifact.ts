import {
    statsMainOptionKey,
    statsSubOptionKey,
} from "../../types/characterStatKey";
import { ArtifactSubStat, ArtifactSubStats } from "./subStats";

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

export class Artifact {
    #element: Element;
    #star = 0;
    #level = 0;
    #mainStat: statsMainOptionKey | undefined;
    #subStats = new ArtifactSubStats();

    constructor(artifact: Element) {
        this.#element = artifact;

        if (!artifact.classList.contains("Artifact")) return;
        if (artifact.classList.contains("empty")) return;

        const elements: { [key in string]: Element } = {};
        elements["mainStat"] = artifact.getElementsByClassName("mainstat")[0];
        elements["subStats"] = artifact.getElementsByClassName("substats")[0];
        elements["stars"] = elements["mainStat"].getElementsByClassName("Stars")[0];
        elements["level"] = elements["mainStat"].getElementsByClassName("level")[0];

        this.#star = elements["stars"].childElementCount;
        this.#level = Number(elements["level"].textContent ?? "0");
        this.#mainStat = elements["mainStat"]
            .classList[1] as statsMainOptionKey;

        const subStats = elements["subStats"].getElementsByClassName("Substat");
        for (const subStat of Array.from(subStats)) {
            const statKey = subStat.classList[1] as statsSubOptionKey;
            const stat = Number(subStat.textContent?.replace("%", "") ?? "0");
            const rolls = Array.from(subStat.getElementsByClassName("rolls")[0].children)
                .map((_roll) => _roll.children.length);
            this.#subStats.addSubStat(new ArtifactSubStat(statKey, stat, rolls));
        }
    }

    get element() {
        return this.#element;
    }

    get star() {
        return this.#star;
    }

    get level() {
        return this.#level;
    }

    get mainStatKey() {
        return this.#mainStat;
    }

    get subStats() {
        return this.#subStats;
    }

    artifactScore(key: statsSubOptionKey): number {
        const rate = STATS_OPTION_RATE.ATTACK_PERCENT / STATS_OPTION_RATE[key];

        let score = 0;
        for (const subStat of this.#subStats.subStats) {
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
    }

    rollValue(...keys: statsSubOptionKey[]) {
        let rollValue = 0;

        for (const subStat of this.#subStats.subStats) {
            if (!subStat.statKey) continue;

            if (keys.includes(subStat.statKey)) {
                rollValue += subStat.rolls.sumRollValue();
            }
        }
        return rollValue;
    }
}
