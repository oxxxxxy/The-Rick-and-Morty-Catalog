import { ValueFor_InputText } from './InputText_Base.ts';
import {
	ArgumentsFor_InputText_Base_Match,
	ArgumentsFor_InputText_Base_Match__setBridgeToExternalScope,
	InputText_Base_Match,
  clearFnImplementationFor_InputText_Base_Match,
  setValueFnImplementationFor_InputText_Base_Match,
  setBridgeToExternalScopeFnImplementationFor_InputText_Base_Match,
  guardFnImplementationFor_InputText_Base_Match
} from './InputText_Base_Match.ts';
import type {	CFIDC_InputText_ExactString } from '@tsLF/pages';
import { makeInputText_defaultPlaceholder } from '@tsLF/pages';




export type ArgumentsFor_InputText_ExactString = ArgumentsFor_InputText_Base_Match & {
	initData: CFIDC_InputText_ExactString;
}

export class InputText_ExactString extends InputText_Base_Match{
	constructor(
		{
			initData,

			cachedValue,

			placeholderDecorationFn = makeInputText_defaultPlaceholder,

			set_value,
			set_placeholder,
			set_warning
		}: ArgumentsFor_InputText_ExactString
	){
		super(
			{
				initData,

				cachedValue,

				placeholderDecorationFn,

				set_value,
				set_placeholder,
				set_warning
			}
		);
	}
	
	clear(){
		clearFnImplementationFor_InputText_Base_Match(this);
	}

	setValue(value: ValueFor_InputText): void {
		setValueFnImplementationFor_InputText_Base_Match(this, value);
	}

	setBridgeToExternalScope(arg: ArgumentsFor_InputText_Base_Match__setBridgeToExternalScope): void {
		setBridgeToExternalScopeFnImplementationFor_InputText_Base_Match(
			this,
			arg,
			this.placeholderDecorationFn
		);
	}

	guard(): void {
		guardFnImplementationFor_InputText_Base_Match(
			this
		);
	}
}
