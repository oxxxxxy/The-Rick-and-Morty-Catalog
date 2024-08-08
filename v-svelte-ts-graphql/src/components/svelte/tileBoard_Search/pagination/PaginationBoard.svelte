<script lang="ts">
	import type { 
		QPC_IndexedSelectOption,
		QPC_SelectOption
	} from '@tsLF/forURLSP';

	import type { PositiveInteger } from '@tsL/types';

	import type {
		PaginationInitValue,
		PaginationItem,

	} from '@tsLF/pages';


import { calcPagination } from '@tsL/pagination';

console.log(calcPagination(13, 6, 9, 8))







	export let exit_value: PaginationItem | undefined;
	export let entry_value: PaginationInitValue;


	if(!entry_value){
		throw new Error('PaginationInitValue is required.');
	}

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
