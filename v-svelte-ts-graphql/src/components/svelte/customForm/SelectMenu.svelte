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

	const makeIndexedSelectOptionsFromQPCFormSelection = (
		{	
			objWithTypeOptions, 
			doUNeedSetSelected, 
			doUNeedDefaultNonValue
		} : {
			objWithTypeOptions: QueryParamCompatible_Form_Selection,
			doUNeedSetSelected?: PositiveInteger<number> | 0 | string,
			doUNeedDefaultNonValue?: true
		}
	): IndexedSelectOption[] | void => {

		const makeIndexedSelectOption = (
			id: PositiveInteger<number> | 0,
			value: string,
			default_?: true,
		): IndexedSelectOption => {
			const obj: IndexedSelectOption = {
				id,
				value
			};

			if(default_){
				obj.default = default_;
			}

			return obj;
		};


		const resultArr: IndexedSelectOption[] = [];

		if(doUNeedDefaultNonValue){
			const res = makeIndexedSelectOption(
				resultArr.length,
				capitalizeWord(objWithTypeOptions.name),
				true
			);

			resultArr.push(res);
		}

		
		for(const option of objWithTypeOptions.options){
			const res = makeIndexedSelectOption(
				resultArr.length,
				capitalizeWord(option),
			);

			resultArr.push(res);
		}


		if(doUNeedSetSelected){
			if(typeof doUNeedSetSelected === 'number'){
				resultArr[doUNeedSetSelected].selected = true;
			} else if( typeof doUNeedSetSelected === 'string' ){
				const index = resultArr.findIndex( e => e.value.toLowerCase() === doUNeedSetSelected.toLowerCase());

				if(index >= 0){
					resultArr[index].selected = true;
				} else {
					throw new Error(`doUNeedSetSelected string value "${doUNeedSetSelected}" does not exist in options of the "${objWithTypeOptions.name}".');
				}
			}
		}


		if(!resultArr.length){
			throw new Error('resultArr is empty.');
		}


		return resultArr;
	};




	//dev
	const _opts = = makeIndexedSelectOption({
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
