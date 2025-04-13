import { Metadata } from 'next';


import { API_CHARACTERS__PATH } from '@tsCF/data';

import { capitalizeWord } from '@tsLF/pages';


import { APP_NAME } from '@/components/data';




const pageTitle = capitalizeWord(API_CHARACTERS__PATH.name);

export const metadata: Metadata = {
  title: `${ pageTitle } • ${ APP_NAME }`,
  description: `${ APP_NAME } ${ pageTitle }`
};

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>);
}
