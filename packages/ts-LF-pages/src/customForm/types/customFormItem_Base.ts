import type {	CustomFormInitDataCompatible_OneOf } from '@tsLF/pages';

import type { QueryParamCompatible_Base } from '@tsLF/forURLSP';




export type ArgumentPart_ArgumentsFor_CustomFormItem = {
	initData: CustomFormInitDataCompatible_OneOf;
	cachedValue?: QueryParamCompatible_Base; //idk how to name "cachedValue" entity right... Can you do that?
}
