import type { PositiveInteger } from '@tsL/types';




export type QueryParamCompatible_Base = {
	readonly param: string;
	value: string;
}

export type QPC_InputText = QueryParamCompatible_Base & {
	warning?: string;
}

export type QPC_SelectOption = QueryParamCompatible_Base & {
	name?: string;
	selected?: true;
	default?: true;
	id?: PositiveInteger<number> | 0;
}

export type QPC_IndexedSelectOption = QPC_SelectOption & {
	id: PositiveInteger<number> | 0;
}

export type QPC_OneOf = 
	QPC_InputText
	| QPC_SelectOption
	| QPC_IndexedSelectOption
;

export type QPC_List = readonly (
	QPC_OneOf
)[];
