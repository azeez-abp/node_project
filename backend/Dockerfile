FROM node:20.11.0-alpine
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json ./

RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
RUN
EXPOSE 8080
CMD [ "npm", "start" ]