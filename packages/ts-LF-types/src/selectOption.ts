import type { PositiveInteger } from '@tsL/types';




export type SelectOption = {
	value: string;
	selected?: true;
	default?: true;
	id?: PositiveInteger<number> | 0;
}

export type IndexedSelectOption = SelectOption & {
	id: PositiveInteger<number> | 0;
}
