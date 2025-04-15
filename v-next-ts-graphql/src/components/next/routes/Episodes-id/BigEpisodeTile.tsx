import { useState, useRef } from 'react';


import type { 
	PaginationBoardValue,
	PaginationItem
} from '@tsLF/pages';
import {
	LimitedViewOfItems
} from '@tsLF/pages';

import type { GT } from '@tsC/api-graphql-to-ex';


import CharacterTile from '@/components/next/tileBoard/tiles/CharacterTile';
import PaginationBoard from '@/components/next/pagination/PaginationBoard';




export default function BigEpisodeTile(
	{
		data
	}:{
		data: GT.EpisodeFieldsFragment;
	}
){
	const [PaginationBoard__entry_value, set_paginationBoard__entry_value] = useState<PaginationBoardValue>();
	const [currentViewCharacters, set_currentViewCharacters] = useState<GT.CharacterPreviewFieldsFragment[]>([]);
	const REF_limitedViewOfCharacters = useRef<LimitedViewOfItems>();
	const viewCountOfCharacters = 40;
	const [handleSelectedPage] = useState<(v: PaginationItem) => void>(
		()=>{
			let _handleSelectedPage = (v: PaginationItem) => {};

			if(data.characters && data.characters.length > viewCountOfCharacters){
				const limitedViewOfCharacters = new LimitedViewOfItems(
					{
						viewCountOfItems: viewCountOfCharacters,
						set_limitedItems: set_currentViewCharacters,
						set_paginationBoard__entry_value,
						// prosti menya, gospod'... no ya greshen...
						// @ts-ignore
						thatArrayOfObjs: data.characters,
						buttonViewingLimit: 5
					}
				);

				REF_limitedViewOfCharacters.current = limitedViewOfCharacters;
				
				_handleSelectedPage = (v: PaginationItem) => 
				// prosti menya, gospod'... no ya greshen...
				// @ts-ignore
					REF_limitedViewOfCharacters.current.recievePaginationBoard__exit_value(v);


				limitedViewOfCharacters.init();
			}

			return _handleSelectedPage;
		}
	);

	const getPaginationBoard__exit_value = (v: PaginationItem | undefined) => {
		if(v){
			handleSelectedPage(v);
		}
	}

	return (
		<>
			<div
				className="
					bg-color--181a1b
					d-flex
					big-tile-box
				"
				style={{
					height: '250px'
				}}
			> 
				<div
					className="
						big-tile-info-box
						d-flex
						fd-column
					"
					style={{
						margin: '0 15px 5px 15px'
					}}
				>
			    <span
						className="
							big-tile-h
							tile-line
						"
			    >
							Episode card
			    </span>
					<span
						className="
							tile-line
						"
						style={{
							borderBottom: 'solid 3px var(--colorPalette-b6b6b6)',
							width: '100%'
						}}
					></span>
			    <span
						className="
							tile-line
							font-weight--normal
						"
			    >
						Name:
				    <span
							className="
								color--f5f5f5
							"
				    >
							{ data.name }
				    </span>
			    </span>
			
			    <span 
						className="
							tile-line
							font-weight--normal
						"
					>
						Air date:
				    <span 
							className="
								color--f5f5f5
							"
						>
							{ data.air_date }
						</span>
			    </span>
			
			    <span 
						className="
							tile-line
							font-weight--normal
						"
					>
						Notation:
				    <span 
							className="
								color--f5f5f5
							"
						>
							{ data.episode }
						</span>
			    </span>
			
			
			    <span 
						className="
							tile-line
							font-weight--normal
						"
					>
						Count of characters who have been seen in the episode:
				    <span 
							className="
								color--f5f5f5
							"
						>
							{ data.characters.length }
						</span>
			    </span>
			
			
				</div>
			</div>
			<div
				className="
					big-result-board
					w-100
				"
				style={{
					marginTop: '10px',
					backgroundColor: 'var(--colorPalette-181a1b)'
				}}
			>
			
				<div
					className="
						d-flex
						w-100
						jc-center
						bg-color--181a1b
					"
					style={{
						marginBottom: '10px'
					}}
				>
					List of characters who have been seen in the episode.
				</div>
		
				{
					(() =>{
						if(data.characters.length > viewCountOfCharacters){
							return (
								<div
									className="
										d-flex
										w-100
										jc-center
									"
									style={{
										marginBottom: '10px'
									}}
								>
									<PaginationBoard 
										// prosti menya, gospod'... no ya greshen...
										// @ts-ignore
										entry_value={
											PaginationBoard__entry_value
										}
										getExit_value={
											getPaginationBoard__exit_value
										}
										//vahui, blyat'!!!
										key={JSON.stringify(PaginationBoard__entry_value)}
									/>
								</div>
							);
						}
					})()
				}
					
				{
					(() => {
						const characterTiles = [];
						
						if(data.characters.length > viewCountOfCharacters){
							for(let i=0; i < currentViewCharacters.length; i++){
								characterTiles.push(
									<CharacterTile data={currentViewCharacters[i]} key={currentViewCharacters[i].id} />
								);

							}
						}else{
							for(let i = 0; i < data.characters.length; i++){
								characterTiles.push(
									// prosti menya, gospod'... no ya greshen...
									// @ts-ignore
									<CharacterTile data={data.characters[i]} key={data.characters[i].id} />
								);
							}
						}
						
						return characterTiles
					})()
				}
			
			</div>
		</>
	);
}
