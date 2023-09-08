import { cssManager } from "../consts";
import { addStatTextElement, getSeparateElement, getSvelteClassName } from "../exception";

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

    export const formatBuildCard = () => {
        const sections = getBuildCardSections();

        // 各セクションの幅の調整
        sections["left"].style.width = "36%";
        sections["middle"].style.width = "24%";
        sections["middle"].style.left = "34%";
        sections["right"].style.width = "43%";

        // 武器
        const weapon = getWeapon();
        const weaponImage = weapon.getElementsByTagName("figure")[0]; // 武器画像
        const weaponInfo = weapon.getElementsByClassName("weapon-caption")[0] as HTMLElement;
        const weaponName = weaponInfo.getElementsByClassName("title")[0] as HTMLElement;
        const weaponStatsInfo = weaponInfo.getElementsByClassName("stats")[0] as HTMLElement;
        const weaponRefine = weaponInfo.getElementsByClassName("refine")[0] as HTMLElement;
        weaponImage.style.width = "30%";
        weaponInfo.style.paddingRight = "0%";
        weaponName.style.fontWeight = "bold";
        weaponRefine.after(getSeparateElement());
        const subStats = weaponStatsInfo.getElementsByClassName("Substat") as HTMLCollectionOf<HTMLElement>;
        for (const subStat of Array.from(subStats)) {
            addStatTextElement(subStat);
            subStat.style.display = "flex";
            subStat.style.alignItems = "center";
            subStat.style.marginRight = "0%";
            subStat.style.marginBottom = "1%";
            subStat.style.paddingTop = "3%";
        }

        // 聖遺物
        const artifacts = getArtifacts();
        const svelte = getSvelteClassName(artifacts[0]);
        const cssStyle = [
            `.Artifact.${svelte} .ArtifactIcon { top: -37%; left: -6%; width: 28%; }`, // 聖遺物画像の調整
            `.substats.${svelte} > .Substat { display: flex; align-items: center; padding-right: 1.0em; white-space: nowrap; }`, // 聖遺物のサブステータスが右に行きすぎるので調整
            `.mainstat.${svelte} > div.${svelte}:nth-child(1) { display: flex; align-items: center; top: 5%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; justify-content: flex-end; align-self: unset; margin-left: unset;}`, // 聖遺物メインステータスの調整
            `.mainstat.${svelte} > div.${svelte}:nth-child(2) { padding: 4% 0%; }`,
            `.mainstat.${svelte} > div.${svelte}:nth-child(3) { max-height: 25% }`,
        ];
        cssManager.addStyle(...cssStyle);
    };

    export const createStatsName = () => {
        const buildCard = getBuildCard();
        const mainStats = buildCard.getElementsByClassName("mainstat");
        const subStats = buildCard.getElementsByClassName("Substat");
        const friend = buildCard.getElementsByClassName("fren")[0];

        for (const mainStat of Array.from(mainStats)) {
            addStatTextElement(mainStat);
        }

        for (const subStat of Array.from(subStats)) {
            addStatTextElement(subStat);
        }

        addStatTextElement(friend, false);
    };
}
