export type NavigationPath = {
	value: string;
	name: string;
	selected?: true;
}

export class NavigationBar< T extends NavigationPath = NavigationPath> {
	private paths: T[];
	private current_path: number | undefined;

	constructor(
		paths: T[]
	){
		this.paths = paths;
	}

	setSelected(path: NavigationPath | string){
		const T = this;

    if (path === null || path === undefined) {
        throw new Error('path can`t be null or undefined.');
    }

		let index: number;

		if(typeof path === 'object'){
			index = T.paths.findIndex(e => e.value === path.value);
		} else if (typeof path === 'string'){
			index = T.paths.findIndex(e => e.value === path);
		} else {
			throw new Error('setSelected(path: NavigationPath | string), but you pass ' + typeof path + '.\n' + JSON.stringify(path));
		}

		if(index < 0){
			throw new Error('Passed path does not exist. ' + JSON.stringify(path));
		}

		T.paths = T.paths.map((e, i) => {
			delete e.selected;

			if(i === index){
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

	getPaths(): T[]{
		return this.paths.map( e => e );
	}
}
