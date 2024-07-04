module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript',
    "plugin:import/typescript"
  ],
  overrides: [
    {
      env: {
        node: true,
        jest: true,
      },
      files: [
        '.eslintrc.{js,cjs,ts,tsx}',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/.ts',
        '**/.tsx',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: "./tsconfig.json"
  },
  plugins: [
    "@typescript-eslint",
    "react",
  ],
  rules: {
    "no-underscore-dangle" : 0
  },
  ignores: ["./vite.config.ts"]
};
