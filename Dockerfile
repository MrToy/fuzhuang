FROM node
COPY . .
RUN npm install --production
CMD npm start
EXPOSE 80
