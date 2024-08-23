<script lang="ts">

	import g from '$comps/context/index.ts';
	const { 
		wUrql
	} = g();

	import { U } from '@tsL/utils';




	export let data;

	


console.log(data);

async function fna(){
	U.log(
		await wUrql.q.GetCharactersByIds({ids: '2'}),
		await wUrql.q.GetEpisodesByIds({ids: '2'}),
		await wUrql.q.GetLocationsByIds({ids: '2'}),
		
			)
}

fna()

</script>

<h1>episode id = {data}</h1>
