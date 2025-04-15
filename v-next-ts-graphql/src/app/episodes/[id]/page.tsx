'use client'	
import { useState, useRef, useEffect } from 'react';


import type { GT } from '@tsC/api-graphql-to-ex';

import type { 
	NonTilesResultsForDrawingSearchPageTileBoard,
	ItemPageManager
} from '@tsLF/pages';

import { initEpisodeIdPage_V2 } from '@tsCF/pages';


import { useGlobalContext } from '@/components/context/globalContext';
import { APP_NAME } from '@/components/data';


import BigEpisodeTile from '@/components/next/routes/Episodes-id/BigEpisodeTile';
import TileBoard from '@/components/next/tileBoard/TileBoard';




export default function Episodes_Id(
	{
		params
	}:{
		params: Promise<{ id: string }>
	}
){
	const { wUrql } = useGlobalContext();
	const [pageTitle, set_pageTitle] = useState<string>('');
	const [bigTile, set_bigTile] = useState<GT.EpisodeFieldsFragment | NonTilesResultsForDrawingSearchPageTileBoard>('LOADING');
	const REF_itemPageManager = useRef<ItemPageManager>();
	
	useEffect(
		() => {
			if(REF_itemPageManager.current){
				return;
			}
			
			const action = async () => {
	
				const { id } = await params;
			
				REF_itemPageManager.current = initEpisodeIdPage_V2(
					{
						wUrql,
						set_pageTitle,
						set_bigTile,
						episode_id: id,
						APP_NAME
					}
				);
			};

			action();
		}
		, []
	);

	document.title = pageTitle;


	return (
		<TileBoard>
		{
			(() => {
				if (bigTile === 'ERR'){
					return <p>Network Error. Try later or kill yourself. Thank you.</p>
				}else if (bigTile === 'LOADING'){
					return <p>Loading...</p>
				}else if (bigTile === 'NOT FOUND'){
					return <p>Nothing found.</p>
				}else if (typeof bigTile === 'object'){
					return <BigEpisodeTile
						data={bigTile}
					/>
				}
			})()
		}
		</TileBoard>
	);
}
