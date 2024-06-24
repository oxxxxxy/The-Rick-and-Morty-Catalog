import {
	ArgumentsFor_InputText_Base,
	ValueFor_InputText,
	InputText_Base,
  clearFnImplementationFor_InputText_Base,
  setValueFnImplementationFor_InputText_Base
} from './InputText_Base.ts';
import type { CFIDC_InputText_String } from '@tsLF/pages';
import { makeInputText_defaultPlaceholder } from '@tsLF/pages';




export type ArgumentsFor_InputText_String = ArgumentsFor_InputText_Base & {
	initData: CFIDC_InputText_String;
}

export class InputText_String extends InputText_Base{
	constructor(
		{
			initData,

			placeholderDecorationFn = makeInputText_defaultPlaceholder,

			set_value,
			set_placeholder
		}: ArgumentsFor_InputText_String
	){
		super(
			{
				initData,

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
}

