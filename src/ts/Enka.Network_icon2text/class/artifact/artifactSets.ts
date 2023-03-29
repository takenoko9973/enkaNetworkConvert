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
    artifactNum = (): number => {
        const equippingArtifacts = this.#artifacts.filter((_artifact) =>
            !_artifact.element.classList.contains("empty")
        );
        return equippingArtifacts.length;
    };
}
