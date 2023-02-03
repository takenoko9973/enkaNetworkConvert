import { optionLocale } from "../myConst";
import { addStatTextElement } from "../util/enkaUtil";

const artifacts = document.getElementsByClassName("Artifact");

/**
 * 聖遺物を装備しているかどうか
 */
export function isEquippingArtifact(index: number): boolean {
    if (index < 0 || 4 < index) return false;

    return Array.from(artifacts[index].classList).indexOf("empty") === -1;
}

// 聖遺物のテキスト枠を生成
export function createTextInArtifact() {
    for (const [i, artifact] of Array.from(artifacts).entries()) {
        if (artifact.classList.contains("empty")) continue;

        // メインOP
        const mainStat = artifact.getElementsByClassName("mainstat")[0];
        addStatTextElement(mainStat, false);

        // サブOP
        const subStatList = artifact.getElementsByClassName("Substat");
        for (const subStat of Array.from(subStatList)) {
            addStatTextElement(subStat);
        }

        // スコア表示
        const scoreId = `score${i}`;
        if (document.getElementById(scoreId) === null) {
            const scoreBox = document.createElement("div");
            scoreBox.id = scoreId;
            scoreBox.style.position = "absolute";
            scoreBox.style.fontSize = "70%";
            scoreBox.style.top = "-0.2em";
            scoreBox.style.right = "0.3em";
            scoreBox.style.textAlign = "right";
            scoreBox.style.opacity = "0.6";
            artifact.appendChild(scoreBox);
        }
    }
}

// 聖遺物のアイコンを文字化
export function artifactsIcon2Text() {
    for (const artifact of Array.from(artifacts)) {
        if (artifact.classList.contains("empty")) continue;

        // メインOP
        const mainStat = artifact.getElementsByClassName("mainstat")[0];
        const mainStatText = mainStat.getElementsByClassName("statText")[0] as HTMLElement;
        if (mainStatText) {
            mainStatText.innerText = optionLocale.getLocale(mainStat.classList[1]);
        }

        // サブOP
        const subStatList = artifact.getElementsByClassName("Substat");
        for (const subStat of Array.from(subStatList)) {
            const subStatText = subStat.getElementsByClassName("statText")[0] as HTMLElement;
            if (subStatText) {
                subStatText.innerText = optionLocale.getLocaleSub(subStat.classList[1]);
            }
        }
    }
}
