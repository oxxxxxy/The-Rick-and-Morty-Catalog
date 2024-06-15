import type { PageServerLoad } from './$types';

import { U } from '@tsL/utils';



export const load = (psl: PageServerLoad) => {
	U.log(psl);


	return {
		charId: psl.params.id
	}
}
