module.exports = {
    env: {
        node: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: './tsconfig.json'
    },
    plugins: [
        '@typescript-eslint'
    ]
}