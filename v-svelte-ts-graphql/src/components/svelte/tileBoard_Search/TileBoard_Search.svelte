<script lang="ts">
	import type { 
		PaginationBoardValue,
		PaginationItem
	} from '@tsLF/pages';

	import type { TileBoard_SearchValue } from '@tsCF/pages';


	import PaginationBoard from '$comps/svelte/pagination/PaginationBoard.svelte';




	export let update_value: TileBoard_SearchValue;
	export let pagination__exit_value: number | undefined;


	if(!update_value){
		throw new Error('update_value is required.');
	}


	let PaginationBoard__entry_value: PaginationBoardValue;
	let PaginationBoard__exit_value: PaginationItem;


	$:{
		PaginationBoard__entry_value = {
			pageCount : update_value.pageCount,
			selectedPage: update_value.selectedPage,
			buttonViewingLimit: 7
		}
	}
	$:{
		if(PaginationBoard__exit_value){
			pagination__exit_value = PaginationBoard__exit_value.pageNum
		}
	}

</script>




<div
	class="
		main--font-size
		color--b6b6b6
		d-flex
		ai-center
		fd-column
	"	
	style="
		margin-top:25px;
	"
>
	<div
		class="
			tt-uppercase
			d-flex
			w-100
			jc-center
			bg-color--181a1b
		"
		style="
			font-size: 30px;
		"
	>
		results
	</div>

	<div
		class="
			margin-10
			tt-uppercase
		"
	>
		available { update_value.availableItemsTitle } : { update_value.availableItemsCount }
		<br>
		page count : { update_value.pageCount }
	</div>

	<PaginationBoard 
		bind:entry_value={
			PaginationBoard__entry_value
		}
		bind:exit_value={
			PaginationBoard__exit_value
		}
	/>

	<div
		class="
			result-board
		"
	>
		<slot />
	</div>
</div>
