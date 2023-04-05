import { CreateWriteRoutine } from "../../cwRoutine/createWriteRoutine";
import { Weapon } from "../../cwRoutine/routines/weapon";
import { CardSection } from "./cardSection";

export class CardSectionMiddle extends CardSection {
    private _weapon: CreateWriteRoutine;

    constructor(cardSection: Element) {
        super(cardSection);

        this._weapon = Weapon.instance;
    }

    init() {
        this._weapon.createText();
    }

    update() {
        this._weapon.writeText();
    }
}
