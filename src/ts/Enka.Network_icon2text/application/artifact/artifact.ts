import { MainOption, SubOption } from "../../types";

class StatNumber {
    readonly stat: number;

    constructor(stat: string | number) {
        if (typeof stat == "string") {
            stat = stat.replace(/[,%]/, "");
            this.stat = Number(stat);
        } else {
            this.stat = stat;
        }
    }
}

class ArtifactMainStat {
    constructor(
        readonly statKey: MainOption,
        readonly stat: StatNumber
    ) { }
}

class ArtifactSubStat {
    constructor(
        readonly statKey: SubOption,
        private _stat: StatNumber,
        readonly rolls: number[]
    ) { }

    get stat(): number {
        return this._stat.stat;
    }
}

export class Artifact {
    element: Element;

    readonly mainStat: ArtifactMainStat = new ArtifactMainStat(
        "UNKNOWN",
        new StatNumber(0)
    );
    readonly subStats: ArtifactSubStat[] = [];

    constructor(element: Element) {
        this.element = element;

        if (!this.element.classList.contains("Artifact")) return;
        if (this.element.classList.contains("empty")) return;

        const elements = {
            mainStat: this.element.getElementsByClassName("mainstat")[0]!,
            subStats: this.element.getElementsByClassName("substats")[0],
        } as const;

        const mainStatKey = elements.mainStat.classList[1] as MainOption;
        const mainStatNum = new StatNumber(
            elements.mainStat.children[1].textContent ?? "0"
        );
        this.mainStat = new ArtifactMainStat(mainStatKey, mainStatNum);

        const subStats = elements["subStats"].getElementsByClassName("Substat");
        this.subStats = Array.from(subStats).map((subStat) => {
            const subStatKey = subStat.classList[1] as SubOption;
            const subStatNum = new StatNumber(
                subStat.lastChild?.textContent ?? "0"
            );
            const rolls = Array.from(
                subStat.getElementsByClassName("rolls")[0].children
            ).map((roll) => roll.childElementCount);

            return new ArtifactSubStat(subStatKey, subStatNum, rolls);
        });
    }
}

export class Artifacts {
    readonly artifacts: Artifact[];

    constructor(artifactSet: Element) {
        const artifacts = artifactSet.getElementsByClassName("Artifact");

        this.artifacts = Array.from(artifacts).map(
            (artifact) => new Artifact(artifact)
        );
    }
}
