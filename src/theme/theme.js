import { createTheme } from "@mui/material";

// Brand tokens — single source of truth for the whole app
export const brand = {
    primary: '#66451c',      // deep brown
    primaryLight: '#c48c46', // warm gold
    secondary: '#eb0359',    // romance pink
    dark: '#2a2c3c',         // dark navy (dark sections / footer)
    darker: '#232431',       // footer bottom bar
    gold: '#ffb400',         // accents on dark background
    cream: '#fffbee',        // page background tint
    textMuted: '#6d6d6d',
}

export const theme = createTheme({
    palette: {
        primary: {
            main: brand.primary,
            light: brand.primaryLight,
        },
        secondary: {
            main: brand.secondary,
        },
        text: {
            secondary: brand.textMuted,
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h1: {
            fontFamily: 'Playfair Display',
            fontWeight: 700,
        },
        h2: {
            color: brand.primary,
            fontFamily: "Playfair Display",
            fontWeight: 700,
            fontSize: '28px',
            '@media (min-width:600px)': {
                fontSize: '35px'
            },
            '@media (min-width:960px)': {
                fontSize: '45px'
            }
        },
        h3: {
            fontFamily: 'Playfair Display',
            fontWeight: 700,
        },
        h4: {
            color: brand.secondary,
            fontFamily: "Cinzel Decorative",
            fontWeight: 700,
            fontSize: '16px',
            '@media (min-width:600px)': {
                fontSize: '18px'
            },
            '@media (min-width:960px)': {
                fontSize: '20px'
            }
        },
        h5: {
            fontFamily: 'Playfair Display',
            fontWeight: 700,
        },
        h6: {
            color: brand.secondary,
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: '14px',
        },
    },
    components: {
        // Keep the warm body gradient from index.css — CssBaseline would
        // otherwise repaint the body plain white.
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(135deg, #fdfcfb 0%, rgb(255 251 238) 100%)',
                },
            },
        },
        // Widen the default ("lg") container site-wide: 1200px feels cramped
        // on modern screens, especially next to the filter sidebar.
        MuiContainer: {
            styleOverrides: {
                maxWidthLg: {
                    '@media (min-width: 1200px)': {
                        maxWidth: '1360px',
                    },
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontFamily: 'Poppins',
                    borderRadius: '50px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: '12px',
                },
            },
        },
    },
})
