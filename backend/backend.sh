#!/bin/bash
set -e #exit on error
npm init -y


error_handler() {
    echo "An error occurred. Exiting..."
    exit 1
}

# Set up the trap to call the error handler function
trap 'error_handler' ERR

npm install express cors body-parser helmet mongoose morgan dotenv 

if [ $? -ne 0 ]; then
    echo "Command 2 failed."
    # Additional error handling code here
fi

npm i nodemon -D
if [ $? -ne 0 ]; then
    echo "npm i nodemon -D."
    # Additional error handling code here
fi