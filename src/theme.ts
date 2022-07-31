import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
	typography: {
		fontFamily: [
			"Poppins",
			"Joesfin Sans",
			"Nunito Sans",
			"Helvetica Neue",
			"Arial",
			"sans-serif"
		].join(",")
	},
	palette: {
		primary: {
			main: '#222',
			//main: '#CFBDA0',
			//main: '#BAAC97',
		},
		secondary: {
			main: '#B0D7FE',
		},
		error: {
			main: '#D45E5E',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none"
				}
			}
		}
	}
});

export default theme;
