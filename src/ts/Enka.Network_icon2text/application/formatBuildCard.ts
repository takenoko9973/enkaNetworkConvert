import { EXTRA_PARAMETER_TEXT, EvaluationConst, TIME_STAMP, cssManager } from '../consts';
import { EnkaNetworkUtil, BuildCard } from "../exception";

export namespace FormatBuildCard {
    const formatWeapon = () => {
        // 武器
        const weapon = BuildCard.getWeapon();
        const weaponImage = weapon.getElementsByTagName("figure")[0]; // 武器画像
        weaponImage.style.width = "30%";

        // ステータス部分を広げる
        const weaponInfo = weapon.getElementsByClassName("weapon-caption")[0];
        (weaponInfo as HTMLElement).style.paddingRight = "0%";

        const weaponSub = weapon.getElementsByClassName("sub")[0];
        (weaponSub as HTMLElement).style.display = "flex";
        if (weaponSub.getElementsByClassName("sep").length <= 0) {
            // sepを複数個生成しないように
            const refine = weaponSub.firstElementChild!;
            refine.after(EnkaNetworkUtil.getSeparateElement());
        }

        // ステータス名を左寄せ、数値を右寄せにする
        const subStats = weapon.getElementsByClassName("Substat");
        for (const subStat of Array.from(subStats) as HTMLElement[]) {
            subStat.style.display = "flex";
            subStat.style.alignItems = "center";
            subStat.style.marginRight = "0%";
            subStat.style.marginBottom = "1%";
            subStat.style.paddingTop = "3%";
        }
    };

    const formatArtifacts = () => {
        // 聖遺物
        const artifacts = BuildCard.getArtifacts();
        const svelte = EnkaNetworkUtil.getSvelteClassName(artifacts[0].element);
        cssManager.addStyle(
            `.Artifact.${svelte} .ArtifactIcon { top: -37%; left: -6%; width: 28%; }`, // 聖遺物画像の調整
            `.substats.${svelte} > .Substat { display: flex; align-items: center; padding-right: 1.0em; white-space: nowrap; }`, // 聖遺物のサブステータスが右に行きすぎるので調整
            `.mainstat.${svelte} > div.${svelte}:nth-child(1) { display: flex; align-items: center; top: 5%; line-height:0.9; max-height: 25%; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; justify-content: flex-end; align-self: unset; margin-left: unset;}`, // 聖遺物メインステータスの調整
            `.mainstat.${svelte} > div.${svelte}:nth-child(2) { padding: 4% 0%; }`,
            `.mainstat.${svelte} > div.${svelte}:nth-child(3) { max-height: 25% }`
        );

        // 聖遺物評価表示欄
        for (const artifact of Array.from(artifacts)) {
            // 複数個作成防止
            let evaluationText = artifact.element.getElementsByClassName(
                EvaluationConst.EVALUATION_TEXT
            )[0];
            if (evaluationText) continue;

            evaluationText = document.createElement("div");
            evaluationText.classList.add(
                EvaluationConst.EVALUATION_TEXT,
                EnkaNetworkUtil.getSvelteClassName(artifact.element)
            );
            artifact.element.appendChild(evaluationText);
        }
        cssManager.addStyle(
            `.Artifact .${EvaluationConst.EVALUATION_TEXT}{ position: absolute; font-size: 0.7em; opacity: 0.6; right: 0.3em; }`
        );
    };

    const createStatsName = () => {
        const buildCard = BuildCard.getBuildCard();

        const mainStats = buildCard.getElementsByClassName("mainstat");
        for (const mainStat of Array.from(mainStats)) {
            EnkaNetworkUtil.addStatTextElement(mainStat, false);
        }

        const subStats = buildCard.getElementsByClassName("Substat");
        for (const subStat of Array.from(subStats)) {
            EnkaNetworkUtil.addStatTextElement(subStat);
        }

        const sections = BuildCard.getBuildCardSections();
        const artifactSubStatTexts = sections["right"].getElementsByClassName("statText");
        for (const statText of Array.from(artifactSubStatTexts)) {
            statText.classList.add("sub");
        }

        const friend = buildCard.getElementsByClassName("fren")[0];
        if (friend instanceof HTMLElement) { // 好感度の存在を確認 (旅人のみ存在しない)
            const friendText = EnkaNetworkUtil.addStatTextElement(
                friend,
                false
            )!;
            friendText.style.marginRight = "0.3em";
        }
    };

    const createDateText = () => {
        const sections = BuildCard.getBuildCardSections();

        if (document.getElementById(TIME_STAMP)) return;

        const timeStamp = document.createElement("div");
        timeStamp.id = TIME_STAMP;
        timeStamp.innerText = "";
        timeStamp.style.fontSize = "60%";
        timeStamp.style.opacity = "0.4";

        sections.left.firstChild?.after(timeStamp);
        sections.left.style.paddingTop = "0.8%";
    };

    const createExtraText = () => {
        const sections = BuildCard.getBuildCardSections();

        if (document.getElementById(EXTRA_PARAMETER_TEXT)) return;

        const extraParameter = document.createElement("div");
        extraParameter.id = EXTRA_PARAMETER_TEXT;
        extraParameter.style.right = "0.3em";
        extraParameter.style.marginTop = "-0.5em";
        extraParameter.style.textAlign = "right";
        extraParameter.style.fontSize = "0.8em";
        extraParameter.style.whiteSpace = "nowrap";
        sections.right.appendChild(extraParameter);
    };

    export const formatBuildCard = () => {
        const sections = BuildCard.getBuildCardSections();

        // 各セクションの幅の調整
        sections.left.style.width = "36%";
        sections.middle.style.width = "24%";
        sections.middle.style.left = "34%";
        sections.right.style.width = "43%";

        formatWeapon();
        formatArtifacts();

        createStatsName();
        createDateText();
        createExtraText();
    };
}
