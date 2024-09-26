import ftFlow from "eslint-plugin-ft-flow";
import react from "eslint-plugin-react";
import globals from "globals";
import parser from "hermes-eslint";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    files: ["**/*.js", "**/*.jsx"],
    ignores: ["**/.eslintrc.js", "**/public", "**/build", "**/node_modules"],
}, ...compat.extends("eslint:recommended", "plugin:ft-flow/recommended", "plugin:react/recommended", "prettier"), {
    plugins: {
        "ft-flow": ftFlow,
        "react": react
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        parser: parser,
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "arrow-parens": "off",
        "import/no-named-as-default": 0,
        "no-bitwise": ["error", {
            allow: ["<<"],
        }],

        "no-param-reassign": 0,
        "react/no-danger": "off",
        "react/prefer-stateless-function": "off",
        "react/prop-types": "off",
        "react/sort-comp": [0, {}],
        "react/jsx-key": "off",
        "invalid-flow-mode": 0,
        'no-unused-vars': 0,
        'missing-local-annot': 0
    },
}];