<script lang="ts">
	import type { 
		PaginationBoardValue,
		PaginationItem
	} from '@tsLF/pages';

	import type { TileBoard_SearchValue } from '@tsCF/pages';


	import PaginationBoard from './pagination/PaginationBoard.svelte';




	export let update_value: TileBoard_SearchValue;
	export let exit_value: PaginationItem | undefined;


	if(!update_value){
		throw new Error('update_value is required.');
	}


	let PaginationBoard__entry_value: PaginationBoardValue;


	$:{
		PaginationBoard__entry_value = {
			pageCount : update_value.pageCount,
			selectedPage: update_value.selectedPage,
			buttonViewingLimit: 7
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
			exit_value
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
