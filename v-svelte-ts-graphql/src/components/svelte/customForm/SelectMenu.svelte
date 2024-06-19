<script lang="ts">
	import type { SelectOption } from '@tsLF/types';


	import SelectMenuIcon from '$comps/svelte/customForm/icons/SelectMenuIcon.svelte';




	//dev


	//dev
	export const options: SelectOption[] = [];
	export let selected: SelectOption;
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
  class="select-list-box select-list-box--statusGender"
  style:overflow="{ _active ? 'visible' : 'hidden' }"
	on:click={useSelectMenu}
	role="menu"
>
  <div class="select-list bg-color--282828 d-flex fd-column">
    <span class="select-list-option-border select-list-option selected-select-list-option"> Status</span>
    <span class="select-list-option-border select-list-option"> alive</span>
    <span class="select-list-option-border select-list-option"> dead</span>
    <span class="select-list-option-border select-list-option select-list-option-border-last"> unknown</span>
  </div>
  <div class="d-flex ai-center jc-center color--282828 select-list-icon">
		<SelectMenuIcon />
  </div>
</div>
