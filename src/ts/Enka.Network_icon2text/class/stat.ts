export abstract class Stat<T extends string> {
    protected _statName: T;
    protected _stat: StatNumber;

    constructor(statName: T, stat: string | number) {
        this._statName = statName;
        this._stat = new StatNumber(stat);
    }


    get statKey() {
        return this._statName;
    }

    get stat() {
        return this._stat.stat;
    }
}

export class StatNumber {
    #stat: number;

    constructor(stat: string | number) {
        if (typeof(stat) == "string") {
            stat = stat.replace(/[,%]/, "");
            this.#stat = Number(stat);
        } else {
            this.#stat = stat;
        }
    }

    get stat() {
        return this.#stat;
    }
}