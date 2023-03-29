class statRoll {
    #roll: number;

    constructor(roll: number) {
        if (1 <= roll && roll <= 4) {
            this.#roll = roll;
        } else {
            throw "roll must be in range 1 to 4";
        }
    }

    rollValue = (): number => 100 - 10 * (4 - this.#roll);
}

export class statRolls {
    #rolls: statRoll[] = [];

    constructor(rolls: number[]) {
        if (rolls.length > 6) throw "number of rolls must be range 0 to 6";

        try {
            rolls.forEach((roll) => this.#rolls.push(new statRoll(roll)));
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    }

    eachRollValue = (): number[] => {
        return this.#rolls.map((roll) => roll.rollValue());
    };

    sumRollValue = (): number => {
        const rollValues = this.eachRollValue();
        if (rollValues.length == 0) {
            return 0;
        } else {
            return rollValues.reduce((sum, rollValue) => sum + rollValue);
        }
    };
}