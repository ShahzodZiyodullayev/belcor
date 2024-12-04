import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin"; // to'g'ri nomdan foydalanish
import tsParser from "@typescript-eslint/parser"; // TypeScript parser kerak

export default [
  {
    ignores: ["dist"], // To'g'ri format
  },
  {
    files: ["**/*.{ts,tsx}"], // TypeScript fayllar uchun ESLint qo'llash
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript versiyasi
      parser: tsParser, // TypeScript parserni kiritamiz
      globals: globals.browser, // Brauzer global o'zgaruvchilarini qo'shish
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint, // TypeScript ESLint plugini
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // React Hooks uchun tavsiya etilgan qoidalar
      ...tseslint.configs.recommended.rules, // TypeScript ESLint tavsiya etilgan qoidalari
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
