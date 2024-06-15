import { setContext } from 'svelte';

import { urqlWClient as wUrql } from '@tsC/api-graphql-to-ex';



export const injectContext = (): void => {

	setContext('wUrql', { wUrql });

};

export default injectContext;
