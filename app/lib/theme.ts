import grey from "@material-ui/core/colors/grey";
import { createMuiTheme } from "@material-ui/core/styles";

export const themeDark = createMuiTheme({
  palette: {
    primary: {
      main: grey[200],
    },
    secondary: {
      main: grey[400],
    },
    type: "dark",
  },
});

export const themeLight = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: grey[900],
    },
    type: "light",
  },
});
