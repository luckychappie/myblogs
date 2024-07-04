import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 12
  },
  palette: {
    primary: {
      main: "#1e4c04",
    },
    secondary: {
      main: '#f8f7f2'
    }
  },
});