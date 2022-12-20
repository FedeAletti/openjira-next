import "../styles/globals.css"
import type { AppProps } from "next/app"
import {
	createTheme,
	CssBaseline,
	Snackbar,
	ThemeProvider,
} from "@mui/material"
import { darkTheme, lightTheme } from "../themes"
import { UiContext, UiProvider } from "../context/ui"
import { EntriesProvider } from "../context/entries"
import { SnackbarProvider } from "notistack"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider maxSnack={3}>
			<EntriesProvider>
				<UiProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UiProvider>
			</EntriesProvider>
		</SnackbarProvider>
	)
}
