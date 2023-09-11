import { SubOption } from "../../types";
import { Artifact } from "./artifact";
import { STATS_OPTION_RATE } from "../../consts";

export namespace ArtifactEvaluation {
    export const scoring = (artifact: Artifact, scoringKey: SubOption): number => {
        const rate =
            STATS_OPTION_RATE[SubOption.atk_percent] / STATS_OPTION_RATE[scoringKey];

        let score = 0;
        for (const subStat of artifact.subStats) {
            switch (subStat.statKey) {
                case SubOption.crit_rate:
                    score += subStat.stat * 2;
                    break;
                case SubOption.crit_dmg:
                    score += subStat.stat;
                    break;
                case scoringKey:
                    score += subStat.stat * rate;
                    break;
            }
        }
        return score;
    };

    export const rollValue = (artifact: Artifact, ...rvKeys: SubOption[]) => {
        let rollValue = 0;

        for (const subStat of artifact.subStats) {
            if (rvKeys.includes(subStat.statKey as SubOption)) {
                rollValue += subStat.rolls.reduce(
                    (acc: number, roll: number): number => {
                        return acc + 100 - 10 * (4 - roll);
                    }
                ) ?? 0;
            }
        }
        return rollValue;
    };
}
