module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'curly': 2,

    "@typescript-eslint/prefer-readonly": "error",
    // '@typescript-eslint/prefer-readonly-parameter-types': ["error", {ignoreInferredTypes: true}],
    '@typescript-eslint/array-type': ["error", {"default": "generic", "readonly": "generic"}],


    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error", {
        "vars": "all",
        "args": "after-used",
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^unsafeIgnore",
        "ignoreRestSiblings": true,
      }
    ],

    "import/no-anonymous-default-export": "error",
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['index', 'parent', 'sibling']],
        'newlines-between': 'always',
      }
    ],
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },

    'import/resolver': 'typescript',
  },
};
