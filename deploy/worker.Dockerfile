FROM node:26-bookworm-slim
ENV NODE_ENV=production
WORKDIR /worker
COPY --chown=node:node . .
USER node
CMD ["node", "scripts/sync/run.mjs"]
