FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]


# docker build -t node-backend .

# docker run -p 3000:3000 node-backend

