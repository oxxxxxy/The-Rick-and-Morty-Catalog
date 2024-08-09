import type { PositiveInteger } from '@tsL/types';
import { calcPagination } from '@tsL/pagination';




export type PaginationItem = {
	selected?: boolean;
	pageNum: PositiveInteger<number>;
}

export type PaginationBoardValue = {
	previousSelectedPage?: PositiveInteger<number>;
	selectedPage?: PositiveInteger<number>;
	pageCount: PositiveInteger<number>;
	buttonViewingLimit: PositiveInteger<number>;
}

export class PaginationBoard{
	#externalSetPages;
	#externalSetSelected;


	constructor(
		{
			paginationBoardValue,
			externalSetSelected,
			externalSetPages
		} : {
			paginationBoardValue: PaginationBoardValue,
			externalSetSelected: (v: PaginationItem) => void,
			externalSetPages: (v: PaginationItem[]) => void
		}
	){
		this.#externalSetPages = externalSetPages;
		this.#externalSetSelected = externalSetSelected;
		
		this.updatePaginationBoardValue(paginationBoardValue);
	}

	updatePaginationBoardValue(value: PaginationBoardValue){
		const pagination: PaginationItem[] = calcPagination(
			value.pageCount,
			value.buttonViewingLimit,
			value.selectedPage,
			value.previousSelectedPage
		);

		this.#externalSetPages(pagination);
	}

	select(page: PaginationItem){
		this.#externalSetSelected(page);
	}
}
