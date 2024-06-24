import {
	ArgumentsFor_InputText_Base,
	ValueFor_InputText,
	InputText_Base,
  clearFnImplementationFor_InputText_Base,
  setValueFnImplementationFor_InputText_Base
} from './InputText_Base.ts';
import type { 
	CustomFormInitDataCompatible_Match_Base
} from '@tsLF/pages';
import { 
	makeInputText_defaultPlaceholder
} from '@tsLF/pages';




export type ArgumentsFor_InputText_Base_Match = ArgumentsFor_InputText_Base & {
	initData: CustomFormInitDataCompatible_Match_Base;
	set_warning: (w: string) => void;
};

export abstract class InputText_Base_Match extends InputText_Base {
	readonly match: RegExp;
	readonly warning: string;

	readonly setExternalWarning: (w?: string) => void;


	constructor(
		{
			initData,

			placeholderDecorationFn = makeInputText_defaultPlaceholder,

			set_value,
			set_placeholder,
			set_warning
		}: ArgumentsFor_InputText_Base_Match
	){
		super(
			{
				initData,

				placeholderDecorationFn,

				set_value,
				set_placeholder
			}
		);
	
		this.match = initData.match;
		this.warning = initData.warning;

		this.setExternalWarning = (w?: string) => {
			this.value.warning = w || this.warning;

			set_warning(w || this.warning);
		}

	}
}

export const clearFnImplementationFor_InputText_Base_Match = <T extends InputText_Base_Match> (_this: T): void => {
	_this.value.warning = '';

	clearFnImplementationFor_InputText_Base(_this);
}

export const setValueFnImplementationFor_InputText_Base_Match = <T extends InputText_Base_Match> (_this: T, value: ValueFor_InputText): void{

	const type = typeof value;

	let isCheckFailed: boolean = false;

	if(type === 'object'){
		isCheckFailed = !_this.match.test(value.value);
	} else if (type === 'string'){
		isCheckFailed = !_this.match.test(value);
	}

	if(isCheckFailed){
		_this.setExternalWarning();
	}

	setValueFnImplementationFor_InputText_Base(_this, value);
}
