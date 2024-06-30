import type { CustomFormInitDataCompatible_OneOf } from './types';

import type {
	InputTextStrategyObj,
	InputText_ClassType_OneOf
} from './inputText';
import { InputTextStrategyObjData } from './inputText';

import type {
	SelectMenuStrategyObj,
	SelectMenu_ClassType_OneOf
} from './selectMenu';
import { SelectMenuStrategyObjData } from './selectMenu';




export type All_ClassType_OneOf = InputText_ClassType_OneOf
	| SelectMenu_ClassType_OneOf
;

export type AllStrategyObj = InputTextStrategyObj
	& SelectMenuStrategyObj
;

export const AllStrategyObjData: AllStrategyObj = {
	...InputTextStrategyObjData,
	...SelectMenuStrategyObjData
}

export const CFIDCTypeBasedStrategyFn_All = (CFIDC_OneOf: CustomFormInitDataCompatible_OneOf): All_ClassType_OneOf => {
	const _class = AllStrategyObjData[CFIDC_OneOf.type];

	if(!_class){
		throw new Error('Congratulations. It\'s time to add some new custom form item classes, bcz you have new type: ' + CFIDC_OneOf.type);
	}

	return _class;
};
