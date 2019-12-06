module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true

  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 8
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "single"],
    indent: ["error", "tab"],
    "no-tabs": 0,    

    "no-multiple-empty-lines": [2, {
      "max": 2
    }]
  }
}