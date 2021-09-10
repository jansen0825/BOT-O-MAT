FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json .

RUN yarn global add nodemon && yarn install --check-files

# Bundle app source
COPY . .

EXPOSE 4000
CMD ["yarn", "start"]
