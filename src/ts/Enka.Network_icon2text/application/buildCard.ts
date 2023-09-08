type SectionType = "left" | "middle" | "right";

export namespace BuildCard {
    export const getBuildCard = (): HTMLElement => {
        const buildCard = document.getElementsByClassName("Card")[0] as HTMLElement;
        if (buildCard == null) {
            throw new Error("not card element");
        }

        return buildCard;
    };

    export const getBuildCardSections = (): { [ key in SectionType ]: HTMLElement } => {
        const buildCard = getBuildCard();
        const cardSections = buildCard.getElementsByClassName(
            "section"
        ) as HTMLCollectionOf<HTMLElement>;

        return {
            left: cardSections[0],
            middle: cardSections[1],
            right: cardSections[2],
        };
    };

    export const getWeapon = (): HTMLElement => {
        const buildCard = getBuildCard();

        return buildCard.getElementsByClassName("Weapon")[0] as HTMLElement;
    };

    export const getArtifacts = (): HTMLCollectionOf<HTMLElement> => {
        const buildCard = getBuildCard();

        return buildCard.getElementsByClassName(
            "Artifact"
        ) as HTMLCollectionOf<HTMLElement>;
    };
}
