import type {
	LittleChangeableStringElementDrawer,
	NonTilesResultsForDrawingSearchPageTileBoard
} from '@tsLF/pages';

import type { UT } from '@tsC/api-graphql-to-ex';




export type MakeReqFn = (id: string) => (Promise<{data?: Object, error?: UT.CombinedError }>);

export type ArgumentsFor_ItemPageManager = {
	set_bigTile: (v: Object | NonTilesResultsForDrawingSearchPageTileBoard) => void;
	pageTitleDrawer: LittleChangeableStringElementDrawer
	itemId: `${number}`;
	makeReqFn: MakeReqFn;
}

export class ItemPageManager {
	#pageTitleDrawer: LittleChangeableStringElementDrawer;
	#setExternalBigTile: (v: Object | NonTilesResultsForDrawingSearchPageTileBoard) => void;
	#makeReqFn: MakeReqFn;


	constructor(
		{
			set_bigTile,
			pageTitleDrawer,
			itemId,
			makeReqFn
		} : ArgumentsFor_ItemPageManager
	){
		this.#pageTitleDrawer = pageTitleDrawer;
		this.#setExternalBigTile = set_bigTile;
		this.#makeReqFn = makeReqFn;


		const itemIdStr = itemId.toString();

		if(!Array.isArray(itemIdStr.match(/^([1-9]|[1-9][0-9]+)$/))){
			this.drawNotFound();
			return;
		}

		this.drawLoading();
		this.#makeReq(itemIdStr);
	}


	drawNotFound(){
		this.#setExternalBigTile('NOT FOUND');
		this.#pageTitleDrawer.draw('not found');
	}

	drawError(){
		this.#setExternalBigTile('ERR');
		this.#pageTitleDrawer.draw('error');
	}
	
	drawLoading(){
		this.#setExternalBigTile('LOADING');
		this.#pageTitleDrawer.draw('loading');
	}


	async #makeReq(id: string){
		let { data, error } = await this.#makeReqFn(id);

		if(error){
			this.drawError();
			return;
		}

		if(!data){
			this.drawNotFound();
			return;
		}
		
		this.#setExternalBigTile(data);
		this.#pageTitleDrawer.draw('ok', data);
	}
	
}

