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




export default function BigLocationTile(
	{
		data
	}:{
		data: GT.LocationFieldsFragment	
	}
){

	const [PaginationBoard__entry_value, set_paginationBoard__entry_value] = useState<PaginationBoardValue>();
	const [currentViewCharacters, set_currentViewCharacters] = useState<GT.CharacterPreviewFieldsFragment[]>([]);
	const REF_limitedViewOfCharacters = useRef<LimitedViewOfItems>();
	const viewCountOfCharacters = 40;
	const [handleSelectedPage] = useState<(v: PaginationItem) => void>(
		()=>{
			let _handleSelectedPage = (v: PaginationItem) => {};

			
			if(data.residents && data.residents.length > viewCountOfCharacters){
				const limitedViewOfCharacters = new LimitedViewOfItems(
					{
						viewCountOfItems: viewCountOfCharacters,
						set_limitedItems: set_currentViewCharacters,
						set_paginationBoard__entry_value,
						thatArrayOfObjs: data.residents,
						buttonViewingLimit: 5
					}
				);

				REF_limitedViewOfCharacters.current = limitedViewOfCharacters;
				
				// prosti menya, gospod'... no ya greshen...
				// @ts-ignore-next-line
				_handleSelectedPage = (v: PaginationItem) => (console.log(v, 'hi2'), REF_limitedViewOfCharacters.current.recievePaginationBoard__exit_value(v));

				limitedViewOfCharacters.init();
			}

			return _handleSelectedPage
		}
	);
	

	// let PaginationBoard__exit_value: PaginationItem;
	// let PaginationBoard__entry_value: PaginationBoardValue;
	// let currentViewCharacters: GT.CharacterPreviewFieldsFragment[] = [];


	// const set_currentViewCharacters = (v: GT.CharacterPreviewFieldsFragment[]) => (currentViewCharacters = v);
	// const set_PaginationBoard__entry_value = (v: PaginationBoardValue) => (PaginationBoard__entry_value = v);



function useForceUpdate() {
  const [_, setValue] = useState({});
  return () => setValue({}); // Новая ссылка на объект
}

// Использование

	// $:{
	// 	if(PaginationBoard__exit_value){
	// 		handleSelectedPage(PaginationBoard__exit_value);
	// 	}
	// }
	console.log(PaginationBoard__entry_value, 'enternal')
	const getPaginationBoard__exit_value = (v: PaginationItem | undefined) => {
		if(v){
			handleSelectedPage(v);

			console.log(PaginationBoard__entry_value, 'hi0', REF_limitedViewOfCharacters.current)
			set_paginationBoard__entry_value(PaginationBoard__entry_value);
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
							Location card
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
						Type:
				    <span 
							className="
								color--f5f5f5
							"
						>
							{ data.type }
						</span>
			    </span>
			
			    <span 
						className="
							tile-line
							font-weight--normal
						"
					>
						Dimension:
				    <span 
							className="
								color--f5f5f5
							"
						>
							{ data.dimension }
						</span>
			    </span>
			
			
			    <span 
						className="
							tile-line
							font-weight--normal
						"
					>
						Resident count:
				    <span 
							className="
								color--f5f5f5
							"
						>
							{ data.residents.length }
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
					List of characters who have been seen in the location.
				</div>
				
				{
					(() =>{
						if(data.residents.length > viewCountOfCharacters){
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
										// @ts-ignore-next-line
										entry_value={
											PaginationBoard__entry_value
										}
										getExit_value={
											getPaginationBoard__exit_value
										}
									/>
								</div>
							);
						}
						
						return null
					})()
				}
					
				{
					(() =>{
						const characterTiles = [];
						
						if(data.residents.length > viewCountOfCharacters){
							for(let i = 0; i < currentViewCharacters.length; i++){
								characterTiles.push(
									<CharacterTile data={currentViewCharacters[i]} key={currentViewCharacters[i].id} />
								);
							}
						} else {
							for(let i = 0; i < data.residents.length; i++){
								characterTiles.push(
									<CharacterTile data={data.residents[i]} key={i} />
								);
							}
						}
					// {#each currentViewCharacters as char, i (char.id) }
					// 	{#if i === 0}
					// 	{/*
					// 	<!-- 
					// 		vot eto ebanoe gavnische tolko iz-za ebuchey uebischnoy svelte reactivity hueti
					// 		kak je gorit s etogo ganvnischa
					// 		rabotaet kogda kak, ebat' etu huynyu so vsemi razrabami v rot, chtobi vi suki v adu goreli mrazi
					// 		poshli nahuy
					// 	-->
					// 	*/}
					// 		<div
					// 			className="
					// 				d-flex
					// 				w-100
					// 				jc-center
					// 			"
					// 			style={{
					// 				marginBottom: '10px'
					// 			}}
					// 		>
					// 			<PaginationBoard 
					// 				bind:entry_value={
					// 					PaginationBoard__entry_value
					// 				}
					// 				bind:exit_value={
					// 					PaginationBoard__exit_value
					// 				}
					// 			/>
					// 		</div>
					// 		<CharacterTile data={char} />
					// 	{:else}
					// 		<CharacterTile data={char} />
					// 	{/if}
					// {/each}
					// 		}
					// 	}else{
					// {#each data.residents as char }
					// 	<CharacterTile data={char} />
					// {/each}
						
						return characterTiles
					})()
				}
			
			</div>
		</>
	);
}
