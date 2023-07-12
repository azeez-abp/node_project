import { tokensDark } from "./color"
//Cannot read properties of undefined (reading 'type')  solution check the key of color you are trying to get if it exist in your color objetcx

export const themeSettings = (mode)=>{

const darkModeColor    =   {
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
}

const lightModeColor  = {
    primary:{
           ...tokensDark.primary,
           main: tokensDark.primary[500], 
           light: tokensDark.primary[100],
           },
    secondary: {
           ...tokensDark.secondary,
           main: tokensDark.secondary[600],
           ligth: tokensDark.secondary[600],
           },
   neutral: {
           
           ...tokensDark.grey,
           main: tokensDark.grey[500],
           },
 background: {
           default: tokensDark.primary[50], 
           alt: tokensDark.primary[50],
           }
   }

 const grayModeColor2  =     {
    primary:{
    ...tokensDark.primary,
    main: tokensDark.grey[500], 
    light: tokensDark.grey[600],
    },
    secondary: {
    ...tokensDark.secondary,
    main: tokensDark.secondary[600],
    },
    neutral: {
    ...tokensDark.grey,
    main: tokensDark.grey[500],
    },
    background: {
    default: tokensDark.grey[500], 
    alt: tokensDark.grey[500],
    }  
}
return {
         palette: {
                   mode: mode,
                
                   ...(mode === "dark" ?darkModeColor :lightModeColor )

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