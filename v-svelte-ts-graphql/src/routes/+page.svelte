<script lang="ts">
	import { U } from '@tsL/utils';
	import { APP_NAME } from '$comps/data';

	import Poster from '$comps/routes/Home/Poster.svelte';

	U.log('asdf345')



</script>

<svelte:head>
	<title>Home • { APP_NAME }</title>
	<meta name="description" content="{ APP_NAME }" />
</svelte:head>

<main>
	<Poster />

	
</main>

