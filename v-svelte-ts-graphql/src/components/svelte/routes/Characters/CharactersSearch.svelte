<script lang="ts">
	import {
		API_CHARACTERS__PARAM__STATUS,
		API_CHARACTERS__PARAM__GENDER,
		API_CHARACTERS__PARAM__NAME,
		API_CHARACTERS__PARAM__SPECIES,
		API_CHARACTERS__PARAM__TYPE
	} from '@tsCF/data';

	import type { QPC_List } from '@tsLF/forURLSP';


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
//dev


	let genderSelected;
	let statusSelected;


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
      class="filter-button color--b6b6b6 bg-color--181a1b tt-uppercase button--has-some button--empty"
    >
      Apply
    </button>
  </div>
</div>
