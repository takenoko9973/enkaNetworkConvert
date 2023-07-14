import { CreateWriteRoutine } from "../../cwRoutine/createWriteRoutine";
import { DateText } from "../../cwRoutine/routines/dateText";
import { Friend } from "../../cwRoutine/routines/friend";
import { CardSection } from "./cardSection";

export class CardSectionLeft extends CardSection {
    private _date: CreateWriteRoutine;
    private _friend: CreateWriteRoutine;

    constructor(cardSection: Element) {
        super(cardSection);

        this._date = DateText.instance;
        this._friend = Friend.instance;
    }

    init() {
        this._date.createText();
        this._friend.createText();
    }

    update() {
        this._date.writeText();
        this._friend.writeText();
    }
}
