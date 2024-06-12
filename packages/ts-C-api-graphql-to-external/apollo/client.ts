import { InMemoryCache, ApolloClient } from '@apollo/client';

import httpLink from './httpLink';



export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: httpLink
});
