import { V, U } from '../../global-lib-entry.js';
//import { errorsyopta } from '../../global-lib-entry.js';



export class FetchApiPath {
	name = '';
	path = '';
	parameters = [];

	constructor({
		API_PATH,
		API_PATH__PARAM_LIST
	}){
		const T = this;

		T.name = API_PATH.name;
		T.path = API_PATH.path;
		T.parameters = API_PATH__PARAM_LIST;
	}
	
	validateParams(urlSearchParams){
		const T = this;

		for(const name of urlSearchParams.keys()){

			const param = T.parameters.find(p => p.name === name);

			if(param){
				const argument = urlSearchParams.get(name);

				if( !V.isPathParamArgValid(param, argument) ){
					throw new Error(`Invalid argument of the path parameter "${name}": ${argument}`);
				}
			} else {
				throw new Error(`Path parameter name "${name}" does not exist.`);
			}
		}
	}

	validateId(id){
		if( !Number.isInteger(Number(id)) ){
			throw new Error('Invalid API ' + this.name + ' id: ' + id);
		}
	}
}

export class FetchApiService {
	#apiPathes = {};

	#BASE_URL;
	
	#ApiPath_Class;

	constructor({
		BASE_URL,
		ApiPath_Class = FetchApiPath

	}){
		if(!V.isURL(BASE_URL)){
			throw new Error('Invalid API base url: ' + BASE_URL);
		}

		this.#BASE_URL = BASE_URL;
		this.#ApiPath_Class = ApiPath_Class;
	}

	addApiPath(apiPath){
		this.#apiPathes[apiPath.name] = apiPath;

		return this;
	}

	createApiPath({
		API_PATH,
		API_PATH__PARAM_LIST
	}){
		const instance = new this.#ApiPath_Class(arguments[0]);

		return this.addApiPath(instance);
	}

	async #fetchJson(url, options){
		const res = await fetch(url, options);
		return await res.json();
	}

	async request(pathName, id, urlSearchParams, fetchOptions){
		const T = this;
		
		if(!T.#apiPathes[pathName]){
			throw new Error(`Invalid API path name: ${pathName}.\nAvailable path names: ${Object.keys(T.#apiPathes).join()}.`);
		}

		const apiPath = T.#apiPathes[pathName];

		let url = U.urlJoin(T.#BASE_URL, apiPath.path); 

		if( id ){
			apiPath.validateId(id);
			
			url = U.urlJoin(url, id);

		} else if( urlSearchParams ){
			// for aesthetic purpose
			urlSearchParams = U.clearEmptyURLSearchParams(urlSearchParams);

			if(urlSearchParams){
				apiPath.validateParams(urlSearchParams);

				url = U.urlJoin(url, '?' + urlSearchParams);
			}
		}
		
		return await T.#fetchJson(url, fetchOptions);
	}
	
	#recognizeArgument(idORurlSearchParams){
		let id, urlSearchParams;

		const type = typeof idORurlSearchParams;
			
		if( type === 'number' || type === 'string' ){
			id = idORurlSearchParams;
		} else if( type === 'object' && idORurlSearchParams instanceof URLSearchParams ){
			urlSearchParams = idORurlSearchParams;
		} else {
			throw new Error('Invalid argument. It must be an id or an instance of URLSearchParams.');
		}

		return { id, urlSearchParams };
	}

	async get(pathName, idORurlSearchParams){
		const T = this;

		const { id, urlSearchParams } = T.#recognizeArgument(idORurlSearchParams);

		return await T.request(pathName, id, urlSearchParams);
	}
}