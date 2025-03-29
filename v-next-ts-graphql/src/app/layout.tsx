import '../../../static/css/style.css';


//import Header from "@/components/next/routes/Header";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
				{/* 
				<Header/>
				*/}
        {children}
      </body>
    </html>
  );
}
