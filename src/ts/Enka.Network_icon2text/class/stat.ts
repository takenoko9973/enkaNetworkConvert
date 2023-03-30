import { statsSubOptionKey } from "../types/characterStatKey";

export abstract class Stat {
    protected _statName: statsSubOptionKey;
    protected _stat;

    constructor(statName: statsSubOptionKey, stat: number) {
        this._statName = statName;
        this._stat = stat;
    }

    get statKey() {
        return this._statName;
    }

    get stat() {
        return this._stat;
    }
}
