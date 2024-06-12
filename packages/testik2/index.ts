import type { Client } from "@urql/core";

import { Client as _Client } from "@urql/core";

export const TtTtStest = ():{str: string, class: Client} => {
	return {
		str: 'test2',
		class: new _Client({url:'ass.cum', exchanges: []})
	}
};
