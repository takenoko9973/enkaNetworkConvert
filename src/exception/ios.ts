export function isIOS(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    const checkAgents = new RegExp(["iphone", "ipad", "macintosh"].join("|"));

    if (checkAgents.test(userAgent) && "ontouchend" in document) {
        return true;
    } else {
        return false;
    }
}
