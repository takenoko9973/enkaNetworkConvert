import { WriteStatText } from "../app/writeStatText";
import { CardSection } from "./cardSection/cardSection";
import { CardSectionLeft } from "./cardSection/cardSectionLeft";
import { CardSectionMiddle } from "./cardSection/cardSectionMiddle";
import { CardSectionRight } from "./cardSection/cardSectionRight";

type CardSectionType = "left" | "middle" | "right";

export class BuildCard {
    private _buildCard!: Element;
    private _cardSections!: {
        [key in CardSectionType]: CardSection;
    };

    constructor(buildCard: Element) {
        if (!buildCard.classList.contains("Card")) {
            throw new Error("not card element");
        }
        this._buildCard = buildCard;

        try {
            const cardSections = this._buildCard.getElementsByClassName("section");

            this._cardSections = {
                left: new CardSectionLeft(cardSections[0]),
                middle: new CardSectionMiddle(cardSections[1]),
                right: new CardSectionRight(cardSections[2]),
            };
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
                throw new Error("could not create build card");
            }
        }
    }

    init = () => {
        // セクション配置の調整
        this._cardSections["left"].element.style.width = "36%";
        this._cardSections["middle"].element.style.width = "24%";
        this._cardSections["middle"].element.style.left = "34%";
        this._cardSections["right"].element.style.width = "43%";

        for (const locate in this._cardSections) {
            this._cardSections[locate as CardSectionType].init();
        }
    };

    update = () => {
        WriteStatText.writeStatTextAll();
        for (const locate in this._cardSections) {
            this._cardSections[locate as CardSectionType].update();
        }
    };
}
