#!/bin/env bash
# https://app.usebraintrust.com/talent/dashboard/welcome/
set -eou pipefail

# Get the location of the script file
script_path=$(readlink -f "$0")
FILE_PATH=${script_path%/*}
# check if .env has already exist
replace=0
if [[ -f "$FILE_PATH/backend/.env" ]];then
	echo ".env file already exist"
	read -p $'Do you want to overide?\n type yes to overide \n no to keep your .env\n' ANS
    
	if [[ $ANS == "yes" ]]; then
		replace=1
	fi
else 
	replace=1
fi



if [[ $replace == 0 ]];then
	exit 0
fi

echo $'You are about to set up your env file'

declare -a LIST=()
declare -a PROMPT_MSG=(
	$'Enter your mongodb connection string\n'
	$'Eneter random string for your session id\n'
	$'Eneter random string for your access token\n' 
	$'Eneter random string for your access token key\n' 
	$'Eneter random string for your refresh token\n' 
	$'Eneter random string for your cookie name\n' 
 )

live=""
local_=""
len="${#PROMPT_MSG[@]}"

for index in  $(seq 0 $((len - 1))); do
    # Regular expression patterns
    read -p "${PROMPT_MSG[index]}"  ENV1

	if [[ $index == 0 ]]; then
	   	pattern="^mongodb\+srv://"
		pattern_local="^mongodb://(.+@)?(localhost|127\.0\.0\.1):27017"
		# Check if the string matches the patterns
		if [[ $ENV1 =~ $pattern ]]; then
		    echo "String starts with mongodb+srv://"
		    live="$ENV1"
		elif [[ $ENV1 =~ $pattern_local ]]; then
		    echo "You have a local MongoDB"
		    local_="$ENV1"
		else
		    echo "The connection string did not match mongodb"
		    exit 1
		fi
	fi
	ENV1=$(echo "$ENV1" | sed 's/[^[:print:]]//g')

	# Remove leading and trailing whitespace

	ENV1=$(echo "$ENV1" | xargs)
    
	if [[ -z $ENV1 ]]; then
		 V=$(echo "${PROMPT_MSG[index]##*your}" | sed 's/\\n/ /') 
		echo $V" can not be empty"
        
		exit 1
	fi
    LIST[index]=$ENV1
done



ENV_CONTENT=$(cat <<-EOF
MONGO_URL=$live
MONGO_LOCAL=$local_
MONGO_SESSION=${LIST[1]}
ACCESS_TOKEN=${LIST[2]}
ACCESS_TOKEN_KEY=${LIST[3]}
REFRESH_TOKEN=${LIST[4]}
COOKIE_NAME=${LIST[5]}
MAIL_USER=
MAIL_PASS=
EOF
)

echo "$ENV_CONTENT" > "$FILE_PATH/backend/.env"
echo ".env file created"

read -p $'do you want to start the app\n y to start\n n to ignore\n' start

if [[ $start == 'y' ]]; then
	 "$FILE_PATH/start.sh"
fi
