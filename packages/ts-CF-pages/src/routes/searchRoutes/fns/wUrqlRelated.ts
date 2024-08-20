import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
import { getParamObjFromQPCBaseList } from '@tsLF/forURLSP';

import type { GT } from '@tsC/api-graphql-to-ex';

import { URLSearchParams_pageParameterName } from '@tsCF/pages';

import { LooseObject } from '@tsL/types';




export const makeArguments_PageFilter = (QPCList: QueryParamCompatible_Base[]): ({page?: number, filter?: LooseObject }) => {
	const paramObj = getParamObjFromQPCBaseList(QPCList);
	
	let result = {};

	if(paramObj[URLSearchParams_pageParameterName]){
		result.page = Number.parseInt(paramObj[URLSearchParams_pageParameterName]);

		delete paramObj[URLSearchParams_pageParameterName];
	}

	if(Object.keys(paramObj).length){
		result.filter = paramObj;
	}

	return result;
};

export const makeArgumentsFor_GetEpisodes = (relatedQPCList: QueryParamCompatible_Base[]): GT.QueryEpisodesArgs => makeArguments_PageFilter(relatedQPCList);

export const makeArgumentsFor_GetLocations = (relatedQPCList: QueryParamCompatible_Base[]): GT.QueryLocationsArgs => makeArguments_PageFilter(relatedQPCList);
