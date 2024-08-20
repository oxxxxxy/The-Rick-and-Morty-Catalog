<script lang="ts">
	import { onMount } from 'svelte';

	import { pushState } from '$app/navigation';


	import type { GT } from '@tsC/api-graphql-to-ex';

	import { API_CHARACTERS__PATH } from '@tsCF/data';

	import { capitalizeWord } from '@tsLF/pages';
	
	import type {
		TileBoard_SearchValue,
		ERR
	} from '@tsCF/pages';
	import {
		TileBoard_SearchValueBuilder,
		pushIntoWindowHistory,
		makeArgumentsFor_GetCharacters,
		URLSearchParams_pageParameterName
	} from '@tsCF/pages';
	
	import type { QueryParamCompatible_Base	} from '@tsLF/forURLSP';
	import { 
		getQPCBaseListFromURL,
		getURLSPSFromQPCBaseList,
		getQPCBaseListFromURLSearchParams,
		getObjArrFromQPCBaseList,
		getParamObjFromQPCBaseList
	} from '@tsLF/forURLSP';

	import { U } from '@tsL/utils';
	
	import { LocationSearchChangeEventEmitter } from '@tsLF/wLocationChangeEvent';
	import type { WindowLocationData } from '@tsLF/wLocationChangeEvent';

	import type { WT, GT, UT } from '@tsC/api-graphql-to-ex';

	import { Observer } from '@tsL/patterns';


	import { APP_NAME } from '$comps/data';
	import g from '$comps/context/index.ts';
	const { 
		wUrql,
		wLocationChangeEventEmitter
	} = g();


	import SearchItemNav from '$comps/svelte/routes/SearchItemNav.svelte';
	import CharactersSearch from '$comps/svelte/routes/Characters/CharactersSearch.svelte';
	import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';
	import CharacterTile from '$comps/svelte/tileBoard/tiles/CharacterTile.svelte';
	import TileBoard_Search from '$comps/svelte/tileBoard_Search/TileBoard_Search.svelte';




	export let data;


	const pageTitle = capitalizeWord(API_CHARACTERS__PATH.name);
	const	pathName = data.psl.route.id.slice(1);


	let CharactersSearch__exit_values: QueryParamCompatible_Base[] = [];
	let pagination__exit_value: number | undefined;


	let CharactersSearch__update_values: QueryParamCompatible_Base[] = getQPCBaseListFromURL(new URL(data.psl.url));
	let TileBoard_SearchUpdateValue: TileBoard_SearchValue | undefined;
	let tiles: GT.CharacterPreviewFieldsFragment[] | NonTilesResultsForDrawingSearchPageTileBoard = [1];


	const set_CharactersSearch__update_values = (v: QueryParamCompatible_Base[]) => (CharactersSearch__update_values = v);
	const set_TileBoard_SearchValue = (v: TileBoard_SearchValue) => (TileBoard_SearchUpdateValue = v);
	const set_tiles = (v: Object[] | NonTilesResultsForDrawingSearchPageTileBoard) => (tiles = v);



//dev

//okay

	class QPCListHolder{
		#qpcList: QueryParamCompatible_Base[] = [];
		
		setQPCList(v: QueryParamCompatible_Base[]){
			this.#qpcList = v;
		}

		getQPCList(): QueryParamCompatible_Base[]{
			return structuredClone(this.#qpcList);
		}
	}

	const qpcListHolder = new QPCListHolder();


	const lSCEEmitter = new LocationSearchChangeEventEmitter(
		{
			pathname: '/' + pathName,
		}
	);
	wLocationChangeEventEmitter.attach(lSCEEmitter);



	type NonTilesResultsForDrawingSearchPageTileBoard = 'ERR' | 'NOT FOUND' | 'LOADING';







	const makeFn_ignoreFnExecAfterExitValueTransferOnce = (fn: () => {}) => {
		/* const ignoreExitValueTransferOnceCrutch = new U.IgnoreFewTimesCrutch(1);

		const wrappedSveltePushStateBczThereIsErrorWhenLoaded = (p, whs) => {
			// window.history.pushState(whs, '', p); // <-- this works fine, but svelte pushState is not.
			// so, this miss/crutch/shit only for first error, which emits when loaded...
			// or I am doing a peace of shit again... goddamn...
			// UPD1: it appears only on loading exactly host/characters... so, i need smart crutch(shit solution(or svelte design is shit(or i'm fucking idiot(shut up(okay))))).
			// UPD2: it appears when user navigate to host/characters and when loading exactly this path... so, i just need ingnore exit_value transfer once. bcz i don't need the same value in history state twice.
			// upd3: i'm idiot. this appears bcz i transfer navigation_values... so, it's crutch to save design. i don't want to recode it to divide CustomFormHolder item draw and transfer parts on two separate things.

			if(!ignoreExitValueTransferOnceCrutch.isFinished()){
				ignoreExitValueTransferOnceCrutch.do();
			} else {
				pushState(p, whs);
			}
		}; */

		const ignoreExitValueTransferOnceCrutch = new U.IgnoreFewTimesCrutch(1);
		
		return function(){
			if(!ignoreExitValueTransferOnceCrutch.isFinished()){
				ignoreExitValueTransferOnceCrutch.do();
			} else {
				fn(...arguments);
			}
		};
	};
	

	const actionExecuterAfterMount = new U.ActionExecuterAfterCondition();






//okay

	const tileBoard_SearchValueBuilder = new TileBoard_SearchValueBuilder(
		{
			availableItemsTitle: pathName
		}
	);



	type ArgumentsFor_SearchPageDrawer = {
		pathName: string;
		setExternalTiles: (v: Object[] | NonTilesResultsForDrawingSearchPageTileBoard) => void;
		setExternalTileBoard_SearchValue: (v: TileBoard_SearchValue) => void;
	};

	type TempPropsOfTileBoard_SearchValue = TileBoard_SearchValue & {
		availableItemsTitle: undefined
	};

	type ArgumentsFor_SearchPageDrawer_handleDataFromReq = {
		data?: {
			tempPropsOfTileBoard_SearchValue: TempPropsOfTileBoard_SearchValue
			dataForTilesList: Object[] // ne sovsem ponimayu kak prokinut' tot je GT.CharacterPreviewFieldsFragment , podskajite, pls. Sdes' kak bi obschiy object kotoriy tip prokidivaet v prinimayushiy takoy je tip, kotoriy budet vihodit' iz prepareArgsForFnThrowToDrawerFromGetReq
		},
		error?: UT.CombinedError
	};



	class SearchPageDrawer{
		#tileBoard_SearchValueBuilder: TileBoard_SearchValueBuilder;
		#setExternalTiles: (v: Object[] | NonTilesResultsForDrawingSearchPageTileBoard) => void;
		#setExternalTileBoard_SearchValue: (v: TileBoard_SearchValue) => void;

		constructor(
			{
				pathName,
				setExternalTiles,
				setExternalTileBoard_SearchValue
			} : ArgumentsFor_SearchPageDrawer
		){
			
			this.#tileBoard_SearchValueBuilder = new TileBoard_SearchValueBuilder(
				{
					availableItemsTitle: pathName
				}
			);

			this.#setExternalTiles = setExternalTiles;
			this.#setExternalTileBoard_SearchValue = setExternalTileBoard_SearchValue;
		}

		drawNotFound(){
			this.#setExternalTiles('NOT FOUND');
		}
		
		drawLoading(){
			this.#setExternalTiles('LOADING');
		}
		
		drawErr(){
			this.#setExternalTiles('ERR');
		}

		handleDataFromReq(v: ArgumentsFor_SearchPageDrawer_handleDataFromReq){
			const { data, error } = v;

			if(error){
				this.drawErr();

				return;
			}

			if(!data){
				this.drawNotFound();

				return;
			}
			
			const { tempPropsOfTileBoard_SearchValue, dataForTilesList } = data;

			const tileBoard_SearchValue = this.#tileBoard_SearchValueBuilder
				.addSelectedPage(tempPropsOfTileBoard_SearchValue.selectedPage)
				.addPageCount(tempPropsOfTileBoard_SearchValue.pageCount)
				.addAvailableItemsCount(tempPropsOfTileBoard_SearchValue.availableItemsCount)
				.build();

			this.#setExternalTileBoard_SearchValue(tileBoard_SearchValue);

			this.#setExternalTiles(dataForTilesList);
		}
	}




const makeFnWhichReturnUnsubscribe_getItemsAndPrepareAndThrowToDrawer = (
		makeArgumentsFor_GetItems: (v: QueryParamCompatible_Base[]) => Object,
		wUrql_q_GetItems: (v: Object) => UT.OperationResultSource<UT.OperationResult>,
		prepareArgsForFnThrowToDrawerFromGetReq: (v: UT.OperationResult) => ArgumentsFor_SearchPageDrawer_handleDataFromReq
	): (
		(
			qpcList: QueryParamCompatible_Base[],
			throwPreparedArgsToSearchPageDrawer: (v: Object) => void
		) => void
	) => {
	return (
		qpcList: QueryParamCompatible_Base[],
		throwPreparedArgsToSearchPageDrawer: (v: Object) => void
	): (() => void) => {
		const args = makeArgumentsFor_GetItems(qpcList);

		const { unsubscribe } = wUrql_q_GetItems(args)
			.subscribe(
			(res: UT.OperationResult) => {
				const args = prepareArgsForFnThrowToDrawerFromGetReq(res);

				throwPreparedArgsToSearchPageDrawer(args);
			}
		);

		return unsubscribe;
	}
};


const makeFnPrepareArgsForFnThrowToDrawerFromGetReq = (thatPropName: string): ((v: UT.OperationResult) => ArgumentsFor_SearchPageDrawer_handleDataFromReq) => {
	return (v: UT.OperationResult): ArgumentsFor_SearchPageDrawer_handleDataFromReq => {
		const { data, error } = v;
		
		const args: ArgumentsFor_SearchPageDrawer_handleDataFromReq = {
			error
		};

		if(data){
			const { info, results } = data[thatPropName];


			if(!info.pages){
				return args;
			}

			const tempPropsOfTileBoard_SearchValue: TempPropsOfTileBoard_SearchValue = {
				pageCount: info.pages,
				availableItemsCount: info.count
			};

			if(info.next){
				tempPropsOfTileBoard_SearchValue.selectedPage = info.next - 1;
			}else if(info.prev){
				tempPropsOfTileBoard_SearchValue.selectedPage = info.prev + 1;
			}

			args.data = {
				tempPropsOfTileBoard_SearchValue,
				dataForTilesList: results
			}
		}
		
		return args;
	};
};



const getCharactersAndPrepareAndThrowToDrawer = makeFnWhichReturnUnsubscribe_getItemsAndPrepareAndThrowToDrawer(
	makeArgumentsFor_GetCharacters,
	wUrql.q.GetCharacters,
	makeFnPrepareArgsForFnThrowToDrawerFromGetReq('characters')
);




	
const makeTestReq = async (e_v) => {
	const ofs = makeArgumentsFor_GetCharacters(e_v);


	console.log(
		ofs,
		wUrql.q.GetCharacters(ofs),
		await wUrql.q.GetCharacters(ofs),

	);

	getCharactersAndPrepareAndThrowToDrawer(e_v, U.log);
	
	/* U.log(
		'init',
			new Date().getTime(),
	)
	
	const s = wUrql.q.GetCharacters(ofs).subscribe(res => {
		U.log(
			'subscribe res',
			new Date().getTime(),
			res
		)
	});

//	 U.log(
//		'unsub',
//			new Date().getTime(),
//		s.unsubscribe()
//	) 

	setTimeout(() => {

	U.log(
		'unsub time out',
			new Date().getTime(),
		s.unsubscribe()
	)

		}, 100)

	await U.delay(100);


	U.log(
		'init2',
			new Date().getTime(),
	)
	
	const s1 = wUrql.q.GetCharacters(ofs).subscribe(res => {
		U.log(
			'subscribe res2',
			new Date().getTime(),
			res
		)
	});
	
	U.log(
		'init3',
			new Date().getTime(),
	)
	const s2 = wUrql.q.GetCharacters(ofs).subscribe(res => {
		U.log(
			'subscribe res3',
			new Date().getTime(),
			res
		)
	});

	U.log(
		'end',
			new Date().getTime(),
//		s.unsubscribe()
	) */

/*

U.log(
		'init',
			new Date().getTime(),
	)
	
	const s = wUrql.q.GetCharacters(ofs).subscribe(res => {
		U.log(
			'subscribe res',
			new Date().getTime(),
			res
		)
	});

	setTimeout(() => {

	U.log(
		'unsub time out',
			new Date().getTime(),
		s.unsubscribe()
	)

		}, 1000)

 */



return;




	const args = makeArgumentsFor_GetCharacters(e_v);

	const { unsubscribe } = wUrql.q.GetCharacters(args)
		.subscribe(
		(res: UT.OperationResult) => {
//	special	prepareForDrawer
//	throwPreparedArgsToSearchPageDrawer
		}
	);

	return unsubscribe;








	/*
			const args = makeArgumentsFor_GetCharacters(v);

			const result = await wUrql.q.GetCharacters(args);


	*/
};



	const event_applySearchFilter = CharactersSearch__exit_values => {
		// CharactersSearch__exit_values update | on APPLY event draft handling...
		// push exit_values into window history //path?foo=bar
		// make request with exit_values

		qpcListHolder.setQPCList(CharactersSearch__exit_values);
		
		pushIntoWindowHistory(qpcListHolder.getQPCList(), pathName, pushState);

		makeTestReq(qpcListHolder.getQPCList())

		//draw


		// CHTO ya hochu uvidet'
		/*
		
		// CharactersSearch__exit_values update | on APPLY event draft handling...
		// push exit_values into window history //path?foo=bar
		// make request with exit_values
		
		class.setQPCVals(qpc)

		class.makeReq()

		class.drawRes()

		*/
	};
	
	const ignoreFnExecAfterExitValueTransferOnce = makeFn_ignoreFnExecAfterExitValueTransferOnce(
		(exit_values: QueryParamCompatible_Base[]) => {
			event_applySearchFilter(exit_values)
		}
	);

	const ActionId_ApplyDataFromCharactersSearch = 'ya realno debil ili tekuschee reshenie norm? ya huy znaet, ya prosto borus` za okonchanie proektika etogo...';

	actionExecuterAfterMount.addIdAction(
		ActionId_ApplyDataFromCharactersSearch,
		ignoreFnExecAfterExitValueTransferOnce
	);



	const event_clickPaginationPageButton = (pagination__exit_value: number) => {
		U.log(pagination__exit_value, 'pagination__exit_value');
	
		const pageQPC: QueryParamCompatible_Base = {
			param: URLSearchParams_pageParameterName,
			value: pagination__exit_value.toString()
		};

//		this.#currentQPCList.push(pageQPC);
//
//		pushIntoWindowHistory(this.#currentQPCList, this.#pathName, pushState);

		// result = execRequest(this.#currentQPCList);

		//drawer.draw(result)

	};

	const ActionId_ClickPaginationItemButton = 'clickat\' stranicu mi ne brosim, adin chetire vosem` vosem`';

	actionExecuterAfterMount.addIdAction(
		ActionId_ClickPaginationItemButton,
		event_clickPaginationPageButton
	);















	// PreviousSearchParamsLoader
	class TestObse extends Observer{
		
		onNotification(data: any){
			const urlSP = new URLSearchParams(data.searchParamsData);

			const qpcs = getQPCBaseListFromURLSearchParams(urlSP);



			console.log('ass', data, urlSP, qpcs);



			// for drawing pagination
			const pageParamName = URLSearchParams_pageParameterName;

			const QPCPage = qpcs.find(e => e.param === pageParamName );


			// draw foo=bar in form
			set_CharactersSearch__update_values(qpcs);
			//load/request previous data and draw it...
			// make TileBoard_SearchValue 
			
		}
	}

	lSCEEmitter.attach(new TestObse());

		/*
		#externalSetValue: ((v: TileBoard_SearchValue) => void) | undefined;

		addSelectedPageFromQPCList(v: QueryParamCompatible_Base[]){
			
		}
		setExternalValue(){
			if(!this.#externalSetValue){
				throw new Error('externalSetValue is not defined.');
			}

			this.#externalSetValue(this.build());
		} */



	$: _tiles = tiles;



	$:{
		actionExecuterAfterMount.execById(
			ActionId_ApplyDataFromCharactersSearch,
			[CharactersSearch__exit_values]
		);
	}
	$:{
		actionExecuterAfterMount.execById(
			ActionId_ClickPaginationItemButton,
			[pagination__exit_value]
		);
	}




	TileBoard_SearchUpdateValue = {
		pageCount: 11,
		selectedPage: 5,
		availableItemsTitle: 'testik123',
		availableItemsCount: 228
	};




	onMount(
		() => {
			actionExecuterAfterMount.setReady();
			
			//make req to load init characters

		}
	);



// CHTOOOO U MENYA EST'???
/*

whole pagination thing
	exit value
		pagination number
	update value
		TileBoard_SearchValue
			syuda add page number from
				QuerySearchParam
				user select paginationItem

tile list
	CharacterTile value

CharactersSearch filter|tool-huyul
	init values
		CharactersSearch__update_values/qpc list from location.search
	update value/navigation_values
		qpc list from location.search
			make search request
	exit value
		qpc list
			make search request
			add QuerySearchParam in history
	



*/



	type ArgumentsFor_URLSearchParamsBasedFilterManager = {
		pathName: string;
		requestFn: (v: QueryParamCompatible_Base[]) => Promise<UT.OperationResult>;
		qPCListHolder: QPCListHolder;
		pushStateFn: (path: string, windowHistoryState: Object) => void;
	};
/*
TAK BLYAT'
snachala razlojim vse-taki

*/
	class SearchPageManager extends Observer{
		#pathName: string;
		#requestFn: (v: QueryParamCompatible_Base[]) => Promise<UT.OperationResult>;
		#QPCListHolder: QPCListHolder;
		#pushStateFn: (p: string, whs: Object) => void;


		constructor(
		{
			pathName,
			requestFn,
			qPCListHolder = new QPCListHolder(),
			pushStateFn,

		} : ArgumentsFor_URLSearchParamsBasedFilterManager
		){
			super();

			this.#requestFn = requestFn;
			this.#pathName = pathName;
			this.#QPCListHolder = qPCListHolder;
			this.#pushStateFn = pushStateFn;
		}


		onNotification(data: WindowLocationData){
			
		}

		setPageInQPCList(pagination__exit_value: number){
			const qpcList = this.#QPCListHolder.getQPCList();

			const foundIndex = qpcList.findIndex(e => e.param === URLSearchParams_pageParameterName);
			if(foundIndex >= 0){
				qpcList.splice(foundIndex, 1);
			}

			const pageQPC: QueryParamCompatible_Base = {
				param: URLSearchParams_pageParameterName,
				value: pagination__exit_value.toString()
			};

			qpcList.push(pageQPC);

			this.#QPCListHolder.setQPCList(qpcList);
		}

		async selectPage(pagination__exit_value: number){
			this.setPageInQPCList(pagination__exit_value);
			
			pushIntoWindowHistory(this.#QPCListHolder.getQPCList(), this.#pathName, this.#pushStateFn);

			// jelatel'no chtobi otmenyaem bil zapros...
			const result = await this.#requestFn(this.#QPCListHolder.getQPCList());
			// UPD da, unsub kidaet
			

			//drawer.draw(result)
		}
		
		async applyCustomForm(exit_values: QueryParamCompatible_Base[]){
			this.#QPCListHolder.setQPCList(exit_values);

			pushIntoWindowHistory(this.#QPCListHolder.getQPCList(), this.#pathName, this.#pushStateFn);

			const result = await this.#requestFn(this.#QPCListHolder.getQPCList());

			//drawer.draw(result)
		}


	}







</script>




<svelte:head>
	<title>{ pageTitle } • { APP_NAME }</title>
	<meta name="description" content="{ APP_NAME } { pageTitle }" />
</svelte:head>


<SearchItemNav {pathName}>
	<CharactersSearch
		bind:exit_values = {
			CharactersSearch__exit_values
		}
		init_cachedValues = {
			CharactersSearch__update_values
		}
		bind:update_values = {
			CharactersSearch__update_values
		}
	/>
</SearchItemNav>


{#if _tiles === 'ERR'}
	<TileBoard>
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	</TileBoard>
{:else if _tiles === 'LOADING'}
	<TileBoard>
		<p>Loading...</p>
	</TileBoard>
{:else if _tiles === 'NOT FOUND'}
	<TileBoard>
		<p>Nothing found.</p>
	</TileBoard>
{:else if Array.isArray(_tiles)}
	<TileBoard_Search
		bind:update_value={
			TileBoard_SearchUpdateValue
		}
		bind:pagination__exit_value={
			pagination__exit_value
		}
	>
	<!--{#each _tiles as tile }
		<CharacterTile data={tile.data} />
	{/each}-->
	</TileBoard_Search>
{/if}
