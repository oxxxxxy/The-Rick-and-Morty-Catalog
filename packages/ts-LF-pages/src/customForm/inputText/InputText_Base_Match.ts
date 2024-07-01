import {
	ArgumentsFor_InputText_Base,
	ValueFor_InputText,
	InputText_Base,
  clearFnImplementationFor_InputText_Base,
  setValueFnImplementationFor_InputText_Base,
  guardFnImplementationFor_InputText_Base,
  setBridgeToExternalScopeFnImplementationFor_InputText_Base
} from './InputText_Base.ts';
import type {
	ArgumentsFor_InputText_Base__setBridgeToExternalScope,
	PlaceholderDecorationFnType
} from './InputText_Base.ts';
import type { CFIDC_InputText_Base_Match } from '@tsLF/pages';
import { makeInputText_defaultPlaceholder } from '@tsLF/pages';




export type ArgumentsFor_InputText_Base_Match__setBridgeToExternalScope = ArgumentsFor_InputText_Base__setBridgeToExternalScope 
& {
	readonly set_warning: (w: string) => void;
};

export type ArgumentsPart_setBridgeToExternalScope_For_ArgumentsFor_InputText_Base_Match = {
	[P in keyof ArgumentsFor_InputText_Base_Match__setBridgeToExternalScope]?: ArgumentsFor_InputText_Base_Match__setBridgeToExternalScope[P];
}

export type ArgumentsFor_InputText_Base_Match = ArgumentsFor_InputText_Base 
	& ArgumentsPart_setBridgeToExternalScope_For_ArgumentsFor_InputText_Base_Match
	& {
	initData: CFIDC_InputText_Base_Match;
};

export abstract class InputText_Base_Match extends InputText_Base {
	readonly match: RegExp;
	readonly warning: string;

	readonly setExternalWarning: undefined | ((w?: string) => void);


	constructor(
		{
			initData,

			cachedValue,

			placeholderDecorationFn = makeInputText_defaultPlaceholder,

			set_value,
			set_placeholder,
			set_warning
		}: ArgumentsFor_InputText_Base_Match
	){
		super(
			{
				initData,

				cachedValue,

				placeholderDecorationFn,
			}
		);

		this.match = initData.match;
		this.warning = initData.warning;

		if(set_value && set_placeholder && set_warning){
			setBridgeToExternalScopeFnImplementationFor_InputText_Base_Match(
				this,
				{
					set_value,
					set_placeholder,
					set_warning
				},
				placeholderDecorationFn
			);
		}
	}

	abstract setBridgeToExternalScope(arg: ArgumentsFor_InputText_Base_Match__setBridgeToExternalScope): void;

}

export const setBridgeToExternalScopeFnImplementationFor_InputText_Base_Match = <T extends InputText_Base_Match> (
	_this: T,
	arg: ArgumentsFor_InputText_Base_Match__setBridgeToExternalScope,
	placeholderDecorationFn: PlaceholderDecorationFnType
): void => {

	const set_warning = arg.set_warning;
	delete arg.set_warning;

	_this.setExternalWarning = (w?: string) => {
		const type = typeof w;
		if(type === 'string'){
			_this.value.warning = w;

			set_warning(w);
		} else {
			_this.value.warning = _this.warning;

			set_warning(_this.warning);
		}
	}

	setBridgeToExternalScopeFnImplementationFor_InputText_Base(
		_this,
		arg,
		placeholderDecorationFn
	);
}

export const guardFnImplementationFor_InputText_Base_Match = <T extends InputText_Base_Match> (_this: T): void => {
	if(!_this.setExternalWarning){
		throw new Error('Set bridge to external scope. this.setExternalWarning is undefined...');
	}

	guardFnImplementationFor_InputText_Base(_this);
};

export const clearFnImplementationFor_InputText_Base_Match = <T extends InputText_Base_Match> (_this: T): void => {
	_this.guard();

	_this.value.warning = '';

	clearFnImplementationFor_InputText_Base(_this);
}

export const setValueFnImplementationFor_InputText_Base_Match = <T extends InputText_Base_Match> (_this: T, value: ValueFor_InputText): void => {
	_this.guard();

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
