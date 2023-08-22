FROM node:20-alpine

ARG NODE_AUTH_TOKEN

ENV NODE_AUTH_TOKEN=${NODE_AUTH_TOKEN}

WORKDIR /var/www

COPY . .

RUN apk add --no-cache libc6-compat

RUN yarn install
RUN yarn turbo run build --scope="web"

COPY .vuestorefrontcloud/docker/frontend/vue-storefront.sh /usr/local/bin/

RUN chmod a+x /usr/local/bin/vue-storefront.sh

ENTRYPOINT ["vue-storefront.sh"]

