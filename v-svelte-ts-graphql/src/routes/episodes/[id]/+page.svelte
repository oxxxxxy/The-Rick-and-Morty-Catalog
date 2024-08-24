<script lang="ts">

	import { APP_NAME } from '$comps/data';
	import g from '$comps/context/index.ts';
	const { 
		wUrql
	} = g();

	import { U } from '@tsL/utils';


	import CharacterTile from '$comps/svelte/tileBoard/tiles/CharacterTile.svelte';
	import BigEpisodeTile from '$comps/svelte/routes/Episodes-id/BigEpisodeTile.svelte';
	import TileBoard from '$comps/svelte/tileBoard/TileBoard.svelte';




	export let data;


	const pageTitle = '';

console.log(data);

async function fna(){
	U.log(
		// await wUrql.q.GetCharacter({id:'2'}),
		await wUrql.q.GetEpisode({id: '2'}),
		// await wUrql.q.GetLocation({id: '2'}),
		
			)
}

fna()

</script>




<svelte:head>
	<title>{ pageTitle } • { APP_NAME }</title>
	<meta name="description" content="{ APP_NAME } { pageTitle }" />
</svelte:head>



<h1>episode id = {data}</h1>


<!--
Loading
Error
data

-->


