import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import {
  config as tseslintConfig,
  parser as tseslintParser,
  configs as tseslintConfigs,
} from "typescript-eslint";

export default tseslintConfig(
  eslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  tseslintConfigs.strict,
  tseslintConfigs.stylistic,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslintParser,
    },
    ignores: ["node_modules/", "dist/", "out/"],
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts"],
      },
    },
    rules: {
      "import/no-unresolved": "error",
      "import/no-namespace": "off",
      "import/no-named-as-default": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "object-shorthand": "warn",
      "prefer-template": "warn",
      "import/no-duplicates": ["error", { considerQueryString: true }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Built-in imports (come from NodeJS native) go first
            "external", // <- External imports
            "internal", // <- Absolute imports
            ["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
            "index", // <- index imports
            "unknown", // <- unknown
          ],
          "newlines-between": "always",
          alphabetize: {
            /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
            order: "asc",
            /* ignore case. Options: [true, false] */
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ["**/__tests__/**/*"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
);
