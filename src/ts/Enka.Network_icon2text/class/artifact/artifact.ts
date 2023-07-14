import {
    artifactMainOptionKey,
    artifactSubOptionKey,
} from "../../types/artifactOptionKey";
import { StatNumber } from "../stat";
import { ArtifactMainStat } from "./artifactStatMain";
import { ArtifactSubStat, ArtifactSubStats } from "./artifactStatSub";

// 各ステータスの比率 (固定値はスコアに含まないようにするため inf)
const STATS_OPTION_RATE: { [key in artifactSubOptionKey]: number } = {
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
    UNKNOWN: Infinity,
} as const;

export class Artifact {
    #element: Element;
    #star = 0;
    #mainStat = new ArtifactMainStat("UNKNOWN", new StatNumber(0), 0);
    #subStats = new ArtifactSubStats();

    constructor(artifact: Element) {
        this.#element = artifact;

        if (!artifact.classList.contains("Artifact")) return;
        if (artifact.classList.contains("empty")) return;

        const elements: { [key in string]: Element } = {};
        elements["mainStat"] = artifact.getElementsByClassName("mainstat")[0];
        elements["subStats"] = artifact.getElementsByClassName("substats")[0];
        elements["stars"] =
            elements["mainStat"].getElementsByClassName("Stars")[0];
        elements["level"] =
            elements["mainStat"].getElementsByClassName("level")[0];

        this.#star = elements["stars"].childElementCount;

        const mainStatKey = elements["mainStat"]
            .classList[1] as artifactMainOptionKey;
        const stat = new StatNumber(
            elements["mainStat"].children[1].textContent ?? "0"
        );
        const level = Number(elements["level"].textContent ?? "0");
        this.#mainStat = new ArtifactMainStat(mainStatKey, stat, level);

        const subStats = elements["subStats"].getElementsByClassName("Substat");
        for (const subStat of Array.from(subStats)) {
            const statKey = subStat.classList[1] as artifactSubOptionKey;
            const stat = new StatNumber(subStat.lastChild?.textContent ?? "0");
            const rolls = Array.from(
                subStat.getElementsByClassName("rolls")[0].children
            ).map((_roll) => _roll.childElementCount);
            this.#subStats.addSubStat(
                new ArtifactSubStat(statKey, stat, rolls)
            );
        }
    }

    get element() {
        return this.#element;
    }

    get star() {
        return this.#star;
    }

    get mainStat() {
        return this.#mainStat;
    }

    get subStats() {
        return this.#subStats.subStats;
    }

    artifactScoring = (key: artifactSubOptionKey): number => {
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
    };

    artifactRollValue = (...keys: artifactSubOptionKey[]) => {
        let rollValue = 0;

        for (const subStat of this.#subStats.subStats) {
            if (!subStat.statKey) continue;

            if (keys.includes(subStat.statKey)) {
                rollValue += subStat.rolls.sumRollValue();
            }
        }
        return rollValue;
    };
}

export class Artifacts {
    #element: Element;
    #artifacts: Artifact[] = [];

    constructor(artifactSets: Element) {
        this.#element = artifactSets;
        const artifacts = artifactSets.getElementsByClassName("Artifact");

        for (const artifact of Array.from(artifacts)) {
            this.#artifacts.push(new Artifact(artifact));
        }
    }

    get element() {
        return this.#element;
    }

    get artifacts() {
        return this.#artifacts;
    }

    // 装備している聖遺物数
    artifactNum = (): number => {
        const equippingArtifacts = this.#artifacts.filter(
            (_artifact) => !_artifact.element.classList.contains("empty")
        );
        return equippingArtifacts.length;
    };

    eachArtifactScoring = (key: artifactSubOptionKey): number[] => {
        return this.#artifacts.map((_artifact) =>
            _artifact.artifactScoring(key)
        );
    };

    sumArtifactScoring = (key: artifactSubOptionKey): number => {
        return this.eachArtifactScoring(key).reduce(
            (sum, score) => sum + score
        );
    };

    eachArtifactRollValue = (...keys: artifactSubOptionKey[]): number[] => {
        return this.#artifacts.map((_artifact) =>
            _artifact.artifactRollValue(...keys)
        );
    };

    sumArtifactRollValue = (...keys: artifactSubOptionKey[]): number => {
        return this.eachArtifactRollValue(...keys).reduce(
            (sum, rv) => sum + rv
        );
    };
}
