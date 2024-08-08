import type { PositiveInteger } from '@tsL/types';




export type PaginationItem = {
	selected?: boolean;
	pageNum: PositiveInteger<number>;
}

export type PaginationInitValue = {
	selectedPage?: PositiveInteger<number>;
	pageCount: PositiveInteger<number>;
	buttonViewingLimit: PositiveInteger<number>;
}
