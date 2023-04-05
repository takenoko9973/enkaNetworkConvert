import { CreateWriteRoutine } from "../../cwRoutine/createWriteRoutine";
import { ArtifactEvaluateRoutine } from "../../cwRoutine/routines/artifactEvaluateRoutine";
import { ArtifactRoutine as ArtifactRoutine } from "../../cwRoutine/routines/artifacts";
import { CardSection } from "./cardSection";

export class CardSectionRight extends CardSection {
    private _artifact: CreateWriteRoutine;
    private _artifactEvaluate: CreateWriteRoutine;

    constructor(cardSection: Element) {
        super(cardSection);

        this._artifact = ArtifactRoutine.instance;
        this._artifactEvaluate = ArtifactEvaluateRoutine.instance;
    }

    init() {
        this._artifact.createText();
        this._artifactEvaluate.createText();
    }

    update() {
        this._artifact.writeText();
        this._artifactEvaluate.writeText();
    }
}
