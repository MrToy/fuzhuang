FROM node
WORKDIR /home
ADD . .
RUN npm install --production
CMD npm start
EXPOSE 80
