FROM node:20-alpine

ARG NODE_AUTH_TOKEN
ARG NUXT_PUBLIC_SDK_CNTF_API_URL
ARG NUXT_PUBLIC_SDK_SAPCC_API_URL
ARG NUXT_PUBLIC_SDK_SAPCC_SSR_API_URL
ARG NUXT_PUBLIC_MAX_VISIBLE_CATEGORIES
ARG NUXT_PUBLIC_CATEGORY_ITEMS_PER_PAGE
ARG NUXT_PUBLIC_CLOUDINARY_CMS_URL
ARG NUXT_PUBLIC_CLOUDINARY_BASE_URL
ARG NUXT_PUBLIC_CLOUDINARY_UPLOAD_DIR

ENV NODE_AUTH_TOKEN=${NODE_AUTH_TOKEN}
ENV NUXT_PUBLIC_SDK_CNTF_API_URL=${NUXT_PUBLIC_SDK_CNTF_API_URL}
ENV NUXT_PUBLIC_SDK_SAPCC_API_URL=${NUXT_PUBLIC_SDK_SAPCC_API_URL}
ENV NUXT_PUBLIC_SDK_SAPCC_SSR_API_URL=${NUXT_PUBLIC_SDK_SAPCC_SSR_API_URL}
ENV NUXT_PUBLIC_MAX_VISIBLE_CATEGORIES=${NUXT_PUBLIC_MAX_VISIBLE_CATEGORIES}
ENV NUXT_PUBLIC_CATEGORY_ITEMS_PER_PAGE=${NUXT_PUBLIC_CATEGORY_ITEMS_PER_PAGE}
ENV NUXT_PUBLIC_CLOUDINARY_CMS_URL=${NUXT_PUBLIC_CLOUDINARY_CMS_URL}
ENV NUXT_PUBLIC_CLOUDINARY_BASE_URL=${NUXT_PUBLIC_CLOUDINARY_BASE_URL}
ENV NUXT_PUBLIC_CLOUDINARY_UPLOAD_DIR=${NUXT_PUBLIC_CLOUDINARY_UPLOAD_DIR}

WORKDIR /var/www

COPY . .

RUN apk add --no-cache libc6-compat

RUN yarn install
RUN yarn turbo run build --scope="web"

COPY .vuestorefrontcloud/docker/frontend/vue-storefront.sh /usr/local/bin/

RUN chmod a+x /usr/local/bin/vue-storefront.sh

ENTRYPOINT ["vue-storefront.sh"]

