import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig( _ => ({
	test: {
		include: ['**'],
		dir: 'tests',
		exclude: [
			...configDefaults.exclude,
			'**/*-entry.js'
		]
	}
}));
