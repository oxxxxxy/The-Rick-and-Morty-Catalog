import '../../../static/css/style.css';
// import '@/app/globals.css';


import Header from "@/components/next/routes/Header";
import GlobalContextProvider from '@/components/context/globalContext';




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
				<GlobalContextProvider>
					<Header/>
					{children}
				</GlobalContextProvider>
      </body>
    </html>
  );
}
