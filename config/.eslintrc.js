module.exports = {
  env: {
    node: true,
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off", // because node doesn't allow native import statements yet (is there a better way?)
  },
};
