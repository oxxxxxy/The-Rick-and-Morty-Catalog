import type { CodegenConfig } from '@graphql-codegen/cli';

import { URL__RICKANDMORTYAPI_GRAPHQL } from './components/ts/frontend/constants';


const path = './components/ts/frontend/api-service/graphql-to-external/';
const path_generated = path + 'generated.ts';

const config: CodegenConfig = {
	schema: URL__RICKANDMORTYAPI_GRAPHQL,
  customFetch: 'node-fetch',
  documents: path + 'documents/**/*.graphql',
  generates: {
    [path_generated]: {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
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
