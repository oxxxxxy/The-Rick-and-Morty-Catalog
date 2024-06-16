<script lang="ts">
	import type { GT } from '@tsC/api-graphql-to-ex';
	import { getLocationsPath } from './index.ts';

	export let data: GT.LocationPreviewFieldsFragment;

	const locationsPath = getLocationsPath(data.id);

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
 	  href="{ locationsPath }"
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
				{ data.name }
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
			{ data.type }
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
				{ data.dimension }
	    </span>
		</span>
	</a>
</div>
