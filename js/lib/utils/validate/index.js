import _V from 'validator';


export const V = _V;


const isJSTypeArgValid = (param, arg) => {
	const paramTypes = {};
	
	paramTypes.string = (param, arg) => {
		if(param.match){
			return param.match.test(arg);
		}

		return true;
	};

	paramTypes.options = (param, arg) => {
		return param.options.includes(arg);
	};


	return paramTypes[param.type](param, arg);
};
V.isJSTypeArgValid = isJSTypeArgValid;
