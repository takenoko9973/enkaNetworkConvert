import { isIOS } from './exception/ios';
import { cssManager } from "./consts";
import { EnkaNetworkObserver } from './application';

function init() {
    // ###### キャラカードのデザイン変更 ######
    // cssの全面的な変更
    if (isIOS()) {
        cssManager.addStyle(
            ".statText { font-weight: bold; font-size: 95%; }"
        );
    } else {
        cssManager.addStyle(
            ".statText { font-weight: bold; font-size: 100%; }"
        );
    }

    EnkaNetworkObserver.active();
}

init();
