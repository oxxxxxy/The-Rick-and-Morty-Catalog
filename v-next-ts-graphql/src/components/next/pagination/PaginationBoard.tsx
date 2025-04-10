import { useState, useRef } from 'react';


import type {
	PaginationBoardValue,
	PaginationItem,
} from '@tsLF/pages';
import { PaginationBoard } from '@tsLF/pages';




export default function PaginationBoardComponent(
	{
		entry_value,
		getExit_value
	}: {
		getExit_value: (v: PaginationItem | undefined) => void;
		entry_value: PaginationBoardValue;
	}
){

	if(!entry_value){
		throw new Error('PaginationBoardValue is required.');
	}

	
	const [pages, setPages] = useState<PaginationItem[]>([]);
	const setSelected = getExit_value;


	const paginationBoard = useRef<PaginationBoard>();
	if(!paginationBoard.current){
		paginationBoard.current = new PaginationBoard(
			{
				paginationBoardValue: entry_value,
				externalSetSelected: setSelected,
				externalSetPages: setPages,
			}
		);
	}
	

	return (
		<div
			className="
				d-flex
				pagination
			"
		>
			{
				(
					() => {
						if(!pages.length){
							return;
						}

						const pageComponents = [];
						
						for(let i = 0; i < pages.length; i++){
							const page = pages[i];
							
							if(page.selected){
								pageComponents.push(
									<a
										className="
											pagination-item
											pagination-item-selected
										"
									>
										{page.pageNum}
									</a>
								);
							} else {
								pageComponents.push(
									<a
										className="
											pagination-item
										"
										// prosti menya, gospod'... no ya greshen...
										// @ts-ignore-next-line
										onClick={() => paginationBoard.current.select(page)}
									>
										{page.pageNum}
									</a>
								);
							}
						}

						return pageComponents;
					}
				)()
		  }
		</div>
	);
}
