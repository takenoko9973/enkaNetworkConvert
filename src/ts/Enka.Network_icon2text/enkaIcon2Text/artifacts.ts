import { optionLocale } from "../main";
import { getSeparateElement } from "../util/enkaUtil";

const artifacts = document.getElementsByClassName("Artifact");

/**
 * 聖遺物を装備しているかどうか
 */
export function isEquippingArtifact(index: number): boolean {
    if (index < 0 || 4 < index) return false;

    return Array.from(artifacts[index].classList).indexOf("empty") === -1;
}

// サブステータス用のテキスト欄の作成
function createStatTextElement(): HTMLDivElement {
    const statText = document.createElement("div");
    statText.classList.add("svelte-17qi811");
    statText.style.fontWeight = "bold";

    return statText;
}

// 聖遺物のテキスト枠を生成
export function createTextInArtifact() {
    for (const [i, artifact] of Array.from(artifacts).entries()) {
        if (artifact.classList.contains("empty")) continue;

        // メインOP
        const mainStat = artifact.getElementsByClassName("mainstat")[0];
        const mainOPId = `artifactMain${i}`;
        if (document.getElementById(mainOPId) === null) {
            const $statIcon = mainStat.children[0];
            mainStat.removeChild($statIcon);

            const mainOPText = createStatTextElement();
            mainOPText.id = mainOPId;
            mainStat.prepend(mainOPText);
        }

        // サブOP
        const subStatList = artifact.getElementsByClassName("Substat");
        for (const [j, subStat] of Array.from(subStatList).entries()) {
            const subOPId = `artifactSub${i}-${j}`;
            if (document.getElementById(subOPId)) continue;

            const subOPText = createStatTextElement();
            subOPText.id = subOPId;
            subStat.prepend(getSeparateElement());
            subStat.prepend(subOPText);
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
        (mainStat.children[0] as HTMLElement).innerText =
            optionLocale.getLocale(mainStat.classList[1]);

        // サブOP
        const subStatList = artifact.getElementsByClassName("Substat");
        for (const $subStat of Array.from(subStatList)) {
            ($subStat.children[0] as HTMLElement).innerText =
                optionLocale.getLocaleSub($subStat.classList[1]);
        }
    }
}
