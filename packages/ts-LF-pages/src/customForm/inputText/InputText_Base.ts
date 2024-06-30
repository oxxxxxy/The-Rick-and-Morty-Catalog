import type {	CFIDC_InputText_Base } from '@tsLF/pages';
import { makeInputText_defaultPlaceholder } from '@tsLF/pages';

import type { 
	QPC_InputText,
	QueryParamCompatible_Base
} from '@tsLF/forURLSP';




export type ArgumentsFor_InputText_Base = {
	initData: CFIDC_InputText_Base;

	placeholderDecorationFn: (name: string, hint: string) => string;
	
	set_value: (v: QPC_InputText) => void;
	set_placeholder: (p: string) => void;
}

export type ValueFor_InputText = QPC_InputText 
| QueryParamCompatible_Base
| string
;


export abstract class InputText_Base {
	readonly value: QPC_InputText;

	readonly hint: string;
	readonly name: string;
	readonly type: string;

	readonly setExternalValue: (v?: QPC_InputText) => void;
	readonly setExternalPlaceholder: (p?: string) => void;


	constructor(
		{
			initData,

			placeholderDecorationFn = makeInputText_defaultPlaceholder,

			set_value,
			set_placeholder
		}: ArgumentsFor_InputText_Base
	){
		this.type = initData.type;
		this.hint = initData.hint;
		this.name = initData.name;

		this.value = {
			param: initData.name,
			value: ''
		}


		this.setExternalPlaceholder = (p?: string) => set_placeholder(p || placeholderDecorationFn(this.name, this.hint));
		this.setExternalPlaceholder();

		this.setExternalValue = (v?: QPC_InputText) => set_value(structuredClone(v || this.value));


		this.setExternalPlaceholder();
	}
	
	abstract clear(): void;

	abstract setValue(value: ValueFor_InputText): void;

	getValue(): QPC_InputText {
		return structuredClone(this.value);
	}

}

export const clearFnImplementationFor_InputText_Base = <T extends InputText_Base> (_this: T): void => {
	_this.value.value = '';

	_this.setExternalValue();
}

export const setValueFnImplementationFor_InputText_Base = <T extends InputText_Base> (_this: T, value: ValueFor_InputText): void => {
	const type = typeof value;

	if(type === 'object'){
		_this.value.value = value.value;
	} else {
		_this.value.value = value;
	}

	_this.setExternalValue();
}
