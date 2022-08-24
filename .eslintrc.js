module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier",
    "simple-import-sort",
    "import",
    "unused-imports",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hooks/recommended",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  rules: {
    "@typescript-eslint/array-type": 1,
    "@typescript-eslint/explicit-function-return-type": 1,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/no-shadow": 1,
    "@typescript-eslint/no-unnecessary-type-constraint": 0,
    "@typescript-eslint/no-unsafe-assignment": 1,
    "@typescript-eslint/prefer-ts-expect-error": 1,
    "@typescript-eslint/promise-function-async": 1,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/switch-exhaustiveness-check": 1,
    "@typescript-eslint/no-empty-interface": 0,
    "array-callback-return": 1,
    "import/first": 1,
    "import/newline-after-import": 1,
    "import/no-duplicates": 1,
    "import/no-named-as-default-member": 0,
    "no-case-declarations": 0,
    "no-console": 1,
    "no-implicit-coercion": 1,
    "no-useless-escape": 0,
    "react/destructuring-assignment": 0,
    "react/prop-types": 0,
    "react/button-has-type": 2,
    "react/react-in-jsx-scope": 0,
    "unused-imports/no-unused-imports": 2,
    "simple-import-sort/exports": 1,
    "simple-import-sort/imports": [
      1,
      {
        groups: [
          // Node.js builtins
          [
            "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
          ],
          // Packages, with react first
          ["^react", "^@?\\w"],
          // Folders in src/
          ["^(model)(/.*|$)"],
          // Side effect imports
          ["^\\u0000"],
          // Parent imports, '..' last
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports, same folder imports and '.' last
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
