// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'prefer-const': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-namespace': 'off',
    },
  },
  {
    ignores: [".env", "node_modules", "./dist"],
  },
]);
