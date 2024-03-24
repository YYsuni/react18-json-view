import Footer from './footer'
import './globals.css'
import Head from './head'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<Head />
			<body>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						const theme = window.localStorage.getItem("theme")
						if (theme === 'dark') {
							document.documentElement.classList.add('dark')
						} else if (theme === 'light') {
							document.documentElement.classList.remove('dark')
						} else {
						if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
							document.documentElement.classList.add('dark')
						} else {
							document.documentElement.classList.remove('dark')
						}
					}`
					}}
				/>

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
