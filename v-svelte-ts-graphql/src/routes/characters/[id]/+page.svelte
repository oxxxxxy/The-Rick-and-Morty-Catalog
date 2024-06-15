<script lang="ts">

	export let data;

	
	import { wUrql } from '$comps/getContext';


	async function mmmm(){
	
		const res = await wUrql().q.GetCharacter({id: data.charId})

		console.log(
			res,
			res.data?.characters
		);

} 

mmmm()


</script>

<h1>character id = {data.charId}</h1>
