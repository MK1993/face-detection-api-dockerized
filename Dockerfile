FROM node:16

# Create app directory
WORKDIR /usr/src/face-detection-api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "/bin/bash" ]