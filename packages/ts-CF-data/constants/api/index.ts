import { API_EPISODES__PATH } from './episodes.ts';
import { API_LOCATIONS__PATH } from './locations.ts';
import { API_CHARACTERS__PATH } from './characters.ts';

export const API_PATHS = [API_LOCATIONS__PATH, API_EPISODES__PATH, API_CHARACTERS__PATH];

export * from './characters.ts';
export * from './locations.ts';
export * from './episodes.ts';
