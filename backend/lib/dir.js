import { fileURLToPath } from 'url';
import { dirname } from 'path';
//const __filename = fileURLToPath(import.meta.url);

export const workin_dir  = ()=>{
       
        const __dirname = "C:\\Users\\BONJOUREX\\Desktop\\Code-project\\node_project\\backend"//dirname(__filename); 
        //const __dirname = dirname(__filename);   

        return { __dirname
               // __filename,
               
         }
}