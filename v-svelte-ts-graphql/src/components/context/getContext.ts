import { getContext } from 'svelte';

import type { IUrqlClientWrapper } from '@tsC/api-graphql-to-ex';


export const wUrql = (): TUrqlClientWrapper => getContext('wUrql').wUrql;
