module.exports = {
    ignorePatterns: [
        'dist/**/*.js'
    ],
    extends: [
        'plugin:jest/recommended'
    ],
    parserOptions: {
        project: './src/tsconfig.json'
    }
}
