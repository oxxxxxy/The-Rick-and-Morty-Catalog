<script lang="ts">

	import type { GT } from '@tsC/api-graphql-to-ex';
	
	import { 
		getCssClass_CharacterStatusIcon
	} from '@tsCF/pages';


	import EpisodeTile from '$comps/svelte/tileBoard/tiles/EpisodeTile.svelte';




	export let data: GT.CharacterFieldsFragment;


	const cssClass_CharacterStatusIcon = getCssClass_CharacterStatusIcon(data.status);

</script>




<div
	class="
		bg-color--181a1b
		d-flex
		big-tile-box
	"
> 
	<div
		class="
			big-tile-img-box
		"
	>
		<img class="tile-img-item" alt="{data.name}" src="{data.image}">
	</div>
	<div
		class="
			big-tile-info-box
			d-flex
			fd-column
		"
	>
    <span
			class="
				big-tile-h
				tile-line
			"
    >
			Character card
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
			Gender:
	    <span 
				class="
					color--f5f5f5
				"
			>
				{ data.gender}
			</span>
    </span>

		{#if data.type}
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
    {/if}

    <span
			class="
				tile-line
				font-weight--normal
				character-status
				ai-center
			"
    >
			Status:
	    <span 
				class="
					character-status
					color--f5f5f5
				"
			>
				<span 
					class="
						character-status__big-icon
						{cssClass_CharacterStatusIcon}
					"
				></span>
				{ data.status }
			</span>
    </span>

    <span 
			class="
				tile-line
				font-weight--normal
			"
		>
			Spieces:
	    <span 
				class="
					color--f5f5f5
				"
			>
				{ data.species }
			</span>
    </span>

		{#if data.origin.id}
			<a
				class="
					no-underline
					tile-line
						font-weight--normal
				"
		    href="{ '/locations/' + data.origin.id }"
		    rel="noopener noreferrer"
			>
		 	  <span 
					class="
						tile-line
						font-weight--normal
					"
				>Origin location:</span>
		 	  <span
					class="
						color--f5f5f5
						tile-line
						underline
					"
			   >
					{ data.origin.name }
		 	  </span>
			</a>
		{:else}
			<a
				class="
					no-underline
					tile-line
					font-weight--normal
				"
			>
		 	  <span 
					class="
						tile-line
						font-weight--normal
					"
				>Origin location:</span>
		 	  <span
					class="
						color--f5f5f5
						tile-line
						underline
					"
			   >
					{ data.origin.name }
		 	  </span>
			</a>
		{/if}

		{#if data.location.id}
			<a
				class="
					no-underline
					tile-line
						font-weight--normal
				"
		    href="{ '/locations/' + data.location.id }"
		    rel="noopener noreferrer"
			>
 		   <span 
					class="
						tile-line
						font-weight--normal
					"
				>
					Last known location:
				</span>
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
		{:else}
			<a
				class="
					no-underline
					tile-line
						font-weight--normal
				"
		    rel="noopener noreferrer"
			>
 		   <span 
					class="
						tile-line
						font-weight--normal
					"
				>
					Last known location:
				</span>
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
		{/if}

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
		List of episodes in which this character appeared.
	</div>

	{#each data.episode as ep }
		<EpisodeTile data={ep} />
	{/each}

</div>
