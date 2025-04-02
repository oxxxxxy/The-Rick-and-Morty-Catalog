'use client';

import { createContext, useContext } from 'react';


import { urqlWClient as wUrql } from '@tsC/api-graphql-to-ex';
import type { IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';

import { MouseEventObservable } from '@tsLF/mouseEventObservable';

import { WindowLocationChangeEventEmitter } from '@tsLF/wLocationChangeEvent';




interface ContextedValues {
	wUrql: IUrqlClientWrapper;
	cntxtedMouseEventObservable: MouseEventObservable;
	wLocationChangeEventEmitter: WindowLocationChangeEventEmitter;
};




// const CONTEXT_KEY = '$$$CoNtExTKeyForThatApp123451488228282';
// const context = createContext(CONTEXT_KEY);

const contextedValues: ContextedValues = {
	wUrql: wUrql,
	cntxtedMouseEventObservable: new MouseEventObservable(),
	wLocationChangeEventEmitter: new WindowLocationChangeEventEmitter({}),
}

export const GlobalContext = createContext<ContextedValues>(contextedValues);

export default function GlobalContextProvider (
	{ children }: { children: React.ReactNode }
) {
	return (
		<GlobalContext.Provider value={contextedValues}>
			{children}
		</GlobalContext.Provider>
	);
}

export function useGlobalContext(){
	return useContext(GlobalContext);
}
// export const g = (): ContextedValues => {
// 	const doesExist: ContextedValues | undefined = getContext(CONTEXT_KEY);
	
// 	if(doesExist){
// 		return doesExist;
// 	}

// 	setContext(
// 		CONTEXT_KEY, 
// 		contextedValues
// 	);

// 	return getContext(CONTEXT_KEY);
// };


