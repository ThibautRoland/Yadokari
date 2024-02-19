FROM node:slim

WORKDIR /yadokari

COPY ./frontend .

RUN npm install

EXPOSE 2000

# for now, we must use dev because we still have errors in typescript, we can't make a npm start
CMD ["npm", "run", "dev"]