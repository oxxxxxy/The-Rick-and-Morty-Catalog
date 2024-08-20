export const calcPagination = (countOfPages, buttonViewingLimit, selectedPageNum, prevSelectedPageNum) => {

	if(selectedPageNum > countOfPages){
		throw new Error('selectedPageNum must be less then or equal to countOfPages');
	}

	if(selectedPageNum && prevSelectedPageNum){
		let diff = Math.abs(selectedPageNum - prevSelectedPageNum);

		if(!(diff === 1)){
			throw new Error('Difference must have 1 between selectedPageNum and prevSelectedPageNum');
		}
	}

	if(!selectedPageNum){
		selectedPageNum = 1;
		prevSelectedPageNum = undefined;
	}


	const calc = (init, limit) => {
		const pageRange = [];

		for(let i = 0; i < limit; i++){
			pageRange.push({pageNum: i + init});
		}

		const index = pageRange.findIndex(e => e.pageNum === selectedPageNum);
		pageRange[index].selected = true;
		
		return pageRange;
	}
	
	
	if(countOfPages <= buttonViewingLimit){
		return calc(1, countOfPages);
	}


	if(buttonViewingLimit % 2 === 0){
		const halfOfButtonViewingLimit = buttonViewingLimit / 2;

		if(selectedPageNum <= halfOfButtonViewingLimit){
			return calc(1, buttonViewingLimit);
		}

		if(selectedPageNum > halfOfButtonViewingLimit && selectedPageNum + halfOfButtonViewingLimit <= countOfPages){
			if(!prevSelectedPageNum || prevSelectedPageNum > selectedPageNum){
				return calc(1 + selectedPageNum - halfOfButtonViewingLimit, buttonViewingLimit);
			} else {
				return calc(selectedPageNum - halfOfButtonViewingLimit, buttonViewingLimit);	
			}
		}

		if(selectedPageNum + halfOfButtonViewingLimit > countOfPages){
			const diff = countOfPages - selectedPageNum;

			return calc(selectedPageNum - buttonViewingLimit + diff + 1, buttonViewingLimit);	
		}

	} else {
		const sideInteger = Math.floor(buttonViewingLimit / 2);
		
		const diff = selectedPageNum - sideInteger;

		if(diff <= 0){
			return calc(1, buttonViewingLimit);
		}

		const sum = selectedPageNum + sideInteger;

		if(diff > 0 && sum < countOfPages + 1){
			return calc(diff, buttonViewingLimit);
		}

		if(sum >= countOfPages + 1){
			return calc(diff - sum + countOfPages, buttonViewingLimit);
		}
	}
};
