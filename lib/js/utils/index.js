import urlJoin from 'url-join';



export const U = {};


U.urlJoin = urlJoin;


const log = (...args) => console.log(...args);
U.log = log;


const clearEmptyURLSearchParams = urlSP => {
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
