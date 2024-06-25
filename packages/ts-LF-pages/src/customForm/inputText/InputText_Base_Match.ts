import {
	ArgumentsFor_InputText_Base,
	ValueFor_InputText,
	InputText_Base,
  clearFnImplementationFor_InputText_Base,
  setValueFnImplementationFor_InputText_Base
} from './InputText_Base.ts';
import type { CFIDC_InputText_Base_Match } from '@tsLF/pages';
import { makeInputText_defaultPlaceholder } from '@tsLF/pages';




export type ArgumentsFor_InputText_Base_Match = ArgumentsFor_InputText_Base & {
	initData: CFIDC_InputText_Base_Match;
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
			const type = typeof w;
			if(type === 'string'){
				this.value.warning = w;

				set_warning(w);
			} else {
				this.value.warning = this.warning;

				set_warning(this.warning);
			}
		}

	}
}

export const clearFnImplementationFor_InputText_Base_Match = <T extends InputText_Base_Match> (_this: T): void => {
	_this.value.warning = '';

	clearFnImplementationFor_InputText_Base(_this);
}

export const setValueFnImplementationFor_InputText_Base_Match = <T extends InputText_Base_Match> (_this: T, value: ValueFor_InputText): void => {

	const type = typeof value;

	let isCheckFailed: boolean = false;

	if(type === 'object'){
		!!value.value && (isCheckFailed = !_this.match.test(value.value));
	} else {
		!!value && (isCheckFailed = !_this.match.test(value));
	}

	if(isCheckFailed){
		_this.setExternalWarning();
	} else {
		_this.setExternalWarning('');
	}

	setValueFnImplementationFor_InputText_Base(_this, value);
}
