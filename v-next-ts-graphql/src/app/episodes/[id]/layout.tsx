import { Metadata } from 'next';


import { API_EPISODES__PATH } from '@tsCF/data';

import { capitalizeWord } from '@tsLF/pages';


import { APP_NAME } from '@/components/data';




export async function generateMetadata(
	{
		params
	}: {
		params: Promise<{ id: string }>
	}
): Promise<Metadata>{
	const { id } = await params;
	const wordInPluralForm = capitalizeWord(API_EPISODES__PATH.name);
	const TRAMCThemeObject = wordInPluralForm.slice(0, wordInPluralForm.length - 1);
	const pageTitle = `${TRAMCThemeObject} Id${id} loading`;

	const metadata: Metadata = {
	  title: `${ pageTitle } • ${ APP_NAME }`,
	  description: `${ APP_NAME } • ${ pageTitle }`
	};

	return metadata
}

export default function EpisodesIdLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>);
}
