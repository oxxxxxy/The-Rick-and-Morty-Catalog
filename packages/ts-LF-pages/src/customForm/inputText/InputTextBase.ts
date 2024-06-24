import type { 
	CFIDC_InputText_String,
	CFIDC_InputText_ExactString,
	CustomFormInitDataCompatible_String
} from '@tsLF/pages';
import { makeInputText_defaultPlaceholder } from '@tsLF/pages';

import type { QPC_InputText } from '@tsLF/forURLSP';




export type ArgumentsFor_InputTextBase = {
	initData: CustomFormInitDataCompatible_String;

	stringDecorationFn: (name: string, hint: string) => string;
	
	set_value: (v: QPC_InputText) => void;
	set_placeholder: (p: string) => void;
}


export abstract class InputTextBase {
	readonly value: QPC_InputText;

	readonly hint: string;
	readonly name: string;
	readonly type: string;

	readonly setExternalValue: (v?: QPC_InputText) => void;
	readonly setExternalPlaceholder: (p?: string) => void;


	constructor(
		{
			initData,

			stringDecorationFn = makeInputText_defaultPlaceholder,

			set_value,
			set_placeholder
		}: ArgumentsFor_InputTextBase
	){
		this.type = initData.type;
		this.hint = initData.hint;
		this.name = initData.name;

		this.value = {
			param: initData.name,
			value: ''
		}


		this.setExternalPlaceholder = (p?: string) => set_placeholder(p || stringDecorationFn(this.name, this.hint));
		this.setExternalPlaceholder();

		this.setExternalValue = (v?: QPC_InputText) => set_value(structuredClone(v || this.value));

	}
	
	abstract clear(): void;

	abstract setValue(value: string): void;


}

type ArgumentsFor_InputText_ExactString = Arguments_for_InputText & {
	initData: CFIDC_InputText_ExactString;
	set_warning: (w: string) => void;
};

class InputText_ExactString extends InputText{

	readonly setExternalWarning: (w?: string) => void;

	constructor(
		{
			initData,

			stringDecorationFn = makeInputText_defaultPlaceholder,

			set_value,
			set_placeholder,
			set_warning
		}: ArgumentsFor_InputText_ExactString
	){
		super(
			{
				initData,

				stringDecorationFn,

				set_value,
				set_placeholder
			}
		);
	

		this.setExternalWarning = (w?: string) => set_warning(w || initData.warning);
	}
	
}



class InputText_String extends InputText{
	
	constructor(initData: CFIDC_InputText_String){
		super(initData);

	}


	clearValue(): void {
		
	}

	clear(): void {
	}
}
