import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // eslint-plugin-react-hooks 7 turns on the React Compiler rules by
      // default. This codebase predates them, so they surface 7 pre-existing
      // violations that are not part of the dependency upgrade:
      //   - purity (Gallery.jsx: Math.random() inside useMemo)
      //   - refs (GradientBackground3D.jsx, Interface.jsx: refs read during
      //     render — the idiomatic R3F uniforms pattern)
      //   - set-state-in-effect (App.jsx: closing the menu on section change)
      // Downgraded to `warn` so the upgrade itself does not gate lint; the
      // genuine violations are tracked in #18 and #19.
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]
