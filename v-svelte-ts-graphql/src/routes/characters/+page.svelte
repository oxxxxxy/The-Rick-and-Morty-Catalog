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
	import type { 
		WindowLocationData,
		LocationSearchChangeEventData
	} from '@tsLF/wLocationChangeEvent';

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
	let tiles: GT.CharacterPreviewFieldsFragment[] | NonTilesResultsForDrawingSearchPageTileBoard = 'LOADING';


	const set_CharactersSearch__update_values = (v: QueryParamCompatible_Base[]) => (CharactersSearch__update_values = v);
	const set_TileBoard_SearchValue = (v: TileBoard_SearchValue) => (TileBoard_SearchUpdateValue = v);
	const set_tiles = (v: Object[] | NonTilesResultsForDrawingSearchPageTileBoard) => (tiles = v);





//init assembling

	type NonTilesResultsForDrawingSearchPageTileBoard = 'ERR' | 'NOT FOUND' | 'LOADING';

	class QPCListHolder{
		#qpcList: QueryParamCompatible_Base[] = [];
		
		setQPCList(v: QueryParamCompatible_Base[]){
			this.#qpcList = v;
		}

		getQPCList(): QueryParamCompatible_Base[]{
			return structuredClone(this.#qpcList);
		}
	}
	
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
	


	type ArgumentsFor_SearchPageDrawer = {
		pathName: string;
		setExternalTiles: (v: Object[] | NonTilesResultsForDrawingSearchPageTileBoard) => void;
		setExternalTileBoard_SearchValue: (v: TileBoard_SearchValue) => void;
		setExternalCharactersSearch__update_values: (v: QueryParamCompatible_Base[]) => void;
	};

	type TempPropsOfTileBoard_SearchValue = TileBoard_SearchValue & {
		availableItemsTitle: undefined
	};

	type ArgumentsFor_SearchPageDrawer_drawDataFromReq = {
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
		#setExternalCharactersSearch__update_values: (v: QueryParamCompatible_Base[]) => void;


		constructor(
			{
				pathName,
				setExternalTiles,
				setExternalTileBoard_SearchValue,
				setExternalCharactersSearch__update_values
			} : ArgumentsFor_SearchPageDrawer
		){
			
			this.#tileBoard_SearchValueBuilder = new TileBoard_SearchValueBuilder(
				{
					availableItemsTitle: pathName
				}
			);

			this.#setExternalTiles = setExternalTiles;
			this.#setExternalTileBoard_SearchValue = setExternalTileBoard_SearchValue;
			this.#setExternalCharactersSearch__update_values = 	setExternalCharactersSearch__update_values;
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

		drawCustomForm(v: QueryParamCompatible_Base[]){
			this.#setExternalCharactersSearch__update_values(v);
		}


		#svelteCrutch_drawDataFromReq_lastTimeout: undefined | typeof setTimeout; // nu a cho delat'? umniy dohuya? podskaji togda pojalusta mne durachku T_T pomogite...

		drawDataFromReq(v: ArgumentsFor_SearchPageDrawer_drawDataFromReq){
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

			const T = this;

			T.#svelteCrutch_drawDataFromReq_lastTimeout = setTimeout(
				() => {
					T.#setExternalTileBoard_SearchValue(tileBoard_SearchValue);

					T.#setExternalTiles(dataForTilesList);
				}			
			);
		}
	}




	const makeFnForSearchPageManagerWhichReturnUnsubscribe_getItemsAndPrepareAndThrowToDrawer = (
			makeArgumentsFor_GetItems: (v: QueryParamCompatible_Base[]) => Object,
			wUrql_q_GetItems: (v: Object) => UT.OperationResultSource<UT.OperationResult>,
			prepareArgsForFnThrowToDrawerFromGetReq: (v: UT.OperationResult) => ArgumentsFor_SearchPageDrawer_drawDataFromReq
		): ArgumentsFor_SearchPageManager_requestFn => {
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
	
	
	
	const makeFnPrepareArgsForFnThrowToDrawerFromGetReq = (thatPropName: string): ((v: UT.OperationResult) => ArgumentsFor_SearchPageDrawer_drawDataFromReq) => {
		return (v: UT.OperationResult): ArgumentsFor_SearchPageDrawer_drawDataFromReq => {
			const { data, error } = v;
			
			const args: ArgumentsFor_SearchPageDrawer_drawDataFromReq = {
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
	
	
	




	type ArgumentsFor_SearchPageManager_requestFn = (
		v: QueryParamCompatible_Base[],
		SearchPageDrawer_drawDataFromReq: (v: ArgumentsFor_SearchPageDrawer_drawDataFromReq) => void
	) => () => void;

	type ArgumentsFor_URLSearchParamsBasedFilterManager = {
		pathName: string;
		requestFn: ArgumentsFor_SearchPageManager_requestFn;
		pushStateFn: (path: string, windowHistoryState: Object) => void;
		searchPageDrawer: SearchPageDrawer;
	};

	class SearchPageManager extends Observer{
		#pathName: string;
		#requestFn: ArgumentsFor_SearchPageManager_requestFn;
		#QPCListHolder: QPCListHolder;
		#pushStateFn: (p: string, whs: Object) => void;
		#unsubscribe: undefined | (() => void);
		#searchPageDrawer: SearchPageDrawer;
		#inited: undefined | true;


		constructor(
		{
			pathName,
			requestFn,
			pushStateFn,
			searchPageDrawer
		} : ArgumentsFor_URLSearchParamsBasedFilterManager
		){
			super();

			this.#requestFn = requestFn;
			this.#pathName = pathName;
			this.#pushStateFn = pushStateFn;
			this.#searchPageDrawer = searchPageDrawer;
			
			this.#QPCListHolder = new QPCListHolder();
		}
		
		#prepareNewRequest(){
			if(this.#unsubscribe){
				this.#unsubscribe();
			}

			this.#searchPageDrawer.drawLoading();
		}

		#finishNewRequest(){
			const T = this;
			this.#unsubscribe = this.#requestFn(
				this.#QPCListHolder.getQPCList(),
				(v) => T.#searchPageDrawer.drawDataFromReq(v)
			);
		}


		onNotification(data: LocationSearchChangeEventData){
			this.#loadFromHistoryLocationSearch(data);
		}

		#loadFromHistoryLocationSearch(data: LocationSearchChangeEventData){
			this.#prepareNewRequest();

			const urlSP = new URLSearchParams(data.searchParamsData);

			const qpcList = getQPCBaseListFromURLSearchParams(urlSP);
			
			this.#QPCListHolder.setQPCList(qpcList);
			
			this.#searchPageDrawer.drawCustomForm(this.#QPCListHolder.getQPCList());

			this.#finishNewRequest();
		}

		selectPage(pagination__exit_value: number){
			this.#prepareNewRequest();

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
			
			pushIntoWindowHistory(this.#QPCListHolder.getQPCList(), this.#pathName, this.#pushStateFn);

			this.#finishNewRequest();
		}
		
		applyCustomForm(exit_values: QueryParamCompatible_Base[]){
			this.#prepareNewRequest();

			this.#QPCListHolder.setQPCList(exit_values);

			pushIntoWindowHistory(this.#QPCListHolder.getQPCList(), this.#pathName, this.#pushStateFn);

			this.#finishNewRequest();
		}

		init(v: QueryParamCompatible_Base[]){
			if(this.#inited){
				return;
			}

			this.#inited = true;


			this.#QPCListHolder.setQPCList(v);
			
			this.#finishNewRequest();
		}
	}





	const _SearchPageDrawer = new SearchPageDrawer(
		{
			pathName,
			setExternalTiles: set_tiles,
			setExternalTileBoard_SearchValue: set_TileBoard_SearchValue,
			setExternalCharactersSearch__update_values: set_CharactersSearch__update_values
		}
	);

	const _SearchPageManager = new SearchPageManager(
		{
			pathName,
			requestFn: makeFnForSearchPageManagerWhichReturnUnsubscribe_getItemsAndPrepareAndThrowToDrawer(
					makeArgumentsFor_GetCharacters,
					wUrql.q.GetCharacters,
					makeFnPrepareArgsForFnThrowToDrawerFromGetReq('characters')
				),
			pushStateFn: pushState,
			searchPageDrawer: _SearchPageDrawer
		}
	);

	const lSCEEmitter = new LocationSearchChangeEventEmitter(
		{
			pathname: '/' + pathName,
		}
	);
	lSCEEmitter.attach(_SearchPageManager);



	const actionExecuterAfterMount = new U.ActionExecuterAfterCondition();

// pereezjaet v funkcii
	const ActionId_ApplyDataFromCharactersSearch = 'ya realno debil ili tekuschee reshenie norm? ya huy znaet, ya prosto borus` za okonchanie proektika etogo...';

	actionExecuterAfterMount.addIdAction(
		ActionId_ApplyDataFromCharactersSearch,
		makeFn_ignoreFnExecAfterExitValueTransferOnce(
			(CharactersSearch__exit_values: QueryParamCompatible_Base[]) => {
				_SearchPageManager.applyCustomForm(CharactersSearch__exit_values)
			}
		)
	);


	const ActionId_ClickPaginationItemButton = 'clickat\' stranicu mi ne brosim, adin chetire vosem` vosem`';

	actionExecuterAfterMount.addIdAction(
		ActionId_ClickPaginationItemButton,
		(pagination__exit_value: number) => _SearchPageManager.selectPage(pagination__exit_value)
	);




	wLocationChangeEventEmitter.attach(lSCEEmitter);



	$:{
		tiles = tiles;
	}
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

	onMount(
		() => {
			actionExecuterAfterMount.setReady();
			
			_SearchPageManager.init(CharactersSearch__update_values);
		}
	);

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


{#if tiles === 'ERR'}
	<TileBoard>
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	</TileBoard>
{:else if tiles === 'LOADING'}
	<TileBoard>
		<p>Loading...</p>
	</TileBoard>
{:else if tiles === 'NOT FOUND'}
	<TileBoard>
		<p>Nothing found.</p>
	</TileBoard>
{:else if Array.isArray(tiles)}
	<TileBoard_Search
		bind:update_value={
			TileBoard_SearchUpdateValue
		}
		bind:pagination__exit_value={
			pagination__exit_value
		}
	>
	{#each tiles as tile }
		<CharacterTile data={tile} />
	{/each}
	</TileBoard_Search>
{/if}
