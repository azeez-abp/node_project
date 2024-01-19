#!/bin/bash

script_path=$(readlink -f "$0")
RES=${script_path%/*} #remove every after the longest /

if [[ ! -d  "$RES/backend/node_modules" ]]
        then    
               cd "$RES/backend"
               npm install
else
      echo "Dependency already install"
fi

if [[ ! -f  "$RES/backend/.env" ]]
        then    
         
                   echo ".env is required"
                   exit(1)
else
      echo ".ENV FILE SET"
fi
 cd "$RES/backend"
npm run dev &
 cd "$RES/frontend"
npm start &

# string1="hello"
# string2="world"
# echo  ${#string1}  # lenght of string

# if [ ${#string1} -gt ${#string2} ]; then
#     echo "String 1 is longer than String 2."
# elif [ ${#string1} -eq ${#string2} ]; then
#     echo "String 1 and String 2 have the same length."
# else
#     echo "String 1 is shorter than String 2."
# fi
