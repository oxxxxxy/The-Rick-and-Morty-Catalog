import type { PositiveInteger } from '@tsL/types';




export type GenDataLocation = {
	path: string | null;
	name: string;
};

export const getCharactersPath = (id: PositiveInteger<number>): string => '/characters/' + id;

export const getLocationsPath = (id: PositiveInteger<number>): string => '/locations/' + id;

export const getEpisodesPath = (id: PositiveInteger<number>): string => '/episodes/' + id;

