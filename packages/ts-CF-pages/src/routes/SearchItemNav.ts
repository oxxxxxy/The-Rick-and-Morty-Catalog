import type { 
	API_CHARACTERS__PATH__NAME,
	API_EPISODES__PATH__NAME,
	API_LOCATIONS__PATH__NAME
} from '@tsCF/data';
import { 
	API_CHARACTERS__PATH,
	API_EPISODES__PATH,
	API_LOCATIONS__PATH
} from '@tsCF/data';

import type { NavigationPath } from '@tsLF/pages';
import { NavigationBar } from '@tsLF/pages';




type PathName = API_LOCATIONS__PATH__NAME | API_EPISODES__PATH__NAME | API_CHARACTERS__PATH__NAME;

export type SearchItemNav_Path = NavigationPath & {
	value: PathName;
}

export const pathList: SearchItemNav_Path[] = [
	API_CHARACTERS__PATH,
	API_LOCATIONS__PATH,
	API_EPISODES__PATH
].map(e => 
	(
		{value: e.name, name: e.name}
	)
);

export const searchNav = new NavigationBar(pathList);
