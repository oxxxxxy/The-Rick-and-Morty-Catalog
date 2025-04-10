'use client';
import { useState, useEffect, useRef } from 'react';


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

export default function Locations(
	{
		params,
		searchParams
	}:{
		searchParams: Promise<{ [key: string]: string | string[] | undefined }>
	}
){

	const { 
		wUrql,
		wLocationChangeEventEmitter
	} = useGlobalContext();
	// const [
	// 	LocationsSearch__update_values,
	// 	forRenderSet_LocationsSearch__update_values
	// ] = useState<QueryParamCompatible_Base[]>([]); //new URL(data.url)
	// const REF__LocationsSearch__update_values = useRef<QueryParamCompatible_Base[]>([]); //new URL(data.url)
	// const set_LocationsSearch__update_values = (v: QueryParamCompatible_Base[]) => {
	// 	REF__LocationsSearch__update_values.current = v;
	// 	forRenderSet_LocationsSearch__update_values(v);
	// };
	const [
		LocationsSearch__update_values,
		set_LocationsSearch__update_values
	] = useState<QueryParamCompatible_Base[]>([]); //new URL(data.url)
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


	const O = useRef(
		initLocationsSearchPage(
			{
				pathName,
				pushStateFn: pushStateByLegacy,
				set_tiles,
				set_TileBoard_SearchValue,
				set_LocationsSearch__update_values,
				wUrql,
				wLocationChangeEventEmitter
			}
		)
	);
	/*
	export type PushStateFnType = (path: string, windowHistoryState: Object) => void;

	 */
			const {
				actionExecuterAfterMount,
				searchPageManager
			} = O.current;
			
			if(!actionExecuterAfterMount.isReady()){
			

			
							set_LocationsSearch__update_values(
					getQPCBaseListFromURL(
						new URL(window.location.href)
					)
				);

				
				actionExecuterAfterMount.setReady();
				
				// searchPageManager.init(REF__LocationsSearch__update_values.current);
				searchPageManager.init(LocationsSearch__update_values);
				
			}


	
	// useEffect(
	// 	() => {
	// 		const {
	// 			actionExecuterAfterMount,
	// 			searchPageManager
	// 		} = O.current;
			
	// 		if(actionExecuterAfterMount.isReady()){
	// 			return;
	// 		}
				
	// 		async function action(){

	// 			const params = await searchParams;

	// 			console.log('params', params);
				
	// 			set_LocationsSearch__update_values(
	// 				getQPCBaseListFromURL(
	// 					new URL(params)
	// 				)
	// 			);

				
	// 			actionExecuterAfterMount.setReady();
				
	// 			searchPageManager.init(LocationsSearch__update_values);
	// 		}
			
	// 		// action();
			
	// 						set_LocationsSearch__update_values(
	// 				getQPCBaseListFromURL(
	// 					new URL(window.location.href)
	// 				)
	// 			);

				
	// 			actionExecuterAfterMount.setReady();
				
	// 			searchPageManager.init(LocationsSearch__update_values);

	// 	}
	// 	,[]
	// );

	const {
		handlePaginationSelection,
		handleLocationsSearchApply
	} = O.current;


	function get_LocationsSearch__exit_values(v: QueryParamCompatible_Base[]) {
		console.log('LocationsSearch__getExitValues', v)
		
		handleLocationsSearchApply(v);
	}

	function get_pagination__exit_value(v: number | undefined) {
		console.log('get_pagination__exit_value', v);
		
		handlePaginationSelection(v);
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
									<LocationTile data={tiles[i]} key={i} />
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
