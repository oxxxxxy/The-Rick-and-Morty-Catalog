import { setContext, getContext } from 'svelte';


import { urqlWClient as wUrql } from '@tsC/api-graphql-to-ex';
import type { IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';





const CONTEXT_KEY = '$$$CoNtExTKeyForThatApp12345';

interface ContextedValues {
	wUrql: IUrqlClientWrapper;
};


const contextedValues: ContextedValues = {
	wUrql: wUrql
}


export const g = (): ContextedValues => {
	const doesExist: ContextedValues | undefined = getContext(CONTEXT_KEY);
	
	if(doesExist){
		return doesExist;
	}

	setContext(
		CONTEXT_KEY, 
		contextedValues
	);

	return getContext(CONTEXT_KEY);
};

export default g;
