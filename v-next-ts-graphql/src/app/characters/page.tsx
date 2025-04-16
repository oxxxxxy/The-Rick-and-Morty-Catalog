'use client';
import { useState, useRef, useEffect } from 'react';


import { API_CHARACTERS__PATH } from '@tsCF/data';

import {
	TileBoard_SearchValue,
	NonTilesResultsForDrawingSearchPageTileBoard,
	pushStateByLegacy
} from '@tsLF/pages';

import { initCharactersSearchPage	} from '@tsCF/pages';
  
import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
import { getQPCBaseListFromURL	} from '@tsLF/forURLSP';

import type { GT } from '@tsC/api-graphql-to-ex';


import { useGlobalContext } from '@/components/context/globalContext';


import SearchItemNav from '@/components/next/routes/SearchItemNav';
import CharactersSearch from '@/components/next/routes/Characters/CharactersSearch';
import TileBoard from '@/components/next/tileBoard/TileBoard';
import CharacterTile from '@/components/next/tileBoard/tiles/CharacterTile';
import TileBoard_Search from '@/components/next/tileBoard_Search/TileBoard_Search';




const pathName = API_CHARACTERS__PATH.name;

export default function Characters(){
	const { 
		wUrql,
		wLocationChangeEventEmitter
	} = useGlobalContext();
	const [
		CharactersSearch__update_values,
		set_CharactersSearch__update_values
	] = useState<QueryParamCompatible_Base[]>([]); 
	const [
		TileBoard_SearchUpdateValue,
		set_TileBoard_SearchValue
	] = useState<TileBoard_SearchValue | undefined>(undefined);
	const [
		tiles,
		set_tiles
	] = useState<
		GT.CharacterPreviewFieldsFragment[]
		| NonTilesResultsForDrawingSearchPageTileBoard
	>('LOADING');
	// let get_CharactersSearch__exit_values = (v: QueryParamCompatible_Base[]) => {};
	const [
		get_CharactersSearch__exit_values,
		setGet_CharactersSearch__exit_values
	] = useState<(v: QueryParamCompatible_Base[]) => void>(() => (v: QueryParamCompatible_Base[]) => {});
	const [
		get_pagination__exit_value,
		setGet_pagination__exit_value
	] = useState<(v: number | undefined) => void>(() => (v: number | undefined) => {});
	
	const REF_initOutput = useRef();
	useEffect(
		() => {
			if(REF_initOutput.current){
				return;
			}

			REF_initOutput.current = initCharactersSearchPage(			// prosti menya, gospod'... no ya greshen...
			{                                                     //@ts-ignore
				pathName,																						//@ts-ignore
				pushStateFn: pushStateByLegacy,											//@ts-ignore
				set_tiles,																					//@ts-ignore
				set_TileBoard_SearchValue,													//@ts-ignore
				set_CharactersSearch__update_values,								//@ts-ignore
				wUrql,																							//@ts-ignore
				wLocationChangeEventEmitter
			}
			);

			const {
				handlePaginationSelection,
				handleCharactersSearchApply,
				actionExecuterAfterMount,
				searchPageManager
			} = REF_initOutput.current;

			setGet_CharactersSearch__exit_values(() =>
				(v: QueryParamCompatible_Base[]) => {
					// prosti menya, gospod'... no ya greshen...
					//@ts-ignore
					handleCharactersSearchApply(v);
				}
			);
			setGet_pagination__exit_value(() => 
				(v: number | undefined) => {
					// prosti menya, gospod'... no ya greshen...
					//@ts-ignore
					handlePaginationSelection(v);
				}
			);
			

			// prosti menya, gospod'... no ya greshen...
			//@ts-ignore
			if(!actionExecuterAfterMount.isReady()){
				set_CharactersSearch__update_values(
					getQPCBaseListFromURL(
						new URL(window.location.href)
					)
				);
				
				// prosti menya, gospod'... no ya greshen...
				//@ts-ignore
				actionExecuterAfterMount.setReady();
				
				// prosti menya, gospod'... no ya greshen...
				//@ts-ignore
				searchPageManager.init(CharactersSearch__update_values);

				//crutch by svelte legacy crutch
				handleCharactersSearchApply([]);
			}
		},
		[]
	);


	return (
		<>
			<SearchItemNav pathName={pathName}>
				<CharactersSearch
					get_exit_values = {
						get_CharactersSearch__exit_values
					}
					init_cachedValues = {
						CharactersSearch__update_values
					}
					update_values = {
						CharactersSearch__update_values
					}
					key={get_CharactersSearch__exit_values.toString()}
				/>
			</SearchItemNav>
		
			{
				(
					() => {
				
						if (tiles === 'ERR') {
							return (
								<TileBoard>
									<p>Network Error. Try later or kill yourself. Thank you.</p>
								</TileBoard>
							);
						} else if(tiles === 'LOADING') {
							return (
								<TileBoard>
									<p>Loading...</p>
								</TileBoard>
							);
						} else if (tiles === 'NOT FOUND'){
							return (
								<TileBoard>
									<p>Nothing found.</p>
								</TileBoard>
							);
						}else if (Array.isArray(tiles)){
							let tileComponents = [];

							for(let i = 0; i < tiles.length; i++){
								tileComponents.push(
									<CharacterTile data={tiles[i]} key={`${tiles[i].id} ${tiles[i].name}`} />
								);
							}

							if(!TileBoard_SearchUpdateValue){
								throw new Error('!TileBoard_SearchUpdateValue');
							}

							return (
								<TileBoard_Search
									update_value={
										TileBoard_SearchUpdateValue
									}
									getPagination__exit_value={
										get_pagination__exit_value
									}
								>
									{tileComponents}
								</TileBoard_Search>
							);
						}
			
					}
				)()
			}
		</>
	);
}
