FROM node:latest

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

RUN mkdir /opt/app_mobile
WORKDIR /opt/app_mobile
ENV PATH /opt/app_mobile/.bin:$PATH
COPY . /opt/app_mobile/
RUN npm install


WORKDIR /opt/app_mobile/app
RUN rm -rf node_modules

COPY . /opt/app_mobile/app/

ENTRYPOINT ["npm", "run"]

CMD ["web"]

EXPOSE 8081
