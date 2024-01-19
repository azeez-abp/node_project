#!/bin/bash

script_path=$(readlink -f "$0")
RES=${script_path%/*} #remove every after the longest /

echo $RES " PATH " $script_path
if [[ ! -d  $(pwd)'/backend/node_modules' ]]
        then    
               cd "$RES/backend"
               npm  run install_dev
else
      echo "Dependency already install"
fi
 cd $(pwd)/backend
 npm run dev

string1="hello"
string2="world"
echo  ${#string1}  # lenght of string

if [ ${#string1} -gt ${#string2} ]; then
    echo "String 1 is longer than String 2."
elif [ ${#string1} -eq ${#string2} ]; then
    echo "String 1 and String 2 have the same length."
else
    echo "String 1 is shorter than String 2."
fi
#https://github.com/afinesami/holberton-system_engineering-devops.git