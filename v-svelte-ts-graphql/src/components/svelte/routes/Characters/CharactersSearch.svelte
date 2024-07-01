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
				QPC_ListOfValues[inc()]
			}

			init_instanceOfInputText= {
				test_init_instanceOfInputText
			}
			
		/>

		<InputText
			bind:exit_value = {
				QPC_ListOfValues[inc()]
			}
			init_CFIDC_InputText = {
				API_EPISODES__PARAM__EPISODE
			}
		/>
		<InputText
			bind:exit_value = {
				QPC_ListOfValues[2]
			}
			init_CFIDC_InputText = {
				API_CHARACTERS__PARAM__SPECIES
			}
		/>
		<InputText
			bind:exit_value = {
				QPC_ListOfValues[3]
			}

			init_CFIDC_InputText = {
				API_CHARACTERS__PARAM__TYPE 
			}
			init_cachedValue = {
				undefined
			}
		/>

    <div class="filter-select-box d-flex jc-center ai-center">

			<SelectMenu 
				init_CFIDC_Selection = {
					API_CHARACTERS__PARAM__STATUS
				}
				bind:exit_value={
					statusSelected
				}
			/>

      <div
        class="show-if-desktop-size"
        style="margin-left: 5px; height: 100%"
      ></div>

			<SelectMenu 
				init_CFIDC_Selection = {
					API_CHARACTERS__PARAM__GENDER
				}

				bind:exit_value={
					genderSelected
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
