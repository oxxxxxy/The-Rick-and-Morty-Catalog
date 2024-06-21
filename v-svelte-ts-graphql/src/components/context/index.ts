import { setContext, getContext } from 'svelte';


import { urqlWClient as wUrql } from '@tsC/api-graphql-to-ex';
import type { IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';

import { MouseEventObservable } from '@tsLF/mouseEventObservable';






const CONTEXT_KEY = '$$$CoNtExTKeyForThatApp12345';

interface ContextedValues {
	wUrql: IUrqlClientWrapper;
	cntxtedMouseEventObservable: MouseEventObservable;
};


const contextedValues: ContextedValues = {
	wUrql: wUrql,
	cntxtedMouseEventObservable: new MouseEventObservable()
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
