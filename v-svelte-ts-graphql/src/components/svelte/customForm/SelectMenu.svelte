<script lang="ts">
	import { onMount } from 'svelte';


	import type { 
		QPC_IndexedSelectOption,
		QPC_SelectOption
	} from '@tsLF/forURLSP';
	
	import type { CFIDC_Selection	} from '@tsLF/pages/src/customForm/types';
	import type { ConstructorArguments_SelectMenu } from '@tsLF/pages';
	import { SelectMenu } from '@tsLF/pages';


	import g from '$comps/context';
	const contextedMouseEventObservable = g().cntxtedMouseEventObservable;
	

	import SelectMenuIcon from '$comps/svelte/customForm/icons/SelectMenuIcon.svelte';




	export let exit_value: QPC_IndexedSelectOption;
	export let init_cachedValue: QPC_SelectOption;
	export let init_CFIDC_Selection: CFIDC_Selection;
	

	let active: boolean = false;
	let options: QPC_IndexedSelectOption[];


	const set_active = (act: boolean) => (active = act);
	const set_options = (ops: QPC_IndexedSelectOption[]) => (options = ops);
	const set_selected = (sel: QPC_IndexedSelectOption) => (exit_value = sel);

	
	if(!init_CFIDC_Selection){
		throw new Error('SelectMenu must have init_CFIDC_Selection data value as argument.');
	}

	const args: ConstructorArguments_SelectMenu = {
		CFIDC_Selection: init_CFIDC_Selection,
		doUNeedDefaultNonValue: true
	};

	if(init_cachedValue){
		args.setSelected = init_cachedValue;
	}

	const selectMenu = new SelectMenu(args);

	selectMenu.setBridgeToExternalScope({
		set_active,
		set_selected,
		set_options
	});


	$: _active = active;
	$: _options = options;

	
	onMount(() => {
		contextedMouseEventObservable.attachListener('click', selectMenu);
	});

</script>


<div
  class="
		select-list-box
		select-list-box--statusGender
	"
  style:overflow="{ _active ? 'visible' : 'hidden' }"
	on:click={(e) => selectMenu.click(e)}
	id="{selectMenu.HTMLElement_globalAttribute_id}"
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
					on:click={() => selectMenu.select(option)}
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
