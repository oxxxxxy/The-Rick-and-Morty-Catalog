export type NavigationPath = {
	value: string;
	name: string;
	selected?: true;
}

export class NavigationBar{
	private paths: NavigationPath[];
	private current_path: number | undefined;

	constructor(
		paths: NavigationPath[]
	){
		this.paths = paths;
	}

	setSelected(path: NavigationPath | string){
		const T = this;
	
		const type = typeof path;

		let index: number;

		if(type === 'object'){
			index = T.paths.findIndex(e => e.value === path.value);
		} else if (type === 'string'){
			index = T.paths.findIndex(e => e.value === path);
		} else {
			throw new Error('setSelected(path: NavigationPath | string), but you pass ' + type, path);
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

	getPaths(){
		return this.paths.map( e => e );
	}
}
