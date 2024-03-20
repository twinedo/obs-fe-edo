import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/molecules/header';
import Providers from '@/utils/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'OBS Financial Solution',
	description: 'Developed by twinedo',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	);
}
