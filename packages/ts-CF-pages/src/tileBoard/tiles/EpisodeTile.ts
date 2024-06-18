import type { GT } from '@tsC/api-graphql-to-ex';
import { getEpisodesPath } from './index.ts';




export type GenDataForEpisodeTIle = {
	air_date: string;
	path: string;
	name: string;
	episode: string;
}

export const genEpisodeTileData = (data: GT.EpisodePreviewFieldsFragment): GenDataForEpisodeTIle => {
	const gen = {...data};

	delete gen.id;
	delete gen.__typename;

	gen.path = getEpisodesPath(data.id);

	return gen;
}
