// YES, svelte re-exporting can't make non-asshole solution such as
// export * as logo from '../../..../your.svg'
// OR just add an additional link in config such as '$lib/thing...' but for other custom things... 
// like '$images/logo.svg'. Why not? It's good idea, proof me wrong.
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
// https://kit.svelte.dev/docs/configuration#files
//
//
// can u suggest a some more neat solution? if u can than welcome to issues/PR/etc. THANK YOU.


import _logo from '../../../static/images/the-rick-and-morty-logo.svg';
export const logo = _logo;

import _github_logo from '../../../static/images/github-logo.svg';
export const github_logo = _github_logo;




