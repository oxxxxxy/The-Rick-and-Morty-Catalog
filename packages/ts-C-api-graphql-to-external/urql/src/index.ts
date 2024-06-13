import { Client, cacheExchange, fetchExchange } from '@urql/core';

import { URL__RICKANDMORTYAPI_GRAPHQL } from '@tsCF/data/constants';
import { UrqlClientDecorator } from '../generatedUrqlClientDecorator.ts';


const urqlClient = new Client({
	url: URL__RICKANDMORTYAPI_GRAPHQL,
	exchanges: [ cacheExchange, fetchExchange ]
});

export const urqlDClient = new UrqlClientDecorator(urqlClient);
