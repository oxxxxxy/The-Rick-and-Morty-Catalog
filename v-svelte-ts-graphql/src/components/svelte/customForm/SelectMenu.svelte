<script lang="ts">
	import { onMount } from 'svelte';


	import type { PositiveInteger } from '@tsL/types';
	
	import type { QPC_IndexedSelectOption } from '@tsLF/forURLSP';
	
	import type { CFIDC_Selection	} from '@tsLF/pages/src/customForm/types';
	import type { ConstructorArguments_SelectMenu } from '@tsLF/pages/src/customForm/SelectMenu.ts'
	import { SelectMenu } from '@tsLF/pages/src/customForm/SelectMenu.ts'


	import g from '$comps/context';
	const contextedMouseEventObservable = g().cntxtedMouseEventObservable;
	

	import SelectMenuIcon from '$comps/svelte/customForm/icons/SelectMenuIcon.svelte';




	export let exit_value: QPC_IndexedSelectOption;
	export let init_options: QPC_IndexedSelectOption[];
	export let init_selectMenuInstance: SelectMenu;
	export let init_CFIDC_Selection: CFIDC_Selection;
	export let init_selected: QPC_IndexedSelectOption | string | PositiveInteger<number> | 0;
	

	let active: boolean = false;


	const set_active = (act: boolean) => (active = act);
	const set_options = (ops: QPC_IndexedSelectOption[]) => (init_options = ops);
	const set_selected = (sel: QPC_IndexedSelectOption) => (exit_value = sel);


	if(!init_selectMenuInstance){
		let args: ConstructorArguments_SelectMenu;

		if(init_options){
			args = {
				readyOptions: init_options
			};
		}else if(init_CFIDC_Selection){
			args = {
				CFIDC_Selection: init_CFIDC_Selection
			};
		}else{
			throw new Error('SelectMenu must have init_CFIDC_Selection data value or ready QPC_IndexedSelectOption array as argument.');
		}

		if(init_selected){
			args.setSelected = init_selected;
		}
	
		args.doUNeedDefaultNonValue = true;

		init_selectMenuInstance = new SelectMenu(args);

		init_selectMenuInstance.setBridgeToExternalScope({
			set_active,
			set_selected,
			set_options
		});
	}


	$: _active = active;
	$: _options = init_options;

	
	onMount(() => {
		contextedMouseEventObservable.attachListener('click', init_selectMenuInstance);
	});

</script>


<div
  class="
		select-list-box
		select-list-box--statusGender
	"
  style:overflow="{ _active ? 'visible' : 'hidden' }"
	on:click={(e) => init_selectMenuInstance.click(e)}
	id="{init_selectMenuInstance.HTMLElement_globalAttribute_id}"
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
					title={option.name}
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
					on:click={() => init_selectMenuInstance.select(option)}
					title={option.name}
				>
					{option.name}
				</span>
			{/if}
    {/each}
  </div>
  <div class="d-flex ai-center jc-center color--282828 select-list-icon"
  >
		<SelectMenuIcon />
  </div>
</div>
