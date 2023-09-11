import { LocalizeKey } from '../../types/localizeKeyType';
import { Artifact } from '../artifact/artifact';

export interface IEvaluateMethod {
    readonly methodName: string;
    readonly methodKey: LocalizeKey;

    createSelector(): HTMLElement

    localizeSelector(): void

    formatEvaluate(num: number): string

    evaluateArtifact(artifact: Artifact): number

    cardExtraText(): string
}
