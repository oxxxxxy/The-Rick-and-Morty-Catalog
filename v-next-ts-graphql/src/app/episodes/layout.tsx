import { Metadata } from 'next';


import { API_EPISODES__PATH } from '@tsCF/data';

import { capitalizeWord } from '@tsLF/pages';


import { APP_NAME } from '@/components/data';




const pageTitle = capitalizeWord(API_EPISODES__PATH.name);

export const metadata: Metadata = {
  title: `${ pageTitle } • ${ APP_NAME }`,
  description: `${ APP_NAME } ${ pageTitle }`
};

export default function EpisodesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>);
}
