<script lang="ts">

	/* import {U} from '@lib/utils';
	import {
		urqlClient
	} from '@comps/frontend/api-service';

	U.log(urqlClient)
	U.log('asdf----');
	U.log(new Date());
	U.log('asdf'); */

	import { U } from '@tsL/utils';

	U.log('asdf345')

	import { urqlDClient } from '@tsC/api-graphql';

	async function mmmm(){
	
		const res = await urqlDClient.q.GetCharacters({
filter: {
	name: 'a'
}
			})

		console.log(
			res,
			res.data.characters
		);

} 

mmmm()

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
