#!/bin/bash

if [[  -d  './backend/node_modules' ]]
        then 
                echo "FOUND"
else
      echo "NOT FOUND"
fi

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
