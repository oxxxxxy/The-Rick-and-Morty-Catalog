<script lang="ts">
	import { API_LOCATIONS__PATH } from '@tsCF/data';
	import { APP_NAME } from '$comps/data';


	import SearchItemNav from '$comps/svelte/routes/SearchItemNav.svelte';




	export let data;


	const pageTitle = API_LOCATIONS__PATH.name.slice(0, 1).toUpperCase() + API_LOCATIONS__PATH.name.slice(1);
	const	pathName = data.psl.route.id.slice(1);

</script>

<svelte:head>
	<title>{ pageTitle } • { APP_NAME }</title>
	<meta name="description" content="{ APP_NAME } { pageTitle }" />
</svelte:head>

<SearchItemNav {pathName}/>
