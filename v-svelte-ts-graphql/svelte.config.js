import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			"@lib": "../lib/ts/frontend",
			"@lib/*": "../lib/ts/frontend/*",

			"@comps": "../components/ts/frontend",
			"@comps/*": "../components/ts/frontend/*",

			"$comps": "src/components",
			"$comps/*": "src/components/*"
		}
	}
};

export default config;
