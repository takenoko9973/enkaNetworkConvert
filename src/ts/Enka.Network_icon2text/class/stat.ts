import { characterStatKey } from "../types/characterStatKey";

export abstract class Stat {
    protected _statName: characterStatKey;
    protected _stat;

    constructor(statName: characterStatKey, stat: number) {
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
