import { cssManager } from "../../myConst";
import { addStatTextElement, getSvelteClassName } from "../../util/enkaUtil";
import { CreateWriteRoutine } from "../createWriteRoutine";

export class ArtifactRoutine implements CreateWriteRoutine {
    private static _instance: ArtifactRoutine;
    private artifacts = document.getElementsByClassName("Artifact");

    public static get instance(): ArtifactRoutine {
        if (!this._instance) {
            this._instance = new ArtifactRoutine();
        }

        return this._instance;
    }

    createText() {
        for (const artifact of Array.from(this.artifacts)) {
            if (artifact.classList.contains("empty")) continue;

            // メインOP
            const mainStat = artifact.getElementsByClassName("mainstat")[0];
            addStatTextElement(mainStat, false);

            // サブOP
            const subStatList = artifact.getElementsByClassName("Substat");
            for (const subStat of Array.from(subStatList)) {
                const statText = addStatTextElement(subStat);
                statText?.classList.add("sub");
            }
        }

        const svelte = getSvelteClassName(this.artifacts[0]);
        const cssStyle = [
            `.Artifact.${svelte} .ArtifactIcon { top: -37%; left: -6%; width: 28%; }`, // 聖遺物画像の調整
            `.substats.${svelte} > .Substat { display: flex; align-items: center; padding-right: 1.0em; white-space: nowrap; }`, // 聖遺物のサブステータスが右に行きすぎるので調整
            `.mainstat.${svelte} > div.${svelte}:nth-child(1) { display: flex; align-items: center; top: 5%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; justify-content: flex-end; align-self: unset; margin-left: unset;}`, // 聖遺物メインステータスの調整
            `.mainstat.${svelte} > div.${svelte}:nth-child(2) { padding: 4% 0%; }`,
            `.mainstat.${svelte} > div.${svelte}:nth-child(3) { max-height: 25% }`,
        ];
        cssManager.addStyle(...cssStyle);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    writeText() {}
}
