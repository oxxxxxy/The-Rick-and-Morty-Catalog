<script lang="ts">
	import type { 
		PaginationBoardValue,
		PaginationItem
	} from '@tsLF/pages';
	
	import PaginationBoard from './pagination/PaginationBoard.svelte';


	export let PaginationBoard__entry_value: PaginationBoardValue;
	export let PaginationBoard__exit_value: PaginationItem | undefined;

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
		available characters : 1488
		<br>
		page count : 34
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
