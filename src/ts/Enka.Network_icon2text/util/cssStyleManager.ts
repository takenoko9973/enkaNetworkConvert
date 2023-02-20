export class CssStyleManager {
    private static _instance: CssStyleManager;

    private style: HTMLElement;
    private css: string[] = [];

    constructor() {
        this.style = document.createElement("style");

        const head = document.querySelector("head");
        head?.append(this.style);
    }

    public static get instance(): CssStyleManager {
        if (!this._instance) {
            this._instance = new CssStyleManager();
        }

        return this._instance;
    }

    addStyle(...css: string[]) {
        this.css.push(...css);
        this.css = [...new Set(this.css)];  // 重複削除
        this.style.innerHTML = this.css.join(" ");
    }
}