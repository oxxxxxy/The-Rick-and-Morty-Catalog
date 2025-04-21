import { LooseObject, PositiveInteger } from '@tsL/types';

// import _urlJoin from 'url-join';
const _urlJoin = require('url-join');

// import { nanoid } from 'nanoid';
const _n = require('nanoid');

import {
	ActionExecuterAfterCondition,
	IgnoreFewTimesCrutch
} from './OOP';




export const U: LooseObject = {
	nanoid: _n.nanoid,
	ActionExecuterAfterCondition,
	IgnoreFewTimesCrutch,

};


const urlJoin = (...args: string[] ): string => _urlJoin(...args);
U.urlJoin = urlJoin;


const log = (...args: any): void => console.log(...args);
U.log = log;


const clearEmptyURLSearchParams = (urlSP: URLSearchParams): URLSearchParams => {
	const keys = [...urlSP.keys()];
	
	const obj: LooseObject = {};

	for(const k of keys){
		const value = urlSP.get(k);

		if(value){
			obj[k] = value;
		}
	}

	return new URLSearchParams(obj);
};
U.clearEmptyURLSearchParams = clearEmptyURLSearchParams;


const delay = (ms?: PositiveInteger<number>): Promise<void> => new Promise(r => setTimeout(r, ms));
U.delay = delay;







const areArrayItemsUnique = (arr:Array<any>, deep?: boolean = true):boolean => {
	const cache = {};
// so... i think that. i don't want make check fn for each builtin js obj...
	/* for(const item of arr){
		const type = typeof item;
		if(type)

	} */
/*
undefined"
Null 	"object" (reason)
Boolean 	"boolean"
Number 	"number"
BigInt 	"bigint"
String 	"string"
Symbol 	"symbol"
Function (implements [[Call]] in ECMA-262 terms; classes are functions as well) 	"function"
Any other object 	"object"

*/
	return true;
}
