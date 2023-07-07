import {decode as atob, encode as btoa} from 'base-64'
export const crypto = {
        encode: function encoder( $input=['soamthin to encode must be string'],  $key, $desembleCode = [3,2,1,0])
        {
        
            let $key_int_array  = [];
            let  $key_ascii_value_total  = 0;
            $key   = btoa($key);
            let $ascii_value;
            for (let $i = 0; $i < $key.length; $i++) {
                $ascii_value = $key.charCodeAt([$i]);
                $key_ascii_value_total +=  $ascii_value;
                $key_int_array.push($ascii_value)
                //array_push($key_int_array, $ascii_value);
            }
        
                $input  = btoa(JSON.stringify($input));
                let $input_int_array  = [];
            for (let $x = 0; $x < $input.length; $x++) {
                let  $ascii_value = $input.charCodeAt([$x]) + $key_ascii_value_total;
                $input_int_array.push($ascii_value)
                
            }
        
                
        
            let   $output  = btoa(JSON.stringify($input_int_array));
        
        
            let  $scattered_chunk_arr = [];
            if ($desembleCode.length>0) {
                let $len  = $desembleCode.length;
                let $cutLen  = Math.ceil($output.length / $len);
                let $cut_start = 0;
                let $cut_end  = $output.length
                let $chunk_arr  = [];
                while ($cut_start < $cut_end) {
                    let  $chunk  = $output.substr( $cut_start, $cutLen);
                    $chunk_arr.push($chunk)
                    
                    $cut_start += $cutLen;
                }
                
                let  $scattered_chunk_arr  = [];
                while ($desembleCode.length>0) {
                    let  $key  = $desembleCode.shift()// array_shift($desembleCode);
        
                    $scattered_chunk_arr.push($chunk_arr[$key])//.push($chunk_arr[$key])
                }
        
                //
                return ['encode done', $key_ascii_value_total, btoa(JSON.stringify($scattered_chunk_arr))];
                //  $output  =  base64_encode(json_encode($scattered_chunk_arr));
            }
            
            
        },  
        decode:  function decode(encrytedStr_array,key,scatterer){
           
            key  = btoa(key);
            let key_ascii_total_val  = 0;
            for (let index = 0; index < key.length; index++) {
                key_ascii_total_val += key.charCodeAt(index)//calculate the secrete key
            }

            if(encrytedStr_array[1] !== key_ascii_total_val){
                return false  // if the secreate key does not match
            }

            try {
                   
            
            //reorganize the scattered array
            let scattared_array  = atob(encrytedStr_array[2]) 
          
            scattared_array  = JSON.parse( scattared_array)
            let re_oranize_arr  = []
            let ind = 0;
        // let 	keys  = Object.keys(scatterer);
            let  value  = Object.values(scatterer)
            while(scatterer.length>ind){
                re_oranize_arr[value[ind]] = scattared_array[ind]
                ind++;
            }
        
       
         let   $int_array_encryted  = JSON.parse(atob(re_oranize_arr.join("")))
        
            
                    let $decrypted  = '';
                for (let index_ = 0; index_ < $int_array_encryted.length; index_++) {
                     $decrypted +=   String.fromCharCode($int_array_encryted[index_]-key_ascii_total_val) 
                }
                


                return JSON.parse(atob ($decrypted))[0];
            } catch (error) {
                
            }

        }



  }
  /*
  let $p  = decode(["WzExMTksMTE1MywxMTA2LDExNTEsMTEyOSwxMTA0LDEwOTgsMTEwMSwxMTMwLDEwODMsMTEzMiwxMTQ5LDExMzAsMTEwMywxMDg5LDExMzYsMTEyMiwxMTA0LDExMTAsMTEwMSwxMTMwLDEwODIsMTExMCwxMDgxLDExMzAsMTExOSwxMTE4LDExNDksMTEzMiwxMTAzLDExMDIsMTA4MCwxMTI5LDExMTksMTA4OSwxMTQ5LDExMTQsMTA4MiwxMTE3LDExMzUsMTEzMiwxMDk5LDExMDYsMTEzMl0=",
    1032,'WyI1TERFeE16WXNNVEV5TWl3eE1UQTBMREV4TVRBc01URXciLCJNU3d4TVRNd0xERXdPRElzTVRFeE1Dd3hNRGd4TERFeE0iLCJNc01URXpNaXd4TVRRNUxERXhNekFzTVRFd015d3hNRGciLCJBekxERXhNRElzTVRBNE1Dd3hNVEk1TERFeE1Ua3NNVEEiLCJTd3hNVEEwTERFd09UZ3NNVEV3TVN3eE1UTXdMREV3T0QiLCJNelVzTVRFek1pd3hNRGs1TERFeE1EWXNNVEV6TWwwPSIsIjRPU3d4TVRRNUxERXhNVFFzTVRBNE1pd3hNVEUzTERFeCIsIld6RXhNVGtzTVRFMU15d3hNVEEyTERFeE5URXNNVEV5TyIsInpBc01URXhPU3d4TVRFNExERXhORGtzTVRFek1pd3hNVCJd'],
	'Xsd%$sW',
	[3, 4, 2, 6, 1, 8, 7, 0, 5]
     //this array that tells how to scatter its element 
     // take element in position 3 to 0
     //  take element in position 4 to 1
	
	)

  */


 