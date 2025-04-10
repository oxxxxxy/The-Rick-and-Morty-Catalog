import type { PaginationBoardValue } from '@tsLF/pages';




export type TileBoard_SearchValue =  Omit<PaginationBoardValue, 
		'buttonViewingLimit' 
		| 'previousSelectedPage'
> & {
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

	addPageCount(v: number): TileBoard_SearchValueBuilder{
		this.#pageCount = v; 

		return this;
	}
	
	addSelectedPage(v: number): TileBoard_SearchValueBuilder{
		this.#selectedPage = v; 

		return this;
	}

	addAvailableItemsTitle(v: string): TileBoard_SearchValueBuilder{
		this.#availableItemsTitle = v;

		return this;
	}

	addAvailableItemsCount(v: number): TileBoard_SearchValueBuilder{
		this.#availableItemsCount = v; 

		return this;
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
			availableItemsTitle: T.#availableItemsTitle ? T.#availableItemsTitle : ''
		};
	}
}
