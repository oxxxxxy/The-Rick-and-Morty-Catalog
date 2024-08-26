<script lang="ts">
	import type {
		PaginationBoardValue,
		PaginationItem,
	} from '@tsLF/pages';
	import { PaginationBoard } from '@tsLF/pages';




	export let exit_value: PaginationItem | undefined;
	export let entry_value: PaginationBoardValue;


	if(!entry_value){
		throw new Error('PaginationBoardValue is required.');
	}

	
	let pages: PaginationItem[] = [];

	
	const setSelected = (v: PaginationItem) => (exit_value = v);
	const setPages = (v: PaginationItem[]) => (pages = v);


	const paginationBoard = new PaginationBoard(
		{
			paginationBoardValue: entry_value,
			externalSetSelected: setSelected,
			externalSetPages: setPages,
		}
	);
	

	$: _pages = pages;

</script>





<div
	class="
		d-flex
		pagination
	"
>
	{#each _pages as page (page.pageNum) }
		{#if page.selected}
			<a
				class="
					pagination-item
					pagination-item-selected
				"
			>
				{page.pageNum}
			</a>
		{:else}
			<a
				class="
					pagination-item
				"
				on:click={() => paginationBoard.select(page)}
			>
				{page.pageNum}
			</a>
		{/if}
  {/each}
</div>
