<script lang="ts">
	import type { GT } from '@tsC/api-graphql-to-ex';


	import { genEpisodeTileData } from '@tsCF/pages/src/tileBoard/tiles/EpisodeTile.ts';




	export let data: GT.EpisodePreviewFieldsFragment;


	const gen = genEpisodeTileData(data);

</script>

<div
	class="
		tile-box
		bg-color--181a1b
		d-flex
	"
>
	<a class="
			tile-info-box
			d-flex
			fd-column
			no-underline
		"
		title="{gen.name}"
	  href="{ gen.path }"
	  rel="noopener noreferrer"
	>
		<span
			class="
				tile-line-box
				tile-h
			"
		>
 	   <span 
				class="
					tile-line
					font-weight--normal
				"
			>Episode:</span>
			<span
				class="
					color--f5f5f5
					underline
				"
			>
				{ gen.name }
			</span>
		</span>
		<span
			class="
				tile-line-box
			"
		>
 	   <span 
				class="
					tile-line
					font-weight--normal
				"
			>Air date:</span>
 	   <span
				class="
					color--f5f5f5
					tile-line
				"
 	   >
			{ gen.air_date }
 	   </span>
		</span>
		<span
			class="
				tile-line-box
			"
		>
 	   <span 
				class="
					tile-line
					font-weight--normal
				"
			>
			Notation:</span>
 	   <span
				class="
					color--f5f5f5
					tile-line
				"
	    >
				{ gen.episode }
	    </span>
		</span>
	</a>
</div>
