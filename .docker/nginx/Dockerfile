FROM node:12-alpine as build

RUN apk add --no-cache su-exec git;

WORKDIR /frontend
RUN chown node:node .
COPY --chown=node:node ./frontend/package.json ./frontend/package-lock.json ./
RUN su-exec node npm ci;

COPY --chown=node:node ./frontend/ ./
RUN su-exec node npm run build

# Workaround for docker with user namespace turned on multistage build issue
RUN cp -r /frontend/build /frontend/distRoot

# Final image
FROM nginx:alpine


# Copy config template (which will be transformed by nginx image entrypoint)
COPY .docker/nginx/conf/default.template.conf /etc/nginx/templates/default.conf.template

WORKDIR /srv/app/public

# Make root folder and set permission
RUN chown nginx:nginx .

COPY --chown=nginx:nginx ./frontend ./

# TODO: Do not expose src
#RUN rm -rf ./module/src

COPY --chown=nginx:nginx --from=build /frontend/distRoot ./frontend/build
