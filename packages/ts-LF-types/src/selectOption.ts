import type { PositiveInteger } from '@tsL/types';


export type QueryParamCompatible_Base = {
	param: string;
	value: string;
}

export type SelectOption = QueryParamCompatible_Base & {
	name?: string;
	selected?: true;
	default?: true;
	id?: PositiveInteger<number> | 0;
}

export type IndexedSelectOption = SelectOption & {
	id: PositiveInteger<number> | 0;
}
