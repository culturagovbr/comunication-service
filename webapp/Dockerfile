FROM node:8.11.4-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR "/home/node/app"
USER "node"
COPY --chown=node:node ./webapp /home/node/app
COPY --chown=node:node ./webapp/docker/docker-entrypoint.sh /usr/local/bin/
RUN npm install
EXPOSE 8080

ENTRYPOINT ["docker-entrypoint.sh"]

RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh

CMD [ "npm", "run", "serve"]