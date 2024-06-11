import { Client, cacheExchange, fetchExchange } from '@urql/core';

import { URL__RICKANDMORTYAPI_GRAPHQL } from '@GFcomps/data/constants';



export const urqlClient = new Client({
	url: URL__RICKANDMORTYAPI_GRAPHQL,
	exchanges: [ cacheExchange, fetchExchange ]
});
