import { CreateWriteRoutine } from "./createWriteRoutine";
import { DateText } from "./routines/dateText";
import { SelectScoreType } from "./routines/selectScoreType";
import { Artifact } from "./routines/artifacts";
import { Weapon } from "./routines/weapon";
import { Friend } from "./routines/friend";
import { ArtifactEvaluateRoutine } from "./routines/artifactEvaluateRoutine";
import { EvaluationSelector } from "./routines/evaluationSelectorRoutine";

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
        this.createList.push(DateText.instance);
        this.createList.push(Friend.instance);
        this.createList.push(EvaluationSelector.instance);
        this.createList.push(SelectScoreType.instance);
        this.createList.push(Weapon.instance);
        this.createList.push(Artifact.instance);
        this.createList.push(ArtifactEvaluateRoutine.instance);
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
