export abstract class CardSection {
    protected _cardSection: HTMLElement;

    constructor(cardSection: Element) {
        if (!cardSection.classList.contains("section")) {
            throw new Error("not card section element");
        }
        this._cardSection = cardSection as HTMLElement;
    }

    get element(): HTMLElement {
        return this._cardSection;
    }

    abstract init(): void
    abstract update(): void
}
