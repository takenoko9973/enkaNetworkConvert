import {
    statsMainOptionKey,
    statsSubOptionKey,
} from "../../types/characterStatKey";
import { ArtifactSubStat, ArtifactSubStats } from "./subStats";

export class Artifact {
    #element: Element;
    #star = 0;
    #level = 0;
    #mainStat: statsMainOptionKey = "UNKNOWN";
    #subStats = new ArtifactSubStats();

    constructor(artifact: Element) {
        this.#element = artifact;

        if (!artifact.classList.contains("Artifact")) return;
        if (artifact.classList.contains("empty")) return;

        const elements: { [key in string]: Element } = {};
        elements["mainStat"] = artifact.getElementsByClassName("mainstat")[0];
        elements["subStats"] = artifact.getElementsByClassName("substats")[0];
        elements["stars"] = elements["mainStat"].getElementsByClassName("Stars")[0];
        elements["level"] = elements["mainStat"].getElementsByClassName("level")[0];

        this.#star = elements["stars"].childElementCount;
        this.#level = Number(elements["level"].textContent ?? "0");
        this.#mainStat = elements["mainStat"]
            .classList[1] as statsMainOptionKey;

        const subStats = elements["subStats"].getElementsByClassName("Substat");
        for (const subStat of Array.from(subStats)) {
            const statKey = subStat.classList[1] as statsSubOptionKey;
            const stat = Number(subStat.textContent?.replace("%", "") ?? "0");
            const rolls = Array.from(subStat.getElementsByClassName("rolls")[0].children)
                .map((_roll) => _roll.children.length);
            this.#subStats.addSubStat(new ArtifactSubStat(statKey, stat, rolls));
        }
    }

    get element() {
        return this.#element;
    }

    get star() {
        return this.#star;
    }

    get level() {
        return this.#level;
    }

    get mainStatKey() {
        return this.#mainStat;
    }

    get subStats() {
        return this.#subStats.subStats;
    }
}
