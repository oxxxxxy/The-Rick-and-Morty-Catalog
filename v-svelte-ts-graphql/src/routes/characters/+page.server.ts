import type { PageServerLoad } from './$types';




export const load = (psl: PageServerLoad) => {
	return {
		psl: JSON.parse(JSON.stringify(psl))
	}
}
