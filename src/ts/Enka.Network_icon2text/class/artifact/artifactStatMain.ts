import { artifactMainOptionKey } from "../../types/artifactOptionKey";
import { Stat, StatNumber } from "../stat";

export class ArtifactMainStat extends Stat<artifactMainOptionKey> {
    constructor(
        statKey: artifactMainOptionKey,
        stat: StatNumber,
        readonly level: number
    ) {
        super(statKey, stat);
    }
}
