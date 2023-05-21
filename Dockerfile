FROM node:18-alpine

ENV TZ="Asia/Bangkok"

ENV DATABASE_URL="postgres://postgres:postgrespw@host.docker.internal:5432/test_company"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn install

# run prisma generate

COPY prisma ./prisma/

# COPY . ./prisma/schema.prisma
# COPY . ./prisma/seed.ts

# RUN npx prisma migrate dev

# RUN echo "DATABASE_URL=postgres://postgres:postgrespw@host.docker.internal:5432/test_company" > /usr/src/app/.env

RUN npx prisma generate


# # chown node_modules to node user
RUN chown -R node:node /usr/src/app/node_modules

# Bundle app source
COPY . .

RUN yarn build

# RUN npx prisma migrate deploy

# RUN npx prisma migrate reset

# RUN npx prisma migrate dev
# CMD [ "yarn", "start:dev" ]
CMD [ "yarn", "start"]