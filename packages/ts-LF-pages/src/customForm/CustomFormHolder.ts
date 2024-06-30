import type {
	QPC_SelectOption,
	QPC_InputText,
	QPC_OneOf,
	QueryParamCompatible_Base
} from '@tsLF/forURLSP';

import type {
	CustomFormInitDataCompatible_List,
	CustomFormInitDataCompatible_OneOf
} from '@tsLF/pages';




export type ArgumentsFor_CustomFormHolder = {
	CFIDCList: CustomFormInitDataCompatible_List;
	cachedQPCValues?: QueryParamCompatible_Base[];
}

export interface PropsOf_CustomFormHolder {
	cachedQPCValuesForEachCFIDC: {
		[key: string]: QPC_OneOf
	};
/*	savedCFIDCList: {
		[key: string]: CustomFormInitDataCompatible_OneOf;
	};*/

}

export class CustomFormHolder implements PropsOf_CustomFormHolder{
	cachedQPCValuesForEachCFIDC = {};
//	savedCFIDCList = {};

	constructor(
		{
			CFIDCList,
			cachedQPCValues
		} : ArgumentsFor_CustomFormHolder
	){

		//guard from equal CFIDC params
		for(let i = 0; i < CFIDCList.length; i++){
			if(i === CFIDCList.length - 1){
				continue;
			}

			const sliced = CFIDCList.slice(i + 1);

			for(let k = 0; k < sliced.length; k++){
				if(CFIDCList[i].name === sliced[k].name){
					throw new Error(`CFIDCList's items must be unique. You have passed: ${JSON.stringify(CFIDCList[i])} and ${JSON.stringify(sliced[k])}.`);
				}
			}
		}


		//filter cachedQPCValues by existent params

		// we must get unique qpcBase for each CFIDC if qpcBase exists.
		//   and qpcBases should be passed to converter for making cfidc qpc return type
		//	for(CFIDCList
		
		//there is a place for strategy
//OR
		if(cachedQPCValues){
			for(const el of CFIDCList){
				const found = cachedQPCValues.find(
					e => e.param === el.name
				);

				if(found){
					//save to this.~init_cachedValues[
					//  json of CFIDC data type] = found qpc base
				}
			}
		}


	}
	
	getInitCachedValueFor(CFIDC: CustomFormInitDataCompatible_OneOf): QPC_OneOf{

		//strategy
	}
}
