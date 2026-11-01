FROM node:26-bookworm-slim
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
WORKDIR /app
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]
