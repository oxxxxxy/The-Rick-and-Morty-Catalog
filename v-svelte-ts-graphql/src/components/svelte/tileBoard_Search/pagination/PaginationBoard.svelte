<script lang="ts">
	import type { 
		QPC_IndexedSelectOption,
		QPC_SelectOption
	} from '@tsLF/forURLSP';

	import type { PositiveInteger } from '@tsL/types';


	type PaginationItem = {
		selected?: boolean;
		value: PositiveInteger<number>;
	}


//	export let data
	export let exit_value: PaginationItem | undefined;

	const testPages: PaginationItem[] = [
		{
			selected: true,
			value: 1
		},
		{
			value: 2
		},
		{
			value: 3
		},
		{
			value: 4
		}

	];




	let pages: PaginationItem[] = [...testPages
	];

	$: _pages = pages;

</script>





<div
	class="
		d-flex
		pagination
	"
>
	{#each _pages as page }
		{#if page.selected}
			<a
				class="
					pagination-item
					pagination-item-selected
				"
			>
				{page.value}
			</a>
		{:else}
			<a
				class="
					pagination-item
				"
				on:click={() => pagination.select(page)}
			>
				{page.value}
			</a>
		{/if}
  {/each}
</div>
