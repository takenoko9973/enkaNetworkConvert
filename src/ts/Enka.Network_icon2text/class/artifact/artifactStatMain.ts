import { artifactMainOptionKey } from "../../types/artifactOptionKey";
import { Stat, StatNumber } from "../stat";

export class ArtifactMainStat extends Stat<artifactMainOptionKey> {
    #level: number;

    constructor(
        statName: artifactMainOptionKey,
        stat: StatNumber,
        level: number
    ) {
        super(statName, stat);

        this.#level = level;
    }

    get level() {
        return this.#level;
    }
}
