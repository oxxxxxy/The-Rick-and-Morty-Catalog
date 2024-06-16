import type { PositiveInteger } from '@tsL/types';


export const getCharactersPath = (id: PositiveInteger): string => '/characters/' + id;

export const getLocationsPath = (id: PositiveInteger): string => '/locations/' + id;

export const getEpisodesPath = (id: PositiveInteger): string => '/episodes/' + id;

