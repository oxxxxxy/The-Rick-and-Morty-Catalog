import type { Client } from "@urql/core";

import { Client as _Client } from "@urql/core";

export const TStest = ():{str: string, class: Client} => {
	return {
		str: 'test',
		class: new _Client({url:'ass.cum', exchanges: []})
	}
};
