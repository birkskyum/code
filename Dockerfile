FROM node:15.8.0-stretch AS prebase
# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src
EXPOSE 3000

FROM prebase as base
WORKDIR /usr/src
# Prisma schema is needed for postinstall client generation
# Install dependencies
COPY prisma package*.json yarn*.lock ./
RUN yarn --network-timeout=300000

FROM base as source
# Copying source files
WORKDIR /usr/src
COPY . .

FROM source AS dev
CMD "yarn" "dev"

FROM source AS prod
# Building app
RUN yarn run build && yarn --production --network-timeout=300000
# Running the app
CMD "yarn" "start"
