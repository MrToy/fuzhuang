FROM node
WORKDIR /home
ADD . .
RUN npm install
RUN npm run build
CMD npm start
EXPOSE 80
