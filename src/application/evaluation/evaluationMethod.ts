import { LocalizeKey } from "../../types/localizeKeyType";
import { Artifact } from "../artifact/artifact";

export interface IEvaluateMethod {
    readonly methodName: string;
    readonly methodKey: LocalizeKey;

    createSelector(baseElement: HTMLElement): void;

    localizeSelector(baseElement: HTMLElement): void;

    formatEvaluate(num: number): string;

    evaluateArtifact(artifact: Artifact): number;

    cardExtraText(): string;
}
