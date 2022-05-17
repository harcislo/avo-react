FROM node 

WORKDIR /apps/avoNFT

COPY package.json .

RUN npm install

COPY . . 

ARG node_env
RUN BUILD_ENV=$node_env npm run build

EXPOSE 9000

CMD ["npm", "run", "docker"]