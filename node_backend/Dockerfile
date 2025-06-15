FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3305

CMD ["npm", "start"]


# docker build -t node-backend .

# docker run -p 3305:3305 -v C:\Users\Steve\.aws:/home/node/.aws node-backend
