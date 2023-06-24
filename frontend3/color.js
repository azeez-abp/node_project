import { json } from "react-router-dom";

export const tokensDark = { 
grey: {   
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
},
primary: {
// blue
100: "#d3d4de",
200: "#a6a9be",
300: "#7a7f9d",
400: "#4d547d",
500: "#21295c",
600: "#191F45", // manually adjusted
}

}

function reverseObject(obj) {
     const reversed = {}
    Object.entries(obj).forEach( ([key,value])=>{
             const eachObj  = {}
             for(const val in value){
                eachObj[value[val]]  = val
             }
             reversed[key] =eachObj
    } )
    return reversed; 
}

const reversedTokensDark = reverseObject(tokensDark);
//console.log(reversedTokensDark);
export const tokenReverse = reversedTokensDark