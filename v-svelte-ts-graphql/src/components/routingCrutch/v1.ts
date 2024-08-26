export const setWindowLocationHref = (path: string) => {
	window.location.href = path;
}


/*
	import { setWindowLocationHref } from '$comps/routingCrutch';
	  
		on:click={
				() => 
					gen.location.path
					?	setWindowLocationHref(gen.location.path)
					: ''
			}

	bad crutch
	it brakes svelte routing... user (me) can't return back, bcz some routes are lost.
*/
