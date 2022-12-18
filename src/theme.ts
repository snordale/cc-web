import { Shadows } from "@mui/material/styles/shadows";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shadows: Array(25).fill("none") as Shadows,
  typography: {
    fontSize: 12,
    fontWeightRegular: 500,
    fontFamily: [
      "Poppins",
      "Joesfin Sans",
      "Nunito Sans",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#222",
    },
    secondary: {
      main: "#B0D7FE",
    },
    green: {
      main: "#D6FDD7",
    },
    neutral: {
      light: "#DFDFDF",
      main: "#CACACA",
      dark: "#A4A4A4",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "1000px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "1000px !important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "16px !important",
        },
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
  interface Palette {
    green: Palette["primary"];
  }
  interface PaletteOptions {
    green: PaletteOptions["primary"];
  }
}

export default theme;
