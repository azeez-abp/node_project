import { tokensDark } from "./color"
export const themeSettings = (mode)=>{
return {
         palette: {
                   mode: mode,
                  ...(mode === "dark"
                  ?{
                    primary:{
                    ...tokensDark.primary,
                    main: tokensDark.primary[400], 
                    light: tokensDark.primary[400],
                    },
                    secondary: {
                    ...tokensDark.secondary,
                    main: tokensDark.secondary[300],
                    },
                    neutral: {
                    
                    ...tokensDark.grey,
                    main: tokensDark.grey[500],
                    },
                    background: {
                    default: tokensDark.primary[600], 
                    alt: tokensDark.primary[500],
                    }
                }:{
                    primary:{
                        ...tokensDark.primary,
                        main: tokensDark.primary[50], 
                        light: tokensDark.primary[100],
                        },
                        secondary: {
                        ...tokensDark.secondary,
                        main: tokensDark.secondary[600],
                        ligth: tokensDark.secondary[700],
                        },
                        neutral: {
                        
                        ...tokensDark.grey,
                        main: tokensDark.grey[500],
                        },
                        background: {
                        default: tokensDark.primary[0], 
                        alt: tokensDark.primary[50],
                        }
                }
                  )

            },
            typography:{
                fontFamily:["Inter","sans-serif"].join(","),
                fontSize:12,
                h1:{
                    fontFamily:["Inter","sans-serif"].join(","),
                    fontSize:40,
                }
            }
        }

    }