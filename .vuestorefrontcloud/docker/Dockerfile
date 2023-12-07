FROM node:12

ARG COMMIT
ARG NPM_USER
ARG NPM_PASS
ARG NPM_EMAIL
ARG NPM_REGISTRY

ENV LAST_COMMIT=${COMMIT}
ENV PORT=3000

WORKDIR /var/www

COPY . .

EXPOSE 3000

ARG DT_API_URL="https://zlr04484.live.dynatrace.com/api"
ARG DT_PAAS_TOKEN
ARG DT_ONEAGENT_TECHNOLOGY="nodejs"
ENV DT_HOME="/opt/dynatrace/oneagent"
ENV ARCH_ARG="&arch=arm"
RUN mkdir -p "$DT_HOME" && \
    wget -O "$DT_HOME/oneagent.zip" "$DT_API_URL/v1/deployment/installer/agent/unix/paas/latest?Api-Token=$DT_PAAS_TOKEN&flavor=default&include=$DT_ONEAGENT_TECHNOLOGY" && \
    unzip -d "$DT_HOME" "$DT_HOME/oneagent.zip" && \
    rm "$DT_HOME/oneagent.zip"

ENTRYPOINT [ "/opt/dynatrace/oneagent/dynatrace-agent64.sh" ]
CMD [ "node", "index.js" ]
