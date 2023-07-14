export abstract class Stat<T extends string> {
    constructor(readonly statKey: T, protected readonly _stat: StatNumber) {}

    get stat() {
        return this._stat.stat;
    }
}

export class StatNumber {
    readonly stat: number;

    constructor(stat: string | number) {
        if (typeof stat == "string") {
            stat = stat.replace(/[,%]/, "");
            this.stat = Number(stat);
        } else {
            this.stat = stat;
        }
    }
}
