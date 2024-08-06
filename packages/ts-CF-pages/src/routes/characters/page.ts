import type { GT, WT } from '@tsC/api-graphql-to-ex';

import { U } from '@tsL/utils';

import {
	LocationSearchChangeEventEmitter,
	WindowLocationChangeEventEmitter
} from '@tsLF/wLocationChangeEvent';




const init = (
	pathName: string,
	wLocationChangeEventEmitter: WindowLocationChangeEventEmitter,
) => {

	const lSCEEmitter = new LocationSearchChangeEventEmitter(
		{
			pathname: '/' + pathName,
		}
	);
	wLocationChangeEventEmitter.attach(lSCEEmitter);

};

