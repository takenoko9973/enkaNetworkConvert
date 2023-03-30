import {
    statsMainOptionKey,
    statsSubOptionKey,
} from "../../types/characterStatKey";
import { ArtifactMainStat } from "./artifactStatMain";
import { ArtifactSubStat, ArtifactSubStats } from "./artifactStatSub";

export class Artifact {
    #element: Element;
    #star = 0;
    #mainStat = new ArtifactMainStat("UNKNOWN", 0, 0);
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

        const mainStatKey = elements["mainStat"].classList[1] as statsMainOptionKey;
        const stat = elements["mainStat"].children[2].textContent?.replace("%", "") ?? "0";
        const level = Number(elements["level"].textContent ?? "0");
        this.#mainStat = new ArtifactMainStat(mainStatKey, Number(stat), level);

        const subStats = elements["subStats"].getElementsByClassName("Substat");
        for (const subStat of Array.from(subStats)) {
            const statKey = subStat.classList[1] as statsSubOptionKey;
            const stat = Number(subStat.lastChild?.textContent?.replace("%", "") ?? "0");
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

    get mainStat() {
        return this.#mainStat;
    }

    get subStats() {
        return this.#subStats.subStats;
    }
}

export class Artifacts {
    #element: Element;
    #artifacts: Artifact[] = [];

    constructor(artifactSets: Element) {
        this.#element = artifactSets;
        const artifacts = artifactSets.getElementsByClassName("Artifact");

        for (const artifact of Array.from(artifacts)) {
            this.#artifacts.push(new Artifact(artifact));
        }
    }

    get element() {
        return this.#element;
    }

    get artifacts() {
        return this.#artifacts;
    }

    // 装備している聖遺物数
    artifactNum = (): number => {
        const equippingArtifacts = this.#artifacts.filter((_artifact) =>
            !_artifact.element.classList.contains("empty")
        );
        return equippingArtifacts.length;
    };
}
