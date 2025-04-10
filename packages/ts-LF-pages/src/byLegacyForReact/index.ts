import type { QPC_InputText } from '@tsLF/forURLSP';




export type objWithFnsForEachCFIDC__get_exitValue = {
	[key: string]: (v: QPC_InputText) => void;
};

export const pushStateByLegacy = (path: string, windowHistoryState: Object) => {
	window.history.pushState(windowHistoryState, '', path)
}
