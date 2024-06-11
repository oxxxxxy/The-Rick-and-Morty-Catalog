This util exist to make this:

urqlClientDecorator.ts

import type { Client } from '@urql/core';

class UrqlClientDecorator1 {
	private urqlClient: Client;

	constructor(instanceOfUrqlClient: Client){
		this.urqlClient = instanceOfUrqlClient;
	}

	get _ (){
		return this.urqlClient;
	}

    

}



from 
