import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';


import adapter_static from '@sveltejs/adapter-static';
import adapter_vercel from '@sveltejs/adapter-vercel';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// adapter: adapter(),
		// adapter: adapter_static(),
		adapter: adapter_vercel({runtime: 'nodejs20.x'}),

		files: {
			assets: '../static/'
		},
		alias: {
			"$comps": "src/components",
			"$comps/*": "src/components/*"
		},
		typescript:{
			config: config => {
				config.compilerOptions.allowImportingTsExtensions = true;

				return config;
			}
		},
		// outDir: '../build/v-svelte-ts-graphql',

	}
};

export default config;
