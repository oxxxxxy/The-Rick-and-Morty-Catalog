<script lang="ts">
	import injectContext from '$comps/context/injectContext.ts';
	injectContext();


	import Header from '$comps/routes/Header.svelte';


</script>


<Header />
<slot />

