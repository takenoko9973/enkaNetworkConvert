import { CreateWriteRoutine } from "./createWriteRoutine";
import { DateText } from "./routines/dateText";
import { ArtifactScoring } from "./routines/artifactScoring";
import { SelectScoreType } from "./routines/selectScoreType";
import { Artifact } from "./routines/artifacts";
import { Weapon } from "./routines/weapon";
import { Friend } from "./routines/friend";

export class CreateWriteManager implements CreateWriteRoutine {
    private static _instance: CreateWriteManager;
    private createList: CreateWriteRoutine[] = [];

    public static get instance(): CreateWriteManager {
        if (!this._instance) {
            this._instance = new CreateWriteManager();
        }

        return this._instance;
    }

    init() {
        this.createList.push(DateText.instance);
        this.createList.push(Friend.instance);
        this.createList.push(SelectScoreType.instance);
        this.createList.push(Weapon.instance);
        this.createList.push(Artifact.instance);
        this.createList.push(ArtifactScoring.instance);
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
