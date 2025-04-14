<script lang="ts">

	import type { 
		PaginationBoardValue,
		PaginationItem
	} from '@tsLF/pages';
	import {
		LimitedViewOfItems
	} from '@tsLF/pages';

	import type { GT } from '@tsC/api-graphql-to-ex';


	import CharacterTile from '$comps/svelte/tileBoard/tiles/CharacterTile.svelte';
	import PaginationBoard from '$comps/svelte/pagination/PaginationBoard.svelte';




	export let data: GT.EpisodeFieldsFragment;


	let PaginationBoard__exit_value: PaginationItem;
	let PaginationBoard__entry_value: PaginationBoardValue;
	let currentViewCharacters: GT.CharacterPreviewFieldsFragment[] = [];


	const set_currentViewCharacters = (v: GT.CharacterPreviewFieldsFragment[]) => (currentViewCharacters = v);
	const set_PaginationBoard__entry_value = (v: PaginationBoardValue) => (PaginationBoard__entry_value = v);


	const viewCountOfCharacters = 40;

	let handleSelectedPage = (v: PaginationItem) => {};

	if(data.characters && data.characters.length > viewCountOfCharacters){
		const limitedViewOfCharacters = new LimitedViewOfItems(
			{
				viewCountOfItems: viewCountOfCharacters,
				set_limitedItems: set_currentViewCharacters,
				set_paginationBoard__entry_value: set_PaginationBoard__entry_value,
				thatArrayOfObjs: data.characters,
				buttonViewingLimit: 5
			}
		);
		
		handleSelectedPage = (v: PaginationItem) => (limitedViewOfCharacters.recievePaginationBoard__exit_value(v));

		limitedViewOfCharacters.init();
	}

	$:{
		if(PaginationBoard__exit_value){
			handleSelectedPage(PaginationBoard__exit_value);
		}
	}
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

	{#if data.characters.length > viewCountOfCharacters}
		{#each currentViewCharacters as char, i (char.id) }
			{#if i === 0}
			<!-- 
				vot eto ebanoe gavnische tolko iz-za ebuchey uebischnoy svelte reactivity hueti
				kak je gorit s etogo ganvnischa
				rabotaet kogda kak, ebat' etu huynyu so vsemi razrabami v rot, chtobi vi suki v adu goreli mrazi
				poshli nahuy
			-->
				<div
					class="
						d-flex
						w-100
						jc-center
					"
					style="
						margin-bottom: 10px;
					"
				>
					<PaginationBoard 
						bind:entry_value={
							PaginationBoard__entry_value
						}
						bind:exit_value={
							PaginationBoard__exit_value
						}
					/>
				</div>
				<CharacterTile data={char} />
			{:else}
				<CharacterTile data={char} />
			{/if}
		{/each}
	{:else}
		{#each data.characters as char }
			<CharacterTile data={char} />
		{/each}
	{/if}

</div>
