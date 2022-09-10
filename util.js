/*
* pythonやC#のformatメソッド的な機能を実現
*/
String.prototype.format = function () {
    let formatted = this;
    for (let arg in arguments) {
        formatted = formatted.replaceAll("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

/**
 * 要素をxPathで指定
 * @param expression xPath
 * @param parentElement 親となる要素 (デフォルトはdocument)
 */
document.getElementsByXPath = function (expression, parentElement) {
    var r = []
    var x = document.evaluate(expression, parentElement || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    for (var i = 0, l = x.snapshotLength; i < l; i++) {
        r.push(x.snapshotItem(i))
    }
    return r;
}
