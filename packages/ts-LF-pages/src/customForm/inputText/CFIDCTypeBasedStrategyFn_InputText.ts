import type {	
	CFIDC_InputText_Base,
	CFIDC_Types_InputText
} from '@tsLF/pages';

import {
	InputText_ExactString,
	InputText_String
} from './index.ts';




export type InputText_ClassConstructorType_OneOf = typeof InputText_String
	| typeof InputText_ExactString
;

export type InputText_ClassType_OneOf = InputText_String
	| InputText_ExactString
;

export type InputTextStrategyObj = {
	[ prop in CFIDC_Types_InputText ]: InputText_ClassConstructorType_OneOf;
};

export const InputTextStrategyObjData: InputTextStrategyObj = {
	'string': InputText_String,
	'exact string': InputText_ExactString,
};

export const CFIDCTypeBasedStrategyFn_InputText = <T extends CFIDC_InputText_Base> (CFIDC_InputText: T): InputText_ClassConstructorType_OneOf => {

	const _class = InputTextStrategyObjData[CFIDC_InputText.type];

	if(!_class){
		throw new Error('Congratulations. It\'s time to add new InputText class, bcz you have new type: ' + CFIDC_InputText.type);
	}

	return _class;
};
