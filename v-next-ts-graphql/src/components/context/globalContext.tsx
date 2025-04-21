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

