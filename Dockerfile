FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm i -g @digitak/esrun

COPY . .
EXPOSE 3000

CMD ["esrun", "index.ts"]
