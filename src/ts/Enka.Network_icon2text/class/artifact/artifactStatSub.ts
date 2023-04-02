import { artifactSubOptionKey } from "../../types/artifactOptionKey";
import { Stat, StatNumber } from "../stat";
import { statRolls } from "./artifactStatRolls";

export class ArtifactSubStat extends Stat<artifactSubOptionKey> {
    #rolls: statRolls;

    constructor(
        statName: artifactSubOptionKey,
        stat: StatNumber,
        rolls: number[]
    ) {
        super(statName, stat);

        try {
            this.#rolls = new statRolls(rolls);
        } catch (e: unknown) {
            this.#rolls = new statRolls([]);

            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    }

    get rolls() {
        return this.#rolls;
    }
}

export class ArtifactSubStats {
    #subStats: ArtifactSubStat[] = [];

    addSubStat = (subStat: ArtifactSubStat) => {
        this.#subStats.push(subStat);
    };

    get subStats(): ArtifactSubStat[] {
        return this.#subStats;
    }
}
