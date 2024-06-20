import type { 
	IndexedSelectOption,
	QueryParamCompatible_Form_Selection
} from '@tsLF/types';

import type { PositiveInteger } from '@tsL/types';

import { capitalizeWord } from '@tsCF/pages/src/index.ts';



export type Arguments_makeIndexedSelectOptionsFromQPCFormSelection = {
	objWithTypeOptions: QueryParamCompatible_Form_Selection,
	doUNeedSetSelected?: PositiveInteger<number> | 0 | string,
	doUNeedDefaultNonValue?: true,
	stringDecorationFn: (arg: string) => string
};

export const makeIndexedSelectOptionsFromQPCFormSelection = (
	{	
		objWithTypeOptions, 
		doUNeedSetSelected, 
		doUNeedDefaultNonValue,
		stringDecorationFn = str => str
	} : Arguments_makeIndexedSelectOptionsFromQPCFormSelection
): IndexedSelectOption[] => {

	const makeIndexedSelectOption = (
		id: PositiveInteger<number> | 0,
		value: string,
		name?: string,
		default_?: true,
	): IndexedSelectOption => {
		const obj: IndexedSelectOption = {
			id,
			value
		};

		if(default_){
			obj.default = default_;
		}

		if(name){
			obj.name = name;
		}

		return obj;
	};


	const resultArr: IndexedSelectOption[] = [];

	if(doUNeedDefaultNonValue){
		const res = makeIndexedSelectOption(
			resultArr.length,
			objWithTypeOptions.name,
			stringDecorationFn(objWithTypeOptions.name),
			true
		);

		resultArr.push(res);
	}

	
	for(const option of objWithTypeOptions.options){
		const res = makeIndexedSelectOption(
			resultArr.length,
			option,
			stringDecorationFn(option)
		);

		resultArr.push(res);
	}


	if(doUNeedSetSelected){
		if(typeof doUNeedSetSelected === 'number'){
			if(doUNeedSetSelected >= resultArr.length){
				throw new Error(`doUNeedSetSelected number value "${doUNeedSetSelected}" (>= ${resultArr.length}) is equal to or more than resultArr length "${resultArr.length}".`);
			}

			resultArr[doUNeedSetSelected].selected = true;
		} else if( typeof doUNeedSetSelected === 'string' ){
			const index = resultArr.findIndex((e: IndexedSelectOption) => e.value === doUNeedSetSelected);

			if(index < 0){
				throw new Error(`doUNeedSetSelected string value "${doUNeedSetSelected}" does not exist in options of the "${objWithTypeOptions.name}".`);
			}
				
			resultArr[index].selected = true;
		}
	}


	if(!resultArr.length){
		throw new Error('resultArr is empty.');
	}


	return resultArr;
};

