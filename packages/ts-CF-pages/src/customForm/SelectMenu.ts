import type { 
	IndexedSelectOption,
	QueryParamCompatible_Form_Selection
} from '@tsLF/types';

import type { PositiveInteger } from '@tsL/types';

import { capitalizeWord } from '@tsCF/pages/src/index.ts';





export const makeIndexedSelectOptionsFromQPCFormSelection = (
	{	
		objWithTypeOptions, 
		doUNeedSetSelected, 
		doUNeedDefaultNonValue
	} : {
		objWithTypeOptions: QueryParamCompatible_Form_Selection,
		doUNeedSetSelected?: PositiveInteger<number> | 0 | string,
		doUNeedDefaultNonValue?: true
	}
): IndexedSelectOption[] | void => {

	const makeIndexedSelectOption = (
		id: PositiveInteger<number> | 0,
		value: string,
		default_?: true,
	): IndexedSelectOption => {
		const obj: IndexedSelectOption = {
			id,
			value
		};

		if(default_){
			obj.default = default_;
		}

		return obj;
	};


	const resultArr: IndexedSelectOption[] = [];

	if(doUNeedDefaultNonValue){
		const res = makeIndexedSelectOption(
			resultArr.length,
			capitalizeWord(objWithTypeOptions.name),
			true
		);

		resultArr.push(res);
	}

	
	for(const option of objWithTypeOptions.options){
		const res = makeIndexedSelectOption(
			resultArr.length,
			capitalizeWord(option),
		);

		resultArr.push(res);
	}


	if(doUNeedSetSelected){
		if(typeof doUNeedSetSelected === 'number'){
			resultArr[doUNeedSetSelected].selected = true;
		} else if( typeof doUNeedSetSelected === 'string' ){
			const index = resultArr.findIndex( e => e.value.toLowerCase() === doUNeedSetSelected.toLowerCase());

			if(index >= 0){
				resultArr[index].selected = true;
			} else {
				throw new Error(`doUNeedSetSelected string value "${doUNeedSetSelected}" does not exist in options of the "${objWithTypeOptions.name}".`);
			}
		}
	}


	if(!resultArr.length){
		throw new Error('resultArr is empty.');
	}


	return resultArr;
};

