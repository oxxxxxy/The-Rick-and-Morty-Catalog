import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
import { getParamObjFromQPCBaseList } from '@tsLF/forURLSP';

import { LooseObject } from '@tsL/types';




export const makeArguments_PageFilter = (QPCList: QueryParamCompatible_Base[], URLSearchParams_pageParameterName: string): ({page?: number, filter?: LooseObject }) => {
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
