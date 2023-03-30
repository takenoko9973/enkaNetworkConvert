import { statsMainOptionKey } from "../../types/characterStatKey";
import { Stat } from "../stat";

export class ArtifactMainStat extends Stat {
    #level: number;

    constructor(statName: statsMainOptionKey, stat: number, level: number) {
        super(statName, stat);

        this.#level = level;
    }

    get level() {
        return this.#level;
    }
}
