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




type PathName = API_LOCATIONS__PATH__NAME | API_EPISODES__PATH__NAME | API_CHARACTERS__PATH__NAME;

export type SearchItemNav_Path = {
	name: PathName;
	selected?: true;
}

export const pathList: SearchItemNav_Path[] = [
	{name: API_CHARACTERS__PATH.name},
	{name: API_LOCATIONS__PATH.name},
	{name: API_EPISODES__PATH.name}
];

export class SearchItemNav{
	private paths: SearchItemNav_Path[];
	private current_path: number | undefined;

	constructor(
		paths: SearchItemNav_Path[] = pathList
	){
		this.paths = paths;
	}

	setSelected(pathName: PathName){
		const T = this;
		
		T.paths = T.paths.map((e, i) => {
			delete e.selected;

			if(e.name === pathName){
				e.selected = true;
				T.current_path = i;
			}

			return e;
		});

		return T;
	}

	setNextSelected(){
		const T = this;
	
		if(T.current_path === undefined){
			T.paths[0].selected = true;
			T.current_path = 0;
		} else {
			T.current_path++;
			
			if(T.paths.length === T.current_path){
				T.current_path = 0;
			}

			T.paths = T.paths.map((e, i) => {
				delete e.selected;

				if(i === T.current_path){
					e.selected = true;
				}

				return e;
			});
		}

		return T;
	}

	clearSelected(){
		const T = this;
		
		delete T.current_path;

		T.paths = T.paths.map(e => (delete e.selected, e));

		return T;
	}

	getPaths(){
		return this.paths.map( e => e );
	}
}
