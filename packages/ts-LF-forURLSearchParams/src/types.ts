import type { PositiveInteger } from '@tsL/types';




export type QueryParamCompatibleBase = {
	param: string;
	value: string;
}

export type QPC_SelectOption = QueryParamCompatibleBase & {
	name?: string;
	selected?: true;
	default?: true;
	id?: PositiveInteger<number> | 0;
}

export type QPC_IndexedSelectOption = QPC_SelectOption & {
	id: PositiveInteger<number> | 0;
}
