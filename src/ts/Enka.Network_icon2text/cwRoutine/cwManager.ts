import { DateText } from "./dateText";
import { CreateWriteRoutine } from "./createWriteRoutine";
import { ArtifactScoring } from "./artifactScoring";
import { SelectScoreType } from "./selectScoreType";

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
        this.createList.push(SelectScoreType.instance);
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
