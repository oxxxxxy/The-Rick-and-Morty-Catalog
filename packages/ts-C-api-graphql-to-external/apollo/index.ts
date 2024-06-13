//export * from './client';

/*
i don't want to fix that shit.

2:59:49 PM [vite] Error when evaluating SSR module /@fs/...d-morty-catalog/packages/ts-C-api-graphql-to-external/index.ts: failed to import "/@fs/....k-and-morty-catalog/packages/ts-C-api-graphql-to-external/apollo/index.ts"
|- SyntaxError: [vite] Named export 'ApolloClient' not found. The requested module '@apollo/client' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from '@apollo/client';
const {InMemoryCache, ApolloClient} = pkg;


idk, how people can use it... it's a real shit.
*/
