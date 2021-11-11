import { createTheme } from "@material-ui/core/styles";
import "@fontsource/nunito";
import "typeface-montserrat"
const spacing = 0;

export const custom_theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#003876",
            light: "#04397E",
        },
        secondary: {
            main: "#3d4453",
        },
        warning: {
            main: "#7931e",
        },
        error: {
            main: "#f44336",
            light: "#e57373",
            dark: "#d32f2f",
        },
        success: {
            main: "#56df34",
        },
    },
    spacing: spacing,
    typography: {
        fontFamily: "Montserrat",
        link: {
            fontSize: 15,
        },
    },
    overrides: {
        MuiTooltip: {
            tooltip: {
                color: "#003876",
                backgroundColor: "#deeaee",
            },
        },
    },
});