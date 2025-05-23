'use client';
import { useState, useRef, useEffect } from 'react';


import { API_LOCATIONS__PATH } from '@tsCF/data';

import {
	TileBoard_SearchValue,
	NonTilesResultsForDrawingSearchPageTileBoard,
	pushStateByLegacy
} from '@tsLF/pages';

import { initLocationsSearchPage	} from '@tsCF/pages';
  
import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
import { getQPCBaseListFromURL } from '@tsLF/forURLSP';

import type { GT } from '@tsC/api-graphql-to-ex';


import { useGlobalContext } from '@/components/context/globalContext';


import SearchItemNav from '@/components/next/routes/SearchItemNav';
import LocationsSearch from '@/components/next/routes/Locations/LocationsSearch';
import TileBoard from '@/components/next/tileBoard/TileBoard';
import LocationTile from '@/components/next/tileBoard/tiles/LocationTile';
import TileBoard_Search from '@/components/next/tileBoard_Search/TileBoard_Search';




const pathName = API_LOCATIONS__PATH.name;

export default function Locations(){

	const { 
		wUrql,
		wLocationChangeEventEmitter
	} = useGlobalContext();
	const [
		LocationsSearch__update_values,
		set_LocationsSearch__update_values
	] = useState<QueryParamCompatible_Base[]>([]); 
	const [
		TileBoard_SearchUpdateValue,
		set_TileBoard_SearchValue
	] = useState<TileBoard_SearchValue | undefined>(undefined);
	const [
		tiles,
		set_tiles
	] = useState<
		GT.LocationPreviewFieldsFragment[]
		| NonTilesResultsForDrawingSearchPageTileBoard
	>('LOADING');
	const [
		get_LocationsSearch__exit_values,
		setGet_LocationsSearch__exit_values
	] = useState<(v: QueryParamCompatible_Base[]) => void>(() => (_v: QueryParamCompatible_Base[]) => {});
	const [
		get_pagination__exit_value,
		setGet_pagination__exit_value
	] = useState<(v: number | undefined) => void>(() => (_v: number | undefined) => {});
	
	const REF_initOutput = useRef();
	useEffect(
		() => {
			if(REF_initOutput.current){
				return;
			}

			REF_initOutput.current = initLocationsSearchPage(		// prosti menya, gospod'... no ya greshen...
				{                                                   //@ts-ignore-next-line
					pathName,										//@ts-ignore-next-line
					pushStateFn: pushStateByLegacy,					//@ts-ignore-next-line
					set_tiles,										//@ts-ignore-next-line
					set_TileBoard_SearchValue,						//@ts-ignore-next-line
					set_LocationsSearch__update_values,				//@ts-ignore-next-line
					wUrql,											//@ts-ignore-next-line
					wLocationChangeEventEmitter
				}
			);

			const {
				handlePaginationSelection,
				handleLocationsSearchApply
			} = REF_initOutput.current;

			setGet_LocationsSearch__exit_values(() => 
				(v: QueryParamCompatible_Base[]) => {
					// prosti menya, gospod'... no ya greshen...
					//@ts-ignore-next-line
					handleLocationsSearchApply(v);
				}
			)
			setGet_pagination__exit_value(() => 
				(v: number | undefined) => {
					// prosti menya, gospod'... no ya greshen...
					//@ts-ignore-next-line
					handlePaginationSelection(v);
				}
			)

		},
		[]
	);

	// prosti menya, gospod'... no ya greshen...
	//@ts-ignore-next-line
	if(REF_initOutput.current && !REF_initOutput.current.actionExecuterAfterMount.isReady()){
		const init_LocationsSearch__update_values = getQPCBaseListFromURL(
			new URL(window.location.href)
		)

		set_LocationsSearch__update_values(
			init_LocationsSearch__update_values
		);
	
		// prosti menya, gospod'... no ya greshen...
		//@ts-ignore-next-line
		REF_initOutput.current.actionExecuterAfterMount.setReady();
		
		// prosti menya, gospod'... no ya greshen...
		//@ts-ignore-next-line
		REF_initOutput.current.searchPageManager.init(init_LocationsSearch__update_values);

		//crutch by svelte legacy crutch
		// prosti menya, gospod'... no ya greshen...
		//@ts-ignore-next-line
		REF_initOutput.current.handleLocationsSearchApply(init_LocationsSearch__update_values);
	}

	return (
		<>
			<SearchItemNav pathName={pathName}>
				<LocationsSearch
					get_exitValue = {
						get_LocationsSearch__exit_values
					}
					init_cachedValues = {
						LocationsSearch__update_values
					}
					update_values = {
						LocationsSearch__update_values
					}

					key={
						// IS IT OKAY??? wtf...
						get_LocationsSearch__exit_values.toString()
						+ LocationsSearch__update_values.toString()
						+ new Date().getTime()
						+ 'locations'
					}
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
							const tileComponents = [];

							for(let i = 0; i < tiles.length; i++){
								tileComponents.push(
									<LocationTile data={tiles[i]} key={`${tiles[i].id} ${tiles[i].name}`} />
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
