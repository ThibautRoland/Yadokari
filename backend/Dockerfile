# Fetching the minified node image on apline linux
FROM node:slim


# Setting up the work directory
WORKDIR /yadokari

# Copying all the files in our project
COPY ./backend .

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "node", "app.js" ]

# Exposing server port
EXPOSE 3000