import { cssManager } from "./consts";
import { EnkaNetworkObserver } from "./application";

function init() {
    // 原神のフォントを適応 (最終手段。どうしてもsafariにて改行を防ぐ方法が分からなかった #6)
    cssManager.addStyle(
        '@font-face { font-family: GenFont; src: url(https://7144.jp/SDK_JP_Web-3.woff2) format("woff2"), url(https://7144.jp/SDK_JP_Web-3.woff2) format("woff"); }',
        ".Card { font-family: GenFont !important; font-weight: normal !important; }",
        ".Card b { font-weight: normal !important; }",
    );

    EnkaNetworkObserver.active();
}

init();
