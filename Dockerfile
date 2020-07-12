FROM node:13
COPY . /home/asteroid-game
RUN cd /home/asteroid-game/ && \
    npm install && \
    npm run build


FROM nginx:1.17

RUN cat /etc/nginx/nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /home/asteroid-game/dist /usr/share/nginx/html

#Heroku assigns a port to the dyno when its started up. So we have to be able to dynamically
#update the nginx conf file
#CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
CMD nginx -g 'daemon off;'

