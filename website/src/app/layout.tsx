import Footer from './footer'
import './globals.css'
import Head from './head'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<Head />
			<body>
				{children}

				<Footer />

				<link
					href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&display=swap'
					rel='stylesheet'
				/>
			</body>
		</html>
	)
}
