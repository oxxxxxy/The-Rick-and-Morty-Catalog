<script lang="ts">
	import { APP_NAME } from '$comps/data';


	import Poster from '$comps/svelte/routes/Home/Poster.svelte';
	import NineRandomTiles from '$comps/svelte/routes/Home/NineRandomTiles.svelte';
	import SearchItemNav from '$comps/svelte/routes/SearchItemNav.svelte';



</script>

<svelte:head>
	<title>Home • { APP_NAME }</title>
	<meta name="description" content="{ APP_NAME }" />
</svelte:head>

<main>
	<Poster />
	<SearchItemNav pathName={''}/>	
	<NineRandomTiles />
</main>

