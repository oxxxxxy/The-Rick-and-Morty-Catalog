import * as G from '../../generated.ts';


console.log(G.GetCharactersDocument)


export const UrqlClientDecorator = '';

/* class UrqlClient{





await client.query(QUERY, { id: 'test' });

} */

/* import type { Client } from '@urql/core';
import { Client as _C } from '@urql/core';

// const a = new _C({url:'asd.com', exchanges: []});

class UrqlClientDecorator1 {
	private urqlClient: Client;
	private generatedQueries;

	constructor(instanceOfUrqlClient: Client){
		this.urqlClient = instanceOfUrqlClient;

		this.generatedQueries = {
			Get : () => {
				
				return instanceOfUrqlClient.query
			}
		}
	}

	get _ (): Client{
		return this.urqlClient;
	}

	get q (){
		return this.generatedQueries;
	}

	//client.query(QUERY, { id: 'test' });
} */

// new UrqlClientDecorator1(a);


