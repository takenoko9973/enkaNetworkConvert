(() => {
    'use strict';
    const version = "v0.40";

    const $doc = document;
    const $weapon = $doc.getElementsByClassName("Weapon");
    const $charaStats = $doc.getElementsByClassName("StatsTable");
    const $artifact = $doc.getElementsByClassName("Artifact");

    const converterInstance = new EnkaConverter();

    const BASE_ATK_CLASS = converterInstance.getClassName("BASE_ATK");
    const TIME_STAMP = "timeStamp"

    // スコア計算基準指定 H:HP, A:攻撃力, D:防御力
    const SCORE_TYPE = {
        HP: "H",
        ATTACK: "A",
        DEFENSE: "D",
    }
    let scoreH = SCORE_TYPE.ATTACK;


    function getLanguage() {
        const $language = $doc.getElementsByXPath('//div[@data-icon="language"]')[0];
        return $language.innerText;
    }

    function getConvertStatName(key, isSub) {
        const language = getLanguage();
        const name = converterInstance.getStatName(language, key, isSub);

        return name;
    }

    /**
     * 表示させているプレイヤーのUIDと名前を取得
     */
    function getPlayerInfo() {
        const playerUID = location.pathname.split("/")[2]; // urlからUIDを取得
        const $playerInfo = $doc.getElementsByClassName("PlayerInfo")[0];
        const playerName = $playerInfo.getElementsByTagName("h1")[0].innerText; // プレイヤー名を取得

        return [playerUID, playerName];
    }

    /**
     * キャラクターの合計ステータスを取得
     */
    function getCharacterStats(key) {
        let index = -1;
        const $statsList = $charaStats[0].children;
        if ((index = Array.from($statsList).map(stat => stat.classList[1]).indexOf(key)) === -1) return 0;

        const stat = $statsList[index].children[1].children[2].innerText;
        return Number(stat.replace(/[^0-9.]/g, ''));
    }

    /**
     * 聖遺物を装備しているかどうか
     */
    function isEquippingArtifact(index) {
        if (index < 0 || 4 < index) return false;

        return Array.from($artifact[index].classList).indexOf("empty") === -1;
    }

    // 余白用要素を返す
    function getSeparateElement() {
        const $separateElement = $doc.createElement("span");
        $separateElement.classList += "sep";

        return $separateElement;
    }

    function createConvertTextElements() {
        // 好感度
        const $friend = $doc.getElementsByClassName("fren")[0];
        if ($friend) {
            // アイコン用の隙間を削除
            const $icon = $friend.getElementsByClassName("ShadedSvgIcon")[0];
            $icon.style.width = "0";

            const friendClassName = converterInstance.getClassName("FRIEND");
            if (!$friend.getElementsByClassName(friendClassName)[0]) {
                const $frenText = $doc.createElement("span");
                $frenText.classList.add(friendClassName);
                $frenText.classList.add("svelte-1cfvxg7");
                $frenText.style.cssText = "width:auto; height:auto; font-size:1em; font-weight:bold";
                $friend.prepend($frenText);
            }
        }

        // サブステータス用のテキスト欄の作成
        const $statText = $doc.createElement("div");
        $statText.classList += "svelte-1ut2kb8";
        $statText.style.fontWeight = "bold";

        // 武器
        const $weaponInfo = $weapon[0].getElementsByTagName("content")[0];
        const $subStat = $weaponInfo.getElementsByClassName("Substat");

        const baseAtkClass = converterInstance.getClassName("BASE_ATK")
        if (!$doc.getElementById(baseAtkClass)) {
            const $baseAtk = $statText.cloneNode(true);
            $baseAtk.setAttribute("id", baseAtkClass);
            $baseAtk.classList.add(baseAtkClass);
            $subStat[0].prepend(getSeparateElement());
            $subStat[0].prepend($baseAtk);
        }

        if (!$doc.getElementById("weaponSubOP")) {
            const $subOPName = $statText.cloneNode(true);
            $subOPName.setAttribute("id", "weaponSubOP");
            $subStat[1].prepend(getSeparateElement());
            $subStat[1].prepend($subOPName);
        }

        // 聖遺物
        for (let i = 0; i < 5; i++) {
            if (!isEquippingArtifact(i)) continue;

            // メインOP
            const $mainStat = $artifact[i].getElementsByClassName("mainstat")[0];
            if (!$doc.getElementById("artifactMain" + i)) {
                const $mainOPName = $statText.cloneNode(true);
                $mainOPName.setAttribute("id", "artifactMain" + i);
                $mainStat.prepend(getSeparateElement());
                $mainStat.prepend($mainOPName);
            }

            // サブOP
            const $subStat = $artifact[i].getElementsByClassName("Substat");
            const subLen = $subStat.length;
            for (let j = 0; j < subLen; j++) {
                const subOPId = "artifactSub" + i + "-" + j
                if ($doc.getElementById(subOPId)) continue;

                const $subOPName = $statText.cloneNode(true);
                $subOPName.setAttribute("id", subOPId);
                $subStat[j].prepend(getSeparateElement());
                $subStat[j].prepend($subOPName);
            }

            // スコア表示
            if ($doc.getElementById("score" + i) === null) {
                const $scoreBox = $doc.createElement("div");
                $scoreBox.id = "score" + i;
                $scoreBox.style.cssText = "position: absolute; font-size: 80%; bottom: -0.2em; right: 0.3em; text-align: right; opacity: .6;";
                $artifact[i].appendChild($scoreBox);
            }
        }
    }

    function createModeChangeBottom() {
        const $cardToggles = $doc.getElementsByClassName("CardToggles")[0];
        $cardToggles.classList.add("checkboxuid");

        const radioStyle = [
            ' .checkboxuid label { position: relative; display: inline-flex; }',
            ' .checkboxuid label input[type="checkbox"] { position: absolute; opacity: 0; }',
            ' .checkboxuid label input[type="checkbox"] + span { display: inline; color: rgba(255,255,255,.5); border:1px solid rgba(255,255,255,.5); border-radius: 4px;  padding:.5em .7em; }',
            ' .checkboxuid label input[type="checkbox"]:checked + span { color: rgba(255,255,255,1); }',
            '.inline_radio{ display: inline-flex; margin-left: 0.5em; }',
            '.inline_radio input[type="radio"] { position: absolute; opacity: 0; }',
            '.radbox{ color: rgba(255,255,255,.5); border: 1px solid rgba(255,255,255,.5); border-radius: 4px; padding: .5em .7em; margin-right: 0.5em; }',
            '.inline_radio p input[type="radio"]:checked + label { color: rgba(255,255,255,1); }'
        ];
        const $style = $doc.createElement("style");
        $style.innerHTML = radioStyle.join(" ");
        $doc.querySelector("head").append($style);

        // 計算方法変更用ボタン
        const $div = $doc.createElement("div");
        $div.cssStyle = "display: inline-flex; flex-direction: column;";
        const $text = $doc.createElement("label");
        $text.classList += "svelte-nsdlaj";
        $text.cssStyle = "margin-left: 0.5em;";

        const $scoreModeGroup = $doc.createElement("group");
        $scoreModeGroup.classList.add("inline_radio");
        let i = 0;
        for (let item in SCORE_TYPE) {
            $scoreModeGroup.innerHTML += '<p><input type="radio" name="ssouce" value="{0}" id="r{1}"><label for="r{1}" class="{2} radbox"></label></p>'.format(SCORE_TYPE[item], i, item);
            i++;
        }

        $div.appendChild($text);
        $div.appendChild($scoreModeGroup);
        $cardToggles.getElementsByClassName("Input")[0].parentNode.appendChild($div);

        // 攻撃をデフォルトにする
        const $atkRadio = $div.getElementsByClassName("ATTACK")[0].parentNode;
        $atkRadio.getElementsByTagName("input")[0].checked = true;

        // スコア評価対象変更時に発火
        $doc.getElementsByName("ssouce").forEach((function (e) {
            e.addEventListener("click", (function () {
                scoreH = $doc.querySelector("input:checked[name=ssouce]").value;
                enkaConvertStat();
            }))
        }));
    }

    // 武器オプションの日本語化
    function weaponOPConvert() {
        const $subStat = $weapon[0].getElementsByClassName("Substat");

        const $baseAtk = $doc.getElementById(BASE_ATK_CLASS);
        if ($baseAtk) $baseAtk.innerText = getConvertStatName(BASE_ATK_CLASS);

        const $weaponSub = $doc.getElementById("weaponSubOP");
        if ($weaponSub) $weaponSub.innerText = getConvertStatName($subStat[1].classList[1]);
    }

    // 聖遺物の日本語化
    function artifactConvert() {
        for (let i = 0; i < 5; i++) {
            // 聖遺物を付けていない場合、スキップ
            if (!isEquippingArtifact(i)) continue;

            // メインOP
            const $mainStat = $artifact[i].getElementsByClassName("mainstat")[0];
            $doc.getElementById("artifactMain" + i).innerText = getConvertStatName($mainStat.classList[1])

            // サブOP
            const $subStat = $artifact[i].getElementsByClassName("Substat");
            const subLen = $subStat.length;
            for (let j = 0; j < subLen; j++) {
                const subOPId = "artifactSub" + i + "-" + j
                if (!$doc.getElementById(subOPId)) continue;

                $doc.getElementById(subOPId).innerText = getConvertStatName($subStat[j].classList[1], true);
            }
        }
    }

    function enkaConvertStat() {
        weaponOPConvert();
        artifactConvert();

        // 好感度
        const $friend = $doc.getElementsByClassName("fren")[0];
        if ($friend) {
            const friendClassName = converterInstance.getClassName("FRIEND")
            const $friendText = $friend.getElementsByClassName(friendClassName)[0];
            $friendText.innerText = getConvertStatName(friendClassName);
        }

        // 情報取得日時を表示
        const date = new Date;
        date.setTime(date.getTime() - 60 * date.getTimezoneOffset() * 1000);
        const timeString = date.toISOString().replace("T", " ").substr(0, 19);
        $doc.getElementById(TIME_STAMP).innerText = version + "_" + timeString;

        // スコア方式選択ボタン
        const typeLen =  Object.keys(SCORE_TYPE).length
        for (let i = 0; i < typeLen; i++) {
            const $radio = $doc.getElementById("r" + i).parentNode;
            $radio.children[1].innerText = getConvertStatName($radio.children[1].classList[0]);
        }
    }

    window.onload = function () {
        // デバイスの判定
        const device = navigator.userAgent;
        if ((device.indexOf("iPhone") > 0 || device.indexOf("iPad") > 0)) {
            // iOS
            $doc.querySelector("body").style.WebkitTextSizeAdjust = "95%";
        }

        // 武器
        const $weaponInfo = $weapon[0].getElementsByTagName("content")[0];
        const $weaponName = $weaponInfo.getElementsByTagName("h3")[0];
        $weaponInfo.style.paddingRight = "0px";
        $weaponName.style.cssText = "font-weight: bold;";
        $weapon[0].children[0].style.width = "30%";  // 武器画像

        // ###### キャラカードのデザイン変更 ######
        const $charaCard = $doc.getElementsByClassName("card-host")[0];

        // 取得時間
        const $timeStamp = $doc.createElement("div");
        $timeStamp.id = TIME_STAMP;
        $timeStamp.style.cssText = "position: absolute; top: 1%; left: 2%; font-size: 60%; opacity: 0.4;";
        $timeStamp.innerText = "";
        $timeStamp.setAttribute("class", "svelte-1ujofp1");
        $charaCard.appendChild($timeStamp);

        // cssの全面的な変更
        const cssStyle = [
            '.Icon{ display:none !important }',  // アイコンの削除
            '.stats.svelte-gp6viv .Substat { padding-top: 4%; }',  // 武器ステータスの枠を大きく
            '.Substat.svelte-1ut2kb8.svelte-1ut2kb8 { display: flex; align-items: center; margin-right: 0em; line-height: 95%; font-size: 98%; }',  // サブステータスの枠を広げる
            '.substats.svelte-17qi811>.Substat { padding-right: 1.0em; }',  // 聖遺物のサブステータスが右に行きすぎるので調整
            '.Artifact.svelte-17qi811 .ArtifactIcon { top: -37%; left: -6%; width: 28%; }',  // 聖遺物画像の調整
            '.mainstat.svelte-17qi811 > div:nth-child(1) { display: flex; align-items: center; top: 3px; margin-bottom: 3px; max-height: 100%; font-size: 110%; line-height: 90%; width: auto; height: 50em; text-shadow: rgba(0,0,0,0.2) 2px 2px 1px; font-weight:bold; }',  // 聖遺物メインステータスの調整
            '.mainstat.svelte-17qi811 > div:nth-child(4) { display: flex; align-items: center; margin-left: auto }'  // 聖遺物メインステータスの調整
        ];
        const $style = $doc.createElement("style");
        $style.innerHTML = cssStyle.join(" ");
        $doc.querySelector("head").append($style);

        // 全体の配置の変更
        const $cardSection = $doc.getElementsByClassName("section");
        // 左
        $cardSection[0].style.width = "36%";
        // 中央
        $cardSection[1].style.width = "24%";
        $cardSection[1].style.left = "34%";
        // 右
        $cardSection[2].style.width = "43%";
        $cardSection[2].style.height = "97%";

        createConvertTextElements();
        createModeChangeBottom();

        enkaConvertStat();

        const $charaName = $doc.getElementsByClassName("name")[0];
        const $language = $doc.getElementsByXPath('//div[@data-icon="language"]')[0];
        // 言語やキャラクター変更時に再翻訳
        const observeConf = { childList: true, attributes: true, characterData: true };
        const observer = new MutationObserver(mutations => {
            createConvertTextElements();
            enkaConvertStat();
        })
        observer.observe($charaName, observeConf); // キャラクター変更時
        observer.observe($language, observeConf); // 言語変更時
    };
})();
