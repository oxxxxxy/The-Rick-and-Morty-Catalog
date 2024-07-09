<script lang="ts">
	import {
		API_CHARACTERS__PARAM__STATUS,
		API_CHARACTERS__PARAM__GENDER,
		API_CHARACTERS__PARAM__NAME,
		API_CHARACTERS__PARAM__SPECIES,
		API_CHARACTERS__PARAM__TYPE
	} from '@tsCF/data';

	import type { QueryParamCompatible_Base } from '@tsLF/forURLSP';
	import type { CustomFormInitDataCompatible_Base } from '@tsLF/pages';


	import InputText from '$comps/svelte/customForm/InputText.svelte';
	import SelectMenu from '$comps/svelte/customForm/SelectMenu.svelte';




//dev
let am= '';
let it1 = [am];
const QPC_ListOfValues: QPC_List = [];

let i = 0;

const inc = () => i++;

import { API_EPISODES__PARAM__EPISODE } from '@tsCF/data'

//const makeQPC_ListStore;

type InitCachedValues = {
	readonly [key: string]: QueryParamCompatible_Base
}

class CustomForm{
	private initCachedValues: InitCachedValues = {};
	
	init_cachedValue(CFIDC: CustomFormInitDataCompatible_Base){
		return structuredClone(this.inited[JSON.stringify(CustomFormInitDataCompatible_Base)]);
	}
}

import { CFIDCTypeBasedStrategyFn_All } from '@tsLF/pages';


const test_init_instanceOfInputText_class =  CFIDCTypeBasedStrategyFn_All(API_EPISODES__PARAM__EPISODE);
const asdf = {param: 'episode', value:'ass'};
const test_init_instanceOfInputText = new test_init_instanceOfInputText_class({
	cachedValue:  asdf
	,initData:	API_EPISODES__PARAM__EPISODE
})

const test_init_instanceOfSelectMenu_class = CFIDCTypeBasedStrategyFn_All(API_CHARACTERS__PARAM__GENDER);
const test_init_instanceOfSelectMenu = new test_init_instanceOfSelectMenu_class({
		initData: API_CHARACTERS__PARAM__GENDER,
	})


	import { CustomFormHolder } from '@tsLF/pages';

	const qpcBaseList: QueryParamCompatible_Base[] = [
		{
			param: 'gender',
			value: 'male'
		},

		{
			param: 'gender',
			value: 'female'
		},
		{
			param: 'gender',
			value: '333male'
		},


		{
			param: 'type',
			value: 'Parasit'
		},

		{
			param: 'invalidType',
			value: 'Parasit'
		},
		{
			param: 'type',
			value: '11Parasit'
		},


		{
			param: 'species',
			value: 'ParasitSPe'
		},


		{
			param: 'episode',
			value: 'lol invalid'
		},
		{
			param: 'episode',
			value: 'S01'
		},

	];

	const CFIDCList = [
		API_EPISODES__PARAM__EPISODE,
		API_CHARACTERS__PARAM__STATUS,
		API_CHARACTERS__PARAM__GENDER,
		API_CHARACTERS__PARAM__NAME,
		API_CHARACTERS__PARAM__SPECIES,
		API_CHARACTERS__PARAM__TYPE
	];

	const exitValueStore = CustomFormHolder.makeInitExitValueStore(CFIDCList);

	const customFormHolder = new CustomFormHolder(
		{
			CFIDCList: CFIDCList,
			cachedQPCValues: qpcBaseList
		}
	);

//	customFormHolder.exitValueStore = CustomFormHolder.makeInitExitValueStore(CFIDCList);


console.log('CustomFormHolder', customFormHolder)

//dev

	export let init_cachedValues: QueryParamCompatible_Base[];
	export let exit_values: QueryParamCompatible_Base[];


	let isValid: boolean = true;


	const set_values = (v: QueryParamCompatible_Base[]) => (exit_values = v);
	const set_isValid = (v: boolean) => (isValid = v);
	
	let genderSelected;
	let statusSelected;


	$: _isValid = isValid;
	$:{
		console.log(
		'CharactersSearch.svelte',
		genderSelected, statusSelected,
		it1, am, QPC_ListOfValues

		,exitValueStore
		,customFormHolder
		
		);
	}
 
</script>

<div class="margin-10 w-100 d-flex jc-center">
  <div
    class="search--width d-flex jc-space-between fd-column"
    title="characters"
  >

		<InputText
			bind:exit_value = {
				exitValueStore[
					API_EPISODES__PARAM__EPISODE
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_EPISODES__PARAM__EPISODE
				)
			}
		/>
test

		<InputText
			bind:exit_value = {
				exitValueStore[
					API_CHARACTERS__PARAM__NAME
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_CHARACTERS__PARAM__NAME
				)
			}
		/>
		<InputText
			bind:exit_value = {
				exitValueStore[
					API_CHARACTERS__PARAM__SPECIES
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_CHARACTERS__PARAM__SPECIES
				)
			}
		/>
		<InputText
			bind:exit_value = {
				exitValueStore[
					API_CHARACTERS__PARAM__TYPE
					.name
				]
			}
			init_instanceOfInputText = {
				customFormHolder.getInstanceOfCFItemFor(
					API_CHARACTERS__PARAM__TYPE
				)
			}
		/>

    <div class="filter-select-box d-flex jc-center ai-center">

			<SelectMenu 
				bind:exit_value = {
					exitValueStore[
						API_CHARACTERS__PARAM__STATUS
						.name
					]
				}
				init_instanceOfSelectMenu = {
					customFormHolder.getInstanceOfCFItemFor(
						API_CHARACTERS__PARAM__STATUS
					)
				}
			/>

      <div
        class="show-if-desktop-size"
        style="margin-left: 5px; height: 100%"
      ></div>

			<SelectMenu 
				bind:exit_value = {
					exitValueStore[
						API_CHARACTERS__PARAM__GENDER
						.name
					]
				}
				init_instanceOfSelectMenu = {
					customFormHolder.getInstanceOfCFItemFor(
						API_CHARACTERS__PARAM__GENDER
					)
				}
			/>

    </div>

    <button
      class="
				filter-button color--b6b6b6 bg-color--181a1b tt-uppercase 
				{ _isValid ? 'button--has-some': 'button--empty'}
			"
		  disabled="{!_isValid}"
    >
      Apply
    </button>
  </div>
</div>
