<script lang="ts">
	
	import PaginationBoard from './pagination/PaginationBoard.svelte';


	export let PaginationBoard__entry_value;

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
	/>

	<div
		class="
			result-board
		"
	>
		<slot />
	</div>
</div>
