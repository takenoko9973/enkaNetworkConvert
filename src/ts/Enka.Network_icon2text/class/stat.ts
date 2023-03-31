import { characterStatKey } from "../types/characterStatKey";

export abstract class Stat {
    protected _statName: characterStatKey;
    protected _stat;

    constructor(statName: characterStatKey, stat: string | number) {
        this._statName = statName;

        if (typeof(stat) == "string") {
            stat = stat.replace(/[,%]/, "");
            this._stat = Number(stat);
        } else {
            this._stat = stat;
        }
    }


    get statKey() {
        return this._statName;
    }

    get stat() {
        return this._stat;
    }
}
