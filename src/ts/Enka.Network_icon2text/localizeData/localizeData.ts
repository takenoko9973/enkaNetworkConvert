import { LocalizeKey } from "../types";

export type translateArray = {
    [option in LocalizeKey]: {
        locale: string;
        sub: string | undefined;
    };
};

export abstract class LocalizeData {
    protected abstract translateArray: translateArray

    private isKey(checkKey: string): boolean {
        return checkKey in this.translateArray;
    }

    getLocale(key: string): string {
        if (this.isKey(key))
            return this.translateArray[key as LocalizeKey].locale;
        else
            return this.translateArray["UNKNOWN"].locale;
    }

    getLocaleSub(key: string): string {
        if (this.isKey(key))
            return (
                this.translateArray[key as LocalizeKey].sub ??
                this.translateArray[key as LocalizeKey].locale
            );
        else
            return (
                this.translateArray["UNKNOWN"].sub ??
                this.translateArray["UNKNOWN"].locale
            );
    }
}
