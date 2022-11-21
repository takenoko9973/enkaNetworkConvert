class scoreType {
    #id;
    #key;
    #correction;

    constructor(id, key, correction) {
        this.#id = id;
        this.#key = key;
        this.#correction = correction;
    }

    get id() { return this.#id }
    get key() { return this.#key }
    get correction() { return this.#correction }
}
