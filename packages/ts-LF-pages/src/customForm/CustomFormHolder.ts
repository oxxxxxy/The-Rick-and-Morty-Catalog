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
import type {
	CFIDCTypeBasedStrategyFn_All
} from './CFIDCTypeBasedStrategyFn_All.ts';




export type ArgumentsFor_CustomFormHolder = {
	CFIDCList: CustomFormInitDataCompatible_List;
	cachedQPCValues?: QueryParamCompatible_Base[];
}


/*
	эта хуйня выбрасывает 
	-готовые инстансы кастом форм итемов
	-"кеш" вальюсы которые будут перекинуты из юрл таба
	-ну и по хорошему сами CFIDCi

*/

export class CustomFormHolder {
	#cachedQPCValuesForEachCFIDC: {
		[key: string]: QPC_OneOf
	} = {};
	#instancesOfCFItemForEachCFIDC: {
		[key: string]: QPC_OneOf
	} = {};

	/* #savedCFIDCList: {
		[key: string]: CustomFormInitDataCompatible_OneOf;
	} = {}; */


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
					
					//add to init_instanceOfCFItem as default value
					
					
				}
			}
		}


	}
	
	getInitCachedValueFor(CFIDC: CustomFormInitDataCompatible_OneOf): QPC_OneOf{

		//strategy
	}

	getInstanceOfCFItemFor(CFIDC: CustomFormInitDataCompatible_OneOf){

	}
}
