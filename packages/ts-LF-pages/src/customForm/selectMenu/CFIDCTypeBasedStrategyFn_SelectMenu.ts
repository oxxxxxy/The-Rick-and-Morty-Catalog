import type {	
	CFIDC_Selection,
	CFIDC_Types_Options
} from '@tsLF/pages';

import {
	SelectMenu
} from './index.ts';




export type SelectMenu_ClassType_OneOf = typeof SelectMenu
;

export type SelectMenuStrategyObj = {
	[ prop in CFIDC_Types_Options ]: SelectMenu_ClassType_OneOf;
};

export const SelectMenuStrategyObjData: SelectMenuStrategyObj = {
	'options': SelectMenu,
};

export const CFIDCTypeBasedStrategyFn_InputText = <T extends CFIDC_Selection> (CFIDC_Selection: T): SelectMenu_ClassType_OneOf => {

	const _class = SelectMenuStrategyObjData[CFIDC_Selection.type];

	if(!_class){
		throw new Error('Congratulations. It\'s time to add new SelectMenu class, bcz you have new type: ' + CFIDC_Selection.type);
	}

	return _class;
};
