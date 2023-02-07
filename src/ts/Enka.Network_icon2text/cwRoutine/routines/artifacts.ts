import { addStatTextElement } from "../../util/enkaUtil";
import { innerOptionText } from "../../util/innerOptionText";
import { CreateWriteRoutine } from "../createWriteRoutine";

export class Artifact implements CreateWriteRoutine {
    private static _instance: Artifact;
    private artifacts = document.getElementsByClassName("Artifact");

    public static get instance(): Artifact {
        if (!this._instance) {
            this._instance = new Artifact();
        }

        return this._instance;
    }

    createText() {
        for (const artifact of Array.from(this.artifacts)) {
            if (artifact.classList.contains("empty")) continue;

            // メインOP
            const mainStat = artifact.getElementsByClassName("mainstat")[0];
            addStatTextElement(mainStat, false);

            // サブOP
            const subStatList = artifact.getElementsByClassName("Substat");
            for (const subStat of Array.from(subStatList)) {
                addStatTextElement(subStat);
            }
        }
    }

    writeText() {
        for (const artifact of Array.from(this.artifacts)) {
            if (artifact.classList.contains("empty")) continue;

            // メインOP
            const mainStat = artifact.getElementsByClassName("mainstat")[0];
            innerOptionText(mainStat);

            // サブOP
            const subStatList = artifact.getElementsByClassName("Substat");
            for (const subStat of Array.from(subStatList)) {
                innerOptionText(subStat, true);
            }
        }
    }
}
