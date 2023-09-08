import { isIOS } from './exception/ios';
import { EnkaNetworkObserver } from "./consts";
import { cssManager } from './consts';

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
