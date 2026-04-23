import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/**
 * Configuración base de ESLint compartida para todos los paquetes del monorepo.
 * Cada app/paquete puede extenderla importando este array en su eslint.config.mjs.
 *
 * Uso:
 *   import baseConfig from '@athlons/config-eslint';
 *   export default [...baseConfig, { // reglas específicas }];
 */
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // No usar any — preferir unknown o tipos explícitos
      '@typescript-eslint/no-explicit-any': 'error',
      // Permitir variables con prefijo _ sin usar
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '.next/', '.turbo/', 'coverage/'],
  },
);
