module.exports = {
  extends: [
    "plugin:vue/essential",
    "prettier/vue",
    "plugin:prettier/recommended",
    "eslint:recommended",
  ],
  env: {
    "node": true
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
