import type {
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

export type ValueStore = {
	[key: string]: QueryParamCompatible_Base;
}

export class CustomFormHolder {
	#cachedQPCValuesForEachCFIDC: {
		readonly [key: string]: QueryParamCompatible_Base
	} = {};
	#instancesOfCFItemForEachCFIDC: {
		readonly [key: string]: All_ClassType_OneOf
	} = {};
	#exitValueStore: ValueStore = {};

	#guardingIsNoLongerNeeded: boolean = false;

	#setExternalValue: SetExternalValueFn | undefined;
	#setExternalApplyActivity: SetExternalApplyActivityFn | undefined;


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

	apply(){
		this.#guard();

		const arr = [];

		for(const k in this.#exitValueStore){
			const qpc = this.#exitValueStore[k];

			arr.push({...qpc});
		}

		this.#setExternalValue(arr);
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

	recieveExitValueStore(exitValueStore: ValueStore){
		this.#guard();

		let applyActivity = true;
		// i think, it's better to have opportunity to make empty apply...

		for(const v in exitValueStore){
			const qpc = exitValueStore[v];

			if(!qpc){
				
				continue;
			}
			
			if(qpc.warning){
				delete this.#exitValueStore[qpc.param];
				applyActivity = !applyActivity;

				continue;
			}

			if(!qpc.value){
				delete this.#exitValueStore[qpc.param];

				continue;
			}

			if(qpc.default){
				delete this.#exitValueStore[qpc.param];

				continue;
			}

			this.#exitValueStore[qpc.param] = {
				param: qpc.param,
				value: qpc.value
			};
		}

		this.#setExternalApplyActivity(applyActivity);
	}

	static makeValueStore(CFIDCList: CustomFormInitDataCompatible_List): ValueStore {
		const obj: ValueStore = {};

		for(const el of CFIDCList){
			obj[el.name] = { param: '', value: '' };
		}

		return obj;
	}

	static setValuesToValueStore(store: ValueStore, values: QueryParamCompatible_Base[]){
		for(const v of values){
			const storeItem = store[v.param];

			if(storeItem){
				store[v.param] = v;
			}
		}
	}
	
	static clearNonExistentValuesFromValueStore(store: ValueStore, values: QueryParamCompatible_Base[]){
		const params = values.map( e => e.param);

		let keys = Object.keys(store);
		
		for(const p of params){
			keys = keys.filter( e => e != p );
		}

		for(const k of keys){
			store[k].value = '';
		}
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
