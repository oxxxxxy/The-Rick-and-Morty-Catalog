<script lang="ts">

	import type { GT } from '@tsC/api-graphql-to-ex';


	import CharacterTile from '$comps/svelte/tileBoard/tiles/CharacterTile.svelte';




	export let data: GT.EpisodeFieldsFragment;

</script>




<div
	class="
		bg-color--181a1b
		d-flex
		big-tile-box
	"
	style="
		height: 250px;
	"
> 
	<div
		class="
			big-tile-info-box
			d-flex
			fd-column
		"
		style="
			margin: 0 15px 5px 15px;
		"
	>
    <span
			class="
				big-tile-h
				tile-line
			"
    >
				Episode card
    </span>
		<span
			class="
				tile-line
			"
			style="
				border-bottom: solid 3px var(--colorPalette-b6b6b6);
				width: 100%;
			"
		></span>
    <span
			class="
				tile-line
				font-weight--normal
			"
    >
			Name:
	    <span
				class="
					color--f5f5f5
				"
	    >
				{ data.name }
	    </span>
    </span>

    <span 
			class="
				tile-line
				font-weight--normal
			"
		>
			Air date:
	    <span 
				class="
					color--f5f5f5
				"
			>
				{ data.air_date }
			</span>
    </span>

    <span 
			class="
				tile-line
				font-weight--normal
			"
		>
			Notation:
	    <span 
				class="
					color--f5f5f5
				"
			>
				{ data.episode }
			</span>
    </span>


    <span 
			class="
				tile-line
				font-weight--normal
			"
		>
			Count of characters who have been seen in the episode:
	    <span 
				class="
					color--f5f5f5
				"
			>
				{ data.characters.length }
			</span>
    </span>


	</div>
</div>
<div
	class="
		big-result-board
		w-100
	"
	style="
		margin-top: 10px;
		background-color: var(--colorPalette-181a1b);
	" 
>

	<div
		class="
			d-flex
			w-100
			jc-center
			bg-color--181a1b
		"
		style="
			margin-bottom: 10px;
		"
	>
		List of characters who have been seen in the episode.
	</div>

	{#each data.characters as char }
		<CharacterTile data={char} />
	{/each}

</div>
