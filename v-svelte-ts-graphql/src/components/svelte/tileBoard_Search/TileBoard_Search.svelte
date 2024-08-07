<script lang="ts">
	
	import PaginationBoard from './pagination/PaginationBoard.svelte';

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

	<PaginationBoard 
		
	/>

	<div
		class="
			result-board
		"
	>
		<slot />
	</div>
</div>
