import type {	
	CFIDC_InputText_Base,
	CFIDC_Types_InputText
} from '@tsLF/pages';

import { 
	InputText_ExactString,
	InputText_String,
	InputText_Base
} from './index.ts';




export type CFIDC_InputText_Types_n_Classes = {
	[ prop in CFIDC_Types_InputText ]: typeof InputText_Base;
}

export const InputTextStrategy = <T extends CFIDC_InputText_Base> (CFIDC_InputText: T): typeof InputText_Base => {
	const types: CFIDC_InputText_Types_n_Classes = {
		'string': InputText_String,
		'exact string': InputText_ExactString,
	}

	const _class = types[CFIDC_InputText.type];

	if(!_class){
		throw new Error('Congratulations. It\'s time to add some new handlers, bcz you have new type: ' + CFIDC_InputText.type);
	}

	return _class;
};
