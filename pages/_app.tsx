import { AuthContext, AuthContextProvider } from "../src/providers/AuthContext";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

const queryClient = new QueryClient();

export default function MyApp(props: MyAppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</Head>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</AuthContextProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</CacheProvider>
	);
}
