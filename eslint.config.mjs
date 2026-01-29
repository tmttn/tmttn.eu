import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import unicornPlugin from 'eslint-plugin-unicorn'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import globals from 'globals'
import nextPlugin from '@next/eslint-plugin-next'

export default [
  {
    ignores: [
      'node_modules/**',
      '.cache/**',
      '.next/**',
      'out/**',
      'public/**',
      'scripts/**',
      'cypress/**',
      '__tests__/**',
      '*.config.*',
      'commitlint.config.js',
      'jest.setup.js',
    ],
  },
  js.configs.recommended,
  nextPlugin.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
  {
    files: ['src/**/*.{js,jsx,ts,tsx}', 'pages/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'unicorn': unicornPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...unicornPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Next.js auto-imports React
      'react-hooks/set-state-in-effect': 'off', // Legitimate SSR hydration patterns in Next.js
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/no-null': 'off', // null is needed for React default props and return values
      'unicorn/no-useless-undefined': 'off', // undefined is needed for optional params
    },
  },
  {
    files: ['src/**/*.{ts,tsx}', 'pages/**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
    },
  },
]
