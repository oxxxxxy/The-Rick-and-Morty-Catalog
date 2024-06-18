import type { GT } from '@tsC/api-graphql-to-ex';
import { getLocationsPath } from './index.ts';




export type GenDataForLocationTIle = {
	dimension: string;
	path: string;
	name: string;
	type: string;
}

export const genLocationTileData = (data: GT.LocationPreviewFieldsFragment): GenDataForLocationTIle => {
	const gen = {...data};

	delete gen.id;
	delete gen.__typename;

	gen.path = getLocationsPath(data.id);

	return gen;
}
