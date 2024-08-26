<script lang="ts">

	import type { GT } from '@tsC/api-graphql-to-ex';


	import CharacterTile from '$comps/svelte/tileBoard/tiles/CharacterTile.svelte';
	import PaginationBoard from '$comps/svelte/pagination/PaginationBoard.svelte';




	export let data: GT.LocationFieldsFragment;


	import type { PositiveInteger } from '@tsL/types';

	import type { 
		PaginationBoardValue,
		PaginationItem
	} from '@tsLF/pages';
	import {
		makeFn_ignoreFnExecAfterExitValueTransferOnce
	} from '@tsLF/pages';


	

	let PaginationBoard__exit_value: PaginationItem;
	let PaginationBoard__entry_value: PaginationBoardValue;
	let currentViewCharacters: GT.CharacterPreviewFieldsFragment[] = [];


	const set_currentViewCharacters = (v: GT.CharacterPreviewFieldsFragment[]) => (currentViewCharacters = v);
	const set_PaginationBoard__entry_value = (v: PaginationBoardValue) => (console.log(v, 'set'), PaginationBoard__entry_value = v);



	type ArgumentsFor_LimitedViewOfItems = {
		set_paginationBoard__entry_value: (v: PaginationBoardValue) => void;
		set_limitedItems: (v: Object[]) => void;
		thatArrayOfObjs: Object[];
		buttonViewingLimit: number;
		viewCountOfItems: PositiveInteger<number>;
	}

	class LimitedViewOfItems{
		#setExternalPaginationBoard__entry_value: (v: PaginationBoardValue) => void;
		#setExternalLimitedItems: (v: Object[]) => void;
		#thatArrayOfObjs: Object[];
		#buttonViewingLimit: number;
		#viewCountOfItems: PositiveInteger<number>;


		constructor(
			{
				set_paginationBoard__entry_value,
				set_limitedItems,
				thatArrayOfObjs,
				buttonViewingLimit,
				viewCountOfItems
			} : ArgumentsFor_LimitedViewOfItems
		){
			this.#setExternalPaginationBoard__entry_value = set_paginationBoard__entry_value;
			this.#setExternalLimitedItems = set_limitedItems;
			this.#thatArrayOfObjs = thatArrayOfObjs;
			this.#buttonViewingLimit = buttonViewingLimit;
			this.#viewCountOfItems = viewCountOfItems;
		}
		
		getPageCount(): number{
			const diff = this.#thatArrayOfObjs.length / this.#viewCountOfItems;

			const diffStr = diff.toString();
			const floor = Math.floor(diff);

			if(diffStr != floor){
				return floor + 1;
			}else{
				return diff;
			}
		}

		getPaginationBoardValue(selectedPage: PositiveInteger<number>): PaginationBoardValue{
			return {
				selectedPage,
				pageCount : this.getPageCount(),
				buttonViewingLimit: this.#buttonViewingLimit
			}
		}
		
		getViewLimit(v: PositiveInteger<number>): Object[]{
			const viewLimitLeft = this.#viewCountOfItems * (v - 1);
			let viewLimitRight = viewLimitLeft + this.#viewCountOfItems;

			const viewLimitOfObjs = this.#thatArrayOfObjs.slice(
				viewLimitLeft,
				viewLimitRight
			);

			return viewLimitOfObjs;
		}

		init(){
			this.#setExternalLimitedItems(
				this.getViewLimit(1)
			);
			this.#setExternalPaginationBoard__entry_value(
				this.getPaginationBoardValue(1)
			);
		}

		recievePaginationBoard__exit_value(v: PaginationItem){
			this.#setExternalLimitedItems(
				this.getViewLimit(v.pageNum)
			);
			this.#setExternalPaginationBoard__entry_value(
				this.getPaginationBoardValue(v.pageNum)
			);
		}
	}

	const viewCountOfCharacters = 40;

	let handleSelectedPage = (v: PaginationItem) => {};

	console.log(data)

	if(data.residents && data.residents.length > viewCountOfCharacters){
		const limitedViewOfCharacters = new LimitedViewOfItems(
			{
				viewCountOfItems: viewCountOfCharacters,
				set_limitedItems: set_currentViewCharacters,
				set_paginationBoard__entry_value: set_PaginationBoard__entry_value,
				thatArrayOfObjs: data.residents,
				buttonViewingLimit: 7
			}
		);
		
		handleSelectedPage = (v: PaginationItem) => (console.log(v, 'handle'), limitedViewOfCharacters.recievePaginationBoard__exit_value(v));

		limitedViewOfCharacters.init();
	}


	$:{
		currentViewCharacters = currentViewCharacters;
	}
	$:{
		PaginationBoard__entry_value = PaginationBoard__entry_value;
		console.log(PaginationBoard__entry_value, 'PaginationBoard__entry_value')
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
				Location card
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
			Type:
	    <span 
				class="
					color--f5f5f5
				"
			>
				{ data.type }
			</span>
    </span>

    <span 
			class="
				tile-line
				font-weight--normal
			"
		>
			Dimension:
	    <span 
				class="
					color--f5f5f5
				"
			>
				{ data.dimension }
			</span>
    </span>


    <span 
			class="
				tile-line
				font-weight--normal
			"
		>
			Resident count:
	    <span 
				class="
					color--f5f5f5
				"
			>
				{ data.residents.length }
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
		List of characters who have been seen in the location.
	</div>

	{#if data.residents.length > viewCountOfCharacters}
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
		{#each currentViewCharacters as char (char.id) }
			<CharacterTile data={char} />
		{/each}
	{:else}
		{#each data.residents as char }
			<CharacterTile data={char} />
		{/each}
	{/if}

</div>
