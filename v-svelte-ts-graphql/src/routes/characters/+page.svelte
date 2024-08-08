<script lang="ts">
	import { onMount } from 'svelte';

	import { pushState } from '$app/navigation';


	import type { GT } from '@tsC/api-graphql-to-ex';

	import { API_CHARACTERS__PATH } from '@tsCF/data';

	import { capitalizeWord } from '@tsLF/pages';
	
	import type { ERR } from '@tsCF/pages/src/tileBoard/tiles/index.ts';
	
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


	let CharactersSearch__navigation_values: QueryParamCompatible_Base[] = getQPCBaseListFromURL(new URL(data.psl.url));
	let CharactersSearch__exit_values: QueryParamCompatible_Base[] = [];



//dev
	import type { WT } from '@tsC/api-graphql-to-ex';

//okay

	

	const lSCEEmitter = new LocationSearchChangeEventEmitter(
		{
			pathname: '/' + pathName,
		}
	);
	wLocationChangeEventEmitter.attach(lSCEEmitter);




	const pushIntoWindowHistory = (values: QueryParamCompatible_Base[], pathName: string, pushState: (p: string, whs: Object) => unknown) => {
		let path = pathName;

		if(values.length){
			const urlSP = getURLSPSFromQPCBaseList(values);
			
			path = path + '?' + urlSP;
		}

		pushState(path, window.history.state);
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
		}
	}
	

	const actionExecuterAfterMount = new U.ActionExecuterAfterCondition();






//okay






	import { Observer } from '@tsL/patterns';





	
const makeTestReq = async (e_v) => {
	const ofs = getParamObjFromQPCBaseList(e_v);

	console.log(
	ofs,
			await wUrql.q.GetCharacters({filter:ofs})
			/*
  page?: InputMaybe<Scalars["Int"]["input"]>;
  filter?: InputMaybe<FilterCharacter>;

export type FilterCharacter = {
  gender?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  species?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;

		*/
			)
};

	const formExitValuesEmitted = CharactersSearch__exit_values => {
		// CharactersSearch__exit_values update | on APPLY event draft handling...
		// push exit_values into window history //path?foo=bar
		// make request with exit_values
		
		//CharactersSearch__exit_values + page num
		pushIntoWindowHistory(CharactersSearch__exit_values, pathName, pushState);

		makeTestReq(CharactersSearch__exit_values)
	};
	
	const ignoreFnExecAfterExitValueTransferOnce = makeFn_ignoreFnExecAfterExitValueTransferOnce(
		(exit_values: QueryParamCompatible_Base[]) => {
			formExitValuesEmitted(exit_values)
		}
	);




	const ActionId_ApplyDataFromCharactersSearch = 'ya realno debil ili tekuschee reshenie norm? ya huy znaet, ya prosto borus` za okonchanie proektika etogo...';

	actionExecuterAfterMount.addIdAction(
		ActionId_ApplyDataFromCharactersSearch,
		ignoreFnExecAfterExitValueTransferOnce
	);




	class PageSearchDraftName{
		#prevExitValues: QueryParamCompatible_Base[] | undefined;
		#exitValues: QueryParamCompatible_Base[] = [];

		setExitValues(exit_values: QueryParamCompatible_Base[]){
			this.#exitValues = exit_values;
		}



		apply(){

		}
	}



	// PreviousSearchParamsLoader
	class TestObse extends Observer{
		
		onNotification(data: any){
			const urlSP = new URLSearchParams(data.searchParamsData);

			const qpcs = getQPCBaseListFromURLSearchParams(urlSP);

			console.log('ass', data, urlSP, qpcs);

			const pageParamName = 'page';

			const QPCPage = qpcs.find(e => e.param === pageParamName );

			// draw foo=bar in form
			CharactersSearch__navigation_values = qpcs;
			//load/request previous data and draw it...
			
		}
	}

	lSCEEmitter.attach(new TestObse());



	let tiles: GT.CharacterPreviewFieldsFragment[] | ERR = [1];

	$: _tiles = tiles;


	$:{
		actionExecuterAfterMount.execById(
			ActionId_ApplyDataFromCharactersSearch,
			[CharactersSearch__exit_values]
		);
	}


	onMount(
		() => {
			actionExecuterAfterMount.setReady();
			
			//make req to load init characters

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
			CharactersSearch__navigation_values
		}
		bind:navigation_values = {
			CharactersSearch__navigation_values
		}
	/>
</SearchItemNav>


<!-- nado chto-to vidumat' t.k. mojet bit' loading, results and error(which may be as ~popup) -->

<TileBoard_Search
	PaginationBoard__entry_value=(11)

/>

<TileBoard>
	{#if _tiles === 'ERR'}
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	{:else if _tiles.length}


<!--		{#each _tiles as tile }
			<CharacterTile data={tile.data} />
		{/each}-->
	{:else}
		<p>Loading...</p>
	{/if}
</TileBoard>
