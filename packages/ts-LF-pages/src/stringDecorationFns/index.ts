export const capitalizeWord = (w: string) => w.slice(0, 1).toUpperCase() + w.slice(1);

export const makeInputText_defaultPlaceholder = (name: string, hint: string): string => `${capitalizeWord(name)} (e.g. ${capitalizeWord(hint)})`;
