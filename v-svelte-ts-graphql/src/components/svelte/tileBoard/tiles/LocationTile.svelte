<script lang="ts">
	import type { GT } from '@tsC/api-graphql-to-ex';


	import { genLocationTileData } from '@tsCF/pages/src/tileBoard/tiles/LocationTile.ts';




	export let data: GT.LocationPreviewFieldsFragment;


	const gen = genLocationTileData(data);

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
			>Location:</span>
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
				no-underline
			"
		>
 	   <span 
				class="
					tile-line
					font-weight--normal
				"
			>Type:</span>
 	   <span
				class="
					color--f5f5f5
					tile-line
				"
 	   >
			{ gen.type }
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
			Dimension:</span>
 	   <span
				class="
					color--f5f5f5
					tile-line
				"
	    >
				{ gen.dimension }
	    </span>
		</span>
	</a>
</div>
