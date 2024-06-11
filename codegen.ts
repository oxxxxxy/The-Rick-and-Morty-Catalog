import type { CodegenConfig } from '@graphql-codegen/cli';

import { URL__RICKANDMORTYAPI_GRAPHQL } from './ts/components/frontend/data/constants';


const path = './ts/components/frontend/api-service/graphql-to-external/';
const path_generated = path + 'generated.ts';

const config: CodegenConfig = {
	schema: URL__RICKANDMORTYAPI_GRAPHQL,
  documents: path + 'documents/**/*.graphql',
  generates: {
    [path_generated]: {
      plugins: [
        'typescript',
        'typescript-operations',
				'typescript-urql',
//        'typescript-react-apollo',
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