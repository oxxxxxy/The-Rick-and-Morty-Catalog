import type { PaginationBoardValue } from '@tsLF/pages';




export type TileBoard_SearchValue = PaginationBoardValue 
& {
	buttonViewingLimit: undefined;
	previousSelectedPage: undefined;
	availableItemsCount: number;
	availableItemsTitle: string;
}
