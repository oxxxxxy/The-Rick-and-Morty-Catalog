import { Client, cacheExchange, fetchExchange } from '@urql/core';

import { URL__RICKANDMORTYAPI_GRAPHQL } from '@Gcomps/frontend/data/constants';
// import { UrqlClientDecorator } from './helpers/urqlClientDecorator.ts';


export const urqlClient = new Client({
	url: URL__RICKANDMORTYAPI_GRAPHQL,
	exchanges: [ cacheExchange, fetchExchange ]
});
