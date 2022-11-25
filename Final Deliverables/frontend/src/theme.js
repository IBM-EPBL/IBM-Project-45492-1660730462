import { createTheme } from "@mui/material";

const theme = createTheme({
    // palette: {
    //     primary: {
    //         main: '#ce0123',
    //     },
    //     secondary: {
    //         main: green[500],
    //     },
    //     mode: 'light'
    // },

    palette: {
        primary: {
            main: "#0971f1",
            darker: "#053e85",
        },
        neutral: {
            main: "#fafafa",
            contrastText: "#000000",
        },
    },

    typography: {
        fontFamily: ["Acme", "sans-serif"],
    },
    
    typography: {
        fontFamily: ["Galdeano", "sans-serif"],
    },

    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
    },

    components: {
        MuiPaper: {
            defaultProps: {
                sx: {
                    "&.styled": {
                        padding: 4,
                    },
                },
                elevation: 3,
            },
        },
    },

    // components: {
    //     MuiCssBaseline: {
    //         styleOverrides: `
    //           @font-face {
    //             font-family: 'Acme';
    //             font-style: normal;
    //             font-display: swap;
    //             font-weight: 400;
    //             src: local('Acme'), local('acme-Regular'), url(${AcmeRegular}) format('woff');
    //             unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    //           }
    //         `,
    //       },

    // MuiSelect:{
    //     styleOverrides: {
    //         k
    //     }
    // }
});

export default theme;
