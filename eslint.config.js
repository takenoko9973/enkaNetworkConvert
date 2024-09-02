import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import("eslint").Linter.Config} */
const tsConfig = {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
        parser: tsParser,
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.es2021,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
            project: "./tsconfig.json",
        },
    },
    rules: {
        "indent": [
            "warn",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "semi": ["warn", "always"],
        "@typescript-eslint/no-namespace": "off",
    },
};

export default tseslint.config(
    {
        ignores: ["dist/"],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    tsConfig
);
