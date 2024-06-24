<script lang="ts">
	import { capitalizeWord } from '@tsLF/pages';

	import type { SearchItemNav_Path } from '@tsCF/pages/src/routes/SearchItemNav.ts';
	import { searchNav } from '@tsCF/pages/src/routes/SearchItemNav.ts';




	export let pathName: SearchItemNav_Path | string;


	let paths = searchNav.getPaths();


	$: _paths = ((): SearchItemNav_Path[] => paths)();


	if(pathName){
		paths = searchNav.setSelected(pathName).getPaths();
	}

</script>	
	
<div
	class="
		d-flex
		ai-center
		jc-center
		fd-column
		color--b6b6b6
		main--font-size
	"
>
	<div
		class="
			d-flex
			jc-center
			margin-10
			w-100
		"
	>
		<div
			class="
				search--width
				d-flex
				ai-center
				jc-center
				fd-if-d-row-if-m-column
			"
		>
			<span
				class="
					search-word
				"
			>
				Search :
			</span>
			<div
				class="
					select-list-option-line
					d-flex
				"
			>
			{#each _paths as path }
				<a
					class="
						select-list-option
						underline
						{path.selected ? 'selected-select-list-option' : ''}
					"
					title="Search {capitalizeWord(path.value)}"
					href="/{path.value}"
				>
					{path.value}
				</a>
			{/each}
			</div>
			<span
				class="
					search-word-dot
				"
			>
				.
			</span>
		</div>
	</div>

	<slot/>

</div>

