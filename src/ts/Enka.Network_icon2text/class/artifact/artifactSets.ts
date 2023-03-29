import { statsSubOptionKey } from "../../types/characterStatKey";
import { Artifact } from "./artifact";

export class ArtifactSets {
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
    artifactNum(): number {
        const equippingArtifacts = this.#artifacts.filter((_artifact) =>
            !_artifact.element.classList.contains("empty")
        );
        return equippingArtifacts.length;
    }

    eachScore(key: statsSubOptionKey): number[] {
        return this.#artifacts.map((_artifact) => _artifact.artifactScore(key));
    }

    sumScore(key: statsSubOptionKey): number {
        return this.eachScore(key).reduce((sum, score) => sum + score, 0);
    }

    avgScore(key: statsSubOptionKey): number {
        const artifactNum = this.artifactNum();

        if (artifactNum == 0) {
            return 0;
        } else {
            return this.sumScore(key) / artifactNum;
        }
    }

    eachRollValue(...keys: statsSubOptionKey[]): number[] {
        return this.#artifacts.map((_artifact) => _artifact.rollValue(...keys));
    }

    sumRollValue(...keys: statsSubOptionKey[]): number {
        return this.eachRollValue(...keys).reduce((sum, rv) => sum + rv, 0);
    }

    avgRollValue(...keys: statsSubOptionKey[]): number {
        const artifactNum = this.#artifacts.length;

        if (artifactNum == 0) {
            return 0;
        } else {
            return this.sumRollValue(...keys) / artifactNum;
        }
    }
}
