module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.eslint.json"] },
  plugins: ["@typescript-eslint"],
  rules: {
    "import/prefer-default-export": "off",
  },
};
