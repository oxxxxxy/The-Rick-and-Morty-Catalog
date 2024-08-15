import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
import { getURLSPSFromQPCBaseList } from '@tsLF/forURLSP';




export const pushIntoWindowHistory = (values: QueryParamCompatible_Base[], pathName: string, pushState: (p: string, whs: Object) => unknown) => {
	let path = pathName;

	if(values.length){
		const urlSP = getURLSPSFromQPCBaseList(values);
		
		path = path + '?' + urlSP;
	}

	pushState(path, window.history.state);
}
