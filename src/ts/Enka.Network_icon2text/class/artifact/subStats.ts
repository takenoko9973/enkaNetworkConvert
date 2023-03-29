import { statsSubOptionKey } from "../../types/characterStatKey";
import { statRolls } from "./statRolls";

export class ArtifactSubStat {
    #statName: statsSubOptionKey = "UNKNOWN";
    #stat = 0;
    #rolls: statRolls;

    constructor(statName: statsSubOptionKey, stat: number, rolls: number[]) {
        try {
            this.#statName = statName;
            this.#stat = stat;
            this.#rolls = new statRolls(rolls);
        } catch (e: unknown) {
            this.#rolls = new statRolls([]);

            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    }

    get statKey() {
        return this.#statName;
    }

    get stat() {
        return this.#stat;
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
