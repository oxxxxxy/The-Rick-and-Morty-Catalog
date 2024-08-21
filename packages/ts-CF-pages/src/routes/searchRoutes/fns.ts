import { U } from '@tsL/utils';




export const makeFn_ignoreFnExecAfterExitValueTransferOnce = (fn: () => {}) => {
	/* const ignoreExitValueTransferOnceCrutch = new U.IgnoreFewTimesCrutch(1);

	const wrappedSveltePushStateBczThereIsErrorWhenLoaded = (p, whs) => {
		// window.history.pushState(whs, '', p); // <-- this works fine, but svelte pushState is not.
		// so, this miss/crutch/shit only for first error, which emits when loaded...
		// or I am doing a peace of shit again... goddamn...
		// UPD1: it appears only on loading exactly host/characters... so, i need smart crutch(shit solution(or svelte design is shit(or i'm fucking idiot(shut up(okay))))).
		// UPD2: it appears when user navigate to host/characters and when loading exactly this path... so, i just need ingnore exit_value transfer once. bcz i don't need the same value in history state twice.
		// upd3: i'm idiot. this appears bcz i transfer navigation_values... so, it's crutch to save design. i don't want to recode it to divide CustomFormHolder item draw and transfer parts on two separate things.

		if(!ignoreExitValueTransferOnceCrutch.isFinished()){
			ignoreExitValueTransferOnceCrutch.do();
		} else {
			pushState(p, whs);
		}
	}; */

	const ignoreExitValueTransferOnceCrutch = new U.IgnoreFewTimesCrutch(1);
	
	return function(){
		if(!ignoreExitValueTransferOnceCrutch.isFinished()){
			ignoreExitValueTransferOnceCrutch.do();
		} else {
			fn(...arguments);
		}
	};
};
