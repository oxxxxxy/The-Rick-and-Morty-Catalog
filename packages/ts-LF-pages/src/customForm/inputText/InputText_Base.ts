import type {	CFIDC_InputText_Base } from '@tsLF/pages';
import { makeInputText_defaultPlaceholder } from '@tsLF/pages';

import type { 
	QPC_InputText,
	QueryParamCompatible_Base
} from '@tsLF/forURLSP';




export type ArgumentsFor_InputText_Base__setBridgeToExternalScope = {
	readonly set_value: (v: QPC_InputText) => void;
	readonly set_placeholder: (p: string) => void;
}

export type ArgumentsPart_setBridgeToExternalScope_For_ArgumentsFor_InputText_Base = {// idk how to name that. can u imagine a better name? if yes, please tell me/ make PR / etc... 
	[P in keyof ArgumentsFor_InputText_Base__setBridgeToExternalScope]?: ArgumentsFor_InputText_Base__setBridgeToExternalScope[P];
};

export type PlaceholderDecorationFnType = (name: string, hint: string) => string;

export type ArgumentsFor_InputText_Base = ArgumentsPart_setBridgeToExternalScope_For_ArgumentsFor_InputText_Base
	& {
	initData: CFIDC_InputText_Base;

	placeholderDecorationFn: PlaceholderDecorationFnType;
};

export type ValueFor_InputText = QPC_InputText 
| QueryParamCompatible_Base
| string
;


export abstract class InputText_Base {
	readonly value: QPC_InputText;

	readonly hint: string;
	readonly name: string;
	readonly type: string;

	readonly placeholderDecorationFn: PlaceholderDecorationFnType;

	readonly setExternalValue: undefined | ((v?: QPC_InputText) => void);
	readonly setExternalPlaceholder: undefined | ((p?: string) => void);

	readonly guardingIsNoLongerNeeded: boolean = false;


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

		this.placeholderDecorationFn = placeholderDecorationFn;

		if(set_value && set_placeholder){
			this.setBridgeToExternalScope(//??? hm, will it work at all???
				{
					set_value,
					set_placeholder
				}
			);
		}
	}


	abstract clear(): void;

	abstract setValue(value: ValueFor_InputText): void;


	abstract setBridgeToExternalScope <T extends ArgumentsFor_InputText_Base__setBridgeToExternalScope>(arg: T): void;

	abstract guard(): void;


	getValue(): QPC_InputText {
		return structuredClone(this.value);
	}

}

export const setBridgeToExternalScopeFnImplementationFor_InputText_Base = <T extends InputText_Base> (
	_this: T,
	arg: ArgumentsFor_InputText_Base__setBridgeToExternalScope,
	placeholderDecorationFn: PlaceholderDecorationFnType
): void => {
	
	_this.setExternalPlaceholder = (p?: string) => arg.set_placeholder(p || placeholderDecorationFn(_this.name, _this.hint));
	_this.setExternalPlaceholder();

	_this.setExternalValue = (v?: QPC_InputText) => arg.set_value(structuredClone(v || _this.value));
};

export const guardFnImplementationFor_InputText_Base = <T extends InputText_Base> (_this: T): void => {
	const T = _this;

	if(T.guardingIsNoLongerNeeded){
		return;
	}

	if(!this.setExternalValue){
		throw new Error('Set bridge to external scope. this.setExternalValue is undefined...');
	}
	
	if(!this.setExternalPlaceholder){
		throw new Error('Set bridge to external scope. this.setExternalPlaceholder is undefined...');
	}

	T.guardingIsNoLongerNeeded = true;
}

export const clearFnImplementationFor_InputText_Base = <T extends InputText_Base> (_this: T): void => {
	_this.guard();

	_this.value.value = '';

	_this.setExternalValue();
}

export const setValueFnImplementationFor_InputText_Base = <T extends InputText_Base> (_this: T, value: ValueFor_InputText): void => {
	_this.guard();

	const type = typeof value;

	if(type === 'object'){
		_this.value.value = value.value;
	} else {
		_this.value.value = value;
	}

	_this.setExternalValue();
}

export const 
