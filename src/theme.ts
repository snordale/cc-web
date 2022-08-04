import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

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
		green: {
			main: '#D6FDD7',
		},
		neutral: {
			light: "#DFDFDF",
			main: "#CACACA",
			dark: "#A4A4A4",
		}
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: "0px"
				}
			}
		}
	}
})

declare module '@mui/material/styles' {
	interface Palette {
		neutral: Palette['primary']
	}
	interface PaletteOptions {
		neutral: PaletteOptions['primary']
	}
	interface Palette {
		green: Palette['primary']
	}
	interface PaletteOptions {
		green: PaletteOptions['primary']
	}
}


export default theme
