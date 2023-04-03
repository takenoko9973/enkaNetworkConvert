import { characterBaseStatKey, characterStatKey } from "../../types/characterStatKey";
import { baseStat2characterStat } from "../../util/enkaUtil";
import { Stat, StatNumber } from "../stat";

class CharacterStat extends Stat<characterStatKey> {
    constructor(statKey: characterStatKey, statRow: Element) {
        const stat = new StatNumber(
            statRow.children[1]?.lastChild?.textContent ?? "0"
        );
        super(statKey, stat);
    }
}

class CharacterBaseStat extends CharacterStat {
    protected readonly _statBase: StatNumber;

    constructor(statKey: characterStatKey, statRow: Element) {
        super(statKey, statRow);

        const stat = statRow.lastChild?.textContent ?? "0";
        this._statBase = new StatNumber(stat.split("+", 2)[0]);
    }

    get statAdd() {
        return this._stat.stat - this._statBase.stat;
    }

    get statBase() {
        return this._statBase.stat;
    }
}

export class CharacterStats {
    private readonly characterStats: CharacterStat[] = [];

    constructor(statsTable: Element) {
        if (!statsTable.classList.contains("StatsTable")) return;

        const statRows = Array.from(statsTable.children).filter((row) =>
            row.classList.contains("row")
        );

        for (const statRow of statRows) {
            const statKey = statRow.classList[1] as characterStatKey;

            // 基礎値持っているステータスを分岐
            if (["HP", "ATTACK", "DEFENSE"].includes(statKey)) {
                this.characterStats.push(
                    new CharacterBaseStat(statKey, statRow)
                );
            } else {
                this.characterStats.push(
                    new CharacterStat(statKey, statRow)
                );
            }
        }
    }

    getCharacterStatRow(key: characterStatKey): CharacterStat | undefined {
        return this.characterStats
            .find((row) => row.statKey === key);
    }

    getCharacterStat(key: characterStatKey): number {
        const statRow = this.getCharacterStatRow(key);
        return statRow?.stat ?? 0;
    }

    getCharacterBaseStat(key: characterBaseStatKey): number {
        const normalKey = baseStat2characterStat(key);
        if (!normalKey) return 0;

        const statRow = this.getCharacterStatRow(normalKey);
        return (statRow as CharacterBaseStat)?.statBase ?? 0;
    }
}
