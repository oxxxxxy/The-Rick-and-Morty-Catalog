import type { PaginationBoardValue } from '@tsLF/pages';




export type TileBoard_SearchValue = PaginationBoardValue 
& {
	buttonViewingLimit: undefined;
	previousSelectedPage: undefined;
	availableItemsCount: number;
	availableItemsTitle: string;
}

export class TileBoard_SearchValueBuilder {
	#pageCount: number | undefined;
	#selectedPage: number | undefined;
	#availableItemsTitle: string | undefined;
	#availableItemsCount:	number | undefined;


	constructor(v?: TileBoard_SearchValue){
		if(v){
			const T = this;

			T.#pageCount = v.pageCount;
			T.#selectedPage = v.selectedPage;
			T.#availableItemsCount = v.availableItemsCount;
			T.#availableItemsTitle = v.availableItemsTitle;
		}			
	}

	addPageCount(v: number){
		this.#pageCount = v;
	}
	
	addSelectedPage(v: number){
		this.#selectedPage = v;
	}

	addAvailableItemsTitle(v: string){
		this.#availableItemsTitle = v;
	}

	addAvailableItemsCount(v: number){
		this.#availableItemsCount = v;
	}

	build(): TileBoard_SearchValue {
		const T = this;

		if(!T.#pageCount || !T.#availableItemsCount){
			throw new Error('TileBoard_SearchValue is not ready.');
		}

		return {
			pageCount: T.#pageCount,
			selectedPage: T.#selectedPage,
			availableItemsCount: T.#availableItemsCount,
			availableItemsTitle: T.#availableItemsTitle
		};
	}
}
