import { EnkaNetworkUtil, BuildCard } from "../../exception";
import { LocalizeKey } from "../../types";
import { Artifact } from "../artifact/artifact";
import { cssManager } from "../../consts";
import { ILocalize } from "./localize";

export class LocalizeArtifact implements ILocalize {
    artifacts: Artifact[] = [];

    constructor() {
        this.artifacts = BuildCard.getArtifacts();
    }

    format() {
        for (const artifact of this.artifacts) {
            if (artifact.element.classList.contains("empty")) continue;

            const mainStat =
                artifact.element.getElementsByClassName("mainstat")[0];
            EnkaNetworkUtil.addStatTextElement(mainStat, false);

            const subStats = artifact.element.getElementsByClassName("Substat");
            for (const subStat of Array.from(subStats)) {
                const statText = EnkaNetworkUtil.addStatTextElement(subStat);
                statText.classList.add("sub");
            }
        }

        const svelte = EnkaNetworkUtil.getSvelteClassName(
            this.artifacts[0].element
        );
        cssManager.addStyle(
            `.Artifact.${svelte} .ArtifactIcon { top: -37%; left: -6%; width: 28%; }`, // 聖遺物画像の調整
            `.substats.${svelte} > .Substat { display: flex; align-items: center; padding-right: 1.0em; white-space: nowrap; }`, // 聖遺物のサブステータスが右に行きすぎるので調整
            `.mainstat.${svelte} > div.${svelte}:nth-child(1) { display: flex; align-items: center; top: 5%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; justify-content: flex-end; align-self: unset; margin-left: unset;}`, // 聖遺物メインステータスの調整
            `.mainstat.${svelte} > div.${svelte}:nth-child(2) { padding: 4% 0%; }`,
            `.mainstat.${svelte} > div.${svelte}:nth-child(3) { max-height: 25% }`
        );
    }

    localize() {
        for (const artifact of this.artifacts) {
            if (artifact.element.classList.contains("empty")) continue;

            const mainStat =
                artifact.element.getElementsByClassName("mainstat")[0];
            this.inputLocalize(mainStat);

            const subStats = artifact.element.getElementsByClassName("Substat");
            for (const subStat of Array.from(subStats)) {
                this.inputLocalize(subStat);
            }
        }
    }

    private inputLocalize(parentElement: Element) {
        const localizeData = EnkaNetworkUtil.getLocalizeData();

        const statText = parentElement.getElementsByClassName(
            "statText"
        )[0] as HTMLElement;
        if (!statText) return;

        const statKey =
            (parentElement.classList[1] as LocalizeKey) ?? "UNKNOWN";

        statText.innerText = this.isSubStat(statText)
            ? localizeData.getLocaleSub(statKey)
            : localizeData.getLocale(statKey);
    }

    private isSubStat(element: Element): boolean {
        return element.classList.contains("sub");
    }
}
