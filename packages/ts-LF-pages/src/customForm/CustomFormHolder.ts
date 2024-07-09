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




export type SetExternalValueFn = (v: QueryParamCompatible_Base[]) => void;

export type SetExternalApplyActivityFn = (bool: boolean) => void;

export type ArgumentsFor_CustomFormHolder__setBridgeToExternalScope = {
	readonly set_value: SetExternalValueFn;
	readonly set_applyActivity: SetExternalApplyActivityFn;
};

export type ArgumentsPart_setBridgeToExternalScope_For_ArgumentsFor_CustomFormHolder = {
	[P in keyof ArgumentsFor_CustomFormHolder__setBridgeToExternalScope]?: ArgumentsFor_CustomFormHolder__setBridgeToExternalScope[P];
}

export type ArgumentsFor_CustomFormHolder = ArgumentsPart_setBridgeToExternalScope_For_ArgumentsFor_CustomFormHolder
	& {
	CFIDCList: CustomFormInitDataCompatible_List;
	cachedQPCValues?: QueryParamCompatible_Base[];

}

export type ExitValueStore = {
	[key: string]: QPC_OneOf | QueryParamCompatible_Base;
}

/*
	эта хуйня выбрасывает 
	-готовые инстансы кастом форм итемов
	-"кеш" вальюсы которые будут перекинуты из юрл таба
	-ну и по хорошему сами CFIDCi

*/

export class CustomFormHolder {
	#cachedQPCValuesForEachCFIDC: {
		readonly [key: string]: QueryParamCompatible_Base
	} = {};
	#instancesOfCFItemForEachCFIDC: {
		readonly [key: string]: All_ClassType_OneOf
	} = {};
	#exitValueStore: ExitValueStore = {};

	#guardingIsNoLongerNeeded: boolean = false;

	#setExternalValue: SetExternalValueFn | undefined;
	#setExternalApplyActivity: SetExternalApplyActivityFn | undefined;
	/* #savedCFIDCList: {
		[key: string]: CustomFormInitDataCompatible_OneOf;
	} = {}; */


	constructor(
		{
			CFIDCList,
			cachedQPCValues,

			set_applyActivity,
			set_value
		} : ArgumentsFor_CustomFormHolder
	){

		if(set_applyActivity){
			this.#setExternalApplyActivity = (b: boolean) => set_applyActivity(b);
		}

		if(set_value){
			this.#setExternalValue = (v: QueryParamCompatible_Base[]) => set_value(v);
		}

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

	setBridgeToExternalScope(
		{
			set_value,
			set_applyActivity
		}: ArgumentsFor_CustomFormHolder__setBridgeToExternalScope
	){
		this.#setExternalApplyActivity = (b: boolean) => set_applyActivity(b);
		this.#setExternalValue = (v: QueryParamCompatible_Base[]) => set_value(v);

	}

	#guard(){
		if(this.#guardingIsNoLongerNeeded){
			return;
		}

		if(!this.#setExternalApplyActivity){
			throw new Error('Set bridge to external scope. this.#setExternalApplyActivity is undefined...');
		}

		if(!this.#setExternalValue){
			throw new Error('Set bridge to external scope. this.#setExternalValue is undefined...');
		}

		this.#guardingIsNoLongerNeeded = true;
	}

	recieveExitValueStoreFor(exitValueStore: ExitValueStore){
		this.#guard();

		for(const v in exitValueStore){
			const qpc = exitValueStore[v];


			if(!qpc.value){
				delete this.#exitValueStore[qpc.param];

				continue;
			}


		}


	}

	static makeInitExitValueStore(CFIDCList: CustomFormInitDataCompatible_List): ExitValueStore {
		const obj: ExitValueStore = {};

		for(const el of CFIDCList){
			obj[el.name] = { param: '', value: '' };
		}

		return obj;
	}
	
	getInitCachedValueFor(CFIDC: CustomFormInitDataCompatible_OneOf): QPC_OneOf | void {
		if(this.#cachedQPCValuesForEachCFIDC[CFIDC.name]){
			return {...this.#cachedQPCValuesForEachCFIDC[CFIDC.name]};
		}

		return;
	}

	getInstanceOfCFItemFor(CFIDC: CustomFormInitDataCompatible_OneOf): All_ClassType_OneOf{
		return this.#instancesOfCFItemForEachCFIDC[CFIDC.name];
	}

}
