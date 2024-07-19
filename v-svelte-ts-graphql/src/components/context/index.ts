import { setContext, getContext } from 'svelte';


import { urqlWClient as wUrql } from '@tsC/api-graphql-to-ex';
import type { IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';

import { MouseEventObservable } from '@tsLF/mouseEventObservable';

import { WindowLocationChangeEventEmitter } from '@tsLF/wLocationChangeEvent';




const CONTEXT_KEY = '$$$CoNtExTKeyForThatApp12345';


interface ContextedValues {
	wUrql: IUrqlClientWrapper;
	cntxtedMouseEventObservable: MouseEventObservable;
	wLocationChangeEventEmitter: WindowLocationChangeEventEmitter;
};


const contextedValues: ContextedValues = {
	wUrql: wUrql,
	cntxtedMouseEventObservable: new MouseEventObservable(),
	wLocationChangeEventEmitter: new WindowLocationChangeEventEmitter({}),
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
