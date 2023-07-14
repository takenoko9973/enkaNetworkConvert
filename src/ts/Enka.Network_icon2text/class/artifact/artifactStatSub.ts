import { artifactSubOptionKey } from "../../types/artifactOptionKey";
import { Stat, StatNumber } from "../stat";
import { statRolls } from "./artifactStatRolls";

export class ArtifactSubStat extends Stat<artifactSubOptionKey> {
    readonly rolls: statRolls;

    constructor(
        statName: artifactSubOptionKey,
        stat: StatNumber,
        rolls: number[]
    ) {
        super(statName, stat);

        this.rolls = new statRolls(rolls);
    }
}

export class ArtifactSubStats {
    private readonly _subStats: ArtifactSubStat[] = [];

    addSubStat = (subStat: ArtifactSubStat) => {
        this._subStats.push(subStat);
    };

    get subStats(): ArtifactSubStat[] {
        return this._subStats;
    }
}
