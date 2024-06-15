<script lang="ts">

	import { getContext } from 'svelte';

	import { U } from '@tsL/utils';

	U.log('asdf345')



	async function mmmm(){
	
		const res = await getContext('wUrql').wUrql.q.GetCharacters({
filter: {
	name: 'a'
}
			})

		console.log(
			res,
			res.data?.characters
		);

} 

mmmm()

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
