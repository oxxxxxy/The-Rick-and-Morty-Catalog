import type { 
	PaginationBoardValue,
	PaginationItem,
	TileBoard_SearchValue
} from '@tsLF/pages';


import PaginationBoard from '@/components/next/pagination/PaginationBoard';




export default function TileBoard_Search(
	{
		update_value,
		getPagination__exit_value,
		children
	}:{
		update_value: TileBoard_SearchValue;
		getPagination__exit_value: (v:number | undefined) => void;
		children: React.ReactNode
	}
) {

	if(!update_value){
		throw new Error('update_value is required.');
	}


	const PaginationBoard__entry_value: PaginationBoardValue = {
		pageCount : update_value.pageCount,
		selectedPage: update_value.selectedPage,
		buttonViewingLimit: 7
	};


	const getPaginationBoard__exit_value = (v: PaginationItem | undefined) => {
		if(v){
			getPagination__exit_value(v.pageNum);
		}
	};


	return (
		<div
			className="
				main--font-size
				color--b6b6b6
				d-flex
				ai-center
				fd-column
			"
			style={{marginTop:'25px'}}
		>
			<div
				className={`
					tt-uppercase
					d-flex
					w-100
					jc-center
					bg-color--181a1b
				`}
				style={{fontSize: '30px'}}
			>
				results
			</div>
		
			<div
				className="
					margin-10
					tt-uppercase
				"
			>
				available { update_value.availableItemsTitle } : { update_value.availableItemsCount }
				<br/>
				page count : { update_value.pageCount }
			</div>
		
			{
				(
					() => {
						if(PaginationBoard__entry_value.pageCount > 1){
							return (
								<PaginationBoard 
									entry_value={
										PaginationBoard__entry_value
									}
									getExit_value={
										getPaginationBoard__exit_value
									}
								/>
							);
						}
					}
				)()
			}
		
			<div
				className="
					result-board
				"
			>
				{children}
			</div>
		</div>
	);
}
