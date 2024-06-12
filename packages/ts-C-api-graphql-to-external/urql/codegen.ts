import type { CodegenConfig } from '@graphql-codegen/cli';

import { URL__RICKANDMORTYAPI_GRAPHQL } from '@tsCF/data';




const config: CodegenConfig = {
	schema: URL__RICKANDMORTYAPI_GRAPHQL,
  documents: '../documents/**/*.graphql',
  generates: {
    'generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
				'typescript-urql',
        'fragment-matcher'
      ]
    }
  },
  hooks: {
    afterAllFileWrite: ['prettier --write']
  },
  overwrite: true
}

export default config;
