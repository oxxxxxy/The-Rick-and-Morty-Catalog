<script lang="ts">
	import type { GT } from '@tsC/api-graphql-to-ex';

	import { 
		getEpisodesPath,
		getCharactersPath,
		getLocationsPath
	} from './index.ts';

	export let data: GT.CharacterFieldsFragment;

	const getCssClass_CharacterStatusIcon = (status: string
	): string | undefined => {
		switch(status.toLowerCase()){
			case 'alive':
				return 'character-status__icon-alive';
			case 'dead':
				return 'character-status__icon-dead';
			case 'unknown':
				return 'character-status__icon-unknown';
		}
	}


	const cssClass_CharacterStatusIcon = getCssClass_CharacterStatusIcon(data.status);

	const charactersPath = getCharactersPath(data.id);
	const locationsPath = getLocationsPath(data.location.id);
	const episodesPath = getEpisodesPath(data.episode[0].id);

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
      href="{ charactersPath }"
      rel="noopener noreferrer"
    >
			<img class="tile-img-item" alt="{data.name}" src="{data.image}">
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
      href="{ charactersPath }"
      rel="noopener noreferrer"
    >
				{ data.name }
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
			{ data.status } - { data.species }
    </span>

		<a
			class="
				tile-line-box
				no-underline
			"
	    href="{ locationsPath }"
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
				{ data.location.name }
 	   </span>
		</a>

		<a
			class="
				tile-line-box
				no-underline
			"
	    href="{episodesPath}"
	    rel="noopener noreferrer"
		>
 	   <span 
				class="
					tile-line
					font-weight--normal
				"
			>
			First seen in:</span>
 	   <span
				class="
					color--f5f5f5
					tile-line
					underline
				"
	    >
	    {data.episode[0].name}
	    </span>
		</a>
	</div>
</div>
