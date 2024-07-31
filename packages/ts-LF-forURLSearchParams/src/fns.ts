import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';




export const getQPCBaseListFromURLSearchParams = (uRLSP: URLSearchParams): QueryParamCompatible_Base[] => 
	[...uRLSP.keys()]
		.map(
			(e): QueryParamCompatible_Base => (
				{
					param: e,
					value: uRLSP.get(e) + ''
				}
			)
		);

export const getQPCBaseListFromURL = (url: URL): QueryParamCompatible_Base[] => 
	getQPCBaseListFromURLSearchParams(url.searchParams);

export const getInputForURLSPfromQPCBaseList = (qpcList: QueryParamCompatible_Base[]): {[key: string]: any} => 
	qpcList.map(
		e => {
			const obj = {};
			
			obj[e.param] = e.value;

			return obj;
		}
	).reduce(
		(ac, e) => ({...e, ...ac})
		,{}
	);

export const getURLSPSFromQPCBaseList = (qpcList: QueryParamCompatible_Base[]): URLSearchParams => 
	new URLSearchParams(
		getInputForURLSPfromQPCBaseList(qpcList)
	);
