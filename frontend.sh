#!/bin/bash
set -e #exit on error
cd  frontend
npx create-react-app .
if [ $? -ne 0 ]; then
    echo "npx create-react-app. return error"
    # Additional error handling code here
fi
#mv app/* ./

npm i react-redux @reduxjs/toolkit react-datepicker react-router-dom@6
npm i @mui/material  @mui/icons-material @mui/x-data-grid
npm i @emotion/react @emotion/styled
npm i @nivo/core @nivo/bar @nivo/geo @nivo/pie

if [ $? -ne 0 ]; then
    echo "npm i return error."
    # Additional error handling code here
fi