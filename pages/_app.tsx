import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { darkTheme, lightTheme } from "../themes"
import { UiContext, UiProvider } from "../context/ui"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UiProvider>
			<ThemeProvider theme={lightTheme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</UiProvider>
	)
}
