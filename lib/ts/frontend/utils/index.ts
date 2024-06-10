import { LooseObject } from '@lib/types';

import _urlJoin from 'url-join';




export const U: LooseObject = {};


const urlJoin = (...args: string[] ): string => urlJoin(...args);
U.urlJoin = urlJoin;


const log = (...args: any): void => console.log(...args);
U.log = log;


const clearEmptyURLSearchParams = (urlSP: URLSearchParams): URLSearchParams => {
	const keys = [...urlSP.keys()];
	
	const obj = {};

	for(const k of keys){
		const value = urlSP.get(k);

		if(value){
			obj[k] = value;
		}
	}

	return new URLSearchParams(obj);
};
U.clearEmptyURLSearchParams = clearEmptyURLSearchParams;
