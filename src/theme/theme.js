import { createTheme } from "@mui/material";
import { lime } from "@mui/material/colors";

export const theme = createTheme({
    palette:{
        primary: lime,
        
    },
    typography:{
        h2: {
            color: '#66451c',
            fontFamily: "Playfair Display",
            fontWeight: 700,
            fontSize: '28px',
            '@media (min-width:600px)':{
                fontSize: '35px'
            },
            '@media (min-width:960px)':{
                fontSize: '45px'
            }
        },
        h4: {
            color: '#eb0359',
            fontFamily: "Cinzel Decorative",
            fontWeight: 700,
            fontSize: '16px',
            '@media (min-width:600px)':{
                fontSize: '18px'
            },
            '@media (min-width:960px)':{
                fontSize: '20px'
            }
        },
        h6: {
            color: '#eb0359',
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: '14px',
            
        },
        
    }
})