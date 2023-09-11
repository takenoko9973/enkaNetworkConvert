import { Artifact } from "../application/artifact/artifact";
import { EN, JA, LocalizeData } from "../localizeData";
import { Language } from "../types";

export namespace EnkaNetworkUtil {
    /**
     * 表示させているプレイヤーのUIDと名前を取得
     */
    export const getPlayerInfo = (): [string, string] => {
        const pathname = location.pathname.split("/")[2] ?? "";
        const playerUID = pathname.split("/")[2]; // urlからUIDを取得
        const playerInfo = document.getElementsByClassName("PlayerInfo")[0];
        const playerName = playerInfo.getElementsByTagName("h1")[0].innerText; // プレイヤー名を取得

        return [playerUID, playerName];
    };

    /**
     * 余白用要素を返す
     */
    export const getSeparateElement = (): HTMLSpanElement => {
        const separateElement = document.createElement("span");
        separateElement.classList.add("sep");

        return separateElement;
    };

    export function getLanguage(): Language {
        const language = document.getElementsByClassName(
            "Dropdown-selectedItem"
        )[0];
        return language.textContent as Language;
    }

    /**
     * 要素から、"svelte"から始まるクラス名を取得
     */
    export const getSvelteClassName = (element: Element): string => {
        return (
            Array.from(element.classList).filter((val) =>
                val.match(/svelte/)
            )[0] ?? ""
        );
    };

    /**
     * 親要素から、適切なステータステキスト要素を生成
     */
    export const createStatTextElement = (parentElement: Element): HTMLElement => {
        const className = getSvelteClassName(parentElement); // svelteを抽出
        const tag = parentElement.lastElementChild?.tagName ?? "div"; // 親要素と同じタグを抽出

        const statText = document.createElement(tag);
        statText.classList.add("statText");
        statText.classList.add(className);

        return statText;
    };

    /**
     * statTextを設置してIconを消す
     * @param parentElement 設置したい親要素
     * @param addSep 分割要素を追加するか (default: true)
     * @returns 設置したstatText
     */
    export const addStatTextElement = (parentElement: Element, addSep = true): HTMLElement => {
        if (parentElement.getElementsByClassName("statText").length >= 1)
            return parentElement.getElementsByClassName("statText")[0] as HTMLElement;

        const icon =
            parentElement.getElementsByClassName("ShadedSvgIcon")[0] ?? // 影付きアイコン
            parentElement.getElementsByClassName("Icon")[0];

        if (addSep) {
            // 空白挿入
            const sep = getSeparateElement();
            sep.classList.add(getSvelteClassName(parentElement));
            icon.after(sep);
        }
        const statText = createStatTextElement(parentElement);
        icon.after(statText);

        parentElement.removeChild(icon);

        return statText;
    };

    export const getLocalizeData = (): LocalizeData => {
        const language = EnkaNetworkUtil.getLanguage();

        switch (language) {
            case Language.english:
                return new EN();
            case Language.japanese:
                return new JA();
            default:
                return new EN();
        }
    };
}

export namespace BuildCard {
    type SectionType = "left" | "middle" | "right";

    export const getBuildCard = (): HTMLElement => {
        const buildCard = document.getElementsByClassName(
            "Card"
        )[0] as HTMLElement;
        if (buildCard == null) {
            throw new Error("not card element");
        }

        return buildCard;
    };

    export const getBuildCardSections = (): {
        [key in SectionType]: HTMLElement;
    } => {
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

    export const getArtifacts = (): Artifact[] => {
        const buildCard = getBuildCard();

        const artifacts = buildCard.getElementsByClassName(
            "Artifact"
        ) as HTMLCollectionOf<HTMLElement>;
        return Array.from(artifacts).map((artifact) => new Artifact(artifact));
    };
}
