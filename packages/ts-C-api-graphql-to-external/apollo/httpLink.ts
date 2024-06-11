import { HttpLink } from '@apollo/client';

import { URL__RICKANDMORTYAPI_GRAPHQL } from '@Gcomps/frontend/data/constants';

console.log(URL__RICKANDMORTYAPI_GRAPHQL)
const httpLink = new HttpLink({
  fetch,
  uri: URL__RICKANDMORTYAPI_GRAPHQL
});

export default httpLink;
