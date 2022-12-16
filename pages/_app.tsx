import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { darkTheme, lightTheme } from "../themes"
import { UiContext, UiProvider } from "../context/ui"
import { EntriesProvider } from "../context/entries"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<EntriesProvider>
			<UiProvider>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</UiProvider>
		</EntriesProvider>
	)
}
