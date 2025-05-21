import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": [
        'error', 
        {
          "allowExpressions": true,
        }
      ],
      "@typescript-eslint/no-empty-object-type": [
        'error',
        {
          allowInterfaces: 'with-single-extends'
        }
      ],
    },
  }
);