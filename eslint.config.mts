import globals from 'globals'
import eslint from "@eslint/js"
import react from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import perfectionist from 'eslint-plugin-perfectionist'
import simpleImportSort from "eslint-plugin-simple-import-sort"

export default tseslint.config(
  {
    ignores: [
      'build',
      'playwright',
      '*.config.*',
      'vite.config.*',
      'vitest.shims.d.ts',
      'tailwind.config.*',
      'stylelint.config.*',
      'lint-staged.config.*',
      'src/renderer/app/typings/**/*.d.ts',
    ],
  },
  {
  extends: [
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
  ],
  plugins: {
    perfectionist,
    'react': react,
    '@stylistic': stylistic,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'simple-import-sort': simpleImportSort,
  },
  languageOptions: {
    ecmaVersion: 2020,
    parser: tseslint.parser,
    globals: {
      ...globals.node,
      ...globals.browser,
      __DEV__: 'readonly',
      __STAGE__: 'readonly',
      __PROD__: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
        impliedStrict: true,
      },
      project: [
        './tsconfig.app.json',
        './tsconfig.electron.json'
      ],
    },
  },
}, {
  files: ['src/**/*.{js,ts,jsx,tsx}'],
  settings: {
    react: {
      version: 'detect',
    }
  },
  rules: {
    ...react.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    ...reactRefresh.configs.recommended.rules,

    /* React Rules */
    'react/react-in-jsx-scope': 'off',

    /* React Hooks Rules */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    /* Stylistic Rules  */
    '@stylistic/no-tabs': "off",
    "@stylistic/unicode-bom": "off",

    '@stylistic/dot-location': 'off',
    '@stylistic/arrow-parens': 'off',
    '@stylistic/new-parens': "error",
    "@stylistic/wrap-regex": "error",

    '@stylistic/arrow-spacing': 'off',

    '@stylistic/semi-spacing': 'error',

    '@stylistic/linebreak-style': 'off',
    '@stylistic/no-multi-spaces': "off",
    '@stylistic/no-extra-parens': 'off',

    "@stylistic/space-infix-ops": "error",
    "@stylistic/space-unary-ops": "error",
    '@stylistic/semi': ["error", "never"],
    '@stylistic/indent': ["error", "tab"],

    '@stylistic/no-trailing-spaces': "error",
    "@stylistic/space-before-blocks": "error",
    '@stylistic/line-comment-position': 'off',

    "@stylistic/switch-colon-spacing": "error",
    '@stylistic/eol-last': ["error", "always"],

    '@stylistic/multiline-comment-style': "off",
    '@stylistic/max-statements-per-line': 'off',
    '@stylistic/comma-style': ["error", "last"],
    "@stylistic/semi-style": ["error", "first"],

    "@stylistic/wrap-iife": ["error", "outside"],

    '@stylistic/padded-blocks': ["error", "never"],
    '@stylistic/no-mixed-spaces-and-tabs': "error",

    '@stylistic/quote-props': ["error", "as-needed"],
    "@stylistic/space-in-parens": ["error", "never"],
    '@stylistic/brace-style': ["error", "stroustrup"],
    '@stylistic/padding-line-between-statements': 'off',

    '@stylistic/no-whitespace-before-property': "error",
    '@stylistic/multiline-ternary': ["error", "always"],
    '@stylistic/jsx-quotes': ["error", "prefer-single"],
    '@stylistic/operator-linebreak': ["error", "after"],
    "@stylistic/yield-star-spacing": ["error", "after"],

    '@stylistic/array-element-newline': ["off", "never"],
    '@stylistic/array-bracket-newline': ['off', 'never'],
    '@stylistic/rest-spread-spacing': ["error", "never"],

    "@stylistic/template-tag-spacing": ["error", "never"],

    '@stylistic/array-bracket-spacing': ["error", "never"],
    '@stylistic/function-call-spacing': ["error", "never"],
    '@stylistic/object-curly-newline': ["error", "always"],

    "@stylistic/template-curly-spacing": ["error", "never"],
    '@stylistic/comma-dangle': ["error", "always-multiline"],
    '@stylistic/keyword-spacing': ["error", {"before": true}],

    '@stylistic/implicit-arrow-linebreak': ["error", "beside"],
    '@stylistic/computed-property-spacing': ["error", "never"],

    '@stylistic/no-multiple-empty-lines': ["error", {"max": 1}],
    '@stylistic/function-paren-newline': ["error", "consistent"],
    "@stylistic/space-before-function-paren": ["error", "never"],

    '@stylistic/lines-between-class-members': ["error", "always"],

    '@stylistic/nonblock-statement-body-position': ["error", "below"],

    '@stylistic/function-call-argument-newline': ["error", "consistent"],
    '@stylistic/spaced-comment': ['error', 'always', {markers: ['/'],},],

    '@stylistic/max-len': ["error", { "code": 240, "ignoreComments": true }],

    '@stylistic/comma-spacing': ["error", { "before": false, "after": true }],
    '@stylistic/quotes': ["error", "single", { "allowTemplateLiterals": "always" }],

    '@stylistic/lines-around-comment': ["off", {"beforeBlockComment": true}],
    '@stylistic/newline-per-chained-call': ["error", { "ignoreChainWithDepth": 2 }],
    '@stylistic/generator-star-spacing': ["error", {"before": true, "after": false}],

    '@stylistic/key-spacing': ["error", {"beforeColon": false, "afterColon": true, "mode": "minimum", "align": "value"}],

     /*    Eslint Rules  */
    /* --- No Rules --- */
    'no-new': 'warn',

    'no-var': 'error',

    'no-shadow': 'off',
    'no-labels': 'off',
    'no-empty': 'warn',
    'no-with': 'error',
    'no-void': 'error',
    'no-alert': 'warn',
    'no-eval': 'error',

    'no-ternary': 'off',
    'no-eq-null': 'off',
    'no-bitwise': 'off',
    'no-proto': 'error',
    'no-octal': 'error',
    'no-undef': 'error',

    'no-plusplus': 'off',
    'no-continue': 'off',
    'no-console': 'warn',
    'no-caller': 'error',

    'no-loop-func': 'off',
    'no-label-var': 'off',
    'no-undefined': 'off',
    'no-debugger': 'warn',

    'no-lonely-if': 'warn',
    'no-new-func': 'error',
    'no-iterator': 'error',

    'no-fallthrough': 'off',
    'no-obj-calls': 'error',
    'no-dupe-keys': 'error',
    'no-dupe-args': 'error',
    'no-ex-assign': 'error',
    'no-multi-str': 'error',
    'no-redeclare': 'error',
    'no-div-regex': 'error',
    'no-sequences': 'error',

    'no-regex-spaces': 'off',
    'no-unreachable': 'warn',
    'no-new-symbol': 'error',
    'no-extra-bind': 'error',
    'no-extra-semi': 'error',
    'no-new-object': 'error',
    'no-delete-var': 'error',
    'no-script-url': 'error',
    'no-undef-init': 'error',

    'no-throw-literal': 'off',
    'no-magic-numbers': 'off',
    'no-sparse-arrays': 'off',
    'no-func-assign': 'error',
    'no-self-assign': 'error',
    'no-else-return': 'error',
    'no-extra-label': 'error',
    'no-lone-blocks': 'error',

    'no-unsafe-finally': 'off',
    'no-useless-escape': 'off',
    'no-await-in-loop': 'warn',
    'no-empty-pattern': 'warn',
    'no-unused-labels': 'warn',
    'no-useless-catch': 'warn',
    'no-class-assign': 'error',
    'no-const-assign': 'error',
    'no-dupe-else-if': 'error',
    'no-self-compare': 'error',
    'no-useless-call': 'error',
    'no-implied-eval': 'error',
    'no-octal-escape': 'error',
    'no-new-wrappers': 'error',
    'no-multi-assign': 'error',
    'no-return-await': 'error',
    'no-invalid-this': 'error',

    'no-unsafe-negation': 'off',
    'no-useless-return': 'warn',
    'no-empty-function': 'warn',
    'no-setter-return': 'error',
    'no-control-regex': 'error',
    'no-import-assign': 'error',
    'no-extend-native': 'error',
    'no-global-assign': 'error',
    'no-return-assign': 'error',

    'no-warning-comments': 'off',
    'no-floating-decimal': 'off',
    'no-implicit-globals': 'off',
    'no-mixed-operators': 'warn',
    'no-duplicate-case': 'error',
    'no-invalid-regexp': 'error',
    'no-param-reassign': 'error',
    'no-nested-ternary': 'error',
    'no-useless-rename': 'error',
    'no-useless-concat': 'error',

    'no-negated-condition': 'off',
    'no-duplicate-imports': 'off',
    'no-case-declarations': 'off',
    'no-use-before-define': 'off',
    'no-unreachable-loop': 'warn',
    'no-confusing-arrow': 'error',
    'no-inline-comments': 'error',

    'no-restricted-exports': 'off',
    'no-restricted-imports': 'off',
    'no-extra-boolean-cast': 'off',
    'no-unneeded-ternary': 'error',
    'no-compare-neg-zero': 'error',

    'no-empty-static-block': 'warn',
    'no-unused-expressions': 'warn',
    'no-constructor-return': 'warn',
    'no-array-constructor': 'error',
    'no-this-before-super': 'error',
    'no-loss-of-precision': 'error',
    'no-implicit-coercion': 'error',
    'no-restricted-syntax': 'error',
    'no-underscore-dangle': 'error',

    'no-useless-constructor': 'warn',
    'no-inner-declarations': 'error',
    'no-dupe-class-members': 'error',
    'no-prototype-builtins': 'error',
    'no-restricted-globals': 'error',

    'no-restricted-properties': 'off',
    'no-useless-computed-key': 'warn',

    'no-irregular-whitespace': 'error',
    'no-unexpected-multiline': 'error',

    'no-useless-backreference': 'error',
    'no-empty-character-class': 'error',

    'no-async-promise-executor': 'error',

    'no-unmodified-loop-condition': 'off',
    'no-unsafe-optional-chaining': 'warn',
    'no-promise-executor-return': 'error',
    'no-nonoctal-decimal-escape': 'error',
    'no-shadow-restricted-names': 'error',
    'no-cond-assign': ['error', 'always'],

    'no-template-curly-in-string': 'error',

    'no-new-native-nonconstructor': 'error',

    'no-misleading-character-class': 'error',
    'no-constant-binary-expression': 'error',

    'no-unused-private-class-members': 'warn',

    'no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
    'no-constant-condition': ['warn', { checkLoops: false, },],

    /* Base Rules */
    'radix': 'off',
    'yoda': 'error',

    'strict': 'error',
    'id-match': 'off',
    'eqeqeq': 'error',

    'new-cap': 'error',
    'sort-vars': 'off',
    'sort-keys': 'off',
    'id-length': 'off',

    'func-style': 'off',
    'max-params': 'off',

    'id-denylist': 'off',
    'camelcase': 'error',
    'use-isnan': 'error',

    'dot-notation': 'off',
    'sort-imports': 'off',

    'vars-on-top': 'error',
    'require-await': 'off',
    'guard-for-in': 'warn',
    'prefer-const': 'warn',

    'max-statements': 'off',
    'prefer-spread': 'warn',
    'default-case': 'error',
    'valid-typeof': 'error',

    'max-depth': ['warn', 2],
    'accessor-pairs': 'warn',
    'getter-return': 'error',
    'for-direction': 'error',
    'require-yield': 'error',

    'complexity': ['warn', 8],
    'curly': ['error', 'all'],

    'max-lines': ['warn', 500],
    'prefer-template': 'error',
    'consistent-this': 'error',
    'init-declarations': 'off',

    'default-param-last': 'off',
    'consistent-return': 'warn',
    'block-scoped-var': 'error',
    'object-shorthand': 'error',

    'symbol-description': 'warn',
    'default-case-last': 'error',
    'constructor-super': 'error',
    'prefer-rest-params': 'warn',
    'func-name-matching': 'warn',

    'prefer-object-spread': 'off',
    'capitalized-comments': 'off',
    'one-var': ['error', 'never'],

    'max-nested-callbacks': 'warn',
    'prefer-destructuring': 'warn',

    'grouped-accessor-pairs': 'off',
    'class-methods-use-this': 'off',
    'max-lines-per-function': 'off',
    'require-unicode-regexp': 'off',

    'require-atomic-updates': 'warn',
    'prefer-arrow-callback': 'error',
    'prefer-regex-literals': 'error',
    'prefer-numeric-literals': 'off',
    'prefer-object-has-own': 'error',

    'prefer-named-capture-group': 'off',

    'func-names': ['error', 'as-needed'],
    'max-classes-per-file': ['error', 1],

    'arrow-body-style': ['error', 'always'],
    'prefer-promise-reject-errors': 'error',

    'operator-assignment': ['error', 'never'],
    'prefer-exponentiation-operator': 'error',

    'logical-assignment-operators': ['error', 'never'],
    'one-var-declaration-per-line': ['error', 'always'],

    'array-callback-return': ['error', { allowImplicit: true, },],

    /* TypeScript Rules */
    "@typescript-eslint/typedef": "off",

    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/prefer-for-of": "off",

    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-namespace": "error",

    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/prefer-includes": "off",
    "@typescript-eslint/no-this-alias": "error",

    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-mixed-enums": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/unbound-method": "error",

    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/no-var-requires": "error",

    "@typescript-eslint/no-unsafe-argument": "off",

    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-extraneous-class": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-base-to-string": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/unified-signatures": "error",

    "@typescript-eslint/prefer-function-type": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/parameter-properties": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/ban-tslint-comment": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/prefer-regexp-exec": "error",

    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-restricted-types": "error",

    "@typescript-eslint/prefer-ts-expect-error": "off",
    "@typescript-eslint/sort-type-constituents": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/no-invalid-void-type": "error",

    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/prefer-optional-chain": "error",

    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/restrict-plus-operands": "error",

    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/prefer-namespace-keyword": "warn",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/no-useless-empty-export": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/prefer-return-this-type": "error",

    "@typescript-eslint/prefer-literal-enum-member": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",

    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "error",

    "@typescript-eslint/no-meaningless-void-operator": "off",
    "@typescript-eslint/class-literal-property-style": "off",
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
    "@typescript-eslint/require-array-sort-compare": "error",

    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "off",

    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unnecessary-type-parameters": "off",
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",

    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/consistent-generic-constructors": "off",
    "@typescript-eslint/no-unsafe-declaration-merging": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/restrict-template-expressions": "error",

    "@typescript-eslint/no-duplicate-type-constituents": "error",
    "@typescript-eslint/no-redundant-type-constituents": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",

    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/non-nullable-type-assertion-style": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
    "@typescript-eslint/array-type": ["error", {"default": "generic", "readonly": "generic"}],
    "@typescript-eslint/explicit-member-accessibility": ["error", {"overrides": {"constructors": "off"}}],

    "@typescript-eslint/ban-ts-comment": ["error", {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description",
        "ts-nocheck": "allow-with-description",
        "ts-check": "allow-with-description",
        "minimumDescriptionLength": 10
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variableLike",
        "format": [
          "camelCase",
          "PascalCase",
          "UPPER_CASE"
        ]
      },
      {
        "selector": "typeParameter",
        "format": [
          "PascalCase"
        ],
        "prefix": ["T"]
      },
      {
        "selector": "interface",
        "format": [
          "PascalCase"
        ],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      },
      {
        "selector": [
          "enumMember"
        ],
        "format": [
          "UPPER_CASE"
        ]
      }
    ],

    /* sort rules */
    "simple-import-sort/imports": ["error", {
      "groups": [
        ["^\\u0000"],
        ["^node:"],
        ["^@?\\w"],
        ["^@/typings"],
        ["^@/app"],
        ["^@/shared"],
        ["^@/pages"],
        ["^@/services"],
        ["^@/modules"],
        ["^\\.\\.(?!/?$)", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
      ]
    }],
    "perfectionist/sort-imports": "off",
    "perfectionist/sort-named-imports": "off",
    "perfectionist/sort-named-exports": [
      "error",
      {
        "order": "desc",
        "ignoreCase": true,
        "type": "line-length",
        "newlinesBetween": "never",
        "specialCharacters": "keep",
        "partitionByNewLine": false
      }
    ],
    "perfectionist/sort-exports": [
      "error",
      {
        "order": "desc",
        "ignoreCase": true,
        "type": "line-length",
        "newlinesBetween": "always",
        "specialCharacters": "keep"
      }
    ],
    /* THIS RULE MAY AFFECT THE PRIORITY LOGIC IN PROPS. Disable if necessary. */
    "perfectionist/sort-jsx-props": [
      "error",
      {
        "order": "asc",
        "ignoreCase": true,
        "type": "line-length",
        "partitionByNewLine": true
      }
    ],
    "perfectionist/sort-interfaces": [
      "error",
      {
        "order": "desc",
        "ignoreCase": true,
        "type": "line-length",
        "newlinesBetween": "never",
        "partitionByNewLine": false,
        "specialCharacters": "keep"
      }
    ],
    "perfectionist/sort-object-types": [
      "error",
      {
        "order": "desc",
        "ignoreCase": true,
        "type": "line-length",
        "newlinesBetween": "never",
        "partitionByNewLine": false,
        "specialCharacters": "keep"
      }
    ],
    "perfectionist/sort-enums": [
      "error",
      {
        "order": "desc",
        "ignoreCase": true,
        "type": "line-length",
        "partitionByNewLine": true,
        "specialCharacters": "keep"
      }
    ],
    "perfectionist/sort-array-includes": [
      "error",
      {
        "order": "desc",
        "ignoreCase": true,
        "type": "line-length",
        "partitionByNewLine": true,
        "specialCharacters": "keep"
      }
    ],
    "perfectionist/sort-union-types": [
      "error",
      {
        "order": "desc",
        "ignoreCase": true,
        "type": "line-length",
        "newlinesBetween": "never",
        "specialCharacters": "keep"
      }
    ],
    "perfectionist/sort-intersection-types": [
      "error",
      {
        "order": "desc",
        "ignoreCase": true,
        "type": "line-length",
        "newlinesBetween": "never",
        "specialCharacters": "keep"
      }
    ],
    "perfectionist/sort-heritage-clauses": [
      "error",
      {
        "order": "desc",
        "ignoreCase": true,
        "type": "line-length",
        "specialCharacters": "keep"
      }
    ],
  },
})
