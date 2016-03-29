FROM node
WORKDIR /home
COPY . .
RUN npm install --production
CMD npm start
EXPOSE 80
