import eslint from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts"],
  },
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.browser,
      },
    },

    rules: {
      ...typescriptEslint.configs.recommended.rules,
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "import",
          format: ["camelCase", "PascalCase"],
        },
      ],
      curly: "warn",
      eqeqeq: "warn",
      "no-throw-literal": "warn",
      semi: "warn",
    },
  },
  {
    files: ["src/web/test/suite/*.ts"],
    rules: {
      "no-undef": "off",
    },
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
  {
    files: ["src/web/pureFolgezettel.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "vscode",
              message: "Do not directly access `vscode` in this file.",
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
];
