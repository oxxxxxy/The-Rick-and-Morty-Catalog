import type { 
	CFIDC_InputText_String,
	CFIDC_InputText_ExactString,
	CustomFormInitDataCompatible_Match_Base,
	CustomFormInitDataCompatible_String
} from '@tsLF/pages';
import { makeInputText_defaultPlaceholder } from '@tsLF/pages';

import type { QPC_InputText } from '@tsLF/forURLSP';




export type ArgumentsFor_InputText_Base = {
	initData: CustomFormInitDataCompatible_String;

	placeholderDecorationFn: (name: string, hint: string) => string;
	
	set_value: (v: QPC_InputText) => void;
	set_placeholder: (p: string) => void;
}


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

	abstract setValue(value: QPC_InputText | string): void;

	getValue(): QPC_InputText {
		return structuredClone(this.value);
	}

}

export const clearFnImplementationFor_InputText_Base = <T extends InputText_Base> (_this: T): void => {
	_this.value.value = '';

	_this.setExternalValue();
}

export const setValueFnImplementationFor_InputText_Base = <T extends InputText_Base> (_this: T, value: (QPC_InputText | string)): void => {
	const type = typeof value;

	if(type === 'object'){

	} else if ( type === 'string' ){

	} else {
		throw new Error('InputText_Base value is not a string and isn\'t a QPC_InputText type.');
	}
}
