import {
	ArgumentsFor_InputText_Base,
	ValueFor_InputText,
	InputText_Base,
  clearFnImplementationFor_InputText_Base,
  setValueFnImplementationFor_InputText_Base,
  guardFnImplementationFor_InputText_Base,
  setBridgeToExternalScopeFnImplementationFor_InputText_Base
} from './InputText_Base.ts';
import type { ArgumentsFor_InputText_Base__setBridgeToExternalScope, CFIDC_InputText_String } from '@tsLF/pages';
import { makeInputText_defaultPlaceholder } from '@tsLF/pages';




export type ArgumentsFor_InputText_String = ArgumentsFor_InputText_Base & {
	initData: CFIDC_InputText_String;
}

export class InputText_String extends InputText_Base{
	constructor(
		{
			initData,
			
			cachedValue,

			placeholderDecorationFn = makeInputText_defaultPlaceholder,

			set_value,
			set_placeholder
		}: ArgumentsFor_InputText_String
	){
		super(
			{
				initData,
			
				cachedValue,

				placeholderDecorationFn,

				set_value,
				set_placeholder
			}
		);
	}
	
	clear(){
		clearFnImplementationFor_InputText_Base(this);
	}

	setValue(value: ValueFor_InputText): void {
		setValueFnImplementationFor_InputText_Base(this, value);
	}

	setBridgeToExternalScope(arg: ArgumentsFor_InputText_Base__setBridgeToExternalScope): void {
		setBridgeToExternalScopeFnImplementationFor_InputText_Base(
			this,
			arg,
			this.placeholderDecorationFn
		);
	}

	guard(): void {
		guardFnImplementationFor_InputText_Base(this);
	}
}

