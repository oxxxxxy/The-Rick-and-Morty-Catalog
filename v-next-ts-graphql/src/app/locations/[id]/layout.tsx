import { Metadata } from 'next';


import { API_LOCATIONS__PATH } from '@tsCF/data';

import { capitalizeWord } from '@tsLF/pages';


import { APP_NAME } from '@/components/data';




export function generateMetadata(
	{
		params
	}: {
		params: string
	}
){
	const wordInPluralForm = capitalizeWord(API_LOCATIONS__PATH.name);
	const TRAMCThemeObject = wordInPluralForm.slice(0, wordInPluralForm.length - 1);
	const pageTitle = `${TRAMCThemeObject} Id${params} loading`;

	const metadata: Metadata = {
	  title: `${ pageTitle } • ${ APP_NAME }`,
	  description: `${ APP_NAME } • ${ pageTitle }`
	};

	return metadata
}

export default function LocationsIdLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>);
}
