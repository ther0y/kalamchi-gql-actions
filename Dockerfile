FROM node:16.13-alpine3.15

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

ENV GQL_ENDPOINT="$GQL_ENDPOINT"
ENV HASURA_GRAPHQL_ADMIN_SECRET="$HASURA_GRAPHQL_ADMIN_SECRET"
ENV ACTION_SECRET_ENV="$ACTION_SECRET_ENV"

CMD ["npm", "start"]