<script lang="ts">
	import type { IndexedSelectOption } from '@tsLF/types';


	import SelectMenuIcon from '$comps/svelte/customForm/icons/SelectMenuIcon.svelte';




	//dev
	import {
		API_CHARACTERS__PARAM__STATUS
	} from '@tsCF/data';
	
	import type {
		QueryParamCompatible_Form_Selection
	} from '@tsLF/types';
	import type { PositiveInteger } from '@tsL/types';
	
	import { capitalizeWord } from '@tsCF/pages/src/index.ts';

	import { makeIndexedSelectOptionsFromQPCFormSelection } from '@tsCF/pages/src/customForm/SelectMenu.ts'





	//dev
	const _opts = makeIndexedSelectOptionsFromQPCFormSelection({
		objWithTypeOptions: API_CHARACTERS__PARAM__STATUS,
		doUNeedDefaultNonValue: true
	});
	export const options: IndexedSelectOption[] = _opts 


	//export const options: IndexedSelectOption[] = [];
	export let selected: IndexedSelectOption;
	export let active: boolean = false;

	$: _active = active;

	const useSelectMenu = e => {
		e.preventDefault();

		console.log(e);
		if(!active){
			active = true;
		}

	};
</script>


<div
  class="
		select-list-box
		select-list-box--statusGender
	"
  style:overflow="{ _active ? 'visible' : 'hidden' }"
	on:click={useSelectMenu}
>
  <div class="select-list bg-color--282828 d-flex fd-column">
		{#each options as option, i }
			{#if i === 0 }
	   	 <span
					class="
						select-list-option-border
						select-list-option
						selected-select-list-option
					"
				>
					{option.value}
				</span>
	    {:else if i === options.length - 1}
				<span
					class="
						select-list-option-border
						select-list-option
						select-list-option-border-last
					"
				>
					{option.value}
				</span>
			{:else}
				<span 
					class="
						select-list-option-border
						select-list-option
					"
				>
					{option.value}
				</span>
	    {/if}
    {/each}
  </div>
  <div class="d-flex ai-center jc-center color--282828 select-list-icon">
		<SelectMenuIcon />
  </div>
</div>
