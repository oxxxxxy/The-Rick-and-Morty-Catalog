import { calcPagination as _cP } from '@jsL/pagination';




export const calcPagination = (
		countOfPages: number,
		buttonViewingLimit: number,
		selectedPageNum?: number,
		prevSelectedPageNum?:number
	): {pageNum: number, selected?: true}[] => 
		_cP(countOfPages, buttonViewingLimit, selectedPageNum, prevSelectedPageNum);
