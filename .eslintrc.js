module.exports = {
  root: true,
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier"
  ],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    node: true
  },
  rules: {
    "no-new": 0,
    "prettier/prettier": [
      "error", {
        "singleQuote": true,
        "semi": false
      }
    ]
  }
}
