import type { QueryParamCompatible_Base } from '@tsLF/forURLSP';




export class QPCListHolder{
	#qpcList: QueryParamCompatible_Base[] = [];
	
	setQPCList(v: QueryParamCompatible_Base[]){
		this.#qpcList = v;
	}

	getQPCList(): QueryParamCompatible_Base[]{
		return structuredClone(this.#qpcList);
	}
}
