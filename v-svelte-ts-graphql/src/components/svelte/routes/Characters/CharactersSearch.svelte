<script lang="ts">


	import {
		API_CHARACTERS__PARAM__STATUS,
		API_CHARACTERS__PARAM__GENDER
	} from '@tsCF/data';


	import InputText from '$comps/svelte/customForm/InputText.svelte';
	import SelectMenu from '$comps/svelte/customForm/SelectMenu.svelte';




	let genderSelected;
	let statusSelected;


	$:{
		console.log(genderSelected, statusSelected);
	}
 
</script>

<div class="margin-10 w-100 d-flex jc-center">
  <div
    class="search--width d-flex jc-space-between fd-column"
    title="characters"
  >

		<InputText />
		<InputText />
		<InputText />

    <div class="filter-select-box d-flex jc-center ai-center">

			<SelectMenu 
				CFIDC_Selection = {API_CHARACTERS__PARAM__STATUS}
				bind:selected={statusSelected}
			/>

      <div
        class="show-if-desktop-size"
        style="margin-left: 5px; height: 100%"
      ></div>

			<SelectMenu 
				CFIDC_Selection = {API_CHARACTERS__PARAM__GENDER}
				bind:selected={genderSelected}
			/>

    </div>

    <button
      class="filter-button color--b6b6b6 bg-color--181a1b tt-uppercase button--has-some"
    >
      Apply
    </button>
  </div>
</div>
