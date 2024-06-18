<script lang="ts">
	import type { GT } from '@tsC/api-graphql-to-ex';

	
	import { 
		getCssClass_CharacterStatusIcon,
		genCharacterTileData
	} from '@tsCF/pages/src/tileBoard/tiles/CharacterTile.ts';




	export let data: GT.CharacterFieldsFragment;


	let cssClass_CharacterStatusIcon = getCssClass_CharacterStatusIcon(data.status);

	const gen = genCharacterTileData(data);

</script>

<div
	class="
		tile-box
		bg-color--181a1b
		d-flex
	"
>
	<div
		class="
			tile-img-box
		"
	>
    <a
      href="{ gen.path }"
      rel="noopener noreferrer"
    >
			<img class="tile-img-item" alt="{gen.name}" src="{gen.image}">
    </a>
	</div>
	<div class="
			tile-info-box
			d-flex
			fd-column
		"
	>
    <a
			class="
				color--f5f5f5
				tile-h
				tile-line
			"
      href="{ gen.path }"
      rel="noopener noreferrer"
    >
				{ gen.name }
    </a>

    <span 
			class="
				character-status
				tile-line
				font-weight--normal
			"
		>
			<span 
				class="
					character-status__icon
					{ cssClass_CharacterStatusIcon }
				"
			></span>
			{ gen.status } - { gen.species }
    </span>

		<a
			class="
				tile-line-box
				no-underline
			"
	    href="{ gen.location.path }"
	    rel="noopener noreferrer"
		>
 	   <span 
				class="
					tile-line
					font-weight--normal
				"
			>Last known location:</span>
 	   <span
				class="
					color--f5f5f5
					tile-line
					underline
				"
	    >
				{ gen.location.name }
 	   </span>
		</a>

		<a
			class="
				tile-line-box
				no-underline
			"
			href="{gen.origin.path}"
	    rel="noopener noreferrer"
		>
 	   <span 
				class="
					tile-line
					font-weight--normal
				"
			>
			Origin location:</span>
 	   <span
				class="
					color--f5f5f5
					tile-line
					underline
				"
	    >
	    {gen.origin.name}
	    </span>
		</a>
	</div>
</div>
