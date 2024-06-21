<script lang="ts">
	import type { IndexedSelectOption } from '@tsLF/types';
	import type {
		QueryParamCompatible_Form_Selection
	} from '@tsLF/types';

	import type { PositiveInteger } from '@tsL/types';
	
	import type { ConstructorArguments_SelectMenu } from '@tsCF/pages/src/customForm/SelectMenu.ts'
	import { SelectMenu } from '@tsCF/pages/src/customForm/SelectMenu.ts'


	import g from '$comps/context';
	const contextedMouseEventObservable = g().cntxtedMouseEventObservable;
	

	import SelectMenuIcon from '$comps/svelte/customForm/icons/SelectMenuIcon.svelte';




	//dev
	import {
		API_CHARACTERS__PARAM__STATUS
	} from '@tsCF/data';
	
	







	export let options: IndexedSelectOption[];
	export let selectMenuInstance: SelectMenu;
	export let QPCFormSelection: QueryParamCompatible_Form_Selection;
	export let selected: IndexedSelectOption | string | PositiveInteger<number> | 0;
	

	let active: boolean = false;


	const set_active = (act: boolean) => (active = act);
	const set_options = (ops: IndexedSelectOption[]) => (options = ops);
	const set_selected = (sel: IndexedSelectOption) => (selected = sel);


	/* //delete
	QPCFormSelection = API_CHARACTERS__PARAM__STATUS;
	//me */
	if(!selectMenuInstance){
		let args: ConstructorArguments_SelectMenu;

		if(options){
			args = {
				readyOptions: options
			};
		}else if(QPCFormSelection){
			args = {
				QPCFormSelection: QPCFormSelection
			};
		}else{
			throw new Error('SelectMenu must have QueryParamCompatible_Form_Selection data value or ready IndexedSelectOption array as argument.');
		}

		if(selected){
			args.setSelected = selected;
		}
	
		args.doUNeedDefaultNonValue = true;

		selectMenuInstance = new SelectMenu(args);

		selectMenuInstance.setBridgeToExternalScope({
			active: set_active,
			selected: set_selected,
			options: set_options
		});
	}


	contextedMouseEventObservable.attachListener('click', selectMenuInstance)


	$: _active = active;
	$: _options = options;

</script>


<div
  class="
		select-list-box
		select-list-box--statusGender
	"
  style:overflow="{ _active ? 'visible' : 'hidden' }"
	on:click={(e) => selectMenuInstance.click(e)}
	id="{selectMenuInstance.HTMLElement_globalAttribute_id}"
>
  <div class="select-list bg-color--282828 d-flex fd-column">
		{#each _options as option, i }
			{#if i === 0}
	   	 <span
					class="
						select-list-option-border
						select-list-option
						{
							i === 0 
							? 'selected-select-list-option'
							: ''
						}
					"
				>
					{option.name}
				</span>
			{:else}
	   	 <span
					class="
						select-list-option-border
						select-list-option
						{
							i === _options.length - 1
							? 'select-list-option-border-last'
							: ''
						}
					"
					on:click={(e) => selectMenuInstance.clickSelect(e, option)}
				>
					{option.name}
				</span>
			{/if}
    {/each}
  </div>
  <div class="d-flex ai-center jc-center color--282828 select-list-icon">
		<SelectMenuIcon />
  </div>
</div>
