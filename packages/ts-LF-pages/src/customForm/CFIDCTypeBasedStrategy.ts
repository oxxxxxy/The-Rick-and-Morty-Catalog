import type {
	CFIDC_Types_All,
	CustomFormInitDataCompatible_OneOf
} from './types';
import {
	InputText_String,
	InputText_ExactString
} from './inputText';
import { SelectMenu } from './SelectMenu.ts';




export type CustomFormItem_OneOf = typeof InputText_String 
| typeof InputText_ExactString
| typeof SelectMenu
;

export type StrategyObj = {
	[prop in CFIDC_Types_All]: CustomFormItem_OneOf;
}


export const CFIDCTypeBasedStrategy = (CFItem: CustomFormInitDataCompatible_OneOf): CustomFormItem_OneOf => {
	const types: StrategyObj = {
		'string': InputText_String,
		'exact string': InputText_ExactString,
		'options': SelectMenu
	}

	const _class = types[CFItem.type];

	if(!_class){
		throw new Error('Congratulations. It\'s time to add some new handlers, bcz you have new type: ' + CFItem.type);
	}

	return _class;
};
