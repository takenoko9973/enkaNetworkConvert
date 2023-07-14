import { CreateWriteRoutine } from "./createWriteRoutine";
import { SelectScoreType } from "./routines/selectScoreType";
import { EvaluationSelector } from "./routines/evaluationSelectorRoutine";
import { RollValueMethodRoutine } from "./routines/rollValueMethodRoutine";

export class CreateWriteManager implements CreateWriteRoutine {
    private static _instance: CreateWriteManager;
    private createList: CreateWriteRoutine[] = [];

    public static get instance(): CreateWriteManager {
        if (!this._instance) {
            this._instance = new CreateWriteManager();
        }

        return this._instance;
    }

    constructor() {
        this.createList.push(EvaluationSelector.instance);
        this.createList.push(SelectScoreType.instance);
        this.createList.push(RollValueMethodRoutine.instance);
    }

    createText() {
        this.createList.forEach((value) => {
            value.createText();
        });
    }

    writeText() {
        this.createList.forEach((value) => {
            value.writeText();
        });
    }
}
