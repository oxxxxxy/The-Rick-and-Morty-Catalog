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
	All_ClassType_OneOf
} from './CFIDCTypeBasedStrategyFn_All.ts';
import {
	CFIDCTypeBasedStrategyFn_All,
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
		[key: string]: All_ClassType_OneOf
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


		//filter cachedQPCValues by only existent params
		if(cachedQPCValues){
			for(const el of CFIDCList){
				const found = cachedQPCValues.find(
					e => e.param === el.name
				);

				if(found){
					this.#cachedQPCValuesForEachCFIDC[el.name] = found;

					const CFItem = CFIDCTypeBasedStrategyFn_All(el);
					
					this.#instancesOfCFItemForEachCFIDC[el.name] = new CFItem(
						{
							initData: el,
							cachedValue: found
						}
					);
				}
			}
		}

		for(const el of CFIDCList){
			if(!this.#instancesOfCFItemForEachCFIDC[el.name]){
				const CFItem = CFIDCTypeBasedStrategyFn_All(el);

				this.#instancesOfCFItemForEachCFIDC[el.name] = new CFItem(
					{
						initData: el
					}
				);
			}
		}

	}
	
	getInitCachedValueFor(CFIDC: CustomFormInitDataCompatible_OneOf): QPC_OneOf{

		//strategy
	}

	getInstanceOfCFItemFor(CFIDC: CustomFormInitDataCompatible_OneOf){

	}

	getExitValues(): QueryParamCompatible_Base[]{


	}
}
