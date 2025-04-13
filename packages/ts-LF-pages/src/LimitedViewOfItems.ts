import type { PositiveInteger } from '@tsL/types';

import type { 
	PaginationBoardValue,
	PaginationItem
} from '@tsLF/pages';




export type ArgumentsFor_LimitedViewOfItems = {
	set_paginationBoard__entry_value: (v: PaginationBoardValue) => void;
	set_limitedItems: (v: Object[]) => void;
	thatArrayOfObjs: Object[];
	buttonViewingLimit: number;
	viewCountOfItems: PositiveInteger<number>;
}

export class LimitedViewOfItems{
	#setExternalPaginationBoard__entry_value: (v: PaginationBoardValue) => void;
	#setExternalLimitedItems: (v: Object[]) => void;
	#thatArrayOfObjs: Object[];
	#buttonViewingLimit: number;
	#viewCountOfItems: PositiveInteger<number>;


	constructor(
		{
			set_paginationBoard__entry_value,
			set_limitedItems,
			thatArrayOfObjs,
			buttonViewingLimit,
			viewCountOfItems
		} : ArgumentsFor_LimitedViewOfItems
	){
		this.#setExternalPaginationBoard__entry_value = set_paginationBoard__entry_value;
		this.#setExternalLimitedItems = set_limitedItems;
		this.#thatArrayOfObjs = thatArrayOfObjs;
		this.#buttonViewingLimit = buttonViewingLimit;
		this.#viewCountOfItems = viewCountOfItems;
	}
	
	getPageCount(): number{
		const diff = this.#thatArrayOfObjs.length / this.#viewCountOfItems;

		const diffStr = diff.toString();
		const floor = Math.floor(diff);

		if(diffStr != floor){
			return floor + 1;
		}else{
			return diff;
		}
	}

	getPaginationBoardValue(selectedPage: PositiveInteger<number>): PaginationBoardValue{
		return {
			selectedPage,
			pageCount : this.getPageCount(),
			buttonViewingLimit: this.#buttonViewingLimit
		}
	}
	
	getViewLimit(v: PositiveInteger<number>): Object[]{
		const viewLimitLeft = this.#viewCountOfItems * (v - 1);
		let viewLimitRight = viewLimitLeft + this.#viewCountOfItems;

		const viewLimitOfObjs = this.#thatArrayOfObjs.slice(
			viewLimitLeft,
			viewLimitRight
		);

		return viewLimitOfObjs;
	}

	init(){
		this.#setExternalLimitedItems(
			this.getViewLimit(1)
		);
		this.#setExternalPaginationBoard__entry_value(
			this.getPaginationBoardValue(1)
		);
	}

	recievePaginationBoard__exit_value(v: PaginationItem){
		this.#setExternalLimitedItems(
			this.getViewLimit(v.pageNum)
		);
		this.#setExternalPaginationBoard__entry_value(
			this.getPaginationBoardValue(v.pageNum)
		);
	}
}
