FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env /usr/src/app/.env
ENV PORT=5000
ENV MONGO_URL="your_mongo_url"
ENV NODE_ENV="production"
ENV SECRET_KEY="3a8b2c4d6e1f9g0h"
EXPOSE $PORT
CMD ["npm", "start"]