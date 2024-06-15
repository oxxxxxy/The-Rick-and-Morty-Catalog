<script lang="ts">

	import injectContext from '$comps/context/injectContext.ts';
	injectContext();

	
	import Header from '$comps/Header.svelte';



</script>


<div id="app">
	<Header />

</div>


<slot />
