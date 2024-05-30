FROM node:20-alpine
RUN addgroup homainer && adduser -S -G homainer homainer
USER homainer
WORKDIR /homainer
COPY --chown=homainer:homainer package*.json .
RUN npm install
COPY . .
EXPOSE 7777
CMD ["npm", "run", "start:prod"]