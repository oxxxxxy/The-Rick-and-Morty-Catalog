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




	export let data;


	const pageTitle = capitalizeWord(API_CHARACTERS__PATH.name);
	const	pathName = data.psl.route.id.slice(1);


	let CharactersSearch__navigation_values: QueryParamCompatible_Base[] = getQPCBaseListFromURL(new URL(data.psl.url));
	let CharactersSearch__exit_values: QueryParamCompatible_Base[] = [];



//dev
//okay

	

	const lSCEEmitter = new LocationSearchChangeEventEmitter(
		{
			pathname: '/' + pathName,
		}
	);
	wLocationChangeEventEmitter.attach(lSCEEmitter);




	const pushExit_valuesIntoWindowHistory = (exit_values: QueryParamCompatible_Base[], pathName: string, pushState: (p: string, whs: Object) => unknown) => {
		let path = pathName;

		if(exit_values.length){
			const urlSP = getURLSPSFromQPCBaseList(exit_values);
			
			path = path + '?' + urlSP;
		}

		pushState(path, window.history.state);
	}

//okay


	const ignoreExitValueTransferOnceCrutch = new U.IgnoreFewTimesCrutch(1);

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
	};


	import { Observer } from '@tsL/patterns';

	const actionExecuterAfterMount = new U.ActionExecuterAfterCondition();



	
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

	const formExitValuesEmitted = obj => {
		const {
			CharactersSearch__exit_values
		} = obj;

		pushExit_valuesIntoWindowHistory(CharactersSearch__exit_values, pathName, wrappedSveltePushStateBczThereIsErrorWhenLoaded);

		makeTestReq(CharactersSearch__exit_values)
	};

	actionExecuterAfterMount.addIdAction('testdev', formExitValuesEmitted);

	class PageSearchDraftName{


		setExitValues(e_v: QueryParamCompatible_Base[]){

		}

		apply(){

		}
	}




	let tiles: GT.CharacterPreviewFieldsFragment[] | ERR = [];

	$: _tiles = tiles;
	$:{


		console.log(
			'page.svelte',

			//data,
			
			CharactersSearch__exit_values,
		);
			U.log('asdf34')
		actionExecuterAfterMount.execById('testdev', [{CharactersSearch__exit_values}]);

		// CharactersSearch__exit_values update | on APPLY event
		// push exit_values into window history //path?foo=bar
		// make request with exit_values
		
	}


	// PreviousSearchParamsLoader
	class TestObse extends Observer{
		
		onNotification(data: any){
			const urlSP = new URLSearchParams(data.searchParamsData);

			const qpcs = getQPCBaseListFromURLSearchParams(urlSP);

			console.log('ass', data, urlSP, qpcs);

			// draw foo=bar in form
			CharactersSearch__navigation_values = qpcs;

			//load/request previous data and draw it...
			
		}
	}

	lSCEEmitter.attach(new TestObse());

	import type { WT } from '@tsC/api-graphql-to-ex';



// SpecialPathnameLocationSearchChangeEventEmitter
//   filter for pathname, return window.location
//
// Class oberver for SpecialPathnameLocationSearchChangeEventEmitter
//   to filter the same values ?foo=bar
//   return window.location if unique
//
// Thing to check is value from applying form or returned by browsing history
//  if from form
//    do nothing
//  else 
//    make Loading

// apply thing
//   if event data from form
//     pushState??? when???
//     make loading
//
// 


	onMount(
		() => {
			actionExecuterAfterMount.setReady();



		///	const chars = await wUrql.q.GetCharacters();

			///U.log(chars);
		}
	);
U.log(
			CharactersSearch__exit_values,
			CharactersSearch__navigation_values
			
		)
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
<TileBoard>
	{#if _tiles === 'ERR'}
		<p>Network Error. Try later or kill yourself. Thank you.</p>
	{:else if _tiles.length}
		<p>RESULTS</p>
		<p>tiles</p>

		{#each _tiles as tile }
			<CharacterTile data={tile.data} />
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</TileBoard>
